import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { FaTimes } from "react-icons/fa";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [Modal, setModal] = useState(false);
  const Add = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else {
      showAlert(true, "success", "item added");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clear = () => {
    setModal(true);
  };
  const Yes = () => {
    showAlert(true, "danger", "All Cleared");
    setList([]);
    setModal(false);
  };
  const No = () => {
    setModal(false);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "Deleted");
    setList(list.filter((item) => item.id !== id));
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <>
      <section className="container">
        <article className="main">
          <h1>TO DO - LIST</h1>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          {Modal && (
            <div className="Modal">
              <span>
                <FaTimes id="x" onClick={No} />
              </span>
              <h4>Are you sure?</h4>
              <button id="yes" onClick={Yes}>
                Yes
              </button>
              <button id="no" onClick={No}>
                No
              </button>
            </div>
          )}
          <form>
            <input
              type="text"
              placeholder="Add Items"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="add" onClick={Add}>
              +
            </button>
          </form>
          {list.length > 0 && (
            <div className="ol">
              <List items={list} removeItem={removeItem} />
              <button className="clear" onClick={clear}>
                Clear Items
              </button>
            </div>
          )}
        </article>
      </section>
    </>
  );
}

export default App;
