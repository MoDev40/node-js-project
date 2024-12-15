import { CircleUserRound, Info, Newspaper, Pen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavBar = () => {
  const location = useLocation();

  if (
    location.pathname === "/create/blog-post" ||
    location.pathname.includes("/blog/article/") ||
    location.pathname.includes("/edit/blog-post")
  ) {
    return null;
  }

  return (
    <div className="fixed p-5 flex flex-row justify-between  bottom-0 left-0 right-0 z-10 container mx-auto lg:max-w-[1120px] w-full sm:max-w-lg pb-5 ">
      <Link to="/profile">
        <div className="flex flex-col items-center justify-center cursor-pointer group">
          <div className="flex flex-col items-center justify-center">
            <CircleUserRound className="w-6 h-6 transition-all group-hover:scale-125 " />
            <span className="text-sm ">Profile</span>
          </div>
        </div>
      </Link>
      {location.pathname == "/" ? (
        <AddPost />
      ) : (
        <Link to="/" className="transition-all">
          <Newspaper
            size={9}
            className="w-8 h-8 transition-all hover:scale-125"
          />
        </Link>
      )}
      <Link to="/contact">
        <div className="flex flex-col items-center justify-center cursor-pointer group">
          <div className="flex flex-col items-center justify-center ">
            <Info className="w-6 h-6 transition-all group-hover:scale-125" />
            <span className="text-sm">Contact</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const AddPost = () => {
  return (
    <Link to="/create/blog-post" className="transition-all">
      <Pen size={8} className="w-8 h-8 transition-all hover:scale-125" />
    </Link>
  );
};

export default BottomNavBar;
