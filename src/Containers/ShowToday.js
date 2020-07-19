import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Icon from "@material-ui/core/Icon";

class ShowToday extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  //  WeeklyShow
  fixTime = (time) => {
    let res = time.slice(0, 19); //Fri Dec 20 2019 02:00
    let d = new Date(res);
    let timeRes = String(d).slice(0, 21);
    let timeArry = timeRes.split(" ");
    return (
      <div>
        <p>{timeArry[4]}</p>
        <p>{timeArry[0]}</p>
        <p>
          {timeArry[2]} {timeArry[1]}{" "}
        </p>
      </div>
    );
  };
  // WeeklyShow
  ShowDegrees = (d) => {
    if (this.props.Degrees) {
      let res = (d - 32) / 1.8;
      let shortNum = res.toString().slice(0, 2);
      return <span>{`${shortNum}° C`}</span>;
    } else return <span>{`${d}° F`}</span>;
  };
  // adding city into loocal
  addTOStorg = () => {
    //save in local storage all data of choosen city
    let WeatherItems = [];
    let item = [
      this.props.cityName,
      this.props.citykey,
      this.props.resDay,
      this.props.res_5,
    ];
    let getWeatherApp = JSON.parse(localStorage.getItem("WeatherApp")); // reading data from local storage

    if (getWeatherApp == null) {
      //if doesnt exist than create new one

      WeatherItems.push(item);
      localStorage.setItem("WeatherApp", JSON.stringify(WeatherItems));
    } else {
      //if exist add data to local storag
      getWeatherApp.push(item);
      localStorage.setItem("WeatherApp", JSON.stringify(getWeatherApp));
    }
    this.setState({});
  };

  // remove from local storage
  removFromStorg = (index) => {
    // get the index of the item you want to delete
    let getWeatherApp = JSON.parse(localStorage.getItem("WeatherApp"));
    getWeatherApp.splice(index, 1); // deleting
    localStorage.setItem("WeatherApp", JSON.stringify(getWeatherApp)); //saving in local storage after deleting
    this.setState({ WeatherItems: getWeatherApp });
  };
  creatBtnAddFunc = () => {
    //creating button of "add" or "delete" with case's if he already in favories or no
    let existingFlag = true;
    let getWeatherApp = JSON.parse(localStorage.getItem("WeatherApp")); // pulling data from local storage
    if (getWeatherApp == null) {
      return (
        <Icon onClick={this.addTOStorg} className="btnAdd">
          add_circle
        </Icon>
      ); // if not than shows "add" button
    } else {
      for (let i = 0; i < getWeatherApp.length; i++) {
        if (getWeatherApp[i][0] === this.props.cityName) {
          // if its in favorites than mark as "heart" and add delete button
          existingFlag = false;
          return (
            <span>
              <i id="like" className="fas fa-heart"></i>
              <br />
              <i
                onClick={(e) => {
                  this.removFromStorg(i);
                }}
                className="far fa-trash-alt"
              ></i>
            </span>
          );
        }
      }
      if (existingFlag) {
        return (
          <Icon onClick={this.addTOStorg} className="btnAdd">
            add_circle
          </Icon>
        );
      }
    }
  };
  //render the page
  render() {
    let creatBtnAdd = this.creatBtnAddFunc();
    return (
      <div className="ShowToday-page">
        <Row>
          <Col md="2" xs="0"></Col>
          <Col md="8" xs="12" className="dayInfo">
            <div className="cityName">{this.props.cityName}</div>

            <Row>
              <Col xs="3" className="time">
                {this.fixTime(this.props.resDay.DateTime)}
              </Col>
              <Col xs="6" className="iconPic">
                <p>
                  <img
                    alt="pic WeatherIcon"
                    src={this.getPic(this.props.resDay.WeatherIcon)}
                    className="imgDay"
                  ></img>
                </p>
              </Col>
              <Col xs="3" className="temp+text">
                <p> {this.ShowDegrees(this.props.resDay.Temperature.Value)} </p>
                <p>{this.props.resDay.IconPhrase}</p>

                {creatBtnAdd}
              </Col>
            </Row>
          </Col>
          <Col md="2" xs="0"></Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // reading data from redux store
  return {
    cityName: state.locationKeyReducer.cityName,
    citykey: state.locationKeyReducer.citykey,
    resDay: state.weatherReducer.res_1_day,
    res_5: state.weatherReducer.res_5,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowToday);
