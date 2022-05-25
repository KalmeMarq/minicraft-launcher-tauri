import LoadingSpinner from "@frontend/components/LoadingSpinner";
import { SettingsContext } from "@frontend/context/SettingsContext";
import { SearchInput } from "@frontend/routes/Community";
import { Checkbox } from "@frontend/routes/Settings/pages/General";
import { useContext } from "react";
import "./index.scss";

const Installations = () => {
  const { animatePages } = useContext(SettingsContext);

  return (
    <div className={`sub-page ${animatePages ? "anim" : ""}`}>
      <div className="install-container-wrapper">
        <div className="filter-container">
          <div className="input-container">
            <p>Search</p>
            <SearchInput placeholder="Installation name" />
          </div>
          <div className="input-gap"></div>
          <div className="input-container">
            <p>Versions</p>
            <div className="checkbox-wrapper">
              <Checkbox value={true} propKey="">
                Releases
              </Checkbox>
              <Checkbox value={true} propKey="">
                Development
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
      <div className="line-h"></div>
      <LoadingSpinner />
    </div>
  );
};

export default Installations;
