import React, { Component } from 'react';

import { fbDB } from '../../firebase';

import style from './Quiz.module.css';

class Quiz extends Component {
    state = {
        quizOn: true,
        quizName: this.props.location.hash.replace('#', '').replace(/-/g, ' '),
        qNum: 1,
        quizData: null,
        questionText: null,
        answerOptions: null,
        correctAnswer: null,
    }
    results = {}

    handleOptionClicked = (...args) => {
        let number = args[0]
        if (!this.results[this.state.qNum]) {
            this.results[this.state.qNum] = [];
        } else {
            this.results[this.state.qNum].push(number)
        }
        if (number === this.state.correctAnswer) {
            this.updateQuestionData(this.state.quizData, 1)
        } else {
            console.log("TU TRZEBA JAKOŚ ODZNACZAĆ ŹLE WYBRANE ODPOWIEDZI")
        }
    }

    updateQuestionData = (data, plusNum) => {
        console.log(this.results)
        if (data[`q${this.state.qNum + plusNum}`]) {
            const q = data[`q${this.state.qNum + plusNum}`];
            this.setState({
                questionText: q.questionText,
                answerOptions: q.answerOptions,
                correctAnswer: q.correctAnswer,
                qNum: this.state.qNum + plusNum,
            })
        } else {
            this.setState({
                quizOn: false
            })
            console.log('KONIEC QUIZU !!!')
        }
    }

    getQuizData = () => {
        fbDB.ref(`quizGroups/basicQuizes/data/${this.state.quizName}`)
        .once('value').then( snap => {
            const sn = snap.val()
            console.log(sn)
            this.setState({
                quizData: sn.quizData,
                summary: sn.summary.summaryText,
                resultMessages: sn.summary.resultMessages,
                description: sn.quizDescription
            })
            this.updateQuestionData(sn.quizData, 0)
        })
    }

    countFinalResults = () => {
        return Object.keys(this.results).map(key => 
            <div className={style.resultLen}>Pytanie {key}. Poprawna odpowiedź za {this.results[key].length + 1}. razem.</div> 
        )
    }

    componentDidMount() {
        this.getQuizData()
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextState.question, this.state.questionText, nextState.answerOptions, this.state.answerOptions)
    //     let ret = nextState.question !== this.state.questionText && nextState.answerOptions !== this.state.answerOptions
    //     console.log(ret)
    //     return ret
    //     // return true;
    // }

    render() {

        let name, description, topInfo, bottomInfo;

        if (this.state.quizOn) {

            name = <div className={style.quizName}>{this.state.quizName}</div>;
            description = <div className={style.description}>{this.state.description}</div>;
            topInfo =   <div className={style.question}>
                            <span className={style.questionNumber}>{this.state.qNum}.</span> {this.state.questionText}
                        </div>

            if (this.state.questionText != null && this.state.answerOptions != null) {
                bottomInfo = Object.keys(this.state.answerOptions).map( (key, i) => {
                    return (
                        <div key={i} 
                            onClick={this.handleOptionClicked.bind(this, key)}
                            answer={key}
                            className={style.answerOption}>
                            <span className={style.answerNumber}>{i+1}.</span> {this.state.answerOptions[key]}
                        </div>
                    )
                })
            }

        } else {
            name = ''; 
            description = '';
            topInfo =  <div className={style.question}>{this.state.summary}</div>
            bottomInfo = this.countFinalResults()
        }

        return ( 
            <div className={style.Quiz}>
                {name}
                {description}
                                
                {topInfo}
                {bottomInfo}
            </div> 
        );
    }
}
 
export default Quiz;