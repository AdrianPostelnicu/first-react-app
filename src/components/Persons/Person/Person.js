import React, { Component } from 'react';
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
      }
    render () {
        console.log('[Person.js] Inside render()');
        return (
            <Aux> 
                <p onClick={this.props.click}>Hi. I am {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type='text' onChange={this.props.changed} defaultValue={this.props.name}/>
                <input type='number' onChange={this.props.changedAge} defaultValue={this.props.age}/>
            </Aux>
        )
    }
}


export default withClass(Person, cssClasses.Person);