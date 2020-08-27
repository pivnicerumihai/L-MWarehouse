export const setCurrentUser = (user) => {
  return {
    type: "SET",
    payload: user,
  };
};

export const logOut = () => {
  return {
    type: "LOGOUT",
  };
};
