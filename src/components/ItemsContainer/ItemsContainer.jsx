import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard/ItemCard";
import "./ItemsContainer.scss";
import { useDispatch } from "react-redux";
import { addItemToBasket } from "../../redux/actions/Shop";
import { database } from "../firebase/firebase";

const ItemsContainer = () => {
  const dispatch = useDispatch();
  const [itemsArray, setItemsArray] = useState([]);

  useEffect(() => {
    database
      .ref("magazin")
      .once("value")
      .then((list) => {
        Object.keys(list.val()).map((el) => {
          Object.keys(list.val()[el]).map((key) => {
            list.val()[el]["" + key + ""].map((result) => {
              if (result.first_page) {
                setItemsArray((itemsArray) => [result, ...itemsArray]);
              }
            });
          });
        });
      });
  }, []);
  return (
    <div className="items_container">
      <p>Produse recomandate</p>
      <h2>la preturi accesibile</h2>
      <div className="items_collection">
        {itemsArray.map((el, i) => {
          return (
            <ItemCard
              item={el}
              key={i}
              add_item_to_basket={() => dispatch(addItemToBasket(el))}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ItemsContainer;
