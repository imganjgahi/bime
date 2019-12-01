import React from 'react'
import { AuthActions } from '../../actions/Auth/action';
import { IApplicationState } from '../../store/state';
import { connect } from 'react-redux';
import Login from '../Auth/Login';

const NavBar = (props: any) => {

    return (
        <div className="navbar">
            <Login {...props} />
            <div className="logo">
                لوگو
            </div>
                <ul className="navMenu">
                    <li className="navLink">منو</li>
                </ul>
            <div>
                <span className="auth" onClick={() => props.toggleLoginModal(true)}> ورود / ثبت نام </span>
            </div>
        </div>
    )
}

// export default NavBar
export default connect(
    (state: IApplicationState) => state.auth,
    AuthActions,
)(NavBar);