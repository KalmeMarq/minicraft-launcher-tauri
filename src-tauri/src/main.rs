#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{path::PathBuf, fs::{File, self}, future::Future};
use serde::{Deserialize, Serialize};
use tauri::{WindowBuilder, WindowUrl, Theme, Manager};
mod versions;
use versions::Versions;

struct LauncherState {
    versions: Versions,
    settings: LauncherSettings
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

async fn get_json_cached_file(file_path: PathBuf, request_url: &str) -> serde_json::Value {
    if file_path.exists() {
        let metadata = std::fs::metadata(&file_path).expect("Could not read metadata for version manifest file");

        let dur = metadata.modified().unwrap().elapsed().unwrap();

        if dur.as_secs() / 60 > 45 {
            let json: serde_json::Value = reqwest::get(request_url.to_string()).await.expect("Could not get file from url").json().await.expect("Could not jsonify file");
            serde_json::to_writer_pretty(&File::create(&file_path).expect("Could not cache file"), &json).expect("Could not save version file");
            json
        } else {
            let data = fs::read_to_string(&file_path).expect("Could not read cached file");
            let json: serde_json::Value = serde_json::from_str(&data).expect("Could not jsonify file");
            json
        }
    } else {
        let json: serde_json::Value = reqwest::get(request_url.to_string()).await.expect("Could not get file from url").json().await.expect("Could not jsonify file");
        serde_json::to_writer_pretty(&File::create(&file_path).expect("Could not cache file"), &json).expect("Could not save version file");
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
    let request_url = "https://github.com/KalmeMarq/minicraft-launcher-content/raw/main/minicraftPatchNotes.json";

    get_json_cached_file(pn_path, &request_url).await
}

#[tauri::command]
async fn get_launcher_patch_notes() -> serde_json::Value {
    let pn_path = get_cache_path().join("launcherPatchNotes.json");
    let request_url = "https://github.com/KalmeMarq/minicraft-launcher-content/raw/main/launcherPatchNotes.json";

    get_json_cached_file(pn_path, &request_url).await
}

fn default_language() -> String { "en-US".to_string() }
fn default_theme() -> String { "dark".to_string() }
fn default_keep_launcher_open() -> bool { true }
fn default_show_community_tab() -> bool { true }

#[derive(Serialize, Deserialize, Debug)]
struct LauncherSettings {
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
    disable_hardware_acceleration: bool
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
        disable_hardware_acceleration: false
    };

    if settings_path.exists() {
        let data_settings = std::fs::read_to_string(settings_path).expect("Could not read launcher settings file");
        settings = serde_json::from_str(&data_settings).unwrap();
    } else {
        serde_json::to_writer_pretty(&File::create(settings_path).expect("Could not create launcher settings file"), &settings).expect("Could not save settings");
    }

    settings
}

#[allow(unused_assignments)]
fn load_versions() -> impl Future<Output = Versions>{
   async {
        if !get_versions_path().exists() {
            fs::create_dir(get_versions_path()).expect("Could not create versions folder");
        }

        let manifest_path = get_versions_path().join("version_manifest.json");

        let mut versions: Versions = Versions { versions: vec![] };

        if manifest_path.exists() {
            let metadata = std::fs::metadata(&manifest_path).expect("Could not read metadata for version manifest file");

            if let Ok(time) = metadata.modified() {
                let dur = time.elapsed().unwrap();

                if dur.as_secs() / 60 > 45 {
                    let request_url = "https://github.com/KalmeMarq/minicraft-launcher-content/raw/main/version_manifest.json".to_string();
                    versions = reqwest::get(&request_url).await.expect("Coud not get version manifest from url").json().await.expect("Could not jsonify version manifest");
                    serde_json::to_writer_pretty(&File::create(&manifest_path).expect("Could not create version manifest file"), &versions).expect("Could not save version manifest");
                } else {
                    let data_versions = std::fs::read_to_string(&manifest_path).expect("Could not read version manifest file");
                    versions = serde_json::from_str(&data_versions).unwrap();
                }
            } else {
                let data_versions = std::fs::read_to_string(&manifest_path).expect("Could not read version manifest file");
                versions = serde_json::from_str(&data_versions).unwrap();
            }
        } else {
            let request_url = "https://github.com/KalmeMarq/minicraft-launcher-content/raw/main/version_manifest.json".to_string();
            versions = reqwest::get(&request_url).await.expect("Coud not get version manifest from url").json().await.expect("Could not jsonify version manifest");
            serde_json::to_writer_pretty(&File::create(&manifest_path).expect("Could not create version manifest file"), &versions).expect("Could not save version manifest");
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
                .build().unwrap();

            tauri::async_runtime::spawn(async move {
                let _versions = load_versions().await;
                let _settings = load_settings();
                main_win.manage(LauncherState { versions: _versions, settings: _settings });
                main_win.show().unwrap();
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_launcher_path, get_version_list, get_minicraftplus_patch_notes, get_minicraft_patch_notes, get_launcher_patch_notes])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
