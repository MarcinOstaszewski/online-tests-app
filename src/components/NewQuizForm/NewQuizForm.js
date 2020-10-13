import React, { Component } from 'react';
import InputField from '../../components/InputField/InputField';

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

    // createFormFields = (data, key) => {
    //     let func = data.onChange ? data.onChange : "handleChange";
    //     let type = data.type ? data.type : "text";
    //     let width = "col-" + (data.width ? data.width : "12");
    //     return (
    //         <div className={style.formField} key={key}>
    //             <label>
    //                 {data.text}
    //                 <input  type={type} id={data.id} value={this.state[data.id]}
    //                         className={style[width]} onChange={this[func]} />
    //             </label>
    //         </div>
    //     )
    // }

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

        let answersInputs = [];
        for (let i = 1; i <= this.state.answerOptionsNumber; i++ ) {
            let checked = (i === this.state.correctAnswerNumber) ? true : false;
            console.log(checked)
            answersInputs.push(
                <div key={i}>
                    <InputField id="sendQuizDescription"
                                text="Odpowiedź"
                                type="text"
                                width="4"
                                onChange={this.handleAnswerOptionChange}
                                />
                    <InputField id="sendQuizDescription"
                                text="Dobra odp."
                                type="checkbox"
                                width="4"
                                onChange={this.handleAnswerOptionChange}
                                />
                </div>
            )
        }
        // {/* <div className={style.formField} key={i}>
        //     <label>Odpowiedź {i}.
        //         <div className={style.row}>
        //             <input  type="text"
        //                     data-key={i} 
        //                     value={this.state.answerOptionsTexts[i]}
        //                     onChange={this.handleAnswerOptionChange} />
        //             <input  type="checkbox" 
        //                     checked={checked}
        //                     data-key={i}
        //                     onChange={this.handleCorrectAnswerChange}/>
        //         </div>
        //     </label>
        // </div> */}

        console.log(this.state)
        return ( 
            <div className={style.NewQuizForm}>
                <form onSubmit={this.handleSubmit} className={style.form}>
                    <p>Podaj nazwę i opis quizu oraz czas na odpowiedź (0 = nieograniczony).</p>
                    <div className="row">
                        <InputField id="quizName" text="Nazwa quizu" />
                        <InputField id="quizDescription" text="Opis quizu" />
                        <InputField id="timeForEachAnswer" text="Czas na każdą z odpowiedzi" width="4"/>
                        <InputField id="howManyQuestions" text="Ilość pytań" type="number" width="4"/>
                        <InputField id="sendQuizDescription"
                                    // text="."
                                    type="submit"
                                    width="4"/>
                    </div>


                    <div id="questionForm">
                        <div>Pytanie nr<span id="questionNumber">{this.state.questionNumber}</span></div>
                        <InputField id="questionText"
                                    text="Treść pytania"/>
                        <InputField id="answerOptionsNumber"
                                    text="Ilość odpowiedzi do wyboru"
                                    type="number"
                                    onChange={this.handleChangeAnswerOptionsNumber}/>
                        {answersInputs}
                        <input className={style.submit} type="submit" value="Zapisz pytanie"/>
                    </div>

                </form>
            </div>
        );
    }
}
 
export default NewQuizForm;