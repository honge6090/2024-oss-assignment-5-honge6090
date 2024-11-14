import React from "react";

const ItemList = ({ items, deleteItem, setEditItem }) => {
  return (
    <div>
      <h2 className="text-center">Course List</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{item.cname}</strong> - {item.prof} - {item.credit}{" "}
              Credits - Code: {item.code}
            </div>
            <div>
              <button
                className="btn btn-sm btn-primary mr-2"
                onClick={() => setEditItem(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
