import React, { useState } from "react";
import ShoppingBasketPreview from "../ShoppingBasketPreview/ShoppingBasketPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faUserCircle,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import "./Topnav.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/User";

const Topnav = ({ email }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [basketDropdown, setBasketDropdown] = useState(false);

  const items_in_basket = useSelector((state) => state.shop.totalItems);

  return (
    <div className="topnav">
      <span>
        <FontAwesomeIcon
          style={{ color: "white", marginRight: "5px" }}
          icon={faPhoneAlt}
          size="lg"
        ></FontAwesomeIcon>
        07XXXXXXXX
      </span>

      <span
        className="my_account"
        onClick={() => {
          setAccountDropdown(!accountDropdown);
          setBasketDropdown(false);
        }}
      >
        <FontAwesomeIcon
          style={{ color: "white", marginRight: "5px" }}
          icon={faUserCircle}
          size="lg"
        ></FontAwesomeIcon>
        {email != null ? email : "Contul meu"}
        {accountDropdown ? (
          <div className="my_account_dropdown">
            {email != null ? (
              <>
                <button>Setari cont</button>
                <button onClick={() => auth.signOut().then(dispatch(logOut()))}>
                  Deconectare cont
                </button>
              </>
            ) : (
              <>
                <button onClick={() => history.push("/login")}>Login</button>
                <button onClick={() => history.push("/creeaza-cont")}>
                  Creeaza Cont
                </button>
              </>
            )}
          </div>
        ) : null}
      </span>
      <div className="basket_icon" style={{ width: "140px" }}>
        <span>
          <FontAwesomeIcon
            style={{ color: "white", marginRight: "5px" }}
            icon={faShoppingCart}
            size="lg"
            onClick={() => {
              setBasketDropdown(!basketDropdown);
              setAccountDropdown(false);
            }}
          ></FontAwesomeIcon>
          <p
            style={{ display: "inline" }}
            onClick={() => {
              setBasketDropdown(!basketDropdown);
              setAccountDropdown(false);
            }}
          >
            Cosul Meu
          </p>
        </span>
        {basketDropdown ? <ShoppingBasketPreview /> : null}
      </div>
      <span className="items_in_basket">{items_in_basket}</span>
    </div>
  );
};

export default Topnav;
