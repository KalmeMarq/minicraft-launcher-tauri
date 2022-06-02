use std::{process::Command, fs};

use serde::{Serialize, Deserialize};

use crate::get_versions_path;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Version {
    pub id: String,
    pub url: String,
    pub size: u32
}

impl Version {
    pub fn has_locally(&self) -> bool {
        let mut name = self.id.clone();
        name.push_str(".jar");
        get_versions_path().join(name).exists()
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Versions {
    pub versions: Vec<Version>
}

#[tauri::command]
pub fn open_folder_version(mut id: String) {
    id.push_str(".jar");
    let path = get_versions_path().join(id);
    println!("{:?}", &path);

    #[cfg(target_os = "windows")]
    Command::new("explorer").arg("/select,".to_owned() + path.to_str().unwrap()).spawn().unwrap();

    #[cfg(target_os = "macos")]
    Command::new("open").args(["-R", &path]).spawn().unwrap();

    #[cfg(target_os = "linux")]
    Command::new("xdg-open").arg(&path).spawn().unwrap();
}

#[tauri::command]
pub fn delete_version(mut id: String) {
    id.push_str(".jar");
    let path = get_versions_path().join(id);
    println!("{:?}", &path);

    fs::remove_file(&path).expect("Could not remove version");
}
