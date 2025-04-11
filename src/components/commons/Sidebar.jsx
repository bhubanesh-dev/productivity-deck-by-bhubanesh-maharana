import classNames from "classnames";
import { MenuLayout } from "neetoicons";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom";

import { NAVIGATION_ROUTES } from "./constants";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="flex w-16 flex-col items-center space-y-4 border-r-2 border-gray-200 py-8">
      <MenuLayout className="mb-4 rounded-md  p-1 text-black" size={32} />
      {NAVIGATION_ROUTES.map(({ path, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className={classNames("text-black hover:text-blue-500", {
            "font-bold text-blue-600": location.pathname === path,
          })}
        >
          <Icon size={28} />
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
