import React from "react";
import { useContext } from "react";
import { Global } from "./Global";

const URL = "http://localhost:3003/home";

function Home(props) {
  const { route, setRoute, logged } = useContext(Global);

  return (
    <div
      style={{
        height: "875px",
        backgroundImage:
          "linear-gradient(rgb(41 127 186 / 70%), rgb(0 0 0 / 52%))",
        backgroundSize: "cover",
      }}
    ></div>
  );
}

export default Home;
