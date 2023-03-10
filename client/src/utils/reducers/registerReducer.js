const registerReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_START":
      return {
        isLoading: true,
        err: null,
        success: false,
      };
    case "REGISTER_SUCCESS":
      return {
        isLoading: false,
        success: true,
        err: null,
      };

    case "REGISTER_FAILURE":
      return {
        isLoading: false,
        success: false,
        err: action.payload,
      };

    case "RESET":
      return {
        isLoading: false,
        success: false,
        err: null,
      };
    default:
      return state;
  }
};

export default registerReducer;
