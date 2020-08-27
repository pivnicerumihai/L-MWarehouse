import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToBasket,
  removeItemFromBasket,
  descreaseCount,
} from "../../redux/actions/Shop";
import { useHistory } from "react-router-dom";
import ShoppingBasketItem from "./ShoppingBasketItem/ShoppingBasketItem";
import "./ShoppingBasketPreview.scss";
import { Button } from "react-bootstrap";

const ShoppingBasketPreview = () => {
  const history = useHistory();
  const basket = useSelector((state) => state.shop.items);
  const total_price = useSelector((state) => state.shop.totalPrice);
  const dispatch = useDispatch();
  return (
    <div className="shopping_basket_preview">
      <div className="shopping_basket_items">
        {basket.map((el, i) => {
          return (
            <ShoppingBasketItem
              key={i}
              perfume={el}
              descrease={() => dispatch(descreaseCount(el))}
              increase={() => dispatch(addItemToBasket(el))}
              removeItemFromBasket={() => dispatch(removeItemFromBasket(el))}
            />
          );
        })}
      </div>
      {basket.length > 0 ? (
        <>
          {" "}
          <h4 className="price">Total: {total_price} RON</h4>
          <div className="basket_buttons">
            <Button onClick={() => history.push("/plaseaza-comanda")}>
              Plaseaza Comanda
            </Button>
            <Button onClick={() => history.push("/cos-cumparaturi")}>
              Detalii comanda
            </Button>
          </div>{" "}
        </>
      ) : (
        <h4 className="price">
          Nu exista niciun produs in cosul de cumparaturi
        </h4>
      )}
    </div>
  );
};

export default ShoppingBasketPreview;
