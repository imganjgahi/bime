import React from 'react'

type IProps = {}

interface IState {
    status : boolean
}

class LandingPage extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            status: false
        }
    }

    render() {
        return (
            <p> Home </p>
        )
    }
}

export default LandingPage;