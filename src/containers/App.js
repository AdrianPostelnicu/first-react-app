import React, { Component } from 'react';
import cssClasses from './App.css'; //this is how we can JS object containing the CSS classes as properties; magic fdone by css loader that transforms the css file into an object
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = 
    //only available in classes that extend Component from React; 
    //still should use functions as components in order to not have to manipulate the state
    {
      persons: [
        { id: 100, name: "Max", age: 28 },
        { id: 200, name: "Manu", age: 29 },
        { id: 300, name: "Stephanie", age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false
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
      person.age = event.target.value;
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
      this.setState({showPersons: !doesShow});
    }
  render() { 
    let persons = null;

    if(this.state.showPersons) {
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          changedAge={this.ageChangedHandler}/>;
    }

    return (
        <div className={cssClasses.App}>
          <Cockpit 
            appTitle={this.props.title}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
          />
          {persons}
        </div>
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

export default App;