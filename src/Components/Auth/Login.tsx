import React, { Component } from 'react';
import { IAuthState } from '../../actions/Auth/model';
import { AuthActions } from '../../actions/Auth/action';
import { IApplicationState } from '../../store/state';
import { connect } from 'react-redux';
import Form, { FormItem } from '../Form';
import Modal from '../../Utils/Modals/Modals';


type IProps = IAuthState & typeof AuthActions;

type IState = {
    visible: boolean;
};

class Login extends Component<IProps, IState> {

    constructor(props: IProps) {
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
            <Modal 
            modalForm={true}
            visiblity={this.props.login.open} 
            title="ثبت نام"
             onCancel={this.onCancelHandler} >
                <Form id="x" onSubmit={(values: any, err: any) => {
                    if (err) {
                        console.log("err=>", values, err);
                        return;
                    }
                    // valid
                    console.log("onSub: ", values, err)

                }}>
                    <FormItem 
                    rules={[{ required: true, msg: "Name is require" }]}
                    label="نام: " name="Name" 
                    component={<input className="txtInput" type="text" />} />
                </Form>
            </Modal>
        );
    }
}

// export default Login;
export default connect(
    (state: IApplicationState) => state.auth,
    AuthActions,
)(Login);