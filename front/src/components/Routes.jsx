import { useContext, useState, useEffect } from "react";
import { Global } from "./Global";

import LoginAdmin from "./LoginAdmin";
import Auth from "./Auth";
import Containers from "./Containers";
import Boxes from "./Boxes";
import Nav from "./Nav";
import Home from "./Home";
import NavAdmin from "./NavAdmin";

function Routes() {
  const { route } = useContext(Global);

  const { setAuthName, setLogged, lastStateUpdate, setClientList } =
    useContext(Global);

  switch (route) {
    case "home":
      return (
        <>
          <NavAdmin></NavAdmin>
          <Home></Home>
        </>
      );

    case "all":
      return (
        <>
          <Nav></Nav>
          <Home></Home>
        </>
      );

    case "boxes":
      return (
        <>
          <NavAdmin></NavAdmin>
          <Boxes></Boxes>
        </>
      );

    case "containers":
      return (
        <>
          {/* // <Auth roles={"manager, admin"}> */}
          <NavAdmin></NavAdmin>
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
