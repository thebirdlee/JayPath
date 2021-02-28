import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Autosuggest from 'react-autosuggest';
import CoursesPrioritized from "./CoursesPrioritized.js";
import Final from "./Final.js";
import FailingPage from "./FailingPage.js";


/* Our top-level component that directs us to different components based on the url */
class App extends Component {
    constructor(props) {
      super(props);
      // initialize to random values to help with debugging
      this.state = {
        focus_area: '/aa',
        semesters_taken: -2
      };
    }

    // value passed in from child component FocusArea
    parentFunction = (data_from_child) => {
      this.setState({
        focus_area: data_from_child
      });
      // some persistence here so that we still have access
      // to the user input as we direct user from one path
      // to another
      sessionStorage.setItem('focus_area', data_from_child);
    };

    // value passed in from child component CurrentSemester
    parentFunction2 = (data_from_child) => {
      this.setState({
        semesters_taken: data_from_child
      });
      sessionStorage.setItem('semesters_taken', data_from_child);
    };

    render() {
      return (
        <Router>
            <Route exact path="/" component={CoursesTaken} />
            <Route exact path="/oops" component = {FailingPage} />
            <Route exact path="/courses_prioritized" component = {CoursesPrioritized} />
            <Route exact path="/current_semester" render={(props) => <SemestersTaken {...props} functionCallFromParent={this.parentFunction2.bind(this)} />} />
            <Route exact path="/focus_area" render={(props) => <FocusArea {...props} functionCallFromParent={this.parentFunction.bind(this)} />}/>
            <Route exact path="/final1" render={(props) => <Final {...props} valueFromParent={sessionStorage.getItem('focus_area')} valueFromParent2={sessionStorage.getItem('semesters_taken')} numSchedule={1}/>} />
            <Route exact path="/final2" render={(props) => <Final {...props} valueFromParent={sessionStorage.getItem('focus_area')} valueFromParent2={sessionStorage.getItem('semesters_taken')} numSchedule={2}/>} />
            <Route exact path="/final3" render={(props) => <Final {...props} valueFromParent={sessionStorage.getItem('focus_area')} valueFromParent2={sessionStorage.getItem('semesters_taken')} numSchedule={3}/>} />
            <Route exact path="/advising" component={() => { window.location.href = 'https://advising.jhu.edu/'; return null;}}></Route>
            <Route exact path="/cs_req" component={() => { window.location.href = 'http://e-catalog.jhu.edu/departments-program-requirements-and-courses/engineering/computer-science/'; return null;}}></Route>
        </Router>
      );
    }
  }


