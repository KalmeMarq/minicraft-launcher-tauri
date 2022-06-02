import MainMenu from "@frontend/components/MainMenu";
import Community from "@frontend/routes/Community";
import Minicraft from "@frontend/routes/Minicraft";
import MinicraftPlus from "@frontend/routes/MinicraftPlus";
import Settings from "@frontend/routes/Settings";

import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <>
      <div className="app">
        <Router>
          <MainMenu />
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
