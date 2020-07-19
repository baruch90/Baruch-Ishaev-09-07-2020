import React, { Component } from 'react'
import Switch from '@material-ui/core/Switch';

 class SwitchUnits extends Component { // change the name
    constructor(props) {
		super(props);
		this.state = {
      checkedA: true,
    };
    
  }
  //function that switch from celsius to freight
    handleChangeSwitch = name => event => {
        this.setState({ checkedA:!this.state.checkedA });
        this.props.FarenheitOrCelsius()
      };
      
    render() {
        return (
            <div className="switch">
            F
            <Switch
            checked={this.state.checkedA}
            onChange={this.handleChangeSwitch('checkedA')}
            color="primary"
          />
          C
          </div>
        )
    }
}
export default SwitchUnits



