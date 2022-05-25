import LoadingSpinner from "@frontend/components/LoadingSpinner";
import SubMenu from "@frontend/components/SubMenu";
import { SettingsContext } from "@frontend/context/SettingsContext";
import { useContext, useState } from "react";
import SearchIcon from "@frontend/assets/images/search_3.svg?component";
import cancelIcon from "@frontend/assets/images/cancel.png";
import "./index.scss";

export const SearchInput: React.FC<{
  placeholder?: string;
  results?: number;
  onChange?: (value: string) => void;
}> = ({ placeholder, onChange, results = 0 }) => {
  const [v, setV] = useState("");

  return (
    <div className="search-input">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        value={v}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
          setV(e.target.value);
        }}
      />
      {v !== "" && (
        <button className="reset-btn" onClick={() => onChange && onChange("")}>
          <img src={cancelIcon} />
        </button>
      )}
      {results !== 0 && v !== "" && (
        <p className="results">{results} Results</p>
      )}
    </div>
  );
};

const Community = () => {
  const { animatePages } = useContext(SettingsContext);
  const [items, setItems] = useState([
    "Joe",
    "Antony",
    "Philip",
    "Ana",
    "Betty",
    "Peter",
    "John",
  ]);
  const [results, setResults] = useState(0);
  const [filteredResults, setFilteredResults] = useState<string[]>(items);

  const filterSearch = (v: string) => {
    if (v.trim() === "") {
      setFilteredResults(items);
      setResults(items.length);
      return;
    }
    const filtered = items.filter((i) => i.startsWith(v));
    setFilteredResults(filtered);
    setResults(filtered.length);
  };

  return (
    <div className={`base-route ${animatePages ? "anim" : ""}`}>
      {/* <SearchInput
        placeholder="bruh"
        onChange={(v) => {
          filterSearch(v);
        }}
        results={results}
      />
      {filteredResults.map((i) => (
        <p key={i}>{i}</p>
      ))} */}
      {/* <SubMenu>
        <SubMenu.Title text="Community" />
        <SubMenu.Navbar>
          <SubMenu.Link to="/community/resourcepacks" text="Resource Packs" />
          <SubMenu.Link to="/community/skinpacks" text="Skin Packs" />
          <SubMenu.Link to="/community/mods" text="Mods" />
          <SubMenu.Link to="/community/texturepacks" text="Texture Packs" />
        </SubMenu.Navbar>
      </SubMenu> */}
      <LoadingSpinner />
    </div>
  );
};

export default Community;
