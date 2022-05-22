import LoadingSpinner from "@frontend/components/LoadingSpinner";
import { SettingsContext } from "@frontend/context/SettingsContext";
import { useContext, useState } from "react";
import checkmark from "../../../../assets/images/optionmark.png";
import "./index.scss";

export const Checkbox: React.FC<{
  children?: React.ReactNode;
  value: boolean;
  propKey: string;
  onChange?: (value: boolean, propKey: string) => void;
}> = ({ value, propKey, children, onChange }) => {
  const [checked, setChecked] = useState(value);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (onChange) onChange(e.target.checked, propKey);
  };

  return (
    <div className="checkbox">
      <label>
        <div className="check-box">
          <input
            type="checkbox"
            checked={checked}
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
    disableHardwareAcceleration,
    setOption,
  } = useContext(SettingsContext);
  return (
    <div className="sub-page general-page">
      <h3>Launcher Settings</h3>
      <Checkbox
        value={keepLauncherOpen}
        propKey="keep_launcher_open"
        onChange={(v, k) => {
          setOption(k, v);
        }}
      >
        Keep the Launcher open while games are running
      </Checkbox>

      <Checkbox
        value={animatePages}
        propKey="animate_pages"
        onChange={(v, k) => {
          setOption(k, v);
        }}
      >
        Animate transitions between pages in the Launcher
      </Checkbox>
      <Checkbox
        value={disableHardwareAcceleration}
        propKey="disable_hardware_a cceleration"
        onChange={(v, k) => {
          setOption(k, v);
        }}
      >
        Disable hardware acceleration (requires restarting the Launcher)
      </Checkbox>
      <Checkbox
        value={showCommunityTab}
        propKey="show_community_tab"
        onChange={(v, k) => {
          setOption(k, v);
        }}
      >
        Show community tab
      </Checkbox>
      <h3>Minicraft Settings</h3>
      <Checkbox
        value={openOutputLog}
        propKey="open_output_log"
        onChange={(v, k) => {
          setOption(k, v);
        }}
      >
        Open output log when Minicraft starts
      </Checkbox>
    </div>
  );
};

export default General;
