import { useState, useContext, useEffect } from "react";
import { Global } from "./Global";
import { useFile } from "./useFile";
import axios from "axios";

function Boxes() {
  const URL = "http://localhost:3003/boxes";

  const [file, readFile, remImage] = useFile();

  const [modal, setModal] = useState({ class: "hidden", msg: "", color: "" });

  const {
    goalAmount,
    setGoalAmount,
    createData,
    setCreateData,
    setLastStateUpdate,
    addItemName,
    setAddItemName,
  } = useContext(Global);

  useEffect(() => {
    if (createData === null) {
      return;
    }

    axios.post(URL, createData).then((res) => setLastStateUpdate(Date.now()));
    setCreateData(null);
  }, [createData, setLastStateUpdate, setCreateData]);

  const boxHandler = () => {
    if (!goalAmount || !addItemName) {
      setModal({
        class: "visible",
        msg: "Please fill all fields",
        color: "red",
      });
      setTimeout(() => {
        setModal({ class: "hidden", msg: "", color: "" });
      }, 2000);
      return;
    }

    setCreateData({
      name: addItemName,
      file,
      amount: goalAmount,
      raised: 0,
      leftTill: goalAmount,
      blocked: 0,
    });

    setModal({
      class: "visible",
      msg: "The fundraiser was sucessful created",
      color: "white",
    });
    setTimeout(() => {
      setModal({ class: "hidden", msg: "", color: "" });
    }, 2000);

    setAddItemName("");
    setGoalAmount("");
    remImage();
  };

  return (
    <div
      style={{
        height: "875px",
        backgroundImage:
          "linear-gradient(rgba(41, 127, 186, 0.7), rgba(0, 0, 0, 0.52))",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "40px",
        }}
      >
        <form>
          <h4
            style={{
              textAlign: "center",
            }}
          >
            Box details
          </h4>

          <div className="details">
            <label className="label">Items name</label>
            <input
              type="text"
              value={addItemName}
              style={{ width: "150px" }}
              onChange={(e) => setAddItemName(e.target.value)}
            ></input>
          </div>
          <div className="details">
            <label className="label">Items weight</label>
            <input
              type="text"
              value={addItemName}
              style={{ width: "150px" }}
              onChange={(e) => setAddItemName(e.target.value)}
            ></input>
          </div>
          <div className="details">
            <label className="label">Is flammable?</label>
            <input
              type="text"
              value={addItemName}
              style={{ width: "150px" }}
              onChange={(e) => setAddItemName(e.target.value)}
            ></input>
          </div>
          <div className="details">
            <label className="label">Is perishable?</label>
            <input
              type="text"
              value={addItemName}
              style={{ width: "150px" }}
              onChange={(e) => setAddItemName(e.target.value)}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="details">
              <label
                className="label"
                htmlFor="formFile"
                style={{ marginBottom: "0px" }}
              >
                Items photo
              </label>
              <div
                style={{ display: "flex", gap: "70px", alignItems: "center" }}
              >
                <input
                  type="file"
                  id="formFile"
                  style={{
                    border: "1px solid black",
                    backgroundColor: "white",

                    height: "45px",
                    padding: "6px",
                  }}
                  onChange={readFile}
                ></input>
                {file ? (
                  <img className="photo" src={file} alt="addphoto" />
                ) : (
                  <div className="photo"></div>
                )}
              </div>
            </div>
            <button type="button" className="button-or" onClick={boxHandler}>
              Delete
            </button>
          </div>
        </form>
        <div className={`${modal.class} modal`}>
          <p style={{ backgroundColor: modal.color }}>{modal.msg} </p>
        </div>
      </div>
    </div>
  );
}

export default Boxes;
