import React, { useState } from "react";
import "./style.css";

const AddNewTask: React.FC = () => {
  const [formData, setFormData] = useState({});

  return (
    <>
      <div className="container">
        <span className="head">NEW TASK DETAILS</span>
        <span>
          <label htmlFor="#">
            Title
            <input type="text" name="title" />
          </label>
        </span>
        <button>Submit</button>
      </div>
    </>
  );
};

export default AddNewTask;
