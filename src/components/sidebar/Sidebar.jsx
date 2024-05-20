import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { BiCog } from "react-icons/bi";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <div className="mt-auto flex justify-between items-center">
        <BiCog
          className="w-6 h-6 text-white cursor-pointer"
          onClick={handleSettingsClick}
        />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
