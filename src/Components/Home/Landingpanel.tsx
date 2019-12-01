import React from 'react'
import { IHomeState } from '../../actions/Home/model';
import { HomeActions } from '../../actions/Home/action';
import motor from '../../assets/images/motorcycle.svg'
import carBody from '../../assets/images/carBody.svg'
import thirdparty from '../../assets/images/thirdparty.svg'
import Modal from '../../Utils/Modals/Modals'

type IProps = IHomeState & typeof HomeActions;

type IState = {
    motorModal: boolean
};

class Landingpanel extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state ={
            motorModal: false
        }
    }
    motorModalHandler = (status: boolean) => {
        this.setState({motorModal: status})
    }
    render() {
        return (
            <React.Fragment>
                <Modal 
                // type= "warning"
                onCancel = {() => this.motorModalHandler(false)}
                title="بیمه موتور سیکلت"
                visiblity={this.state.motorModal}>
                    <h1>
                        بیمه بدنه موتور سیکلت
                    </h1>
                </Modal>
                <div className="landingPanel">
                <div className="panel" onClick={() => this.motorModalHandler(true)}>
                    <img className="panelIcon" src={motor} alt="موتور سیکلت"/>
                    <small>موتور سیکلت</small>
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
            </React.Fragment>
        );
    }
}
export default Landingpanel;