/* First page shown, collects user's previous coursework */
class CoursesTaken extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      question: "What courses have you taken?",
      value: '',
      finalValue: '',
      suggestions: [],
      allCourses: [],
      myCourses: []
    };
  }

  // grabs all valid courses from one api
  callAPI() {
    fetch("http://localhost:5000/api/courses") // apis
      .then(res => res.json())
      .then(res => this.setState({ allCourses: res }))
      .catch(err => err);
  }

  // posts the input courses to another apis
  sendAPI(data) {
    fetch('http://localhost:5000/api/user_info', {
      // mode: 'no-cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => console.log("Success", data))
    .catch(err => console.log("Error:", err));
  }


  componentDidMount() {
    this.callAPI();
    // clears data stored from a previous round
    sessionStorage.clear();
  }

  /* Code below customizes the Autosuggest library */

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.allCourses.filter(ac =>
      ac.CourseTitle.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.CourseTitle;

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion, { query, isHighlighted }) => (
    <div class="span1">
      {suggestion.CourseTitle}
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Unselect entered course
  handleDelete = course => {
    const courses = this.state.myCourses.filter(c => c != course);
    this.setState({
      myCourses: courses
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: this.getSuggestions(value)
      });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
      if (this.state.myCourses.includes(suggestionValue)) {
        alert(suggestionValue + ' added already. Add a different course!');
      } else {
        alert('Successfully added ' + suggestionValue + '!');
        const updatedCourses = this.state.myCourses.concat(suggestionValue);
        this.setState({
          myCourses: updatedCourses,
          value: ""
        });
      }

    }


  render() {
      const { value, suggestions } = this.state;

      // Autosuggest will pass through all these props to the input.
      const inputProps = {
        placeholder: 'course name',
        value,
        onChange: this.onChange
      };


      return (
        <div class="center">
          <h1 class = "question">
            {this.state.question}
          </h1>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionSelected= {this.onSuggestionSelected}
          //renderSuggestionsContainer={this.renderSuggestionsContainer}
          inputProps={inputProps}
        />

        <div class = "coursesBox">
          {this.state.myCourses.map(course => (
            <Course course = {course} onDelete = {() => this.handleDelete(course)}
            />
          ))}
        </div>


        <div class="as_container">
          <fieldset id="fs">
            <Link to="/current_semester" style={{ textDecoration: 'none' }}>
                <button onClick = {() => this.sendAPI(this.state.myCourses)} class="button0" type="button">
                  THAT'S IT!
                  <button class="iconfont">&#xe627;</button>
                </button>
            </Link>
          </fieldset>
        </div>
      </div>
    );
  }
}

// Component for entry of course taken
function Course(props){
  return (
    <div class = "courseItem">
    {props.course}
    <button class = "delete" onClick = {props.onDelete}>x</button>
    </div>
  )
};

class SemestersTaken extends Component {
  constructor(prop) {
    super(prop);

    // note that w could NOT use the focus property that came with
    // CSS because we will be taking 2 inputs from this one page.
    // Additional implementation below to toggle the active status
    // of buttons
    this.state = {
      question1: "Which of the following best describes your current semester(or the one you just completed)?",
      question2: "In which season will you attend your upcoming semester?",
      value: -1,
      // none of the buttons are active upon intialization
      left: [ {value: 'semester 1', active: 'button100'},
      {value: 'semester 3', active: 'button100', },
      {value: 'semester 5', active: 'button100'},
      {value: 'semester 7', active: 'button100'},
      {value: 'high school', active: 'button100'}],

      right: [ {value: 'semester 2', active: 'button100'},
      {value: 'semester 4', active: 'button100'},
      {value: 'semester 6', active: 'button100'},
      {value: 'semester 8', active: 'button100'}],

      // button status for the two buttons in Q2
      bottom_active: ['button100', 'button100'],

      // uses hash tables to make our implementation below
      // less redundant
      hash_table: ['high school', 'semester 1', 'semester 2',
      'semester 3', 'semester 4', 'semester 5',
      'semester 6', 'semester 7', 'semester 8'],
      // using index used in the hash_table to access left & right
      // > 0 belongs to left
      // 1-indexed to avoid confusion over 0
      hash_idx: [5, 1, -1, 2, -2, 3, -3, 4, -4],
    };

    // document.getElementById("thatsIt").setAttribute("disabled", "true");
  }

  sendAPI = () => {
    console.log("posting to api");
    const sem_num = [].concat(this.state.value)
    console.log(JSON.stringify(sem_num));
    fetch('http://localhost:5000/api/semesters_info', {
      // mode: 'no-cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(sem_num)

    }).then(res => res.json())
    .then(data => console.log("Success", data))
    .catch(err => console.log("Error:", err));

    // passing user input value to parent component App
    console.log(this.state.value);
    console.log(this.state.value % 100);
    this.props.functionCallFromParent(this.state.value % 100);
  };

  // handles Q1 input
  // toggles the active status of buttons in Q1
  handleClick = (event) => {
    const e = this.state.hash_table.indexOf(event.target.value); // index in hash_table
    // handles the edge case when the user changes his/her mind by clicking on another button
    this.setState({
      value: this.state.value - (this.state.value % 100) + e
    });

    const left0 = this.state.left;
    const right0 = this.state.right;
    const idx = this.state.hash_idx[e];
    // deactivate all buttons in Q1
    for (var i = 0; i < right0.length; i++) {
      right0[i].active = 'button100';
    }
    for (var i = 0; i < left0.length; i++) {
      left0[i].active = 'button100';
    }
    // activates only the one just selected
    if (idx > 0) { // belongs to left
      left0[idx - 1].active = 'button100 active';
    } else {
      console.log(-1 - idx);
      right0[-1 - idx].active = 'button100 active';
    }
    this.setState ({
      left: left0,
      right: right0
    });

    // we enter here only after Q1 is answered
    // only need to check whether Q2 is answered
    // note that we handles the situation where user answers
    // the 2 questions in reverse order
    if (this.state.value >= 100) {
      document.getElementById('fs').disabled = false;
    }
  };

  // handles Q2 input
  // similar to handleClick
  handleClick2 = (event) => {
    this.setState({
      value: (this.state.value % 100) + parseInt(event.target.value)
    });

    var temp = [];
    if (event.target.value == "100") {
      temp = ['button100 active', 'button100'];
    } else {
      temp = ['button100', 'button100 active'];
    }
    this.setState ({
      bottom_active: temp
    });

    // we enter here only after Q2 is answered
    // only need to check whether Q1 is answered
    // note that we handles the situation where user answers
    // the 2 questions in reverse order
    // this.state.value % 100 == 99 if Q1 unanswered
    // bc this.state.value initialized to -1
    if (this.state.value % 100 < 99) {
      document.getElementById('fs').disabled = false;
    }

  };

  render() {
    // maps lists into their html representation
    const opts_left = this.state.left.map((opt) => {
      return <button
              value= {opt.value}
              class= {opt.active}
              tabindex="0"
              onClick={e => this.handleClick(e)}>
              {opt.value}
              </button>
    });

    const opts_right = this.state.right.map((opt) => {
      return <button
              value= {opt.value}
              class= {opt.active}
              tabindex="0"
              onClick={e => this.handleClick(e)}>
              {opt.value}
              </button>
    });


    // initially the "that's it" button is diabled
    // the 2 handleClick functions will toggle its active status
    return (
      <div class= "center11" >
        <div class="questions_container">
          <h1 class = "question">
            {this.state.question1}
          </h1>
          <div class='row1'>
            <div class='column1'>
            {opts_left}
            </div>
            <div class='column1'>
            {opts_right}
            </div>
          </div>

          <h1 class = "question">
            {this.state.question2}
          </h1>
          <div class='row2'>
            <div class='column1'>
            <button
                value= '100'
                class={this.state.bottom_active[0]}
                tabindex="0"
                onClick={e => this.handleClick2(e)}>
                Fall
                </button>
            </div>
            <div class='column1'>
            <button
                value= '200'
                class={this.state.bottom_active[1]}
                tabindex="0"
                onClick={e => this.handleClick2(e)}>
                Spring
                </button>
            </div>
          </div>
        </div>
        <div class="fs_container">
        <fieldset id="fs" disabled>
        <Link to="/courses_prioritized" style={{ textDecoration: 'none' }}>
          <button onClick = {this.sendAPI.bind(this)} class="button0" type="button">
            THAT'S IT!
            <button class="iconfont">&#xe627;</button>
          </button>
        </Link>

        </fieldset>
      </div>
        </div>
    );
  }
}

  /* Page to ask user what focus area in computer science he/she is in */
  class FocusArea extends Component {
    constructor(prop) {
      super(prop);
      this.state = {
        question: "What is your focus area in computer science?",
        // later on may want to add componentDidMount() to read focus areas from the DB
        left: [
          {name: 'Robotics', redirect: '/r', class: 'button1'},
          {name: 'Big Data', redirect: '/bd', class: 'button2'},
          {name: 'Information Security', redirect:'/is', class: 'button5'}
        ],
        right: [
          {name: 'Computational Biology', redirect: '/cb', class: 'button3'},
          {name: 'Natural Language Processing', redirect: '/nlp', class: 'button4'}
        ],
        value: ''
      };
    }

    // again, we handle the edge case where user does not input
    // a response before proceeding
    handleClick = (event) => {
      this.setState({
        value: event.target.value
      });
      document.getElementById('fs').disabled = false;
    };

    // passing user input value to parent component App
    sendFA = () => {
      console.log(this.state.value);
      //e.preventDefault();
      this.props.functionCallFromParent(this.state.value);
    };



    render() {

      const opts_left = this.state.left.map((opt) => {
        return <button
                value= {opt.redirect}
                class= {opt.class}
                tabindex="0"
                onClick={e => this.handleClick(e)}>
                {opt.name}
                </button>
      });

      const opts_right = this.state.right.map((opt) => {
        return <button
                value= {opt.redirect}
                class= {opt.class}
                tabindex="0"
                onClick={e => this.handleClick(e)}>
                {opt.name}
                </button>
      });

      return (
        <div class="center11">
          <div class="questions_container2">
            <h1 class = "question">
              {this.state.question}
            </h1>
            <div class='row1'>
            <div class='column1'>
            {opts_left}
            </div>
            <div class='column1'>
            {opts_right}
            </div>
          </div>
        </div>
        <div class="fs_container">
          <fieldset id="fs" disabled>
            <Link to="/final1" style={{ textDecoration: 'none' }}>
              <button onClick = {this.sendFA.bind(this)} class="button0" type="button">
                VIEW MY PATH!
                <button class="iconfont">&#xe627;</button>
              </button>
            </Link>
          </fieldset>
        </div>
      </div>
      );
    }
  }
export default App;
