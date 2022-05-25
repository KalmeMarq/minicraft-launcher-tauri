import LoadingSpinner from "@frontend/components/LoadingSpinner";
import { SettingsContext } from "@frontend/context/SettingsContext";
import { useContext } from "react";

const Play = () => {
  const { animatePages } = useContext(SettingsContext);

  return (
    <div className={`sub-page ${animatePages ? "anim" : ""}`}>
      <LoadingSpinner />
    </div>
  );
};

export default Play;
