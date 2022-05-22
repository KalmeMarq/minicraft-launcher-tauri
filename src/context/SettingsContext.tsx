import { invoke } from "@tauri-apps/api/tauri";
import { createContext, useEffect, useState } from "react";

export interface Options {
  keepLauncherOpen: boolean;
  showCommunityTab: boolean;
  language: string;
  theme: string;
  openOutputLog: boolean;
  animatePages: boolean;
  disableHardwareAcceleration: boolean;
}

export const SettingsContext = createContext({
  keepLauncherOpen: true,
  language: "en-US",
  theme: "dark",
  showCommunityTab: true,
  openOutputLog: false,
  animatePages: false,
  disableHardwareAcceleration: false,
  setOption: (key: string, value: unknown) => {},
});

export const SettingsProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [showCommunityTab, setShowCommunityTab] = useState(true);
  const [keepLauncherOpen, setKeepLauncherOpen] = useState(true);
  const [openOutputLog, setOpenOutputLog] = useState(false);
  const [animatePages, setAnimatePages] = useState(false);
  const [disableHardwareAcceleration, setDisableHardwareAcceleration] =
    useState(false);
  const [language, setLanguage] = useState("en-US");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    invoke("get_setting", { option: "show_community_tab" }).then((d) => {
      setShowCommunityTab(d === "true" ? true : false);
    });
    invoke("get_setting", { option: "keep_launcher_open" }).then((d) => {
      setKeepLauncherOpen(d === "true" ? true : false);
    });
    invoke("get_setting", { option: "open_output_log" }).then((d) => {
      setOpenOutputLog(d === "true" ? true : false);
    });
    invoke("get_setting", { option: "animate_pages" }).then((d) => {
      setAnimatePages(d === "true" ? true : false);
    });
    invoke("get_setting", { option: "disable_hardware_acceleration" }).then(
      (d) => {
        setDisableHardwareAcceleration(d === "true" ? true : false);
      }
    );
    invoke("get_setting", { option: "language" }).then((d) => {
      setLanguage(d as string);
    });
    invoke("get_setting", { option: "theme" }).then((d) => {
      setTheme(d as string);
    });
  }, []);

  const setOption = (key: string, value: unknown) => {
    switch (key) {
      case "show_community_tab":
        setShowCommunityTab(value as boolean);
        console.log("show_community_tab: " + value);
        break;
      case "keep_launcher_open":
        setKeepLauncherOpen(value as boolean);
        console.log("keep_launcher_open: " + value);
        break;
      case "open_output_log":
        setOpenOutputLog(value as boolean);
        console.log("open_output_log: " + value);
        break;
      case "animate_pages":
        setAnimatePages(value as boolean);
        console.log("animate_pages: " + value);
        break;
      case "language":
        if (["en-US", "pt-PT", "pt-BR"].includes(value as string)) {
          setLanguage(value as string);
        }
        break;
      case "disabled_hardware_acceleration":
        setDisableHardwareAcceleration(value as boolean);
        break;
    }

    invoke("set_setting", { option: `${key}:${value}` });
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        showCommunityTab,
        keepLauncherOpen,
        language,
        openOutputLog,
        animatePages,
        disableHardwareAcceleration,
        setOption,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
