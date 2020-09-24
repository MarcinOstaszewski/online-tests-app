import React, { Component } from 'react';

import Header from './components/Header/Header';
import QuizList from './containers/QuizList/QuizList';
import Quiz from './containers/Quiz/Quiz';
import Login from './components/Login/Login';
import AddQuizData from './components/AddQuizData/AddQuizData';
import NewQuizForm from './components/NewQuizForm/NewQuizForm';

import { BrowserRouter, Route} from 'react-router-dom';


import './App.css';

class App extends Component {

  // state = {
  //   loggedIn: false
  // }

  changeLoginStatus = (user) => {
    console.log(user)
    // this.setState({
    //   loggedIn: user ? false : true
    // })
  }

  render (){
    return (
      <div className="App">
        <React.StrictMode>
          <BrowserRouter>
            <Header displayName={this}/>
            <Route path="/add-quiz" component={AddQuizData} />
            <Route path="/new-quiz" component={NewQuizForm} />
            <Route path="/solve-quiz" component={Quiz} />
            <Route path="/login" component={() => <Login handleLoginStatus={this.changeLoginStatus}/>} />
            <Route path="/" exact component={QuizList} />
          </BrowserRouter>
        </React.StrictMode>
      </div>
    );
  }
}

export default App;