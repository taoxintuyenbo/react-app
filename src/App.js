// import { useRoutes } from "react-router-dom";
// import LayoutBackend from "./layouts/backend";
// import LayoutFrontend from "./layouts/frontend";
// import NotFound from "./pages/NotFound";
// import RouterBackend from "./router/RouterBackend";
// import RouterFrontend from "./router/RouterFrontend";

// function App() {
//   let element = useRoutes([
//     {
//       path: "/",
//       element: <LayoutFrontend />,
//       children: RouterFrontend,
//     },
//     {
//       path: "/admin",
//       element: <LayoutBackend />,
//       children: RouterBackend,
//     },
//     { path: "*", element: <NotFound /> },
//   ]);

//   return element;
// }

// export default App;
import React from "react";
import { useRoutes } from "react-router-dom";
import LayoutBackend from "./layouts/backend";
import LayoutFrontend from "./layouts/frontend";
import NotFound from "./pages/NotFound";
import RouterBackend from "./router/RouterBackend";
import RouterFrontend from "./router/RouterFrontend";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutFrontend />,
      children: RouterFrontend,
    },
    {
      path: "/admin",
      element: <LayoutBackend />,
      children: RouterBackend,
    },
    { path: "*", element: <NotFound /> },
  ]);

  return <Provider store={store}>{element}</Provider>;
}

export default App;
