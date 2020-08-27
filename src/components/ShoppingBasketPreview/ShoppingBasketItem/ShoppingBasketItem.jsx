import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const ShoppingBasketItem = ({
  perfume,
  descrease,
  increase,
  removeItemFromBasket,
}) => {
  const items_count = useSelector((state) => state.shop.counts[perfume.name]);
  console.log(perfume);

  return (
    <div className="basket_item">
      <img src={perfume.img} alt="item_in_basket" />
      <div className="price_details_item">
        <p className="item_name">{perfume.name}</p>
        <p className="item_price">Pret pe produs: {perfume.price}</p>
        <p className="total_items_price">
          Pret total: {perfume.price * items_count}
        </p>
      </div>
      <div className="quantity">
        <FontAwesomeIcon size="sm" icon={faArrowUp} onClick={increase} />
        {items_count}
        {items_count > 1 ? (
          <FontAwesomeIcon size="sm" icon={faArrowDown} onClick={descrease} />
        ) : null}
      </div>
      <FontAwesomeIcon
        className="delete_icon"
        icon={faMinusCircle}
        onClick={removeItemFromBasket}
      />
    </div>
  );
};

export default ShoppingBasketItem;
