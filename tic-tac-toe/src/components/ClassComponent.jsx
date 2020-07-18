import React from "react";
import { object } from "prop-types";

class ClassComponent extends React.Component {
    // 1. state의 형태를 정한다
    state = {
        count: 0
    };

    // data = {
    //   count: 0,
    // }
    // 2. props의 default을 정의한다
    static defaultProps = {
        isFemale: false
    };

    componentDidMount() {
        setInterval(() => {
            // console.log("timer", this.state.count, this.data.count);
            // this.setState({count: this.state.count +1});
        }, 1000);
    }

    render() {
        return (
            <>
                <button onClick={this.click1}>버튼1</button>
                <button onClick={this.click2}>버튼2</button>
            </>
        );
    }

    // 멤버 함수 만드는 법 1
    click1() {
        console.log(this);
    }
    // 멤버 함수 만드는 법 2
    click2 = () => {
        console.log(this);
    };
}

export default ClassComponent;
