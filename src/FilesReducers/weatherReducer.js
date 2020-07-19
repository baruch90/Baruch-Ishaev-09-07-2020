//store page here all weather data is updating current and 5days
const initState = {
  res_5: [],
  res_1_day: {},

  // day: false,
  // week: true,
};
const weatherReducer = (state = initState, action) => {
  switch (
    action.type // 5days weather update
  ) {
    case "UPDATE-RES":
      let temp = initState.res_5;
      temp = action.payload;
      state = { ...state, res_5: temp };
      break;

    case "UPDATE-DAY": //current weather update
      let tempDay = initState.res_1_day;
      tempDay = action.payload;
      state = { ...state, res_1_day: tempDay, day: true };

      break;
    default:
      break;
  }
  return state;
};
export default weatherReducer;
