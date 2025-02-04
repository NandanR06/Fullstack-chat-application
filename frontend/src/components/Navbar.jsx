import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <div>
      <header className=" border-b border-base-300 fixed w-full top-0 z-50 backdroup-blur-lg bg-base-100/80">
        <div className=" container mx-auto px-4 h-16 py-2 ">
          <div className="flex items-end justify-between h-full">
            <div className="flex items-center gap-8">
              <Link
                to={"/"}
                className="flex item-center ml-4  justify-center gap-2.5 hover:opacity-80 transition-all"
              >
                <div className="size-10 rounded-lg bg-primary/10 flex  item-center justify-center pt-2">
                  <MessageSquare className="size-6 text-primary " />
                </div>{" "}
                <h1 className="text-lg font-bold mt-1">ReChat</h1>
              </Link>
            </div>
            <div className="flex item-center gap-2">
              <Link to={"/setting"} className="btn btn-sm transition-colors">
                <Settings className="size-4 " />
                <span className="hidden sm:inline">Setting</span>
              </Link>
              {authUser && (
                <>
                  <Link to={"/profile"} className="btn btn-sm gap-2">
                    <img
                      src={authUser.profilepic || "/avatar.png"}
                      alt=""
                      className="size-5 rounded-xl  object-cover"
                    />

                    <span className="hidden  sm:inline">Profile</span>
                  </Link>
                  <button
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
