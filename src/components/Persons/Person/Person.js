import React from 'react';
import cssClasses from './Person.css'; //in order to import the styling from the Person.css file; it is not automatically included

const person = (props) => {
    return (
        <div className={cssClasses.Person} > 
            <p onClick={props.click}>Hi. I am {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type='text' onChange={props.changed} defaultValue={props.name}/>
            <input type='number' onChange={props.changedAge} defaultValue={props.age}/>
        </div>
    )
}
export default person;