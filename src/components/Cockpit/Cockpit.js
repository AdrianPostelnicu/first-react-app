import React from 'react';
import cssClasses from './Cockpit.css';
import Aux from '../../hoc/Aux';

const cockpit = ( props ) => {
    let assignedClasses = [];
    let btnClass = cssClasses.Button;

    if (props.showPersons) {
        btnClass = [cssClasses.Button, cssClasses.Red].join(' ');
    }

    if(props.persons.length <= 2) {
      assignedClasses.push(cssClasses.red); // class = ['red']
    }
    if(props.persons.length <=1) {
      assignedClasses.push(cssClasses.bold); // class = ['red', 'bold']
    }
    return (
        <Aux>
            <h1>{props.appTitle}</h1> 
            <p className={assignedClasses.join(' ')}>This is really working! </p>
            <button 
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
        </Aux>
    );
};

export default cockpit;