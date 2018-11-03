import React, { Component } from 'react';
import cssClasses from './App.css'; //this is how we can JS object containing the CSS classes as properties; magic fdone by css loader that transforms the css file into an object
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = 
    //only available in classes that extend Component from React; 
    //still should use functions as components in order to not have to manipulate the state
      {
        persons: [
          { id: 100, name: "Max", age: 28 },
          { id: 200, name: "Manu", age: 29 },
          { id: 300, name: "Stephanie", age: 26 }
        ],
        otherState: 'some other value',
        showPersons: false,
        toggleClickedCounter: 0
      }
    console.log('[App.js] Inside contructor.')
  }
  
  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Update App.js] Inside shouldComponentUpdate', nextProps, nextState);
    //here you can decide wether or not the update process should continue and be reflected in the DOM
    //you can check the received props and state and decide based on that
    //if you know that it should not trigger the DOM update based on the received pros and state you should return false
    return nextState.persons !== this.state.persons ||
      nextState.showPersons !== this.state.showPersons;
    //if we use PureComponent from React instead of Component to extend our class then the check is done by default and 
    //we do not need this lifecycle hook anymore - it knows by default to check for updates and return true or false 
    //depending on having changes or not
  }

  componentWillUpdate(nextProps, nextState) {
    //this will run only if the shouldComponentUpdate returned TRUE
    console.log('[Update App.js] Inside componentWillUpdate', nextProps, nextState);

  }

  componentDidUpdate() {
    //this will run only if the shouldComponentUpdate returned TRUE
    console.log('[Update App.js] Inside componentDidUpdate', this.props, this.state);
  }

    nameChangedHandler = (event, id) => {
      const personIndex = this.state.persons.findIndex(p => {
        return p.id === id;
      });
      //in order to mnot mutate the object from the state we make a copy of it
      const person = {
        ...this.state.persons[personIndex]
      };
      //now i can update the name of the object i modified with the value of the input field
      person.name = event.target.value;
      //and then i want to update the array of objects
      //but first i create a copy of the array of objects in order to not mutate the state
      const persons = [...this.state.persons];
      //now i can go in the array at the person I want to change and update it
      persons[personIndex] = person;
      //finally we update the state with the updated person to which we updated the name
      this.setState( {persons: persons});
    }

    ageChangedHandler = (event, id) => {
      const personIndex = this.state.persons.findIndex(p => {
        return p.id === id;
      });
      const person = {...this.state.persons[personIndex]};
      person.age = Number(event.target.value);
      const persons = [...this.state.persons];
      persons[personIndex] = person;
      this.setState( {persons: persons});
    }

    deletePersonHandler = (personIndex) => {
      //const persons = this.state.persons.slice(); //copies the array from state thus insuring immutability of the state
      //alternative to the above line with ES6
      const persons = [...this.state.persons];
      persons.splice(personIndex, 1);
      this.setState({persons: persons});
    }

    togglePersonsHandler = () => {
      const doesShow = this.state.showPersons;
      //instead of updating the state directly via setState we use a function that receives 2 arguments (prevState, props)
      //it will return the object altering the state, meaning, exactly what setState needs as an argument
      //BUT, the computation is not done on the present state, but on the previous one and it CANNOT be mutated from anywhere else
      //BEST PRACTICE to mutate the state if you have the danger of interfering with other state versions
      this.setState( (prevState, props) => {
        return {
          showPersons: !doesShow, 
          toggleClickedCounter: prevState.toggleClickedCounter + 1
        }
        //toggleClickedCounter: this.state.toggleClickedCounter + 1
        //the this.state (used above) might not be the one expected, because it can get updated at the same time in different part of the app
      } );
    }
  render() { 
    console.log('[App.js] Inside render()');
    let persons = null;

    if(this.state.showPersons) {
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          changedAge={this.ageChangedHandler}/>;
    }

    return (
        <Aux>
          <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
          <Cockpit 
            appTitle={this.props.title}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
          />
          {persons}
        </Aux>
    );

    //the JSX above is actually compiling to the below one
    //for the readability and easier it was invented the JSX sintax
    // return React.createElement(
    //   'div', 
    //   {className: 'App'}, 
    //   React.createElement('h1', null, 'Hi, I am a React App!')
    // );
  }
}

export default withClass(App, cssClasses.App);