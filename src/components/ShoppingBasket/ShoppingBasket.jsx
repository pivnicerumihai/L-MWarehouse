import React from "react";
import "./ShoppingBasket.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToBasket,
  removeItemFromBasket,
  descreaseCount,
} from "../../redux/actions/Shop";
import ShoppingBasketItem from "../ShoppingBasketPreview/ShoppingBasketItem/ShoppingBasketItem";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ShoppingBasket = () => {
  const history = useHistory();
  const basket = useSelector((state) => state.shop.items);
  const total_price = useSelector((state) => state.shop.totalPrice);
  const dispatch = useDispatch();
  return (
    <div className="shopping_basket">
      <div>
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
      <div className="order_details">
        <p className="price">Pret Total Cos: {total_price} RON</p>
        <Button onClick={() => history.push("/plaseaza-comanda")}>
          Plaseaza Comanda
        </Button>
      </div>
    </div>
  );
};

export default ShoppingBasket;
