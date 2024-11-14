import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowList = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cname: "",
    prof: "",
    credit: "",
    code: "",
  });
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const errors = {};
    if (!formData.cname.trim()) errors.cname = "Course name is required";
    if (!formData.prof.trim()) errors.prof = "Professor name is required";
    if (!formData.credit.trim()) errors.credit = "Credits are required";
    if (!formData.code.trim()) errors.code = "Course code is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addItem = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://6728860f270bd0b97555efb5.mockapi.io/courses",
        formData
      );
      setItems([...items, response.data]);
      setShowModal(false);
      setFormData({ cname: "", prof: "", credit: "", code: "" });
      setErrors({});
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(
        `https://6728860f270bd0b97555efb5.mockapi.io/courses/${editItem.id}`,
        formData
      );
      setItems(
        items.map((item) => (item.id === editItem.id ? response.data : item))
      );
      setEditItem(null);
      setShowModal(false);
      setFormData({ cname: "", prof: "", credit: "", code: "" });
      setErrors({});
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
    setFormData(item);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditItem(null);
    setFormData({ cname: "", prof: "", credit: "", code: "" });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      updateItem();
    } else {
      addItem();
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Course Management</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddClick}>
        Add New Course
      </button>

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
                onClick={() => handleEditClick(item)}
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
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Course Name</label>
                    <input
                      type="text"
                      name="cname"
                      className="form-control"
                      value={formData.cname}
                      onChange={(e) =>
                        setFormData({ ...formData, cname: e.target.value })
                      }
                    />
                    {errors.cname && (
                      <small className="text-danger">{errors.cname}</small>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Professor</label>
                    <input
                      type="text"
                      name="prof"
                      className="form-control"
                      value={formData.prof}
                      onChange={(e) =>
                        setFormData({ ...formData, prof: e.target.value })
                      }
                    />
                    {errors.prof && (
                      <small className="text-danger">{errors.prof}</small>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Credits</label>
                    <input
                      type="text"
                      name="credit"
                      className="form-control"
                      value={formData.credit}
                      onChange={(e) =>
                        setFormData({ ...formData, credit: e.target.value })
                      }
                    />
                    {errors.credit && (
                      <small className="text-danger">{errors.credit}</small>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Course Code</label>
                    <input
                      type="text"
                      name="code"
                      className="form-control"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                    />
                    {errors.code && (
                      <small className="text-danger">{errors.code}</small>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                  >
                    {editItem ? "Update Course" : "Add Course"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowList;
