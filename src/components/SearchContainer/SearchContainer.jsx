import React from "react";
import "./SearchContainer.scss";
import ItemCard from "../ItemsContainer/ItemCard/ItemCard";

const SearchContainer = ({ results }) => {
  return (
    <div className="search_container">
      {results.length > 0 ? (
        results.map((el, i) => <ItemCard key={i} item={el} />)
      ) : (
        <p className="no_results">Produsul nu a fost gasit!</p>
      )}
    </div>
  );
};

export default SearchContainer;
