import React from 'react';
import { fbDB } from '../../firebase';
import { basicSample01 } from '../../consts'

const addQuizToDB = (quizData) => {
    const quizName = quizData.quizName
    fbDB.ref(`quizGroups/basicQuizes/data/${quizName}`).set(quizData)
    fbDB.ref(`quizGroups/basicQuizes/names/${quizName}`).set(true)
}

const AddQuizData = () => {
    
    addQuizToDB(basicSample01)

    return ( <div>ADD QUIZ</div> );
}
 
export default AddQuizData;
