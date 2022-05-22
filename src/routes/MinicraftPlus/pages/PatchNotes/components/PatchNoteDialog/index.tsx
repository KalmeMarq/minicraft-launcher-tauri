import { PatchNote } from "@frontend/routes/MinicraftPlus/pages/PatchNotes";
import Modal from "react-modal";
import "./index.scss";
import cancelIcon from "@frontend/assets/images/cancel.png";
import DOMPurify from "dompurify";
import { useContext } from "react";
import { SettingsContext } from "@frontend/context/SettingsContext";

const PatchNoteDialog: React.FC<{
  patch: PatchNote;
  isOpen: boolean;
  onClose: () => void;
}> = ({ patch, isOpen, onClose }) => {
  const { animatePages } = useContext(SettingsContext);

  return (
    <Modal
      isOpen={isOpen}
      className={`dialog-modal ${animatePages ? "anim" : ""} patch-modal`}
      overlayClassName="Overlay"
      shouldReturnFocusAfterClose={false}
      onRequestClose={onClose}
    >
      <header>
        <h2>
          Patch notes {patch.title} ({patch.version})
        </h2>
        <button className="close-btn" onClick={() => onClose()}>
          <img src={cancelIcon} className="close-icon" alt="close" />
        </button>
      </header>
      <main>
        <div
          className="container"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(patch.body),
          }}
        ></div>
      </main>
    </Modal>
  );
};

export default PatchNoteDialog;
