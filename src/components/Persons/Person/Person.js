import React, { Component } from 'react';
//prop-types: library from FB used to easily validate that the types of the props received are as expected
//especially useful when working in teams
//https://reactjs.org/docs/typechecking-with-proptypes.html
import PropTypes from 'prop-types'; 

import cssClasses from './Person.css'; //in order to import the styling from the Person.css file; it is not automatically included
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';


class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person.js] Inside contructor.')
      }
      
      componentWillMount() {
        console.log('[Person.js] Inside componentWillMount()');
      }
    
      componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()');
        if (this.props.position === 0) {
            //in order to set the focus on the first item, i use position and compare it with 0 - the index in the array of Person from Persons.js
            this.inputElement.focus(); //sets the focus on the input field
        }
      }
    render () {
        console.log('[Person.js] Inside render()');
        return (
            <Aux> 
                <p onClick={this.props.click}>Hi. I am {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input 
                    ref={ ( inp ) => { this.inputElement = inp}} 
                    // ref is available only in stateful Components
                    //     it will create AT RENDER time a new attribute in the class (inputElement)
                    //     because it is created at render() it will be available to be used 
                    //     in all the hooks that run after render
                    //I can use it in order to for example put the focus on a field -> see componentDidMount
                    type='text' 
                    onChange={this.props.changed} 
                    defaultValue={this.props.name}/>
                <input 
                    type='number' 
                    onChange={this.props.changedAge} 
                    defaultValue={this.props.age}/>
            </Aux>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
    changedAge: PropTypes.func
};

export default withClass(Person, cssClasses.Person);