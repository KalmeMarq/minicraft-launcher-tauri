import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import "./index.scss";
import cancelIcon from "@frontend/assets/images/cancel.png";
import { invoke } from "@tauri-apps/api";
import DOMPurify from "dompurify";
import { SettingsContext } from "@frontend/context/SettingsContext";

export interface LauncherPatchNote {
  id: string;
  date: string;
  version: string;
  body: string;
}

const WhatsNewDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [patchNotes, setPatchNotes] = useState<LauncherPatchNote[]>([]);
  const { animatePages } = useContext(SettingsContext);

  useEffect(() => {
    if (patchNotes.length === 0) {
      invoke("get_launcher_patch_notes").then((d) => {
        setPatchNotes((d as { entries: LauncherPatchNote[] }).entries);
      });
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      className={`dialog-modal ${animatePages ? "anim" : ""} lnews-modal`}
      overlayClassName="Overlay"
      shouldReturnFocusAfterClose={false}
      onRequestClose={onClose}
    >
      <header>
        <h2>What's new in the Launcher?</h2>
        <button className="close-btn" onClick={() => onClose()}>
          <img src={cancelIcon} className="close-icon" alt="close" />
        </button>
      </header>
      <main>
        <div className="lnews-container">
          {patchNotes.map((pn, i) => (
            <div
              key={pn.id}
              className={"lnews-note" + (i === 0 ? " lastest" : "")}
            >
              <div className="lnews-note-cont">
                <h2>{pn.date}</h2>
                <span className="lnews-version">version {pn.version}</span>
                <br />
                <div
                  className="lnews-note-body"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(pn.body),
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Modal>
  );
};

export default WhatsNewDialog;
