import React from "react";
import { useHistory } from "react-router-dom";

const DropdownElement = ({ name, i }) => {
  const history = useHistory();

  return (
    <div
      key={i}
      className="dropdown_element"
      onClick={() => history.push("/categorii/" + name)}
    >
      <p className="category_name">{name}</p>
    </div>
  );
};

export default DropdownElement;
