//redux store that change the value of city name and city key
// tel-aviv is the deafult city
const initState = {
  cityName: "Tel aviv ",
  citykey: 0,
};

const locationKeyReducer = (state = initState, action) => {
  switch (action.type) {
    case "NEW-CITY":
      state = {
        ...state,
        cityName: action.payload.LocalizedName, // update city name
        citykey: action.payload.Key, // update city key
      };
      break;
    default:
      break;
  }
  return state;
};
export default locationKeyReducer;
