#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use profiles::{create_profile, delete_profile, get_profiles, load_profiles, LauncherProfiles};
use serde::{Deserialize, Serialize};
use std::{
    fs::{self, File},
    future::Future,
    path::PathBuf,
    sync::Mutex,
};
use tauri::{Manager, State, Theme, WindowBuilder, WindowUrl, api::shell};
mod profiles;
mod themes;
mod versions;
use versions::{Version, Versions, open_folder_version};

pub struct LauncherState {
    versions: Versions,
    pub settings: Mutex<LauncherSettings>,
    pub profiles: Mutex<LauncherProfiles>,
}

#[tauri::command]
fn get_launcher_path() -> PathBuf {
    dirs::data_dir().unwrap().join(".minicraftlauncher")
}

fn get_versions_path() -> PathBuf {
    get_launcher_path().join("versions")
}

fn get_cache_path() -> PathBuf {
    get_launcher_path().join("cache")
}

#[tauri::command]
fn get_version_list(state: tauri::State<LauncherState>) -> &Versions {
    &state.inner().versions
}

#[tauri::command]
fn get_local_version_list(state: State<LauncherState>) -> Vec<&Version> {
    let mut lv: Vec<&Version> = Vec::new();

    for ver in state.inner().versions.versions.iter() {
        if ver.has_locally() {
            lv.push(&ver);
        }
    }

    lv
}

async fn get_json_cached_file(file_path: PathBuf, request_url: &str) -> serde_json::Value {
    if file_path.exists() {
        let metadata = std::fs::metadata(&file_path)
            .expect("Could not read metadata for version manifest file");

        let dur = metadata.modified().unwrap().elapsed().unwrap();

        if dur.as_secs() / 60 > 45 {
            let json: serde_json::Value = reqwest::get(request_url.to_string())
                .await
                .expect("Could not get file from url")
                .json()
                .await
                .expect("Could not jsonify file");
            serde_json::to_writer_pretty(
                &File::create(&file_path).expect("Could not cache file"),
                &json,
            )
            .expect("Could not save version file");
            json
        } else {
            let data = fs::read_to_string(&file_path).expect("Could not read cached file");
            let json: serde_json::Value =
                serde_json::from_str(&data).expect("Could not jsonify file");
            json
        }
    } else {
        let json: serde_json::Value = reqwest::get(request_url.to_string())
            .await
            .expect("Could not get file from url")
            .json()
            .await
            .expect("Could not jsonify file");
        serde_json::to_writer_pretty(
            &File::create(&file_path).expect("Could not cache file"),
            &json,
        )
        .expect("Could not save version file");
        json
    }
}

#[tauri::command]
async fn get_minicraftplus_patch_notes() -> serde_json::Value {
    let pn_path = get_cache_path().join("minicraftplusPatchNotes.json");
    let request_url = "https://github.com/KalmeMarq/minicraft-launcher-content/raw/main/minicraftplusPatchNotes.json";

    get_json_cached_file(pn_path, &request_url).await
}

#[tauri::command]
async fn get_minicraft_patch_notes() -> serde_json::Value {
    let pn_path = get_cache_path().join("minicraftPatchNotes.json");
    let request_url =
        "https://github.com/KalmeMarq/minicraft-launcher-content/raw/main/minicraftPatchNotes.json";

    get_json_cached_file(pn_path, &request_url).await
}

#[tauri::command]
async fn get_launcher_patch_notes() -> serde_json::Value {
    let pn_path = get_cache_path().join("launcherPatchNotes.json");
    let request_url =
        "https://github.com/KalmeMarq/minicraft-launcher-content/raw/main/launcherPatchNotes.json";

    get_json_cached_file(pn_path, &request_url).await
}

fn default_language() -> String {
    "en-US".to_string()
}
fn default_theme() -> String {
    "dark".to_string()
}
fn default_keep_launcher_open() -> bool {
    true
}
fn default_show_community_tab() -> bool {
    true
}

