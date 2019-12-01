import React from 'react'

interface IProps {
    noHeader?: boolean
    title?: string
    type?: string
    onOk?: () => void
    onCancel: () => void
    visiblity: boolean
    children?: any
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
            }}>

                </div>
                <div className={modalClassName}>
                    {!this.props.noHeader && (
                        <div className="modalHeader">
                            {this.props.title ? this.props.title : "پیغام"}
                        </div>
                    )}
                    <div className="modalBody">
                        {this.props.children}
                    </div>
                    <div className="modalFooter">
                        {this.props.onOk && <button onClick={() => {
                            if (this.props.onOk) {
                                this.props.onOk()
                            }
                        }}>
                            تایید
                    </button>}
                        <button onClick={() => this.closeHandler()}>
                            بستن
                </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Modal