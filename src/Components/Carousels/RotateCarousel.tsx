import * as React from 'react';
import Button from '../../Utils/Buttons/Button';


export interface IProps {

}

export interface IState {
    newDeg: number;
}

class RotateCarousel extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            newDeg: 0
        }
    }

    classToggle = (deg: number) => {
        let newDeg = this.state.newDeg +  deg;
        this.setState({newDeg})
      }
      
    render() {
        return (
            <div>
                <div className="icon-cards">
                <div className="content" style={{ transform: `translateZ(-35vw) rotateY(${this.state.newDeg}deg)` }}>
                    <div className="item"><span className="h1">🙂</span></div>
                    <div className="item"><span className="h1">😊</span></div>
                    <div className="item"><span className="h1">😀</span></div>
                </div>
            </div>
            <Button onClick={() => this.classToggle(120)}> {"<-"} </Button>
            <Button onClick={() => this.classToggle(-120)}> {"->"} </Button>
            </div>
         );
    }
}

export default RotateCarousel;