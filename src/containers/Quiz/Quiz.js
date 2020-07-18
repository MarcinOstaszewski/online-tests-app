import React, { Component } from 'react';

import { fbDB } from '../../firebase';

import style from './Quiz.module.css';

class Quiz extends Component {
    state = {
        question: null,
        answerOptions: null,
    }

    handleOptionClicked = (...args) => {
        let number = args[0]
        console.log(number)
        // e.preventDefault();

    }

    componentDidMount() {
        const quizName = this.props.location.hash.replace('#', '').replace(/-/g, ' ')
        const qNumber = this.props.location.search.replace('?', '')
        // console.log(qNumber)
        fbDB.ref(`quizGroups/basicQuizes/data/${quizName}/questions/q${qNumber}`)
        .once('value').then( snap => {
            this.setState({
                question: snap.val(),
            })
        })
        fbDB.ref(`quizGroups/basicQuizes/data/${quizName}/answerOptions/q${qNumber}`)
        .once('value').then(snap => {
            this.setState({
                answerOptions: snap.val()
            })
        })
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextState.question, this.state.question, nextState.answerOptions, this.state.answerOptions)
    //     let ret = nextState.question !== this.state.question && nextState.answerOptions !== this.state.answerOptions
    //     console.log(ret)
    //     return ret
    //     // return true;
    // }

    render() {
        // console.log(this.state.question, this.state.answerOptions)

        let options 
        if (this.state.question != null && this.state.answerOptions != null) {
            options = Object.keys(this.state.answerOptions).map( (key, i) => {
                return (
                    <div key={i} 
                        onClick={this.handleOptionClicked.bind(this, key)}
                        answer={key}
                        className={style.answerOption}>
                        {i+1}. {this.state.answerOptions[key]}
                    </div>
                )
            })
        }

        return ( 
            <div className={style.Quiz}>
                <div className={style.question}>{this.state.question}</div>
                {options}
            </div> 
        );
    }
}
 
export default Quiz;