import React from 'react'

interface IProps {
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
class ModalForm extends React.Component<IProps, IState> {

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
                </div>
            </div>
        )
    }

}

export default ModalForm