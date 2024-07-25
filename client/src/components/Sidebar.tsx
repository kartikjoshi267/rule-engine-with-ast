import { Link, useLocation } from "react-router-dom";
import { useScreen } from "../context/ScreenContext";

const sidebarLinks = [
  {
    pathname: "/",
    title: "Home",
  },
  {
    pathname: "/create",
    title: "Create AST",
  },
  {
    pathname: "/combine",
    title: "Combine Rules",
  },
  {
    pathname: "/evaluate",
    title: "Evaluate JSON Data",
  },
  {
    pathname: "/available-rules",
    title: "Available Rules",
  },
]

const Sidebar = (): React.JSX.Element => {
  // @ts-expect-error "unexpected error"
  const { isMobile, sidebarOpen } = useScreen();

  return (
    <>
      <div className={`${isMobile && !sidebarOpen ? "hidden": ""} ${isMobile && sidebarOpen ? "absolute": ""} w-1/5 h-full bg-indigo-700 flex flex-col items-center p-6 min-w-[300px] z-10`}>
        {sidebarLinks.map(({ pathname, title }) => (
          <SidebarComponent
            key={pathname}
            pathname={pathname}
            title={title}
          />
        ))}
      </div>
    </>
  );
}

const SidebarComponent = ({ pathname, title }: {
  pathname: string,
  title: string,
}): React.JSX.Element => {
  const { pathname: locationPathName } = useLocation();
  // @ts-expect-error "unexpected error"
  const { toggleSidebar } = useScreen();

  return (
    <Link to={pathname} onClick={toggleSidebar} className={
      locationPathName === pathname ?
        "text-white bg-indigo-900 w-full m-2 p-3 rounded-md transition-all" :
      "text-white bg-indigo-500 w-full m-2 p-3 rounded-md hover:bg-indigo-900 transition-all"
    }>
      {title}
    </Link>
  );
}

export default Sidebar