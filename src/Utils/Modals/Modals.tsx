import React from 'react'
import Button from '../Buttons/Button';

interface IProps {
    title?: string
    type?: string
    onOk?: () => void
    onCancel: () => void
    visiblity: boolean
    children?: any
    modalForm?: boolean
}
interface IState {
    isActive: boolean;
}
class Modal extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            isActive: false
        }
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.visiblity === false && this.props.visiblity && !this.state.isActive) {
            setTimeout(() => {
                this.setState({ isActive: true })
            }, 200);
        }
    }

    closeHandler = () => {
        this.setState({ isActive: false })
        setTimeout(() => {
            this.props.onCancel()
        }, 200);
    }
    render() {
        let modalClassName = this.props.type ? `simpleModal ${this.props.type}` : "simpleModal";
        modalClassName = this.state.isActive ? modalClassName + ' active' : modalClassName;
        if (!this.props.visiblity) {
            return null
        }

        return (
            <div className="modalContainer">

                <div className="modalBg" onClick={() => {
                    this.closeHandler()
                }}></div>

                <div className={modalClassName}>
                    {this.props.title && (
                        <div className="modalHeader">
                            {this.props.title}
                        </div>
                    )}
                    <div className="modalBody">
                        {this.props.children}
                    </div>
                    <div className="modalFooter">

                        {(this.props.onOk || this.props.modalForm) && (
                            <Button onClick={() => {
                                if (this.props.onOk) {
                                    this.props.onOk()
                                }
                                if(this.props.modalForm){
                                    const btn = document.getElementById("formBtnSubmit")
                                    if (btn) {
                                        btn.click();
                                    }
                                }
                            }}>
                                تایید
                        </Button>
                        )}
                        <Button className="cancel" onClick={() => this.closeHandler()}> بستن </Button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Modal