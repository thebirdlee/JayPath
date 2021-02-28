import React, {Component} from "react";
import "./App.css";
import Jay from "./assets/bluejay.png";
import Done from "./assets/complete.jpg";
import Core from "./assets/core_icon.png";
import BD from "./assets/data_icon.png";
import NLP from "./assets/lang_icon.png";
import R from "./assets/robotics_icon.png";
import IS from "./assets/info_icon.png";
import CB from "./assets/bio_icon.png";
import E from "./assets/elective.png";
import loader from "./assets/loading.gif"


import {BrowserRouter as Route,Router,Link,Redirect} from "react-router-dom";


/* Compoent for the final recommended schedule */
class Final extends Component {
    constructor(prop) {
        super(prop);
        // inheritated from FocusArea: this.props.valueFromParent
        //inheritated from SemestersTaken: this.props.valueFromParent2
        this.state = {
            schedule: [""],
            semesters: -2,
            focus_area: '',
            numSchedule: 0,
            loading: false
        };
    }

    /* focus area = this.props.valueFromParent
    path # = this.props.valueFromParent2 */
    callAPI() {
        this.setState({loading: true})
        console.log(''.concat('http://localhost:5000/api', this.props.valueFromParent,'/courses',this.props.numSchedule));
        fetch(''.concat('http://localhost:5000/api', this.props.valueFromParent,'/courses',this.props.numSchedule)) 
            .then(res => res.json())
            .then(res => this.setState({schedule: res}))
            .then(() => this.setState({ loading: false }))
            .catch(err => console.log(err));
    }


    getParentpProps() {
        this.setState({
            semesters: parseInt(this.props.valueFromParent2),
            numSchedule: parseInt(this.props.numSchedule)
        });
    }

    componentDidMount() {
        this.getParentpProps();
        this.callAPI();
        document.getElementById('li'.concat(this.props.numSchedule)).className = "active1";
        document.getElementById('a'.concat(this.props.numSchedule)).className = "active1_a";
    }


    /* If empty schedule returned, redirect to the failing page*/
    renderRedirect = () => {
        if (this.state.schedule.length == 0) {
            return <Redirect to = "/oops"/>;
        }
    }

    render() {
        var list;
        if (this.state.loading) {
            list = <div></div>;
        } else if (this.state.schedule.length == 0) {
            return <div>{this.renderRedirect()}</div>
        }
        else {
            // some hash tables to help with mapping below
            const year_hash = ['FRESHMAN YEAR', 'SOPHOMORE YEAR', 'JUNIOR YEAR', 'SENIOR YEAR']
            const icon_hash = [Core, BD, NLP, R, IS, CB, E]; // indices correspond to the hash below
            const track_hash = ['core', 'bd', 'nlp', 'r', 'is', 'cb', 'elective'];
            const list0 = [];
            // loop to define list0 semester by semester
            for (var i = 0; i < 4; i++) {
                const cur = this.state.schedule.slice(6 * i, 6 * i + 3);
                const temp1 = cur.map(d => {
                    return (
                        <button200
                        class="row"
                        tabindex="0"
                        type="button" disabled>
                            <div class="title1">
                            {d.CourseNumber}{": "}{d.CourseTitle}
                            </div>
                            <div class="small_icon_container">
                                <img src={icon_hash[track_hash.indexOf(d.Track)]} class="small_icon"/>
                            </div>
                            <li>{" Credit:"}{d.Credits}</li>
                            <li>{" Instructor:"}{d.Instructor}</li>
                        </button200>
                    );
                });
                const cur2 = this.state.schedule.slice(6 * i + 3, 6 * (i + 1));
                const temp2 = cur2.map(d => {
                    return (
                        <button200
                        tabindex="0"
                        type="button" disabled>
                            <div class="title1">
                            {d.CourseNumber}{": "}{d.CourseTitle}
                            </div>
                            <div class="small_icon_container">
                                <img src={icon_hash[track_hash.indexOf(d.Track)]} class="small_icon"/>
                            </div>
                            <li>{" Credit:"}{d.Credits}</li>
                            <li>{" Instructor:"}{d.Instructor}</li>
                        </button200>
                    );
                });

                // image to indicate that the semester is completed
                const img0 = <div class = 'imgContainer'><img src={Done} style={{height:'35vmin', width:'100%', float: "left"}} /></div>

                // if both semesters in the column are completed
                if (i * 2 + 1 < this.state.semesters) {
                    list0[i] = {details1: img0, details2: img0,
                    semester1: 'Semester '.concat(i * 2 + 1), semester2: 'Semester '.concat(i * 2 + 2),
                    year: year_hash[i]};
                    console.log(list0[i].details1);
                } else if (i * 2 + 1 == this.state.semesters){ // 1/2 completed
                    list0[i] = {details1: img0, details2: temp2,
                        semester1: 'Semester '.concat(i * 2 + 1), semester2: 'Semester '.concat(i * 2 + 2),
                        year: year_hash[i]};
                        console.log(list0[i].details1);
                } else { // both display course recommendation as neither is completed
                    list0[i] = {details1: temp1, details2: temp2,
                        semester1: 'Semester '.concat(i * 2 + 1), semester2: 'Semester '.concat(i * 2 + 2),
                        year: year_hash[i]};
                }

            }

            // maps list0 into html
            list = list0.map(l => {
                return (
                    <div class="schoolyear_Box">
                        {this.renderRedirect()}
                        <div class="hh1">{l.year}</div>
                        <div class="hh2">{l.semester1}</div>
                        <div class="box1">{l.details1}</div>
                        <div class="hh3">{l.semester2}</div>
                        <div class="box2">{l.details2}</div>
                    </div>
                );
            });
        }




            return (
                <div class="wrapper">
                    <div class = "center111">
                        <header id="header">
                            <div class="logo">
                                <img src={Jay} style={{height: "7vmin", float: "left"}} />
                                <h>Jaypath</h>
                                <span>{this.state.numSchedule}</span>
                            </div>
                            <ul></ul>
                            <ul>
                            <li id="li1"><a id="a1" href="/final1">Path 1</a></li>
                            <li id="li2"><a id="a2" href="/final2">Path 2</a></li>
                            <li id="li3"><a id="a3" href="/final3">Path 3</a></li>

                            </ul>
                        </header>

                        <div class="message">
                            <div class="small_icon_container2">
                                <img src={Core} class="small_icon"/>: core requirement
                            </div>
                            <div class="small_icon_container2">
                                <img src={BD} class="small_icon"/>: big data
                            </div>
                            <div class="small_icon_container2">
                                <img src={NLP} class="small_icon"/>: natural language processing
                            </div>
                            <div class="small_icon_container2">
                                <img src={R} class="small_icon"/>: robotics
                            </div>
                            <div class="small_icon_container2">
                                <img src={IS} class="small_icon"/>: information security
                            </div>
                            <div class="small_icon_container2">
                                <img src={CB} class="small_icon"/>: computational biology
                            </div>
                        </div>



                        <div class="container2">
                            {!this.state.loading && list}
                        </div>

                        <div>{this.state.loading &&
                        <div style={{alignItems:"center"}}>
                            <div class = "loading_text">Please wait while we are generating your path.</div>
                            <img src = {loader} class = "loader" />
                            </div>
                            } </div>


                    <div class="link_container">
                        <Link to="/" style={{ textDecoration: 'none'}}>
                            <button class="button_r">
                                <div class="icon_container"><i class="iconfont">&#xe7f9;</i></div>
                            </button>

                        </Link>
                    </div>
                </div>
                </div>

            );
    }
}

export default Final;
