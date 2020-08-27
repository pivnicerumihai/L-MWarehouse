import React, { useState, Fragment } from "react";
import DropdownElement from "./DropdownElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const NavDropdown = ({ categories_array, className }) => {
  const [subcategoriesMenu, showSubcategoriesMenu] = useState(false);
  return (
    <div className={className}>
      {categories_array.map((el, i) => {
        if (el.subcategories !== undefined) {
          return (
            <Fragment key={i}>
              <div
                className="perfumes"
                onMouseEnter={() => showSubcategoriesMenu(true)}
              >
                <DropdownElement i={i} name={el.name} />
                <FontAwesomeIcon className="arrow_right" icon={faArrowRight} />
                {subcategoriesMenu ? (
                  <div className="subcategories">
                    {el.subcategories.map((el, i) => {
                      return <DropdownElement name={el} key={i} i={i} />;
                    })}
                  </div>
                ) : null}
              </div>
            </Fragment>
          );
        } else {
          return <DropdownElement key={i} i={i} name={el.name} />;
        }
      })}
    </div>
  );
};

export default NavDropdown;
