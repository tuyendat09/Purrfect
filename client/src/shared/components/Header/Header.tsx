import { memo } from "react";
import NavLink from "./NavLink";
import SearchBar from "./Search/SearchBar";
import SiteLink from "./SiteLink";

function HeaderComponent() {
  return (
    <header className="bg-[#f5f4f2] sticky top-0 py-4 flex justify-between z-40">
      <NavLink />
      <SearchBar />
      <SiteLink />
    </header>
  );
}

// Bọc với memo
const Header = memo(HeaderComponent);

export default Header;
