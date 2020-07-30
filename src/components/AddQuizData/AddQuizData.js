import React from 'react';
import { fbDB } from '../../firebase';
import { quiz0001 } from '../../consts'

const addQuizToDB = (quizData) => {
    const quizName = quizData.quizName
    fbDB.ref(`quizGroups/basicQuizes/data/${quizName}`).set(quizData)
    fbDB.ref(`quizGroups/basicQuizes/names/${quizName}`).set(true)
}

const AddQuizData = () => {
    
    addQuizToDB(quiz0001)

    return ( <div style={{cursor: 'pointer'}}>ADD QUIZ</div> );
}
 
export default AddQuizData;
