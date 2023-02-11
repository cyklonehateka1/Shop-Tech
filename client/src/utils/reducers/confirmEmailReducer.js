const confirmEmailReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        isLoading: true,
        err: null,
        success: false,
      };
    case "SUCCESS":
      return {
        isLoading: false,
        success: true,
        err: null,
      };

    case "FAILURE":
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

export default confirmEmailReducer;
