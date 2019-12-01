import React, { Component } from 'react';
import ModalForm from '../../Utils/Modals/ModalForm';
import { IAuthState } from '../../actions/Auth/model';
import { AuthActions } from '../../actions/Auth/action';
import { IApplicationState } from '../../store/state';
import { connect } from 'react-redux';
import Form, { FormItem, FormFooter } from '../Form';


type IProps = IAuthState & typeof AuthActions;

type IState = {
    visible: boolean;
};

class Login extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            visible: false
        }
    }
    onCancelHandler = () => {
        this.props.toggleLoginModal(false)
    }
    render() {
        return (
            <ModalForm visiblity={this.props.login.open} title="ثبت نام" onCancel={this.onCancelHandler} >
                <Form onSubmit={(values: any, err: any) => {
                    if (err) {
                        console.log("err=>", values, err);
                        return;
                    }
                    // valid
                    console.log("onSub: ", values, err)

                }}>
                    <FormItem rules={[{ required: true, msg: "Name is require" }]} label="User Name" name="Name" component={<input className="txtInput" type="text" />} />
                    
                    <FormFooter>
                    <button className="confirmBtn" type="submit"> تایید </button>
                    <button className="cancelBtn" type="button" onClick={this.onCancelHandler}> بستن </button>
                    </FormFooter>
                </Form>
            </ModalForm>
        );
    }
}

// export default Login;
export default connect(
    (state: IApplicationState) => state.auth,
    AuthActions,
)(Login);