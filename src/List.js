import React from "react";
import { FaRegTrashAlt, FaStar } from "react-icons/fa";

const List = ({ items, removeItem }) => {
  return (
    <div>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <div key={id}>
            <h2>
              <FaStar id="fa" />
              {title}
              <span>
                <FaRegTrashAlt id="del" onClick={() => removeItem(id)} />
              </span>
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default List;
