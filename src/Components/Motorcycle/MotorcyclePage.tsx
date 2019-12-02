import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import { IMotorcycleState } from '../../actions/Motorcycle/model';
import { MotorCycleActions } from '../../actions/Motorcycle/action';

type IProps = IMotorcycleState & typeof MotorCycleActions

type IState = {
    
};

class MotorcyclePage extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <p>motorcycle</p>
        );
    }
}

// export default MotorcyclePage;
export default connect(
    (state: IApplicationState) => state.motorcycle,
    MotorCycleActions,
)(MotorcyclePage);