#[derive(Serialize, Deserialize, Debug)]
pub struct LauncherSettings {
    #[serde(rename = "keepLauncherOpen", default = "default_keep_launcher_open")]
    keep_launcher_open: bool,
    #[serde(default = "default_language")]
    language: String,
    #[serde(default = "default_theme")]
    theme: String,
    #[serde(rename = "showCommunityTab", default = "default_show_community_tab")]
    show_community_tab: bool,
    #[serde(rename = "openOutputLog", default = "bool::default")]
    open_output_log: bool,
    #[serde(rename = "animatePages", default = "bool::default")]
    animate_pages: bool,
    #[serde(rename = "disableHardwareAcceleration", default = "bool::default")]
    disable_hardware_acceleration: bool,
}

static LANGUAGES: [&str; 3] = ["en-US", "pt-PT", "pt-BR"];

impl LauncherSettings {
    pub fn set_keep_launcher_open(&mut self, value: bool) {
        self.keep_launcher_open = value;
    }

    pub fn set_language(&mut self, value: &str) {
        if LANGUAGES.contains(&value) {
            self.language = value.to_string();
        }
    }

    pub fn set_show_community_tab(&mut self, value: bool) {
        self.show_community_tab = value;
    }

    pub fn set_animate_pages(&mut self, value: bool) {
        self.animate_pages = value;
    }

    pub fn set_disable_hardware_acceleration(&mut self, value: bool) {
        self.disable_hardware_acceleration = value;
    }

    pub fn set_open_output_log(&mut self, value: bool) {
        self.open_output_log = value;
    }

    pub fn set_theme(&mut self, value: &str) {
        self.theme = value.to_string();
    }
}

fn parse_set_bool(val: &str) -> bool {
    match val {
        "true" => true,
        "false" => false,
        _ => false,
    }
}

#[tauri::command]
fn set_setting(state: State<LauncherState>, option: String) {
    let v: Vec<&str> = option.split(":").collect();
    let o = v.get(0);
    let w = v.get(1).unwrap();

    if v.len() >= 2 {
        match o {
            Some(&"keep_launcher_open") => {
                state
                    .settings
                    .lock()
                    .unwrap()
                    .set_keep_launcher_open(parse_set_bool(w));
                println!("keep_launcher_open setted: {}", parse_set_bool(w));
            }
            Some(&"language") => {
                state.settings.lock().unwrap().set_language(w);
                println!("language setted: {}", w);
            }
            Some(&"theme") => {
                state.settings.lock().unwrap().set_theme(w);
                println!("theme setted: {}", w);
            }
            Some(&"show_community_tab") => {
                state
                    .settings
                    .lock()
                    .unwrap()
                    .set_show_community_tab(parse_set_bool(w));
                println!("show_community_tab setted: {}", parse_set_bool(w));
            }
            Some(&"open_output_log") => {
                state
                    .settings
                    .lock()
                    .unwrap()
                    .set_open_output_log(parse_set_bool(w));
                println!("open_output_log setted: {}", parse_set_bool(w));
            }
            Some(&"animate_pages") => {
                state
                    .settings
                    .lock()
                    .unwrap()
                    .set_animate_pages(parse_set_bool(w));
                println!("animate_pages setted: {}", parse_set_bool(w));
            }
            Some(&"disable_hardware_acceleration") => {
                state
                    .settings
                    .lock()
                    .unwrap()
                    .set_disable_hardware_acceleration(parse_set_bool(w));
                println!(
                    "disable_hardware_acceleration setted: {}",
                    parse_set_bool(w)
                );
            }
            Some(&_) => println!("unknown setted"),
            None => {}
        }
    }
}

#[tauri::command]
fn get_setting(state: State<LauncherState>, option: &str) -> String {
    match option {
        "keep_launcher_open" => state
            .settings
            .lock()
            .unwrap()
            .keep_launcher_open
            .to_string(),
        "language" => state.settings.lock().unwrap().language.clone(),
        "theme" => state.settings.lock().unwrap().theme.clone(),
        "show_community_tab" => state
            .settings
            .lock()
            .unwrap()
            .show_community_tab
            .to_string(),
        "open_output_log" => state.settings.lock().unwrap().open_output_log.to_string(),
        "animate_pages" => state.settings.lock().unwrap().animate_pages.to_string(),
        "disable_hardware_acceleration" => state
            .settings
            .lock()
            .unwrap()
            .disable_hardware_acceleration
            .to_string(),
        _ => "unknown".to_string(),
    }
}

