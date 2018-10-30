import React from 'react';
import cssClasses from './Cockpit.css';

const cockpit = ( props ) => {
    let assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = cssClasses.red;
    }

    if(props.persons.length <= 2) {
      assignedClasses.push(cssClasses.red); // class = ['red']
    }
    if(props.persons.length <=1) {
      assignedClasses.push(cssClasses.bold); // class = ['red', 'bold']
    }
    return (
        <div className={cssClasses.Cockpit}> 
            <h1>{props.appTitle}</h1> 
            <p className={assignedClasses.join(' ')}>This is really working! </p>
            <button 
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};

export default cockpit;