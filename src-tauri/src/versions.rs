use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Version {
    id: String,
    url: String,
    size: u32
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Versions {
    pub versions: Vec<Version>
}
