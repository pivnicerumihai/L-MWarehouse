import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const ItemCard = ({ item, add_item_to_basket }) => {
  const history = useHistory();

  const handle_click = () => {
    history.push({
      pathname: "/produse/" + item.name,
      state: { item: item },
    });
  };
  return (
    <div className="item_card">
      <img src={item.img} alt={item.name} onClick={handle_click} />
      <h3 onClick={handle_click}>{item.name}</h3>
      <span className="stock">
        {item.stoc > 0 ? (
          <>
            <FontAwesomeIcon
              icon={faCheck}
              style={{ color: "green", padding: "0px 5px 0px 3px" }}
              size="sm"
            />
            In stoc
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={faTimesCircle}
              style={{ color: "red", padding: "0px 5px 0px 3px" }}
            />
            Stoc epuizat
          </>
        )}
      </span>
      <div className="item_details">
        <h3 onClick={handle_click}>Pret: {item.price} RON</h3>
        <Button
          onClick={add_item_to_basket}
          className={item.stoc === 0 ? "unavailable" : null}
        >
          Adauga in Cos
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;
