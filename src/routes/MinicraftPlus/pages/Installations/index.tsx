import LoadingSpinner from "@frontend/components/LoadingSpinner";
import { SettingsContext } from "@frontend/context/SettingsContext";
import { T, useTranslation } from "@frontend/context/TranslationContext";
import { SearchInput } from "@frontend/routes/Community";
import { Checkbox } from "@frontend/routes/Settings/pages/General";
import { useContext, useState } from "react";
import sword from "@frontend/assets/images/installation_icons/wood_sword.png";
import "./index.scss";

export interface Profile {
  id: string;
  name: string;
  version_id: string;
}

const Installations = () => {
  const [showReleases, setShowReleases] = useState(true);
  const [showDev, setShowDev] = useState(true);

  const { animatePages } = useContext(SettingsContext);
  const { t } = useTranslation();

  return (
    <div className={`sub-page ${animatePages ? "anim" : ""}`}>
      <div className="install-container-wrapper">
        <div className="filter-container">
          <div className="input-container">
            <p>
              <T>Search</T>
            </p>
            <SearchInput placeholder={t("Installation name")} />
          </div>
          <div className="input-gap"></div>
          <div className="input-container">
            <p>
              <T>Versions</T>
            </p>
            <div className="checkbox-wrapper">
              <Checkbox
                value={showReleases}
                propKey=""
                onChange={(v) => setShowReleases(v)}
              >
                <T>Releases</T>
              </Checkbox>
              <Checkbox
                value={showDev}
                propKey=""
                onChange={(v) => setShowDev(v)}
              >
                <T>Development</T>
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
      <div className="line-h"></div>
      {/* <LoadingSpinner /> */}
      <div className="installation-list">
        <img src={sword} alt="" />
      </div>
    </div>
  );
};

export default Installations;
