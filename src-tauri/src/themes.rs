use std::collections::{hash_map::Keys, HashMap};

use serde::{Deserialize, Serialize};

use crate::get_launcher_path;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct LauncherThemes {
    themes: HashMap<String, HashMap<String, String>>,
}

impl LauncherThemes {
    pub fn get_themes(&self) -> Keys<'_, String, HashMap<String, String>> {
        self.themes.keys()
    }
}

pub fn default_dark_theme() -> HashMap<String, String> {
    let mut theme: HashMap<String, String> = HashMap::new();

    theme.insert("mainmenu.background".to_string(), "#262626".to_string());
    theme.insert("mainmenu.tab.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert(
        "mainmenu.tab.background.hover".to_string(),
        "#3d3d3d".to_string(),
    );
    theme.insert(
        "mainmenu.tab.background.active".to_string(),
        "#383838".to_string(),
    );
    theme.insert(
        "mainmenu.tab.active.marker".to_string(),
        "#FFFFFF".to_string(),
    );
    theme.insert("mainmenu.tab.focus".to_string(), "#FFFFFF".to_string());
    theme.insert("submenu.background".to_string(), "#262626".to_string());
    theme.insert(
        "submenu.header.foreground".to_string(),
        "#FFFFFF".to_string(),
    );
    theme.insert("submenu.tab.foreground".to_string(), "#e3e3e3".to_string());
    theme.insert(
        "submenu.tab.foreground.hover".to_string(),
        "#c9c9c9".to_string(),
    );
    theme.insert(
        "submenu.tab.foreground.active".to_string(),
        "#FFFFFF".to_string(),
    );
    theme.insert(
        "submenu.tab.active.marker".to_string(),
        "#008542".to_string(),
    );
    theme.insert("page.background".to_string(), "#323232".to_string());
    theme.insert("page.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert("page.horizontal.line".to_string(), "#494949".to_string());
    theme.insert(
        "patchnotecard.background".to_string(),
        "#0F0F0F".to_string(),
    );
    theme.insert(
        "patchnotecard.background.hover".to_string(),
        "#262626".to_string(),
    );
    theme.insert(
        "patchnotecard.background.active".to_string(),
        "#131313".to_string(),
    );
    theme.insert("patchnotecard.title".to_string(), "#FFFFFF".to_string());
    theme.insert("patchnote.h1.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert("patchnote.h2.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert("patchnote.h3.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert("patchnote.h4.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert("patchnote.h5.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert("patchnote.p.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert("patchnote.li.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert("patchnote.a.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert(
        "loadingspinner.background".to_string(),
        "#FFFFFF".to_string(),
    );
    theme.insert("play.banner.shadow".to_string(), "#000000".to_string());
    theme.insert("playbutton.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert(
        "playbutton.foreground.disabled".to_string(),
        "#AAA".to_string(),
    );
    theme.insert("playbutton.border".to_string(), "#000000".to_string());
    theme.insert(
        "playbutton.border.active".to_string(),
        "#FFFFFF".to_string(),
    );
    theme.insert("playbutton.top".to_string(), "#27CE40".to_string());
    theme.insert("playbutton.top.active".to_string(), "#064D2A".to_string());
    theme.insert("playbutton.top.disabled".to_string(), "#1B902D".to_string());
    theme.insert("playbutton.side".to_string(), "#0C6E3D".to_string());
    theme.insert("playbutton.bottom".to_string(), "#064D2A".to_string());
    theme.insert(
        "playbutton.bottom.active".to_string(),
        "#0AA618".to_string(),
    );
    theme.insert(
        "playbutton.bottom.disabled".to_string(),
        "#04361D".to_string(),
    );
    theme.insert("playbutton.gradient.top".to_string(), "#009147".to_string());
    theme.insert(
        "playbutton.gradient.top.hover".to_string(),
        "#0A8F4C".to_string(),
    );
    theme.insert(
        "playbutton.gradient.top.active".to_string(),
        "#008542".to_string(),
    );
    theme.insert(
        "playbutton.gradient.top.focus".to_string(),
        "#0A9B51".to_string(),
    );
    theme.insert(
        "playbutton.gradient.top.disabled".to_string(),
        "#006532".to_string(),
    );
    theme.insert(
        "playbutton.gradient.bottom".to_string(),
        "#008542".to_string(),
    );
    theme.insert(
        "playbutton.gradient.bottom.hover".to_string(),
        "#0A9B51".to_string(),
    );
    theme.insert(
        "playbutton.gradient.bottom.active".to_string(),
        "#009147".to_string(),
    );
    theme.insert(
        "playbutton.gradient.bottom.focus".to_string(),
        "#0A8F4C".to_string(),
    );
    theme.insert(
        "playbutton.gradient.bottom.disabled".to_string(),
        "#005D2E".to_string(),
    );
    theme.insert("checkbox.background.on".to_string(), "#008542".to_string());
    theme.insert(
        "checkbox.background.hover.on".to_string(),
        "#0DD166".to_string(),
    );
    theme.insert("modal.background".to_string(), "#303030".to_string());
    theme.insert("modal.title.foreground".to_string(), "#FFFFFF".to_string());
    theme.insert("modal.horizontal.line".to_string(), "#373737".to_string());
    theme.insert("scrollbar.background".to_string(), "#262626".to_string());
    theme.insert(
        "scrollbar.thumb.background".to_string(),
        "#4d4d4d".to_string(),
    );
    theme.insert(
        "scrollbar.thumb.background.hover".to_string(),
        "#595959".to_string(),
    );
    theme.insert("textbox.background".to_string(), "#131313".to_string());
    theme.insert(
        "textbox.background.hover".to_string(),
        "#0e0e0e".to_string(),
    );

    theme
}

pub fn default_light_theme() -> HashMap<String, String> {
    let mut theme: HashMap<String, String> = HashMap::new();

    theme.insert("mainmenu.background".to_string(), "#dddddd".to_string());
    theme.insert("mainmenu.tab.background.hover".to_string(), "#868686".to_string());
    theme.insert("mainmenu.tab.background.active".to_string(), "#727272".to_string());
    theme.insert("mainmenu.tab.foreground".to_string(), "#000000".to_string());
    theme.insert(
        "mainmenu.tab.active.marker".to_string(),
        "#000000".to_string(),
    );
    theme.insert("mainmenu.tab.focus".to_string(), "#000000".to_string());
    theme.insert("submenu.background".to_string(), "#DDDDDD".to_string());
    theme.insert(
        "submenu.header.foreground".to_string(),
        "#000000".to_string(),
    );
    theme.insert("submenu.tab.foreground".to_string(), "#000000".to_string());
    theme.insert("submenu.tab.foreground.hover".to_string(), "#555555".to_string());
    theme.insert("submenu.tab.foreground.active".to_string(), "#333333".to_string());
    theme.insert("submenu.tab.active.marker".to_string(), "#0e44b9".to_string());
    theme.insert("page.background".to_string(), "#20979b".to_string());
    theme.insert("page.foreground".to_string(), "#000000".to_string());
    theme.insert("page.horizontal.line".to_string(), "#ca1414".to_string());
    theme.insert("patchnotecard.background".to_string(), "#8b2929".to_string());
    theme.insert("patchnotecard.background.hover".to_string(), "#6d2121".to_string());
    theme.insert("patchnotecard.background.active".to_string(), "#581b1b".to_string());
    theme.insert("patchnotecard.title".to_string(), "#17d417".to_string());
    theme.insert(
        "loadingspinner.background".to_string(),
        "#581658".to_string(),
    );
    theme.insert("play.banner.shadow".to_string(), "#3a3a3a".to_string());
    theme.insert("playbutton.foreground".to_string(), "#ffffff".to_string());
    theme.insert(
        "playbutton.foreground.disabled".to_string(),
        "#AAA".to_string(),
    );
    theme.insert("playbutton.border".to_string(), "#000000".to_string());
    theme.insert(
        "playbutton.border.active".to_string(),
        "#FFFFFF".to_string(),
    );
    theme.insert("playbutton.top".to_string(), "#1691e4".to_string());
    theme.insert("playbutton.top.active".to_string(), "#064D2A".to_string());
    theme.insert("playbutton.top.disabled".to_string(), "#1B902D".to_string());
    theme.insert("playbutton.side".to_string(), "#154dc5".to_string());
    theme.insert("playbutton.bottom".to_string(), "#092e7e".to_string());
    theme.insert("playbutton.bottom.active".to_string(), "#0AA618".to_string());
    theme.insert("playbutton.bottom.disabled".to_string(), "#04361D".to_string());
    theme.insert("playbutton.gradient.top".to_string(), "#0f48c4".to_string());
    theme.insert("playbutton.gradient.top.hover".to_string(), "#124bc7".to_string());
    theme.insert("playbutton.gradient.top.active".to_string(), "#852a00".to_string());
    theme.insert("playbutton.gradient.top.focus".to_string(), "#0e3c9e".to_string());
    theme.insert("playbutton.gradient.top.disabled".to_string(), "#273f74".to_string());
    theme.insert("playbutton.gradient.bottom".to_string(), "#0e3997".to_string());
    theme.insert("playbutton.gradient.bottom.hover".to_string(), "#1144b3".to_string());
    theme.insert("playbutton.gradient.bottom.active".to_string(), "#009147".to_string());
    theme.insert("playbutton.gradient.bottom.focus".to_string(), "#0a2f7e".to_string());
    theme.insert("playbutton.gradient.bottom.disabled".to_string(), "#1d2d52".to_string());
    theme.insert("checkbox.background.on".to_string(), "#1928ac".to_string());
    theme.insert("checkbox.background.hover.on".to_string(), "#5811a8".to_string());
    theme.insert("modal.background".to_string(), "#2f0a52".to_string());
    theme.insert("modal.title.foreground".to_string(), "#15a355".to_string());
    theme.insert("modal.horizontal.line".to_string(), "#113f94".to_string());
    theme.insert("scrollbar.background".to_string(), "#9c1313".to_string());
    theme.insert("scrollbar.thumb.background".to_string(), "#131585".to_string());
    theme.insert("scrollbar.thumb.background.hover".to_string(), "#5e0d53".to_string(),);
    theme.insert("textbox.background".to_string(), "#8a2222".to_string());
    theme.insert("textbox.background.hover".to_string(), "#08208a".to_string());
    theme.insert("patchnote.h1.foreground".to_string(), "#FFFF00".to_string());
    theme.insert("patchnote.h2.foreground".to_string(), "#FFFF00".to_string());
    theme.insert("patchnote.h3.foreground".to_string(), "#FFFF00".to_string());
    theme.insert("patchnote.h4.foreground".to_string(), "#FFFF00".to_string());
    theme.insert("patchnote.h5.foreground".to_string(), "#FFFF00".to_string());
    theme.insert("patchnote.p.foreground".to_string(), "#FFFF00".to_string());
    theme.insert("patchnote.li.foreground".to_string(), "#FFFF00".to_string());
    theme.insert("patchnote.a.foreground".to_string(), "#FFFF00".to_string());

    theme
}

pub fn load_themes() -> LauncherThemes {
    let file_path = get_launcher_path().join("launcher_themes.json");

    let mut themes: HashMap<String, HashMap<String, String>> = HashMap::new();

    themes.insert("dark".to_string(), default_dark_theme());
    themes.insert("light".to_string(), default_light_theme());

    if file_path.exists() {
    } else {
        // serde_json::to_writer_pretty(&File::create(&file_path).expect("Could not create launcher themes file"), &settings).expect("Could not save themes");
    }

    LauncherThemes { themes }
}
