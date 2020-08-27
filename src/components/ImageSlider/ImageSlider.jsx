import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./ImageSlider.scss";
import slider from "../../assets/images/slider-1.jpg";
import slider_2 from "../../assets/images/slider-2.jpg";
import slider_3 from "../../assets/images/slider-3.jpg";

const ImageSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(0);

  const image_slider_array = [slider, slider_2, slider_3];

  const right_click_handler = () => {
    setSliderPosition(sliderPosition + 1);
    if (sliderPosition === image_slider_array.length - 1) {
      setSliderPosition(0);
    }
  };

  const left_click_handler = () => {
    setSliderPosition(sliderPosition - 1);
    if (sliderPosition === 0) {
      setSliderPosition(image_slider_array.length - 1);
    }
  };

  return (
    <div className="slider_container">
      <FontAwesomeIcon
        className="arrow_left"
        size="2x"
        onClick={left_click_handler}
        icon={faArrowLeft}
      />
      <img src={image_slider_array[sliderPosition]} alt="slider_img" />
      <FontAwesomeIcon
        className="arrow_right"
        size="2x"
        icon={faArrowRight}
        onClick={right_click_handler}
      />
    </div>
  );
};

export default ImageSlider;
