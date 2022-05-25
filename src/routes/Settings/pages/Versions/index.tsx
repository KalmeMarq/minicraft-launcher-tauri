import BorderedButton from "@frontend/components/BorderedButton";
import LoadingSpinner from "@frontend/components/LoadingSpinner";
import { invoke } from "@tauri-apps/api";
import React, { useState, useEffect, useContext } from "react";
import folderIcon from "@frontend/assets/images/folder.png";
import filesize from "filesize";
import "./index.scss";
import { SettingsContext } from "@frontend/context/SettingsContext";

export interface Version {
  id: string;
  url: string;
  size: number;
}

const Versions = () => {
  const [versions, setVersions] = useState<Version[]>([]);

  useEffect(() => {
    invoke("get_local_version_list").then((d) => {
      setVersions(d as Version[]);
      console.log(d);
    });
  }, []);

  const { animatePages } = useContext(SettingsContext);

  return (
    <div className={`sub-page ${animatePages ? "anim" : ""}`}>
      <div className="version-list">
        {versions.map((version, i) => (
          <React.Fragment key={version.id}>
            {i !== 0 && <div className="divider"></div>}
            <div className="version-item">
              <button className="version-btn">
                <div className="version-info">
                  <p>{version.id}</p>
                  <span>{filesize(version.size)}</span>
                </div>
                <div className="version-tools">
                  <BorderedButton
                    icon={folderIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      // window.ipcRenderer.send('ipc:openInstalledVersion', version.id);
                    }}
                  />
                  <BorderedButton
                    text="Delete"
                    type="normal"
                    onClick={(e) => {
                      e.stopPropagation();
                      // window.ipcRenderer.send('ipc:deleteInstalledVersion', version.id);
                      setVersions((vers) =>
                        vers.filter((v) => v.id !== version.id)
                      );
                    }}
                  />
                </div>
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Versions;
