import LoadingSpinner from "@frontend/components/LoadingSpinner";
import { SettingsContext } from "@frontend/context/SettingsContext";
import { T } from "@frontend/context/TranslationContext";
import { useContext, useState } from "react";
import checkmark from "../../../../assets/images/optionmark.png";
import "./index.scss";

export const Checkbox: React.FC<{
  children?: React.ReactNode;
  value: boolean;
  propKey: string;
  onChange?: (value: boolean, propKey: string) => void;
}> = ({ value, propKey, children, onChange }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.checked, propKey);
  };

  return (
    <div className="checkbox">
      <label>
        <div className="check-box">
          <input
            type="checkbox"
            checked={value}
            onChange={handleCheckboxChange}
          />
          <div className="check-fake">
            <img src={checkmark} alt="" className="check" />
          </div>
        </div>
        <span>{children}</span>
      </label>
    </div>
  );
};

const General = () => {
  const {
    showCommunityTab,
    keepLauncherOpen,
    animatePages,
    openOutputLog,
    language,
    disableHardwareAcceleration,
    setOption,
  } = useContext(SettingsContext);

  return (
    <div className={`sub-page ${animatePages ? "anim" : ""} general-page`}>
      <h3>
        <T>Language</T>
      </h3>
      <select
        onChange={(e) => {
          setOption("language", e.currentTarget.value);
        }}
        onSelectCapture={() => {
          console.log("bruh");
        }}
      >
        <option selected={language === "en-US"} value="en-US">
          en-US
        </option>
        <option selected={language === "pt-PT"} value="pt-PT">
          pt-PT
        </option>
      </select>
      <h3>
        <T>Launcher Settings</T>
      </h3>
      <Checkbox
        value={keepLauncherOpen}
        propKey="keep_launcher_open"
        onChange={(v, k) => {
          setOption(k, v);
        }}
      >
        <T>Keep the Launcher open while games are running</T>
      </Checkbox>

      <Checkbox
        value={animatePages}
        propKey="animate_pages"
        onChange={(v, k) => {
          setOption(k, v);
        }}
      >
        <T>Animate transitions between pages in the Launcher</T>
      </Checkbox>
      <Checkbox
        value={disableHardwareAcceleration}
        propKey="disable_hardware_a cceleration"
        onChange={(v, k) => {
          setOption(k, v);
        }}
      >
        <T>Disable hardware acceleration (requires restarting the Launcher)</T>
      </Checkbox>
      <Checkbox
        value={showCommunityTab}
        propKey="show_community_tab"
        onChange={(v, k) => {
          setOption(k, v);
        }}
      >
        <T>Show community tab</T>
      </Checkbox>
      <h3>
        <T>Minicraft Settings</T>
      </h3>
      <Checkbox
        value={openOutputLog}
        propKey="open_output_log"
        onChange={(v, k) => {
          setOption(k, v);
        }}
      >
        <T>Open output log when Minicraft starts</T>
      </Checkbox>
    </div>
  );
};

export default General;
