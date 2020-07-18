import React from 'react';
import { Link } from 'react-router-dom';

import style from  './Header.module.css'

const Header = (props) => {
    return ( 
        <header className={style.header}>
            <Link to="/">List of quizes</Link>
            <Link to="/add-quiz">Add your own quiz</Link>
            {/* <Link to={{
            pathname:'/solve-quiz',
            search:'?quizName=""',
            hash:'#someName'  
            }}>List of quizes</Link> */}
        </header>
    );
}

export default Header;
