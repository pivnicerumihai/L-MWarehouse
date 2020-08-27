export const addItemToBasket = (item) => {
  return {
    type: "ADD",
    payload: item,
  };
};

export const removeItemFromBasket = (item) => {
  return {
    type: "REMOVE",
    payload: item,
  };
};

export const descreaseCount = (item) => {
  return {
    type: "DESCREASE",
    payload: item,
  };
};

export const addMoreToBasket = (items) => {
  return {
    type: "ADD_MORE",
    payload: items,
  };
};
