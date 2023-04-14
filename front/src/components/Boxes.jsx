import { useState, useContext, useEffect } from "react";
import { Global } from "./Global";
import { useFile } from "./useFile";
import axios from "axios";

function Boxes() {
  const URL = "http://localhost:3003/boxes";

  const [file, readFile, remImage] = useFile();

  const [modal, setModal] = useState({ class: "hidden", msg: "", color: "" });

  const {
    createData,
    setCreateData,
    setLastStateUpdate,
    addItemName,
    setAddItemName,
    addItemWeight,
    setAddItemWeight,
    isFlame,
    setIsFlame,
    isPer,
    setIsPer,
  } = useContext(Global);

  useEffect(() => {
    if (createData === null) {
      return;
    }

    axios.post(URL, createData).then((res) => setLastStateUpdate(Date.now()));
    setCreateData(null);
  }, [createData, setLastStateUpdate, setCreateData]);

  const submitHandler = () => {
    if (!addItemWeight || !addItemName || !isPer || !isFlame || !file) {
      setModal({
        class: "visible",
        msg: "Please fill all information about item",
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
      weight: addItemWeight,
      isPer: 0,
      isFlame: 0,
    });

    setModal({
      class: "visible",
      msg: "Box was sucessful added",
      color: "white",
    });
    setTimeout(() => {
      setModal({ class: "hidden", msg: "", color: "" });
    }, 2000);

    setAddItemName("");
    setAddItemWeight("");
    remImage();
  };

  const deleteHandler = () => {
    setIsFlame("");
    setIsPer("");
    setAddItemName("");
    setAddItemWeight("");
    remImage();
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(41, 127, 186, 0.7), rgba(0, 0, 0, 0.52))",
        padding: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <form>
          <h4
            style={{
              textAlign: "center",
              marginBottom: "5px",
            }}
          >
            Box details
          </h4>
          <div style={{ display: "flex" }}>
            <div className="details">
              <label className="label">Items name</label>
              <input
                type="text"
                value={addItemName}
                style={{ width: "300px", height: "30px" }}
                onChange={(e) => setAddItemName(e.target.value)}
              ></input>
            </div>
            <div className="details">
              <label className="label">Items weight</label>
              <input
                type="text"
                value={addItemWeight}
                style={{ width: "300px", height: "30px" }}
                onChange={(e) => setAddItemWeight(e.target.value)}
              ></input>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="details">
              <label className="label">Is flammable?</label>
              <input
                type="text"
                value={isFlame}
                style={{ width: "300px", height: "30px" }}
                onChange={(e) => setIsFlame(e.target.value)}
                placeholder="YES/NO"
              ></input>
            </div>
            <div className="details">
              <label className="label">Is perishable?</label>
              <input
                type="text"
                value={isPer}
                style={{ width: "300px", height: "30px" }}
                onChange={(e) => setIsPer(e.target.value)}
                placeholder="YES/NO"
              ></input>
            </div>
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
            <select
              //   onChange={onChange}
              style={{
                display: "flex",
                marginBottom: "110px",
                padding: " 5px 10px",

                cursor: "pointer",
                justifyContent: "flex-start",
                fontSize: "16px",
              }}
            >
              <option>Select to choose container</option>
              <option value="with">Size S</option>
              <option value="without">Size M</option>
              <option value="with0">Size L</option>
            </select>
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                className="button-or"
                onClick={deleteHandler}
                style={{ marginTop: "0px" }}
              >
                Delete
              </button>
              <button
                type="button"
                className="button-blue"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
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
