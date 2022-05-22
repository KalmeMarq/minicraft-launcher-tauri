import LoadingSpinner from "@frontend/components/LoadingSpinner";
import { SettingsContext } from "@frontend/context/SettingsContext";
import { useContext } from "react";

const Community = () => {
  const { animatePages } = useContext(SettingsContext);

  return (
    <div className={`base-route ${animatePages ? "anim" : ""}`}>
      <LoadingSpinner />
    </div>
  );
};

export default Community;
