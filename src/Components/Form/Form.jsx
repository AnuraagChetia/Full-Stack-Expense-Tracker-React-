import React from "react";
import "./form.css";
const Form = () => {
  return (
    <div className="formContainer">
      <div className="header">Add transaction</div>
      <form>
        <input type="text" placeholder="Category" />
        <input type="number" placeholder="Amount" className="number-input" />
        <input type="text" placeholder="Note" />
        <div className="formBtn">
          <button type="button" className="cancel">
            Cancel
          </button>
          <button type="submit" className="save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
