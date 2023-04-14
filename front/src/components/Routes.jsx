import { useContext, useState, useEffect } from "react";
import { Global } from "./Global";

import LoginAdmin from "./LoginAdmin";
import Auth from "./Auth";
import Containers from "./Containers";
import Boxes from "./Boxes";
import Nav from "./Nav";
import Home from "./Home";

function Routes() {
  const { route } = useContext(Global);

  const { setAuthName, setLogged, lastStateUpdate, setClientList } =
    useContext(Global);

  switch (route) {
    case "home":
      return (
        <>
          <Nav></Nav>
          <Home></Home>
        </>
      );

    case "boxes":
      return (
        <>
          <Nav></Nav>
          <Boxes></Boxes>
        </>
      );

    case "containers":
      return (
        <>
          {/* // <Auth roles={"manager, admin"}> */}
          <Nav></Nav>
          <Containers></Containers>
        </>
        // </Auth>
      );

    case "login":
      return (
        <>
          <Nav></Nav>
          <LoginAdmin></LoginAdmin>
        </>
      );

    // case "fundraisers":
    //   return (
    //     <>
    //       <Nav></Nav>
    //       <Fundraisers></Fundraisers>
    //     </>
    //   );

    default:
      return null;
  }
}

export default Routes;