fn load_settings() -> LauncherSettings {
    let settings_path = get_launcher_path().join("launcher_settings.json");

    let mut settings: LauncherSettings = LauncherSettings {
        keep_launcher_open: true,
        language: "en-US".to_string(),
        theme: "dark".to_string(),
        show_community_tab: true,
        open_output_log: false,
        animate_pages: false,
        disable_hardware_acceleration: false,
    };

    if settings_path.exists() {
        let data_settings =
            std::fs::read_to_string(settings_path).expect("Could not read launcher settings file");
        settings = serde_json::from_str(&data_settings).unwrap();
    } else {
        serde_json::to_writer_pretty(
            &File::create(settings_path).expect("Could not create launcher settings file"),
            &settings,
        )
        .expect("Could not save settings");
    }

    settings
}

#[allow(unused_assignments)]
fn load_versions() -> impl Future<Output = Versions> {
    async {
        if !get_versions_path().exists() {
            fs::create_dir(get_versions_path()).expect("Could not create versions folder");
        }

        let manifest_path = get_versions_path().join("version_manifest.json");

        let mut versions: Versions = Versions { versions: vec![] };

        if manifest_path.exists() {
            let metadata = std::fs::metadata(&manifest_path)
                .expect("Could not read metadata for version manifest file");

            if let Ok(time) = metadata.modified() {
                let dur = time.elapsed().unwrap();

                if dur.as_secs() / 60 > 45 {
                    let request_url = "https://github.com/KalmeMarq/minicraft-launcher-content/raw/main/version_manifest.json".to_string();
                    versions = reqwest::get(&request_url)
                        .await
                        .expect("Coud not get version manifest from url")
                        .json()
                        .await
                        .expect("Could not jsonify version manifest");
                    serde_json::to_writer_pretty(
                        &File::create(&manifest_path)
                            .expect("Could not create version manifest file"),
                        &versions,
                    )
                    .expect("Could not save version manifest");
                } else {
                    let data_versions = std::fs::read_to_string(&manifest_path)
                        .expect("Could not read version manifest file");
                    versions = serde_json::from_str(&data_versions).unwrap();
                }
            } else {
                let data_versions = std::fs::read_to_string(&manifest_path)
                    .expect("Could not read version manifest file");
                versions = serde_json::from_str(&data_versions).unwrap();
            }
        } else {
            let request_url = "https://github.com/KalmeMarq/minicraft-launcher-content/raw/main/version_manifest.json".to_string();
            versions = reqwest::get(&request_url)
                .await
                .expect("Coud not get version manifest from url")
                .json()
                .await
                .expect("Could not jsonify version manifest");
            serde_json::to_writer_pretty(
                &File::create(&manifest_path).expect("Could not create version manifest file"),
                &versions,
            )
            .expect("Could not save version manifest");
        }

        versions
    }
}

#[tokio::main]
async fn main() {
    if !get_launcher_path().exists() {
        fs::create_dir(get_launcher_path()).expect("Could not create launcher directory");
    }

    tauri::Builder::default()
        .setup(|app| {
            let main_win = WindowBuilder::new(app, "core", WindowUrl::App("index.html".into()))
                .data_directory(get_launcher_path().join("cache"))
                .fullscreen(false)
                .title("Minicraft Launcher")
                .min_inner_size(1010.0, 600.0)
                .theme(Some(Theme::Light))
                .visible(false)
                .build()
                .unwrap();

            shell::open(&app.shell_scope(), "file:///C:\\Users\\marq5\\AppData\\Roaming\\.minicraftlauncher\\versions\\miniventure_a2.2.jar", None);

            tauri::async_runtime::spawn(async move {
                let _versions = load_versions().await;
                let _settings = load_settings();
                let _profiles = load_profiles();

                main_win.manage(LauncherState {
                    versions: _versions,
                    settings: Mutex::from(_settings),
                    profiles: Mutex::from(_profiles),
                });
                main_win.show().unwrap();
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_local_version_list,
            set_setting,
            get_setting,
            get_launcher_path,
            get_version_list,
            get_minicraftplus_patch_notes,
            get_minicraft_patch_notes,
            get_launcher_patch_notes,
            delete_profile,
            create_profile,
            get_profiles,
            open_folder_version
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
