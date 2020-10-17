import React from 'react';
import { NavLink } from 'react-router-dom';

import style from  './Header.module.css'

const Header = (props) => {
    return ( 
        <header className={style.header}>
            <NavLink to="/">Lista quizów</NavLink>
            <NavLink to="/new-quiz">Stwórz quiz</NavLink>
            <NavLink to="/add-quiz">Quiz z pliku</NavLink>
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
