import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import { IMotorcycleState } from '../../actions/Motorcycle/model';
import { MotorCycleActions } from '../../actions/Motorcycle/action';
import Form, { FormItem } from '../Form';
import Button from '../../Utils/Buttons/Button';

type IProps = IMotorcycleState & typeof MotorCycleActions

type IState = {
    model: string;
    showDate: boolean
};

class MotorcyclePage extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            model: "",
            showDate: false
        }
    }
    onSubmitHandler = (values: Object , err: object | null) => {
        if (err) {
            console.log("err=>", values, err);
            return;
        }
        // valid
        console.log("onSub: ", values, err)
    }
    render() {
        return (
            <div>
                <h1> خدمات بیمه موتور سیکلت</h1>
                <Form 
                onSubmit={
                    (values: object, err: object | null) => {
                        this.onSubmitHandler(values, err)
                        }} >
                    <FormItem name="model" component={<input onChange={(e) => {
                        this.setState({model: e.target.value})
                    }} className="txtInput" type="text" placeholder="مدل" />} />

                    <FormItem name="year" rules={[{required: this.state.model !== "", msg: "must fill"}]} component={<input disabled={this.state.model === ""} className="txtInput" type="text" placeholder="سال ساخت" />} />
                    { this.state.model !== "" && <FormItem name="date" rules={[{required: true, msg: "must fill"}]} component={<input className="txtInput" type="text" placeholder="تاریخ " />} />}

                    <Button type="submit">ـایید</Button>
                    <Button onClick={() => this.setState({showDate: !this.state.showDate})}>تاریخ</Button>
                </Form>
            </div>
        );
    }
}

// export default MotorcyclePage;
export default connect(
    (state: IApplicationState) => state.motorcycle,
    MotorCycleActions,
)(MotorcyclePage);