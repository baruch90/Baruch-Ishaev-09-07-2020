// this component take actions in the redux storage

//function that update in the store city name and city key ,in order to search the current temp and 5 days temp
export const SavelocationKeyActions = (LocalizedName, Key) => {
  return {
    type: "NEW-CITY",
    payload: {
      LocalizedName,
      Key,
    },
  };
};
