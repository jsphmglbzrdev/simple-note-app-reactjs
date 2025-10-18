import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

const Header = ({ theme, changeTheme }) => {
  console.log(theme);

  return (
    <header className="fixed top-0 left-0 right-0 backdrop-blur-xl bg-white/10 shadow-2xl border-b border-white/20">
      <div
        className={`${
          theme ? "text-white" : "text-black"
        } flex py-2 px-8 items-center justify-between`}
      >
        <div>YourSimpleTodo</div>
        <button
          onClick={changeTheme}
          className={`${theme ? 'bg-gray-100 text-black hover:bg-white transition-all duration-200' : 'bg-black text-white hover:bg-gray-800 transition-all duration-200'} py-1 px-3 cursor-pointer text-black text-sm rounded-full flex items-center gap-2`}
        >
          {theme ? (
            <div className="flex items-center gap-2">
              <Sun />
              Light Theme
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Moon />
              Dark Theme
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
