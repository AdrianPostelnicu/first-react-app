import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
  constructor(props) {
    super(props);
    console.log('[Persons.js] Inside contructor.')
  }
  
  componentWillMount() {
    console.log('[Persons.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[Persons.js] Inside componentDidMount()');
  }

  componentWillReceiveProps(nextProps) {
    console.log('[Update Persons.js] Inside componentWillReceiveProps', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Update Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
    //here you can decide wether or not the update process should continue and be reflected in the DOM
    //you can check the received props and state and decide based on that
    //if you know that it should not trigger the DOM update based on the received pros and state you should return false
    return nextProps.persons !== this.props.persons ||
      nextProps.changed !== this.props.changed ||
      nextProps.changedAge !== this.props.changedAge ||
      nextProps.clicked !== this.props.clicked;
  }

  componentWillUpdate(nextProps, nextState) {
    //this will run only if the shouldComponentUpdate returned TRUE
    console.log('[Update Persons.js] Inside componentWillUpdate', nextProps, nextState);

  }

  componentDidUpdate() {
    //this will run only if the shouldComponentUpdate returned TRUE
    console.log('[Update Persons.js] Inside componentDidUpdate', this.props, this.state);
  }

  render () {
    console.log('[Persons.js] Inside render()');
    return this.props.persons.map( (person, index) => {
      return  <Person 
        key={person.id}
        click={() => this.props.clicked( index )}
        name={person.name} 
        age={person.age}
        changed={(event) => {this.props.changed(event, person.id)}} 
        changedAge={(event) => {this.props.changedAge(event, person.id)}} />
    } )
  }
}

export default Persons;
