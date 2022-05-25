import LoadingSpinner from "@frontend/components/LoadingSpinner";
import { SettingsContext } from "@frontend/context/SettingsContext";
import { SearchInput } from "@frontend/routes/Community";
import { useContext } from "react";

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
        </div>
      </div>
      <div className="line-h"></div>
      <LoadingSpinner />
    </div>
  );
};

export default Installations;
