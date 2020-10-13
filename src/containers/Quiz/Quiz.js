import React, { Component } from 'react';

import { fbDB } from '../../firebase';

import style from './Quiz.module.css';

class Quiz extends Component {
    state = {
        quizFinished: false,
        quizName: this.props.location.hash.replace('#', '').replace(/-/g, ' '),
        questionNum: 0,
        quizData: null,
        quizSummary: null,
        questionText: null,
        answerOptions: null,
        correctAnswer: null,
        rightAnswer: null,
        wrongAnswers: [],
        animateOut: "",
    }
    results = {};
    timeLeftForAnswer;

    addChosenNumToResults = (number) => {
        if (!this.results[this.state.questionNum]) {
            this.results[this.state.questionNum] = [];
        } else {
            this.results[this.state.questionNum].push(number)
        }
    }

    handleOptionClicked = (number) => {
        this.addChosenNumToResults(number);
        if (number === this.state.correctAnswer) {
            this.showNextQuestion(number);
        } else {
            let wrongAnswers = [...this.state.wrongAnswers]
            wrongAnswers.push(number);
            this.setState({
                wrongAnswers: wrongAnswers
            })
        }
    }

    showNextQuestion = (number) => {
        this.setState({
            rightAnswer: number,
            animateOut: "slideAway"
        })
        clearInterval(this.timeLeftForAnswer);
        const animationDelay = setTimeout(() => {
            this.setState({
                wrongAnswers: [],
                rightAnswer: null,
                animateOut: ""
            })
            if (this.isNextQuestion()) {
                this.updateQuestionData();
            } else {
                this.setState({ quizFinished: true })
            }
            return () => clearTimeout(animationDelay);
        }, 1500)
    }

    isNextQuestion = () => this.state.quizData[`q${this.state.questionNum + 1}`];

    addOnlyWrongAnswers = () => {
        console.log(Object.keys(this.state.answerOptions))
        this.results[this.state.questionNum] = Object.keys(this.state.answerOptions).map((el, i) => {
            return i;
        })
    }

    setTimeLeftForAnswer = () => {
        this.timeLeftForAnswer = setInterval(() => {
            const t = this.state.timeLeft;
            console.log(t, this.state.timeForAnswer)
            if (t > 0) {
                this.setState({ timeLeft: t - 1 })
            } else {
                // DODAÆ
                this.addOnlyWrongAnswers();
                this.showNextQuestion();
            }
        }, 1000);
    }

    updateQuestionData = () => {
        const nextQuestionNum = this.state.questionNum + 1;
        const q = this.state.quizData[`q${nextQuestionNum}`];
        let time;
        if (q.timeForAnswer) {
            time = q.timeForAnswer;
        } else if (q.timeForEachAnswer) {
            time = q.timeForEachAnswer;
        }
        this.setTimeLeftForAnswer(this.timeLeftForAnswer);
        this.setState({
            timeForAnswer: time,
            timeLeft: time,
            questionText: q.questionText,
            answerOptions: q.answerOptions,
            correctAnswer: q.correctAnswer,
            questionNum: nextQuestionNum,
        })
    }

    getQuizData = () => {
        fbDB.ref(`quizGroups/basicQuizes/data/${this.state.quizName}`)
        .once('value').then( snap => {
            const snapshotValue = snap.val()
            console.log(snapshotValue)
            this.setState({
                quizData: snapshotValue.quizData,
                quizSummary: snapshotValue.summary,
                description: snapshotValue.quizDescription,
                timeForEachAnswer: snapshotValue.timeForEachAnswer,
            })
            console.log(this.state.quizData);
        })
    }

    handleQuizzStarted = () => {
        this.updateQuestionData(this.state.quizData, this.state.questionNum)
    }

    countFinalResults = () => {
        let finalResult = 0;
        let maximumPoints = 0;
        let results = Object.keys(this.results).map(key => {
            let maxPoints = Object.keys(this.state.quizData[`q${key}`].answerOptions).length;
            maximumPoints += maxPoints;
            let points = maxPoints - this.results[key].length;
            finalResult += points;
            return  <div key={key}>
                        pyt. {key}. - <span className={style.bigText}>{points} pkt.</span> z {maxPoints} 
                        <span className={style.smallText}>( {this.state.quizData[`q${key}`].questionText} )</span>
                    </div> 
        })
        let percentageResult = Math.floor(finalResult / maximumPoints * 100)
        let resultMessage;
        Object.keys(this.state.quizSummary.resultMessages).forEach( grade => {
            if (grade < percentageResult) {
                resultMessage = this.state.quizSummary.resultMessages[grade];
            } 
            return grade > percentageResult;
        })
        return ( <div className={style.resultLen}>
            <div className={style.resultText}>{resultMessage}</div>
            <span className={style.bigText}>Zdobyte punkty: <span>{finalResult}</span> z {maximumPoints}, czyli <span>{percentageResult}%</span></span>
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
        let timeLeftIndicator = 100;

        if (this.state.timeLeft >= 0) {
            timeLeftIndicator = this.state.timeLeft / this.state.timeForAnswer * 100;
        }
        if (!this.state.quizFinished) {

            name = <div className={style.quizName}>{this.state.quizName}</div>;
            description = <div className={style.description}>{this.state.description}</div>;

            if (this.state.questionNum) {
                topInfo =   <div className={style.question}>
                            <span className={style.questionNumber}>{this.state.questionNum}.</span> {this.state.questionText}
                        </div>
            } else {
                topInfo = <div className={style.startButton}><span onClick={this.handleQuizzStarted}>JESTEM GOTOWY</span></div>
            }

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
                <div className={style.timeLeft} style={{width: `${timeLeftIndicator}%`}}></div>
                <div className={style[this.state.animateOut]}>
                    {topInfo}
                    {bottomInfo}
                </div>
            </div> 
        );
    }
}
 
export default Quiz;
