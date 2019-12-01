import React from 'react'
import { IHomeState } from '../../actions/Home/model';
import { HomeActions } from '../../actions/Home/action';
import motor from '../../assets/images/motorcycle.svg'
import carBody from '../../assets/images/carBody.svg'
import thirdparty from '../../assets/images/thirdparty.svg'


type IProps = IHomeState & typeof HomeActions;

type IState = {
    
};

class Landingpanel extends React.Component<IProps, IState> {
    state = {  }
    render() {
        return (
            <div className="landingPanel">
                <div className="panel">
                    <img className="panelIcon" src={motor} alt="موتور سیکلت"/>
                    <small>بیمه موتور</small>
                </div>
                <div className="panel">
                    <img className="panelIcon" src={carBody} alt="بدنه"/>
                    <small>بدنه</small>
                </div>
                <div className="panel">
                    <img className="panelIcon" src={thirdparty} alt="شخص ثالث"/>
                    <small>شخص ثالث</small>
                </div>
            </div>
        );
    }
}

export default Landingpanel;