import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-0">
            <Sidebar />
          </div>

          <div className="col-10 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;