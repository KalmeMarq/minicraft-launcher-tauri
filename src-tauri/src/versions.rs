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
