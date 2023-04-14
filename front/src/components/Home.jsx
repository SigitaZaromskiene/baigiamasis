import React from "react";
import { useContext } from "react";
import { Global } from "./Global";

const URL = "http://localhost:3003/home";

function Home(props) {
  const { route, setRoute, logged } = useContext(Global);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "845px",
        backgroundImage:
          "linear-gradient(rgba(41, 127, 186, 0.7), rgba(0, 0, 0, 0.52))",
        backgroundSize: "cover",
      }}
    >
      <h3
        style={{
          backgroundColor: "#f36b32",
          textAlign: "center",
          width: "1000px",
          padding: "40px 60px",
          borderRadius: "20px",
        }}
      >
        International <span style={{ color: "#297fba" }}>transITme </span>
        company provides comprehensive vehicle shipping and storage services,
        also provides long term storage facilities housing and maintaining.
      </h3>
    </div>
  );
}

export default Home;
