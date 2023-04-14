import { createContext, useState } from "react";
import axios from "axios";

export const Global = createContext();

export const GlobalProvider = ({ children }) => {
  const [route, setRoute] = useState("all");
  const [logged, setLogged] = useState(null);
  const [authName, setAuthName] = useState(null);
  const [clientList, setClientList] = useState([]);
  const [createData, setCreateData] = useState(null);
  const [lastStateUpdate, setLastStateUpdate] = useState(Date.now());
  const [authRole, setAuthRole] = useState(null);

  const [addItemName, setAddItemName] = useState("");
  const [addItemWeight, setAddItemWeight] = useState("");
  const [isFlame, setIsFlame] = useState([]);
  const [isPer, setIsPer] = useState([]);

  const [containerS, setContainerS] = useState([]);
  const [containerM, setContainerM] = useState([]);
  const [containerL, setContainerL] = useState([]);

  const logOut = (_) => {
    axios
      .post("http://localhost:3003/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setLogged(2);
        setAuthName(false);
      });
  };

  return (
    <Global.Provider
      value={{
        route,
        setRoute,
        authName,
        setAuthName,
        logOut,
        logged,
        setLogged,
        clientList,
        setClientList,
        setCreateData,
        createData,
        authRole,
        setAuthRole,
        containerS,
        containerM,
        containerL,
        setContainerS,
        setContainerM,
        setContainerL,

        lastStateUpdate,
        setLastStateUpdate,
        addItemName,
        setAddItemName,
        addItemWeight,
        setAddItemWeight,
        isFlame,
        setIsFlame,
        isPer,
        setIsPer,
      }}
    >
      {children}
    </Global.Provider>
  );
};
