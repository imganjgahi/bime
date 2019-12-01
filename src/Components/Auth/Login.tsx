import React, { Component } from 'react';
import ModalForm from '../../Utils/Modals/ModalForm';
import { IAuthState } from '../../actions/Auth/model';
import { AuthActions } from '../../actions/Auth/action';
import { IApplicationState } from '../../store/state';
import { connect } from 'react-redux';
import Form, { FormItem, FormFooter } from '../Form';
import Button from '../../Utils/Buttons/Button';


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
                    <FormItem 
                    rules={[{ required: true, msg: "Name is require" }]} 
                    // initialValue = "Mehran"
                    label="User Name" name="Name" 
                    component={<input className="txtInput" type="text" />} />
                    
                    <FormFooter>
                        <Button type="submit"> تایید </Button>
                        <Button className="danger" type="button" onClick={this.onCancelHandler}> بستن </Button>
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