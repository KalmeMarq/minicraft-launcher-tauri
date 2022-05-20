#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{path::PathBuf, fs::{File, self}};
use serde::{Deserialize, Serialize};
use tauri::{WindowBuilder, WindowUrl};

#[tauri::command]
fn get_launcher_path() -> PathBuf {
    dirs::data_dir().unwrap().join(".minicraftlauncher")
}

fn default_language() -> String { "en-US".to_string() }
fn default_theme() -> String { "dark".to_string() }

#[derive(Serialize, Deserialize)]
struct LauncherSettings {
    #[serde(rename = "keepLauncherOpen")]
    keep_launcher_open: bool,
    #[serde(default = "default_language")]
    language: String,
    #[serde(default = "default_theme")]
    theme: String,
    #[serde(rename = "showCommunityTab", default = "bool::default")]
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

fn main() {
    if !get_launcher_path().exists() {
        fs::create_dir(get_launcher_path()).expect("Could not create launcher directory");
    }

    load_settings();

    tauri::Builder::default()
        .setup(|app| {
            let _win = WindowBuilder::new(app, "core", WindowUrl::App("index.html".into()))
                .data_directory(get_launcher_path().join("cache"))
                .fullscreen(false)
                .title("Minicraft Launcher")
                .min_inner_size(1010.0, 600.0)
                .build().unwrap();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_launcher_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
