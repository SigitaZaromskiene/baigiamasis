import { useContext } from "react";
import { Global } from "./Global";
import { useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Containers() {
  const URL = "http://localhost:3003/containers";

  const {
    containerS,
    containerM,
    containerL,
    setContainerS,
    setContainerM,
    setContainerL,
    createData,
    lastStateUpdate,
    clientList,
    setClientList,
  } = useContext(Global);

  useEffect(() => {
    if (lastStateUpdate === null) {
      return;
    }
    axios.get(URL).then((res) => {
      setClientList(res.data);
    });
  }, [lastStateUpdate]);

  return (
    <div
      style={{
        height: "875px",
        backgroundImage:
          "linear-gradient(rgb(41 127 186 / 70%), rgb(0 0 0 / 52%))",
        backgroundSize: "cover",
      }}
    >
      <div className="flex">
        {clientList.map((con) => (
          <div className="container-column" key={uuidv4()}>
            <p>{con.name}</p>
            <p>{con.weight}</p>
          </div>
        ))}
        {/* {containerM
          ? containerS.map((con) => (
              <div className="container-column">
                <p>{con.name}</p>
                <p>{con.weight}</p>
              </div>
            ))
          : null}
        {containerL
          ? containerS.map((con) => (
              <div className="container-column">
                <p>{con.name}</p>
                <p>{con.weight}</p>
              </div>
            ))
          : null} */}
      </div>
    </div>
  );
}

export default Containers;
