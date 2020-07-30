import React from 'react';
import { NavLink } from 'react-router-dom';

import style from  './Header.module.css'

const Header = (props) => {
    return ( 
        <header className={style.header}>
            <NavLink to="/">List of quizes</NavLink>
            <NavLink to="/add-quiz">Add your own quiz</NavLink>
            <NavLink to="/login">Login</NavLink>
            {/* <NavLink to={{
            pathname:'/solve-quiz',
            search:'?quizName=""',
            hash:'#someName'  
            }}>List of quizes</NavLink> */}
        </header>
    );
}

export default Header;
