import { ReactNode, useContext, useState } from "react";
import miniIcon from "@frontend/assets/images/icons/minicraft_icon.png";
import miniplusIcon from "@frontend/assets/images/icons/minicraftplus_icon.png";
import settingsIcon from "@frontend/assets/images/icons/settings_icon.png";
import lnewsIcon from "@frontend/assets/images/icons/lnew_icon.png";
import comIcon from "@frontend/assets/images/icons/store_icon.png";
import MainMenuTab, {
  MainMenuTabButton,
} from "@frontend/components/MainMenu/components/MainMenuTab";
import "./index.scss";
import { SettingsContext } from "@frontend/context/SettingsContext";
import WhatsNewDialog from "@frontend/components/WhatsNewDialog";
import { T, useTranslation } from "@frontend/context/TranslationContext";

const MainMenu: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [showDialog, setShowDialog] = useState(false);

  const { showCommunityTab } = useContext(SettingsContext);
  const { t } = useTranslation();

  return (
    <>
      <WhatsNewDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
      <div className="main-menu">
        <MainMenuTab
          to="/minicraftplus"
          tooltip={"Minicraft Plus"}
          icon={miniplusIcon}
        >
          <i>Minicraft</i>
          <span>Plus</span>
        </MainMenuTab>
        <MainMenuTab to="/minicraft" tooltip="Minicraft" icon={miniIcon}>
          Minicraft
        </MainMenuTab>
        {showCommunityTab && (
          <MainMenuTab to="/community" tooltip={t("Community")} icon={comIcon}>
            <T>Community</T>
          </MainMenuTab>
        )}
        <div className="filler"></div>
        <MainMenuTabButton
          onClick={() => {
            setShowDialog(true);
          }}
          tooltip={t("What's New")}
          icon={lnewsIcon}
        >
          <T>What's New</T>
        </MainMenuTabButton>
        <MainMenuTab to="/settings" tooltip={t("Settings")} icon={settingsIcon}>
          <T>Settings</T>
        </MainMenuTab>
      </div>
    </>
  );
};

export default MainMenu;
