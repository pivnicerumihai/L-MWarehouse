const INITAL_STATE = {
  username: null,
  email: null,
};

const userReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case "SET": {
      return {
        username: action.payload.username,
        email: action.payload.email,
      };
    }
    case "LOGOUT": {
      return {
        username: null,
        email: null,
      };
    }
    default:
      return {
        state,
      };
  }
};

export default userReducer;
