import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Global } from "./Global";

function Login(props) {
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [psw, setPsw] = useState("");

  const { setRoute, setLogged, setAuthName } = useContext(Global);

  const login = (_) => {
    axios
      .post(
        "http://localhost:3003/login",
        { name, psw },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "ok") {
          setUserName(res.data.name);
          setName("");
          setPsw("");
          setError(null);
          setLogged(1);
          setAuthName(res.data.name);
          setRoute("home");
        } else {
          setError(true);
          setUserName(null);
        }
      });
  };

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
      <div className="form-login">
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          {error ? (
            <span style={{ color: "red" }}>Error! Only for admins</span>
          ) : (
            <>
              <h3>Login</h3>
              <div className="border"></div>
            </>
          )}
        </div>

        <h5
          style={{
            textAlign: "center",
            fontSize: "20px",
            color: "#f36b32",
            marginBottom: "30px",
          }}
        >
          {!error ? <span>Hello, admin</span> : null}
        </h5>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "15px",
            }}
          >
            <label
              style={{
                fontSize: "16px",
                color: "#black",
                fontWeight: "500",
                width: "30%",
                marginTop: "7px",
              }}
            >
              Name
            </label>
            <input
              type="text"
              style={{ padding: "5px 10px", fontSize: "20px", width: "80%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "15px",
            }}
          >
            <label
              style={{
                fontSize: "16px",
                color: "#black",
                fontWeight: "500",
                width: "30%",
                marginTop: "7px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              style={{
                padding: "5px 10px",
                fontSize: "20px",
                marginBottom: "30px",
                width: "80%",
              }}
              value={psw}
              onChange={(e) => setPsw(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <button
            style={{ marginBottom: "20px" }}
            className="button-blue"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
