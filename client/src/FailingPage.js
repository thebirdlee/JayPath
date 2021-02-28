import React, {Component} from "react";
import "./FP.css";
import CoursesTaken from "./App.js";
import {BrowserRouter as Router, Link} from "react-router-dom";

class FailingPage extends Component {
    constructor(prop) {
        super(prop);
        // inheritated from FocusArea: this.props.valueFromParent
        this.state = {
            schedule: [],
        };
    }

    render() {
        return (
            <div style = {{height: 650}}>
            <h1
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    Oops!
                </h1>


            <div class = "title">
                It seems like that you may not be able to graduate based on the courses you have taken.
                <i class="iconfont">&#xe606;</i>
            </div>

            <div class="container2">
                <div class="container1">
                    <div class = "text1"> Are you sure that you have: </div>
                    <div class = "note"> > Entered all your completed courses correctly?</div>
                    <div class = "note"> > Entered your current grade/year correctly?</div>
                </div>
                <div class = "box"> 
                    Some Academic Advice You May Find Useful:
                    <Link class = "tip1" to = "/advising">
                        > Checkout JHU Academic Advising!
                    </Link>
                    <Link class = "tip1" to = "/cs_req">
                        > Unsure about CS graduation requirement? Click Here!
                    </Link>
                </div>
            </div>
            
            <div class="container3">
                <div class = "text2"> Still unsure?</div>
                    <Link to="/">
                        <button class="button_b" type="button">
                            DO IT AGAIN!
                        </button>
                    </Link>
                </div>

            </div>
        );
    }
}

export default FailingPage;
