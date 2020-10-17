import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { fbDB } from '../../firebase';

import style from './QuizList.module.css';

class QuizList extends Component {
    state = { list: null }

    componentDidMount() {
        fbDB.ref('quizGroups/basicQuizes/names').once('value').then(snap => {
            const quizes = Object.keys(snap.val())
            this.setState({
                quizes: quizes
            })
        })
    }

    render() { 

        let quizes;
        if (this.state.quizes) {
            quizes =  this.state.quizes.map( (q, i) => {
            return <Link
                to={{
                    pathname: `solve-quiz/`,
                    hash: `${q.replace(/ /g,'-')}`,
                }} 
                key={i}>
                Quiz {i + 1} - {q}</Link>
            })
        } 

        return ( <div className={style.listElement}>
            <h1>Który quiz chciałbyś rozwiązać?</h1>
            <div >
                {quizes}
            </div>
        </div> );
    }
}
 
export default QuizList;

