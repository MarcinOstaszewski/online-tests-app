import React, { Component } from 'react';

import { fbDB } from '../../firebase';

import style from './Quiz.module.css';

class Quiz extends Component {
    state = {
        quizOn: true,
        quizName: this.props.location.hash.replace('#', '').replace(/-/g, ' '),
        qNum: 1,
        quizData: null,
        quizSummary: null,
        questionText: null,
        answerOptions: null,
        correctAnswer: null,
        rightAnswer: null,
        wrongAnswers: [],
        slideAway: ""
    }
    results = {};

    handleOptionClicked = (number) => {
        if (!this.results[this.state.qNum]) {
            this.results[this.state.qNum] = [];
        } else {
            this.results[this.state.qNum].push(number)
        }
        if (number === this.state.correctAnswer) {
            this.setState({
                rightAnswer: number,
                slideAway: "slideAway"
            })
            const timeDelay = setTimeout(() => {
                this.setState({
                    wrongAnswers: [],
                    rightAnswer: null,
                    slideAway: ""
                })
                this.updateQuestionData(this.state.quizData, this.state.qNum + 1);
                return () => clearTimeout(timeDelay);
            }, 850)
        } else {
            let wrongAnswers = [...this.state.wrongAnswers]
            wrongAnswers.push(number);
            this.setState({
                wrongAnswers: wrongAnswers
            })
        }
    }

    updateQuestionData = (data, currQNum) => {
        if (data[`q${currQNum}`]) {
            const q = data[`q${currQNum}`];
            this.setState({
                questionText: q.questionText,
                answerOptions: q.answerOptions,
                correctAnswer: q.correctAnswer,
                qNum: currQNum,
            })
        } else {
            this.setState({
                quizOn: false
            })
        }
    }

    getQuizData = () => {
        fbDB.ref(`quizGroups/basicQuizes/data/${this.state.quizName}`)
        .once('value').then( snap => {
            const sn = snap.val()
            console.log(sn)
            this.setState({
                quizData: sn.quizData,
                quizSummary: sn.summary,
                description: sn.quizDescription
            })
            this.updateQuestionData(sn.quizData, this.state.qNum)
        })
    }

    countFinalResults = () => {
        let finalResult = 0;
        let maximumPoints = 0;
        let results = Object.keys(this.results).map(key => {
            let maxPoints = Object.keys(this.state.quizData[`q${key}`].answerOptions).length;
            maximumPoints += maxPoints;
            let points = maxPoints - this.results[key].length;
            finalResult += points;
            return <div key={key}>pyt. {key}. - <span className={style.bigText}>{points} pkt.</span></div> 
        })
        let percentageResult = Math.floor(finalResult / maximumPoints * 100)
        let resultMessage;
        Object.keys(this.state.quizSummary.resultMessages).forEach( grade => {
            console.log(this.state.quizSummary.resultMessages[grade]);
            if (grade < percentageResult) {
                resultMessage = this.state.quizSummary.resultMessages[grade];
            } 
            return grade > percentageResult;
        })
        console.log(this.state.quizSummary)
        return ( <div className={style.resultLen}>
            <div className={style.resultText}>{resultMessage}</div>
            <span className={style.bigText}>Zdobyte punkty: <span>{finalResult}</span> / {maximumPoints} max. czyli {percentageResult}%</span>
            {results}
        </div>)
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
                    let rightOrWrong = this.state.rightAnswer === key ? "rightAnswer" : "";
                    rightOrWrong = this.state.wrongAnswers.includes(key) ? "wrongAnswer" : rightOrWrong;
                    return (
                        <div key={i}
                            onClick={() => this.handleOptionClicked(key)}
                            answer={key}
                            className={[style.answerOption, style[rightOrWrong]].join(" ")} >
                            <span className={style.answerNumber}>{i+1}.</span> {this.state.answerOptions[key]}
                        </div>
                    )
                })
            }

        } else {
            name = ''; 
            description = '';
            topInfo =  <div className={style.question}>{this.state.quizSummary.summaryText}</div>
            bottomInfo = this.countFinalResults()
        }

        return ( 
            <div className={style.Quiz}>
                {name}
                {description}
                <div className={style[this.state.slideAway]}>
                    {topInfo}
                    {bottomInfo}
                </div>
            </div> 
        );
    }
}
 
export default Quiz;