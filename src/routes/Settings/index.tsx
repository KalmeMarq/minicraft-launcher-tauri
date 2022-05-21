import SubMenu from "@frontend/components/SubMenu";
import About from "@frontend/routes/Settings/pages/About";
import General from "@frontend/routes/Settings/pages/General";
import Versions from "@frontend/routes/Settings/pages/Versions";
import { Routes, Route, Navigate } from "react-router-dom";

const Settings = () => {
  return (
    <div className="base-route">
      <SubMenu>
        <SubMenu.Title text="Settings" />
        <SubMenu.Navbar>
          <SubMenu.Link to="/settings/general" text="General" />
          <SubMenu.Link to="/settings/versions" text="Versions" />
          <SubMenu.Link to="/settings/about" text="About" />
        </SubMenu.Navbar>
      </SubMenu>
      <Routes>
        <Route path="/" element={<Navigate to="/settings/general" replace />} />
        <Route path="/general" element={<General />} />
        <Route path="/versions" element={<Versions />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default Settings;
