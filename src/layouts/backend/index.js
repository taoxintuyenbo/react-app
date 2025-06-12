// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "./navbar";
// import Sidebar from "./sidebar";

// function LayoutBackend() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex flex-grow">
//         <Sidebar />
//         <main className="flex-grow p-4 bg-gray-100">
//           <Outlet /> {/* This will load the respective child routes */}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default LayoutBackend;
import React from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "./navbar";
// import Sidebar from "./sidebar";

function LayoutBackend() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default LayoutBackend;
