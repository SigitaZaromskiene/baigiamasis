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
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div
          style={{
            padding: "50px 50px",

            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              width: "400px",
              fontSize: "80px",
              fontWeight: "600",
              color: "white",
            }}
          >
            Start building a bright{" "}
            <span style={{ color: "#F36B32 " }}>FUTURE!</span>
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              padding: "30px 40px",
              marginRight: "100px",
            }}
          >
            <h2
              style={{
                paddingTop: " 10px",
                fontWeight: "600",
                fontSize: "54px",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                alignItems: "center",
                color: "black",
              }}
            >
              I am looking to
            </h2>
            <p
              style={{
                color: "#404040",

                marginTop: "20px",
                padding: "10px",
              }}
            >
              Raise funds for my innovative idea, business project, or startup{" "}
            </p>
            <div
              style={{ display: "flex", gap: "20px", justifyContent: "center" }}
            >
              {logged ? (
                <button className="button-or" onClick={() => setRoute("start")}>
                  Apply now
                </button>
              ) : (
                <button
                  className="button-or"
                  onClick={() => setRoute("register")}
                >
                  Apply now
                </button>
              )}

              <button
                className="button-blue"
                onClick={() => setRoute("fundraisers")}
              >
                Fundraisers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
