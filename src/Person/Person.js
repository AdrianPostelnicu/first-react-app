import React from 'react';
import cssClasses from './Person.css'; //in order to import the styling from the Person.css file; it is not automatically included
//import Radium from 'radium';

const person = (props) => {
    // const myStyle = {
    //    '@media (min-width: 500px)': {
    //        width: '450px'
    //    } 
    // };
    return (
        <div className={cssClasses.Person} 
       // style={myStyle}
        > 
            <p onClick={props.click}>Hi. I am {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type='text' onChange={props.changed} defaultValue={props.name}/>
            <input type='number' onChange={props.changedAge} defaultValue={props.age}/>
        </div>
    )
}

//export default Radium(person);
export default person;