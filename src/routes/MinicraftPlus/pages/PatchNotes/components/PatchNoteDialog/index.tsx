import { PatchNote } from "@frontend/routes/MinicraftPlus/pages/PatchNotes";
import Modal from "react-modal";
import "./index.scss";
import cancelIcon from "@frontend/assets/images/cancel.png";
import DOMPurify from "dompurify";

const PatchNoteDialog: React.FC<{
  patch: PatchNote;
  isOpen: boolean;
  onClose: () => void;
}> = ({ patch, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      className="dialog-modal patch-modal"
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
