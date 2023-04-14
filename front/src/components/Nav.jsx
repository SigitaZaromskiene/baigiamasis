import { useContext } from "react";
import { Global } from "./Global";
import axios from "axios";

function Nav(props) {
  const { route, setRoute, authName, setAuthName, setLogged, logged } =
    useContext(Global);

  const logOut = (_) => {
    axios
      .post("http://localhost:3003/logout", {}, { withCredentials: true })
      .then((res) => {
        setLogged(false);
        setAuthName(false);
        setRoute("home");
      });
  };
  return (
    <div className="navigation">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "60px",
          justifyContent: "center",
        }}
      >
        <h3 style={{ color: "#161616", margin: "0px" }}>
          trans<span style={{ color: "#297FBA" }}>IT</span>me
        </h3>
        <p className="nav-a" onClick={() => setRoute("containers")}>
          Containers
        </p>

        <p className="nav-a" onClick={() => setRoute("boxes")}>
          Boxes
        </p>

        {/* {authName ? (
          <p className="nav-a" onClick={() => setRoute("start")}>
            Start a fundraiser
          </p>
        ) : null} */}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {authName ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <h4 style={{ color: "#297fba", margin: "0px" }}>{authName}</h4>
            <p className="button-or" onClick={logOut}>
              Logout
            </p>
          </div>
        ) : (
          <>
            <p className="button-blue" onClick={() => setRoute("login")}>
              Login Admin
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
