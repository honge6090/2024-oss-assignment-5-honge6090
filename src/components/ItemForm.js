import React, { useState, useEffect } from "react";

const ItemForm = ({ addItem, editItem, updateItem }) => {
  const [formData, setFormData] = useState({
    cname: "",
    prof: "",
    credit: "",
    code: "",
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    }
  }, [editItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      updateItem(formData);
    } else {
      addItem(formData);
    }
    setFormData({ cname: "", prof: "", credit: "", code: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Course Name</label>
        <input
          type="text"
          name="cname"
          className="form-control"
          placeholder="Course Name"
          value={formData.cname}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Professor</label>
        <input
          type="text"
          name="prof"
          className="form-control"
          placeholder="Professor"
          value={formData.prof}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Credits</label>
        <input
          type="text"
          name="credit"
          className="form-control"
          placeholder="Credits"
          value={formData.credit}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Course Code</label>
        <input
          type="text"
          name="code"
          className="form-control"
          placeholder="Course Code"
          value={formData.code}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block mt-3">
        {editItem ? "Update Course" : "Add Course"}
      </button>
    </form>
  );
};

export default ItemForm;
