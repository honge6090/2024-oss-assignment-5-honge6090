import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";

const App = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "https://6728860f270bd0b97555efb5.mockapi.io/courses"
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItem = async (newItem) => {
    try {
      const response = await axios.post(
        "https://6728860f270bd0b97555efb5.mockapi.io/courses",
        newItem
      );
      setItems([...items, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (updatedItem) => {
    try {
      const response = await axios.put(
        `https://6728860f270bd0b97555efb5.mockapi.io/courses/${updatedItem.id}`,
        updatedItem
      );
      setItems(
        items.map((item) => (item.id === updatedItem.id ? response.data : item))
      );
      setEditItem(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `https://6728860f270bd0b97555efb5.mockapi.io/courses/${id}`
      );
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditItem(null);
    setShowModal(true);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Course Management</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddClick}>
        Add New Course
      </button>
      <ItemList
        items={items}
        deleteItem={deleteItem}
        setEditItem={handleEditClick}
      />

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editItem ? "Edit Course" : "Add New Course"}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ItemForm
                  addItem={addItem}
                  editItem={editItem}
                  updateItem={updateItem}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
