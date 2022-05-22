import BorderedButton from "@frontend/components/BorderedButton";
import LicenseDialog from "@frontend/components/LicenseDialog";
import LoadingSpinner from "@frontend/components/LoadingSpinner";
import WhatsNewDialog, {
  LauncherPatchNote,
} from "@frontend/components/WhatsNewDialog";
import { app, invoke } from "@tauri-apps/api";
import { lazy, useEffect, useState } from "react";
import "./index.scss";

const About = () => {
  const [version, setVersion] = useState("0.0.0");
  const [date, setDate] = useState("0000-00-00");
  const [showNewsDialog, setShowNewsDialog] = useState(false);
  const [showLicenseDialog, setShowLicenseDialog] = useState(false);

  useEffect(() => {
    app.getVersion().then((v) => setVersion(v));
    invoke("get_launcher_patch_notes").then((d) => {
      setDate((d as { entries: LauncherPatchNote[] }).entries[0].date);
    });
  }, []);

  return (
    <div className="sub-page">
      <WhatsNewDialog
        isOpen={showNewsDialog}
        onClose={() => setShowNewsDialog(false)}
      />
      <LicenseDialog
        isOpen={showLicenseDialog}
        onClose={() => setShowLicenseDialog(false)}
      />
      <div className="about-cont">
        <div className="about-section">
          <h3>Launcher</h3>
          <p>{version}</p>
          <p>
            {/* {launcher.length > 0 &&
              (() => {
                let d = dayjs(launcher[0].date).locale(codes[code]).format('LLLL');
                d = d.substring(0, d.lastIndexOf(' '));
                d = d.substring(0, d.lastIndexOf(' '));
                d = d[0].toUpperCase() + d.substring(1);
                return d;
              })()} */}
            {date}
          </p>
          <BorderedButton
            text="What's new?"
            className="whatsnew-btn"
            type="normal"
            onClick={() => {
              setShowNewsDialog(true);
            }}
          />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/KalmeMarq/minicraft-launcher-tauri/issues"
          >
            Report a Launcher bug
          </a>
        </div>
        <div className="divider"></div>
        <div className="about-section">
          <h3>Credits and Third-party licenses</h3>
          <p>Made by KalmeMarq</p>
          <br />
          <BorderedButton
            text="Third-party licenses"
            className="thirdparty-btn"
            type="normal"
            onClick={() => {
              setShowLicenseDialog(true);
            }}
          />
        </div>
        <div className="divider"></div>
        <div className="about-section links-section">
          <h3>Links</h3>
          <a
            href="https://discord.gg/SMKCVuj"
            target="_blank"
            rel="noopener noreferrer"
          >
            Minicraft+ Discord
          </a>
          <a
            href="https://playminicraft.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Play Minicraft
          </a>
          <a
            href="https://minicraft.fandom.com/wiki/Minicraft%2B"
            target="_blank"
            rel="noopener noreferrer"
          >
            Minicraft+ Wiki
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
