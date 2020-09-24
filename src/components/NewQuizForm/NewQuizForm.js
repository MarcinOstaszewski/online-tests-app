import React, { Component } from 'react';

// import { fbDB } from '../../firebase';

import style from './NewQuizForm.module.css';

class NewQuizForm extends Component {
    state = { 
        newQuizData: {},
        quizName: "",
        quizDescription: "",
        timeForEachAnswer: "",
        questionText: "",
        answerOptionsNumber: 2,
        answerOptionsTexts: {1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: ""},
        answerOptionsInputs: null,
        correctAnswerNumber: null
    }

    formTopData = [
        {
            id: "quizName",
            text: "Nazwa quizu",
        },
        { 
            id: "quizDescription",
            text: "Opis quizu",
        },
        {
            id: "timeForEachAnswer",
            text: "Czas na każdą z odpowiedzi",
            type: "number",
        },
    ]
    formQuestion = {
        id: "questionText",
        text: "Treść pytania",
    }
    howManyAnswers = {
        id: "answerOptionsNumber",
        text: "Ilość odpowiedzi do wyboru",
        type : "number",
        onChange : "handleChangeAnswerOptionsNumber"
    }
    createFormFields = (data, key) => {
        let func = data.onChange ? data.onChange : "handleChange";
        let type = data.type ? data.type : "text";
        return (
            <div className={style.formField} key={key}>
                <label>
                    {data.text}
                    <input type={type} id={data.id}
                        onChange={this[func]}
                        value={this.state[data.id]}
                    />
                </label>
            </div>
        )

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let quizData = {
            quizName: this.state.quizName,
            quizDescription: this.state.quizDescription,
            timeForEachAnswer: this.state.timeForEachAnswer,
        }
        console.log(quizData);
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    handleChangeAnswerOptionsNumber = (e) => {
        let val = e.target.value;
        let id = e.target.id;
        if (val < 2) {
            console.log("Minimalna ilość odpowiedzi to 2.")
        } else if (val > 9){
            console.log("Maksymalna ilość odpowiedzi to 9.")
        } else {
            this.setState({
                [id]: val,
            });
        }
    }

    handleAnswerOptionChange = (e) => {
        let answerOptionsTexts = {...this.state.answerOptionsTexts}
        answerOptionsTexts[e.target.dataset.key] = e.target.value
        console.log(answerOptionsTexts, e.target.value);
        this.setState({
            answerOptionsTexts: answerOptionsTexts
        })
    }

    handleCorrectAnswerChange = (e) => {
        console.log(e.target.dataset.key)
        this.setState({correctAnswerNumber: parseInt(e.target.dataset.key)})
    }

    render() { 
        let quizTop = this.formTopData.map( (data, index) => {
            return this.createFormFields(data, index);
        })
        let questionContent = this.createFormFields(this.formQuestion, 1)
        let answersNumber = this.createFormFields(this.howManyAnswers, 2)

        let answersInputs = [];
        for (let i = 1; i <= this.state.answerOptionsNumber; i++ ) {
            let checked = (i === this.state.correctAnswerNumber) ? true : false;
            console.log(checked)
            answersInputs.push(
                <label key={i}>Odpowiedź {i}. 
                    <input  type="text"
                            data-key={i} 
                            value={this.state.answerOptionsTexts[i]}
                            onChange={this.handleAnswerOptionChange} />
                    <input  type="checkbox" 
                            checked={checked}
                            data-key={i}
                            onChange={this.handleCorrectAnswerChange}
                    />
                </label>
            )
        }

        console.log(this.state)
        return ( 
            <div className={style.NewQuizForm}>
                <form onSubmit={this.handleSubmit} className={style.form}>

                    {quizTop}

                    <div>Pytanie nr<span id="questionNumber"></span></div>

                    {questionContent}
                    {answersNumber}
                    {answersInputs}

                    <input className={style.submit} type="submit" value="Wyślij"/>
                </form>
            </div>
        );
    }
}
 
export default NewQuizForm;