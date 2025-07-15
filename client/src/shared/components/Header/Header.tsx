import NavLink from "./NavLink";
import SearchBar from "./Search/SearchBar";
import SiteLink from "./SiteLink";

export default function Header() {
  return (
    <header className="bg-[#f5f4f2] sticky top-0 py-4 flex justify-between">
      <NavLink />
      <SearchBar />
      <SiteLink />
    </header>
  );
}
