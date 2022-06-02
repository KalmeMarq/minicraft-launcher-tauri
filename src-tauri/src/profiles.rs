use std::{collections::HashMap, fs::File, sync::Mutex};

use serde::{Deserialize, Serialize};

use crate::{get_launcher_path, LauncherState};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Profile {
    name: String,
    icon: String,
    #[serde(rename = "lastVersionId")]
    version_id: String,
    // #[serde(rename = "lastUsed")]
    // last_used: String,
    #[serde(rename = "totalPlayTime")]
    total_play_time: u32,
    #[serde(rename = "jvmArgs")]
    jvm_args: String,
    #[serde(rename = "saveDir")]
    save_dir: String,
    modloader: String
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct LauncherProfiles {
    profiles: HashMap<String, Profile>,
}

#[tauri::command]
pub fn get_profiles(state: tauri::State<LauncherState>) -> &Mutex<LauncherProfiles> {
    &state.inner().profiles
}

#[tauri::command]
pub fn create_profile(
    id: String,
    icon: String,
    name: String,
    version_id: String,
    save_dir: String,
    jvm_args: String,
    modloader: String,
    state: tauri::State<LauncherState>,
) {
    state.inner().profiles.lock().unwrap().profiles.insert(
        id,
        Profile {
            name,
            icon,
            version_id,
            // last_used: SystemTime::now().,
            total_play_time: 0,
            jvm_args,
            save_dir,
            modloader,
        },
    );
}

pub fn update_profile(
    profile: Profile,
    state: tauri::State<LauncherProfiles>,
) {
    let profs = &state.inner().profiles;
    // let old = &state.inner().profiles.get(&id);

    // if let Some(oldprofile) = old {
    //     &state.inner().profiles.insert(
    //         id,
    //         Profile {
    //             name: String::from(""),
    //             version_id: String::from(""),
    //             total_play_time: 0,
    //             jvm_args: String::from(""),
    //             save_dir: String::from(""),
    //             modloader: String::from(""),
    //         },
    //     );
    // }
}

#[tauri::command]
pub fn delete_profile(id: String, state: tauri::State<LauncherState>) {
    state.inner().profiles.lock().unwrap().profiles.remove(&id);
}

pub fn load_profiles() -> LauncherProfiles {
    let profiles_path = get_launcher_path().join("launcher_profiles.json");

    let mut profiles: LauncherProfiles = LauncherProfiles {
        profiles: HashMap::new(),
    };

    if profiles_path.exists() {
        let data_profiles =
            std::fs::read_to_string(profiles_path).expect("Could not read launcher profiles file");
        profiles = serde_json::from_str(&data_profiles).unwrap();
    } else {
        serde_json::to_writer_pretty(
            &File::create(profiles_path).expect("Could not create launcher profiles file"),
            &profiles,
        )
        .expect("Could not save profiles");
    }

    profiles
}
