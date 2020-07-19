import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ShowToday from "./ShowToday";
import WeeklyShow from "./WeeklyShow";
import Favorites from "./Favorites";
import FavorSwitchUnitsites from "../Components/SwitchUnits";
import { SavelocationKeyActions } from "../FilesActions/locationActions";
import { getResFor_5_DayActions } from "../FilesActions/weatherActions";
import { getResDayActions } from "../FilesActions/weatherActions";
import { Container, Button } from "reactstrap";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      listSearch: [],
      value: "",
      Degrees: true,
      FavoritesPage: false,
      resDay: {},
      inputText: "",
      url: "http://dataservice.accuweather.com/locations/v1/cities/search",
      //some key options "cuase it's limited to 50 each"
      key: 'YJAQLfAXA05y1Gy2UZpuGXBQRxvoJkgF',
      // key: "SAdw4bPeci9gHYo8xXZpUaGW1zOxhugD",
      // key: 'luAx3ZTGIAcZVEuRYxEgDyNXotbnAVwG',
      // key:'lu4VnX7PGXYkPNArg5rbpyM2gTIr7k0M'
      // key: 'Nmbq933ANJ55nRdv7odY5KpYSb57LG48',
      // key:'uhVLEFAXZfll1c4vWVZ9UkIsB3lEUAAF'
      // key:"Xqil6zjw7F39Hvh8MJJw3P2ArzvIu7t3"
    };
  }
  componentDidMount() {
    /// turn whenever the site up
    let url =
      "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=uhVLEFAXZfll1c4vWVZ9UkIsB3lEUAAF&q=Tel Aviv";
    axios
      .get(url)
      .then((response) => {
        let resUniqeu = response.data[0].Key; // special key to the city
        this.props.SavelocationKey(response.data[0].LocalizedName, resUniqeu);

        this.handle1hourly(resUniqeu); // with the speical key we get the current weather
        this.handle_5_day(resUniqeu); //  with the special key get result of 5 days
      })
      .catch((error) => {
        // send to error function
        this.onError(error);
      });
  }

  onError = (error) => {
    /// error handler
    if (error) {
      debugger;
      if (error.message === "Cannot read property 'Key' of undefined") {
        alert(`There is no city named : ${this.state.value}  ☺ `); // if there is no such a name alert
      } else {
        alert(error + " => The allowed number of requests has been exceeded"); // if the weather key is limited
      }
    }
  };

  handleChange = (e) => {
    console.log(e);
    if (e !== this.state.value) {
      this.setState({ value: e });
      let item = this.state.listSearch;
      for (let i = 0; i < item.length; i++) {
        if (item[i].LocalizedName == e) {
          this.HandleSearch(e);
          return;
        }
      }
      let url =
        "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
      axios
        .get(`${url}?apikey=${this.state.key}&q=${e}`)
        .then((resp) => {
          let _arr = resp.data;
          this.setState({ listSearch: _arr });
        })
        .catch((error) => {
          // send to error function
          this.onError(error);
        });
    } else alert("english only");
  };
  HandleSearch = (_val) => {
    //turn on when someone in search-box
    this.setState({ FavoritesPage: false });

    let urlForUniqeuId =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    console.log(`${urlForUniqeuId}?apikey=${this.state.key}&q=${_val}`);
    axios
      .get(`${urlForUniqeuId}?apikey=${this.state.key}&q=${_val}`)
      .then((response) => {
        console.log(response);
        let resUniqeu = response.data[0].Key;
        this.props.SavelocationKey(response.data[0].LocalizedName, resUniqeu);

        this.handle1hourly(resUniqeu); // with the special key give current wather
        this.handle_5_day(resUniqeu); //  with the special key give 5 days weather
      })
      .catch((error) => {
        // send to error function
        this.onError(error);
      });
  };

  handle1hourly = (resUniqeu) => {
    let urlFor1hour =
      "http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/";
    axios
      .get(`${urlFor1hour}${resUniqeu}?apikey=${this.state.key}`) //response.data[0]
      .then((response) => {
        this.props.getResDay(response.data[0]);
        this.setState({ resDay: response.data });
      })
      .catch((error) => {
        this.onError(error);
      });
  };

  handle_5_day = (resUniqeu) => {
    let urlFor_5_day =
      "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    axios
      .get(`${urlFor_5_day}${resUniqeu}?apikey=${this.state.key}`) //response.data.DailyForecasts
      .then((response) => {
        this.props.getResFor_5_Day(response.data.DailyForecasts);
      })
      .catch((error) => {
        //send to error function
        this.onError(error);
      });
  };

  SwitchPage = () => {
    this.setState({ FavoritesPage: !this.state.FavoritesPage });
  };

  FarenheitOrCelsius = () => {
    this.setState({ Degrees: !this.state.Degrees });
  };

  render() {
    return (
      <div className="home-page">
        <nav className="navbar navbar-dark bg-dark">
          <Button
            className="btn btn-primary"
            onClick={() => {
              document.location.href = "/";
            }}
          >
            WeatherApp
          </Button>
          <FavorSwitchUnitsites FarenheitOrCelsius={this.FarenheitOrCelsius} />
          {this.state.FavoritesPage ? (
            <Button color="primary" onClick={this.SwitchPage}>
              Home Page
            </Button>
          ) : (
            <Button color="primary" onClick={this.SwitchPage}>
              Favorites
            </Button>
          )}
          <div className="form-inline">
            <input
              value={this.state.value}
              placeholder="Search"
              className="form-control mr-sm-2"
              list="brow"
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/[^A-Za-z  ]/gi, "");
                this.handleChange(value);
              }}
            />
            <datalist id="brow">
              {this.state.listSearch &&
                this.state.listSearch.map((item) => {
                  return (
                    <option key={item.Key} name={item.key}>
                      {" "}
                      {item.LocalizedName}
                    </option>
                  );
                })}
            </datalist>
          </div>
        </nav>
        <br />

        <Container>
          {this.props.day && !this.state.FavoritesPage && (
            <ShowToday
              Degrees={this.state.Degrees}
              resDay={this.props.res_1_day}
              cityName={this.props.cityName}
            />
          )}
          <br />
          <br />
          {!this.state.FavoritesPage && (
            <WeeklyShow Degrees={this.state.Degrees} />
          )}
          {this.state.FavoritesPage && (
            <Favorites
              HandleSearch={this.HandleSearch}
              Degrees={this.state.Degrees}
            />
          )}
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // reading data from redux store
  return {
    cityName: state.locationKeyReducer.cityName,
    citykey: state.locationKeyReducer.citykey,
    res_5: state.weatherReducer.res_5,
    day: state.weatherReducer.day,
    res_1_day: state.weatherReducer.res_1_day,
  };
};
const mapDispatchToProps = (dispatch) => {
  //saving data in redux store
  return {
    //update and save the city we were looking for or the deafult into redux store
    getResDay(resultForDay) {
      dispatch(getResDayActions(resultForDay)); //update and save the city we were looking for or the deafult into redux store
    },
    SavelocationKey(City, Key) {
      dispatch(SavelocationKeyActions(City, Key)); //update and save the key of the specific city in redux store
    },
    getResFor_5_Day(info, info2) {
      //update and save result of 5 days into redux store
      dispatch(getResFor_5_DayActions(info, info2));
    },
  };
};
//trun on the function for reading data and updating data
export default connect(mapStateToProps, mapDispatchToProps)(Home);
