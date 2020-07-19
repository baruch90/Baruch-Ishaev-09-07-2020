import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
      WeatherItems: [],
    };
  }
  //when the page is load render the array with data from local storage
  componentDidMount() {
    let getWeatherApp = JSON.parse(localStorage.getItem("WeatherApp"));
    if (getWeatherApp != null) {
      this.setState({ WeatherItems: getWeatherApp });
    }
  }
  //  WeeklyShow
  getPic = (num) => {
    let urlpic;
    if (num < 10) {
      urlpic = `https://developer.accuweather.com/sites/default/files/0${num}-s.png`;
    } else {
      urlpic = `https://developer.accuweather.com/sites/default/files/${num}-s.png`;
    }
    return urlpic;
  };
  //sshow's page WeeklyShow
  ShowDegrees = (d) => {
    if (this.props.Degrees) {
      let res = (d - 32) / 1.8;
      let shortNum = res.toString().slice(0, 2);
      return <span>{`${shortNum}° C`}</span>;
    } else return <span>{`${d}° F`}</span>;
  };
  //delete city from local storage by it position in the array
  removFromStorg = (index) => {
    let getWeatherApp = JSON.parse(localStorage.getItem("WeatherApp"));
    getWeatherApp.splice(index, 1);
    localStorage.setItem("WeatherApp", JSON.stringify(getWeatherApp));
    this.setState({ WeatherItems: getWeatherApp });
  };
  // return to home page
  backHome = (val) => {
    this.props.HandleSearch(val);
  };
  render() {
    let items = this.state.WeatherItems;
    let res = items.map((item, index) => {
      return (
        <div key={index}>
          <Row>
            <Col md="2" xs="0"></Col>
            <Col className="cardWeather" md="8" xs="12">
              <Row>
                <br />
                <br />
                <Col
                  xs="3"
                  onClick={(e) => {
                    this.backHome(item[0]);
                  }}
                >
                  {item[0]}{" "}
                </Col>
                <Col xs="2">
                  <img
                    alt="pic WeatherIcon"
                    src={this.getPic(item[2].WeatherIcon)}
                  />
                </Col>
                <Col xs="2">{this.ShowDegrees(item[2].Temperature.Value)}</Col>
                <Col xs="3">{item[2].IconPhrase} </Col>
                <Col xs="2">
                  <i
                    onClick={(e) => {
                      this.removFromStorg(index);
                    }}
                    className="far fa-trash-alt"
                  ></i>
                </Col>
                <br />
              </Row>
            </Col>

            <Col md="2" xs="0"></Col>
          </Row>
        </div>
      );
    });
    return (
      <div>
        <div className="favorit">My Favorites</div>

        {res}
      </div>
    );
  }
}
export default Favorites;
