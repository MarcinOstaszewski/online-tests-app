import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Header from './components/Header/Header';
import QuizList from './containers/QuizList/QuizList';
import Quiz from './containers/Quiz/Quiz';
import AddQuizData from './components/AddQuizData/AddQuizData';

import { BrowserRouter, Route} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Route path="/add-quiz" component={AddQuizData} />
      <Route path="/solve-quiz" component={Quiz} />
      <Route path="/" exact component={QuizList} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
