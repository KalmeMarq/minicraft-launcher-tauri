import Modal from "react-modal";
import cancelIcon from "@frontend/assets/images/cancel.png";
import licenses from "@frontend/assets/thirdparty_licenses.json";
import "./index.scss";
import { useContext } from "react";
import { SettingsContext } from "@frontend/context/SettingsContext";

const LicenseDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { animatePages } = useContext(SettingsContext);

  return (
    <Modal
      isOpen={isOpen}
      className={`dialog-modal ${animatePages ? "anim" : ""} tp-modal`}
      overlayClassName="Overlay"
      shouldReturnFocusAfterClose={false}
      onRequestClose={onClose}
    >
      <header>
        <h2>Third-party licenses</h2>
        <button className="close-btn" onClick={() => onClose()}>
          <img src={cancelIcon} className="close-icon" alt="close" />
        </button>
      </header>
      <main>
        <div className="container">
          {licenses.licenses.map((lc) => (
            <div className="tplicense">
              <p className="name">
                <a href={lc.url} rel="noopener" target="_blank">
                  {lc.name}
                </a>
              </p>
              <span className="license-version">{lc.version}</span>
              <p className="license">{lc.licenses}</p>
              {lc.license_content.length > 0 && (
                <div className="license-content">{lc.license_content}</div>
              )}
            </div>
          ))}
        </div>
      </main>
    </Modal>
  );
};

export default LicenseDialog;
