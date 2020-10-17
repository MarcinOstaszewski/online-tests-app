import React from 'react';
import { addNewQuizData } from '../../firebase';
import { quiz0001 } from '../../consts';

import style from './AddQuizData.module.css'

const AddQuizData = () => {
    
    addNewQuizData(quiz0001)

    return ( <div className={style.addButton}>DODAJ QUIZ Z DANYCH TESTOWYCH</div> );
}
 
export default AddQuizData;
