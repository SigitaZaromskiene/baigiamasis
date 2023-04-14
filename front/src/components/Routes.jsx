import { useContext, useState, useEffect } from "react";
import { Global } from "./Global";

import LoginAdmin from "./LoginAdmin";
import Auth from "./Auth";
import Containers from "./Containers";
import Boxes from "./Boxes";
import Nav from "./Nav";
import Home from "./Home";
import NavAdmin from "./NavAdmin";
import ContainersSummary from "./ContainersSummary";

function Routes() {
  const { route } = useContext(Global);

  const { setAuthName, setLogged, lastStateUpdate, setClientList } =
    useContext(Global);

  switch (route) {
    case "home":
      return (
        <Auth roles={"admin"}>
          <NavAdmin></NavAdmin>
          <Home></Home>
        </Auth>
      );

    case "all":
      return (
        <>
          <Nav></Nav>
          <Home></Home>
        </>
      );

    case "containerSummary":
      return (
        <>
          <Nav></Nav>
          <ContainersSummary />
        </>
      );

    case "boxes":
      return (
        <Auth roles={"admin"}>
          <NavAdmin></NavAdmin>
          <Boxes></Boxes>
        </Auth>
      );

    case "containers":
      return (
        <Auth roles={"admin"}>
          <NavAdmin></NavAdmin>
          <Containers></Containers>
        </Auth>
      );

    case "login":
      return (
        <>
          <Nav></Nav>
          <LoginAdmin></LoginAdmin>
        </>
      );

    default:
      return null;
  }
}

export default Routes;
