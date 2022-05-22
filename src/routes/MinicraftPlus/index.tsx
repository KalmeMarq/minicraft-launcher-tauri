import SubMenu from "@frontend/components/SubMenu";
import { SettingsContext } from "@frontend/context/SettingsContext";
import Installations from "@frontend/routes/MinicraftPlus/pages/Installations";
import PatchNotes from "@frontend/routes/MinicraftPlus/pages/PatchNotes";
import Play from "@frontend/routes/MinicraftPlus/pages/Play";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const MinicraftPlus = () => {
  const { animatePages } = useContext(SettingsContext);

  return (
    <div className={`base-route ${animatePages ? "anim" : ""}`}>
      <SubMenu>
        <SubMenu.Title text="Minicraft Plus" />
        <SubMenu.Navbar>
          <SubMenu.Link to="/minicraftplus/play" text="Play" />
          <SubMenu.Link
            to="/minicraftplus/installations"
            text="Installations"
          />
          <SubMenu.Link to="/minicraftplus/patchnotes" text="Patch Notes" />
        </SubMenu.Navbar>
      </SubMenu>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/minicraftplus/play" replace />}
        />
        <Route path="/play" element={<Play />} />
        <Route path="/installations" element={<Installations />} />
        <Route path="/patchnotes" element={<PatchNotes />} />
      </Routes>
    </div>
  );
};

export default MinicraftPlus;
