// this component take actions in the redux storage

//update the weather for the next 5 days of the choosen city
export const getResFor_5_DayActions = (resultForWeek) => {
  return {
    type: "UPDATE-RES",
    payload: resultForWeek,
  };
};

//update the current weather of the city
export const getResDayActions = (resultForDay) => {
  return {
    type: "UPDATE-DAY",
    payload: resultForDay,
  };
};
