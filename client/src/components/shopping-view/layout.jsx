import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout({ children}) {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      { children }
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;