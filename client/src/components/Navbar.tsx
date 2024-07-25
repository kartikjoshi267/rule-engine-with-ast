import { BiMenu } from "react-icons/bi";
import { useScreen } from "../context/ScreenContext";
import { ImCross } from "react-icons/im";

const Navbar = (): React.JSX.Element => {
  // @ts-expect-error "unexpected error"
  const { isMobile, toggleSidebar, sidebarOpen } = useScreen();

  return (
    <>
      <nav className={`bg-indigo-900 w-[100vw] flex flex-row items-center justify-between ${isMobile ? "p-2" : ""}`}>
        {isMobile ? (
          <>
            {sidebarOpen ? <ImCross className="text-2xl text-white pl-2 cursor-pointer" onClick={toggleSidebar} /> : <BiMenu className="text-3xl text-white cursor-pointer" onClick={toggleSidebar} />}
          </>
        ) : null}
        <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 w-full flex flex-row justify-center items-center">
          <div className="text-3xl font-semibold text-white select-none">Rule Engine with AST</div>
        </div>
        {isMobile ? <div></div> : null}
      </nav>
    </>
  );
}

export default Navbar