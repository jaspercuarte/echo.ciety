import React, { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { FaGithub } from "react-icons/fa";
import { FaTerminal } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import Tooltip from "./Tooltip";

const desktopLinks: string =
  "flex items-center gap-2 px-3 py-2 rounded-sm text-base font-medium text-gray-300 hover:text-white hover:bg-slate-900 hover:outline-slate-200 hover:outline scale-100 active:scale-95 active:bg-gray-800 transition-all duration-300 cursor-pointer";

const mobileLinks: string =
  "flex items-center justify-between px-3 py-2 rounded-sm text-base font-medium text-gray-300 hover:text-white hover:bg-slate-900 hover:outline-slate-200 hover:outline scale-100 active:scale-95 active:bg-gray-800 transition-all duration-300";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { signInWithGithub, signOut, user } = useAuth();

  const displayName = user?.user_metadata.user_name || user?.email;
  return (
    <nav className="fixed top-0 w-full z-40 bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-mono text-xl font-bold text-white">
            echo<span>.ciety</span>
          </Link>

          {/* {Desktop Links} */}
          <div className="hidden md:flex items-center space-x-4">
            <Tooltip text="go to homepage">
              <Link to="/" className={desktopLinks}>
                <FaTerminal size={18} className="text-white font-extrabold" />
                <i>cd ~</i>
              </Link>
            </Tooltip>
            <Tooltip text="create post">
              <Link to="/create" className={desktopLinks}>
                <FaTerminal size={18} className="text-white font-extrabold" />
                <i>post.exe</i>
              </Link>
            </Tooltip>
            <Tooltip text="explore communities">
              <Link to="/communities" className={desktopLinks}>
                <FaTerminal size={18} className="text-white font-extrabold" />
                <i>dir</i>
              </Link>
            </Tooltip>
            <Tooltip text="create community">
              <Link to="/community/create" className={desktopLinks}>
                <FaTerminal size={18} className="text-white font-extrabold" />
                <i>mkdir</i>
              </Link>
            </Tooltip>
          </div>

          {/* {Desktop Authentication} */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4 rounded-full outline cursor-pointer">
                {user.user_metadata?.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover outline outline-slate-200"
                  />
                )}
                <span className="text-gray-300 font-semibold italic">
                  user<span className="not-italic">{"/"}</span>
                  {displayName}
                  <span className="not-italic">{">"}</span>
                </span>
                <Tooltip text="sign out">
                  <button
                    onClick={signOut}
                    className="px-4 py-2 rounded-full text-base font-medium text-gray-300 hover:text-white hover:bg-slate-900 outline-slate-200 outline scale-100 active:scale-95 active:bg-red-800 transition-all duration-300 cursor-pointer"
                  >
                    <FaSignOutAlt size={18} />
                  </button>
                </Tooltip>
              </div>
            ) : (
              <button onClick={signInWithGithub} className={desktopLinks}>
                <i>sign.in.with.github</i>
                <FaGithub size={24} />
              </button>
            )}
          </div>

          {/* {Mobile Menu Button} */}
          <div className="md:hidden">
            {" "}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="cursor-pointer"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* {Mobile Menu} */}
      {menuOpen && (
        <div className="md:hidden bg-slate-850/80">
          <div className="px-6 pt-2 pb-3 space-y-1">
            <div className="mb-4">
              {user ? (
                <div className="flex items-center justify-between space-x-4 rounded-full outline cursor-pointer">
                  {user.user_metadata?.avatar_url && (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="User Avatar"
                      className="h-fit w-10 rounded-full object-cover outline outline-slate-200"
                    />
                  )}
                  <span className="text-gray-300 font-semibold italic">
                    user<span className="not-italic">{"/"}</span>
                    {displayName}
                    <span className="not-italic">{">"}</span>
                  </span>
                  <button
                    onClick={signOut}
                    className="flex gap-3 items-center px-4 py-2 rounded-full text-base font-medium text-gray-300 hover:text-white hover:bg-slate-900 outline-slate-200 outline scale-100 active:scale-95 active:bg-red-800 transition-all duration-300 cursor-pointer"
                  >
                    Sign Out
                    <FaSignOutAlt size={18} />
                  </button>
                </div>
              ) : (
                <button onClick={signInWithGithub} className={desktopLinks}>
                  <i>sign.in.with.github</i>
                  <FaGithub size={24} />
                </button>
              )}
            </div>
            <Link to="/" className={mobileLinks}>
              <div className="flex items-center gap-2">
                <FaTerminal size={18} className="text-white font-extrabold" />
                cd ~
              </div>
              <i>go to homepage</i>
            </Link>
            <Link to="/create" className={mobileLinks}>
              <div className="flex items-center gap-2">
                <FaTerminal size={18} className="text-white font-extrabold" />
                post.exe
              </div>
              <i>create post</i>
            </Link>
            <Link to="/communities" className={mobileLinks}>
              <div className="flex items-center gap-2">
                <FaTerminal size={18} className="text-white font-extrabold" />
                dir
              </div>
              <i>explore communities</i>
            </Link>
            <Link to="/community/create" className={mobileLinks}>
              <div className="flex items-center gap-2">
                <FaTerminal size={18} className="text-white font-extrabold" />
                mkdir
              </div>
              <i>create community</i>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
