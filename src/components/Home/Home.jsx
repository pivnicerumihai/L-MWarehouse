import React from "react";

import ImageSlider from "../ImageSlider/ImageSlider";
import ItemsContainer from "../ItemsContainer/ItemsContainer";
import "./Home.scss";

const Home = () => {
  return (
    <div className="homepage">
      <ImageSlider />
      <ItemsContainer />
    </div>
  );
};

export default Home;
