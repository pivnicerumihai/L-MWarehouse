import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addMoreToBasket } from "../../../redux/actions/Shop";
import "./ItemDetails.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const ItemDetails = ({ location }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const item = location.state.item;
  const [description, setDescription] = useState([]);

  useEffect(() => {
    for (const [key, value] of Object.entries(item.Description)) {
      console.log(`${key}:${value}`);
    }

    for (const [key, value] of Object.entries(item.Description)) {
      setDescription((description) => [...description, key + ": " + value]);
    }
  }, [item]);

  return (
    <>
      <div className="item_details_container">
        <div className="left_container">
          <img src={location.state.item.img} />
        </div>
        <div className="right_container">
          <p className="item_name">{location.state.item.name}</p>
          <h2>{location.state.item.quanitity}</h2>
          <h2>
            {" "}
            Pret <br /> {location.state.item.price} RON
          </h2>
          <div className="quanitity">
            <h3>Cantitate:</h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
          </div>
          <Button
            className={item.stoc === 0 ? "unavailable" : null}
            onClick={() => dispatch(addMoreToBasket({ quantity, item: item }))}
          >
            Adauga in Cos
          </Button>
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
        </div>
      </div>
      <>
        <div className="item_description">
          <h2>Descriere {location.state.item.name}</h2>
          <br />
          <div className="item_description_paragraphs">
            <ul>
              {description.map((el, i) => {
                return <li key={i}>{el}</li>;
              })}
            </ul>
          </div>
        </div>
      </>
    </>
  );
};

export default ItemDetails;
