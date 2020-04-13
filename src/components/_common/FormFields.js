import React from "react";
import { FormControl } from "react-bootstrap";
import "./FormFields.scss";

const TextFieldGroup = ({ label, id, type, name, placeholder, value, onChange, className, helpBlock }) => (
  <div className="form-field-wrap">
    <FormControl
      bsPrefix={className}
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {helpBlock}
  </div>
);

export default TextFieldGroup;
