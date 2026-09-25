import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="container-fluid">

        <div className="row">

          {/* Sidebar */}
          <div className="col-12 col-lg-2 p-0">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="col-12 col-lg-10 p-3 p-md-4">
            <Outlet />
          </main>

        </div>

      </div>
    </>
  );
}

export default MainLayout;