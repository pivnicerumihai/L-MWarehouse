import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBars,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import NavDropdown from "../NavDropdown/NavDropdown";
import logo from "../../assets/images/logo_file.png";
import "./Navbar.scss";
import useScrollPosition from "../../customHooks/useScrollPosition";
import { useHistory } from "react-router-dom";
import { database } from "../firebase/firebase";
import SearchContainer from "../SearchContainer/SearchContainer";
import { uniqBy } from "lodash";
import useWindowWidth from "../../customHooks/getWindowWidth";
import DropdownElement from "../NavDropdown/DropdownElement";
import { auth } from "../firebase/firebase";
import { logOut } from "../../redux/actions/User";
import { useDispatch } from "react-redux";

const Navbar = ({ email }) => {
  const width = useWindowWidth();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const scrollPosition = useScrollPosition();
  const [searchString, setSearchString] = useState("");
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();
  let position;
  if (scrollPosition < 25) {
    position = "top";
  } else {
    position = "scrolling";
  }

  const categories_array = [
    {
      name: "Articole Imbracaminte",
    },
    {
      name: "Articole Incaltaminte",
    },
    {
      name: "Parfumuri",
      subcategories: [
        "Parfumuri Barbatesti",
        "Parfumuri Dama",
        "Testere Barbatesti",
        "Testere Dama",
      ],
    },
  ];

  if (width > 640) {
    return (
      <nav className={"navbar " + position}>
        <img alt="logo-img" src={logo} className="logo_img" />

        <h3 onClick={() => history.push("/")}>Shop</h3>

        <div
          className="brands"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <h3 className={showDropdown ? "focus" : null}>Categorii</h3>
          {showDropdown ? (
            <NavDropdown
              categories_array={categories_array}
              className="brands_dropdown"
            />
          ) : null}
        </div>
        <form>
          <input
            type="text"
            placeholder="Cauta produse"
            onChange={(e) => {
              setSearchString(e.target.value);
              setSearchResults([]);
              setSearchDropdown(true);
              if (searchString.length > 1) {
                database
                  .ref("magazin")
                  .once("value")
                  .then((list) =>
                    Object.keys(list.val()).map((el) => {
                      Object.keys(list.val()[el]).map((key) => {
                        list.val()[el]["" + key + ""].map((result) => {
                          if (
                            result.name.includes(searchString) ||
                            result.name.toLowerCase().includes(searchString) ||
                            result.name.toUpperCase().includes(searchString)
                          ) {
                            setSearchResults((searchResults) => [
                              result,
                              ...searchResults,
                            ]);
                          }
                        });
                      });
                    })
                  );
              }
            }}
            onBlur={() =>
              setTimeout(() => {
                setSearchDropdown(false);
              }, 200)
            }
          ></input>
          {searchDropdown ? (
            <SearchContainer results={uniqBy(searchResults, (e) => e.name)} />
          ) : null}
          <button className="submit" type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </nav>
    );
  } else {
    return (
      <div className="navbar_mobile">
        <FontAwesomeIcon
          onClick={() => setShowDropdown(true)}
          className="icon"
          icon={faBars}
          size="2x"
        ></FontAwesomeIcon>
        <img alt="logo-img" src={logo} className="logo_img" />
        <FontAwesomeIcon
          onClick={() => history.push("/cos-cumparaturi")}
          className="icon"
          icon={faShoppingCart}
          size="2x"
        ></FontAwesomeIcon>
        {showDropdown ? (
          <div className="mobile_dropdown">
            <div className="dropdown_menu_top">
              <FontAwesomeIcon
                onClick={() => setShowDropdown(false)}
                className="dropdown_icon"
                size="2x"
                icon={faBars}
              />
              <img alt="logo-img" src={logo} className="logo_img" />
              {email !== null ? <h4>{email} </h4> : null}
            </div>
            <div className="dropdown_menu_bottom">
              <h3 onClick={() => history.push("/")}>Shop</h3>
              <h3 onClick={() => history.push("/cos-cumparaturi")}>
                Cos Cumparaturi
              </h3>
              <h2>Categorii</h2>
              {categories_array.map((el, i) => {
                return (
                  <h3>
                    <DropdownElement name={el.name} key={i} />{" "}
                  </h3>
                );
              })}
              <h4 onClick={() => history.push("/categorii/Barbatesti")}>
                Parfumuri Barbatesti
              </h4>

              <h4 onClick={() => history.push("/categorii/Dama")}>Dama</h4>
              <h4 onClick={() => history.push("/categorii/Testere Barbatesti")}>
                Testere Barbatesti
              </h4>
              <h4 onClick={() => history.push("/categorii/Testere Dama")}>
                Testere Dama
              </h4>
              <h2>Setari Cont</h2>
              <div className="account_settings">
                {email !== null ? (
                  <h3 onClick={() => auth.signOut().then(dispatch(logOut()))}>
                    Deconectare
                  </h3>
                ) : (
                  <>
                    <h3 onClick={() => history.push("/login")}>Log In</h3>
                    <h3 onClick={() => history.push("/creeaza-cont")}>
                      Creeaza Cont
                    </h3>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
};

export default Navbar;
