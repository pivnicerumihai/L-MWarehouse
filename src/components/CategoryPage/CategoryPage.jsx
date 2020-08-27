import React, { useState, useEffect } from "react";
import ItemCard from "../ItemsContainer/ItemCard/ItemCard";
import "./CategoryPage.scss";
import { database } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { addItemToBasket } from "../../redux/actions/Shop";

const CategoryPage = ({ location }) => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/categorii/Articole Imbracaminte") {
      database
        .ref("/magazin/imbracaminte")
        .once("value")
        .then((snapshot) => {
          setItems(snapshot.val());
        });
    } else if (location.pathname === "/categorii/Parfumuri") {
      database
        .ref("/magazin/parfumuri")
        .once("value")
        .then((snapshot) => {
          setItems(snapshot.val());
        });
    } else if (location.pathname === "/categorii/Articole Incaltaminte") {
      database
        .ref("/magazin/incaltaminte")
        .once("value")
        .then((snapshot) => {
          setItems(snapshot.val());
        });
    } else if (location.pathname === "/categorii/Parfumuri Barbatesti") {
      database
        .ref("magazin/parfumuri/Barbatesti")
        .once("value")
        .then((snapshot) => {
          setItems([snapshot.val()]);
        });
    } else if (location.pathname === "/categorii/Parfumuri Dama") {
      database
        .ref("/magazin/parfumuri/Dama")
        .once("value")
        .then((snapshot) => {
          setItems([snapshot.val()]);
        });
    } else if (location.pathname === "/categorii/Testere Barbatesti") {
      database
        .ref("/magazin/parfumuri/Testere Barbatesti")
        .once("value")
        .then((snapshot) => {
          setItems([snapshot.val()]);
        });
    } else if (location.pathname === "/categorii/Testere Dama") {
      database
        .ref("/magazin/parfumuri/Testere Dama")
        .once("value")
        .then((snapshot) => {
          setItems([snapshot.val()]);
        });
    }
  }, [location.pathname]);
  return (
    <div className="category_page">
      {Object.keys(items).map((el, i) => {
        let category_name;
        if (
          location.pathname === "/categorii/Articole Imbracaminte" ||
          location.pathname === "/categorii/Parfumuri" ||
          location.pathname === "/categorii/Articole Incaltaminte"
        ) {
          category_name = el;
        } else if (location.pathname === "/categorii/Barbatesti") {
          category_name = "Parfumuri Barbatesti";
        } else if (location.pathname === "/categorii/Dama") {
          category_name = "Parfumuri Dama";
        } else if (location.pathname === "/categorii/Testere Barbatesti") {
          category_name = "Testere Barbatesti";
        } else if (location.pathname === "/categorii/Testere Dama") {
          category_name = "Testere Dama";
        }
        return (
          <div key={i} className="sub_category">
            <h1>{category_name}</h1>
            <div className="sub_category_items">
              {Object.keys(items[el]).map((key, i) => {
                return (
                  <ItemCard
                    key={i}
                    item={items[el]["" + key + ""]}
                    add_item_to_basket={() =>
                      dispatch(addItemToBasket(items[el]["" + key + ""]))
                    }
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryPage;
