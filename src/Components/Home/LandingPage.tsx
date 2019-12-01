import React from 'react'
import { connect } from "react-redux";
import {IHomeState} from '../../actions/Home/model'
import {HomeActions} from '../../actions/Home/action'
import { IApplicationState } from "../../store/state";

type IProps = IHomeState & typeof HomeActions;

interface IState {
    status : boolean
}

class LandingPage extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            status: false
        }
    }

    render() {
        return (
            <div>
                <p> {this.props.test.num} </p>
                <button onClick={()=> this.props.testAction()} >Go</button>
            </div>
        )
    }
}

export default connect(
    (state: IApplicationState) => state.home,
    HomeActions,
)(LandingPage);