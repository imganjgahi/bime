import React from 'react'
import { connect } from "react-redux";
import { IHomeState } from '../../actions/Home/model'
import { HomeActions } from '../../actions/Home/action'
import { IApplicationState } from "../../store/state";

import './LandingPage.css'
type IProps = IHomeState & typeof HomeActions;

interface IState {
    status: boolean
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
            <div  className="headerTitle">
                <h1>سامانه مقایسه و خرید آنلاین بیمه</h1>
                <h3>
                    بیمه مورد نظر خودتون رو انتخاب کنید
                </h3>
                <p>
                    در صورت خرید تا ساعت 21 در روزهای عادی و تا ساعت 19 در روزهای پنج‌شنبه و تعطیل، بیمه‌نامه شما همان روز صادر می‌شود.
                </p>
            </div>
        )
    }
}

export default connect(
    (state: IApplicationState) => state.home,
    HomeActions,
)(LandingPage);