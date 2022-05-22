import MainMenu from "@frontend/components/MainMenu";
import MainMenuTab, {
  MainMenuTabButton,
} from "@frontend/components/MainMenu/components/MainMenuTab";
import Community from "@frontend/routes/Community";
import Minicraft from "@frontend/routes/Minicraft";
import MinicraftPlus from "@frontend/routes/MinicraftPlus";
import Settings from "@frontend/routes/Settings";
import miniIcon from "@frontend/assets/images/icons/minicraft_icon.png";
import miniplusIcon from "@frontend/assets/images/icons/minicraftplus_icon.png";
import settingsIcon from "@frontend/assets/images/icons/settings_icon.png";
import lnewsIcon from "@frontend/assets/images/icons/lnew_icon.png";
import comIcon from "@frontend/assets/images/icons/store_icon.png";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import WhatsNewDialog from "@frontend/components/WhatsNewDialog";

function App() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <div className="app">
        <WhatsNewDialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
        />
        <Router>
          <MainMenu>
            <MainMenuTab
              to="/minicraftplus"
              tooltip="Minicraft Plus"
              icon={miniplusIcon}
            >
              <i>Minicraft</i>
              <span>Plus</span>
            </MainMenuTab>
            <MainMenuTab to="/minicraft" tooltip="Minicraft" icon={miniIcon}>
              Minicraft
            </MainMenuTab>
            <MainMenuTab to="/community" tooltip="Community" icon={comIcon}>
              Community
            </MainMenuTab>
            <div className="filler"></div>
            <MainMenuTabButton
              onClick={() => {
                setShowDialog(true);
              }}
              tooltip="What's New"
              icon={lnewsIcon}
            >
              What's New
            </MainMenuTabButton>
            <MainMenuTab to="/settings" tooltip="Settings" icon={settingsIcon}>
              Settings
            </MainMenuTab>
          </MainMenu>
          <div className="routes">
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/minicraftplus" replace />}
              ></Route>
              <Route path="/minicraftplus/*" element={<MinicraftPlus />} />
              <Route path="/minicraft/*" element={<Minicraft />} />
              <Route path="/community/*" element={<Community />} />
              <Route path="/settings/*" element={<Settings />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
