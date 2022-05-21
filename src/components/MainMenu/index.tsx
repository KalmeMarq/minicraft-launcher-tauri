import { ReactNode } from "react";
import "./index.scss";

const MainMenu: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <div className="main-menu">{children}</div>;
};

export default MainMenu;
