import SubMenu from "@frontend/components/SubMenu";
import Installations from "@frontend/routes/Minicraft/pages/Installations";
import PatchNotes from "@frontend/routes/Minicraft/pages/PatchNotes";
import Play from "@frontend/routes/Minicraft/pages/Play";
import { Navigate, Route, Routes } from "react-router-dom";

const Minicraft = () => {
  return (
    <div className="base-route">
      <SubMenu>
        <SubMenu.Title text="Minicraft" />
        <SubMenu.Navbar>
          <SubMenu.Link to="/minicraft/play" text="Play" />
          <SubMenu.Link to="/minicraft/installations" text="Installations" />
          <SubMenu.Link to="/minicraft/patchnotes" text="Patch Notes" />
        </SubMenu.Navbar>
      </SubMenu>
      <Routes>
        <Route path="/" element={<Navigate to="/minicraft/play" replace />} />
        <Route path="/play" element={<Play />} />
        <Route path="/installations" element={<Installations />} />
        <Route path="/patchnotes" element={<PatchNotes />} />
      </Routes>
    </div>
  );
};

export default Minicraft;
