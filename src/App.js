import React, { Component } from 'react';
import cssClasses from './App.css'; //this is how we can JS object containing the CSS classes as properties; magic fdone by css loader that transforms the css file into an object
import Person from './Person/Person';
//get rid of Radium to learn css modules
//import Radium, { StyleRoot} from 'radium';

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

    // switchNameHandler = (newName) => {
    //   //console.log("Was clicked!");
    //   //DON't DO THIS to mutate state: this.state.persons[0].name = 'Maximilian'; React does not allow it
    //   //instead use the setState() method available because our class APP, extends Component
    //   this.setState( {
    //     persons: [
    //     { name: newName, age: 28 },
    //     { name: "Manu", age: 29 },
    //     { name: "Stephanie", age: 27 }
    //       ]
    //     } );
    // }
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
    //#inline_styling: use this when you want to style in a small, clear delimited context
    //otherwise use the .css files... e.g. Person.css or App.css
    
    // const myStyle = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer'
    //   //get rid of Radium to learn css modules
    //   //, 
    //   // ':hover': {
    //   //   backgroundColor: 'lightgreen',
    //   //   color: 'black'
    //   // }
    // }
    //#inline_styling
    
    let persons = null;
    let btnClass = '';

    if(this.state.showPersons) {
      persons = (
        <div> 
          {this.state.persons.map((person, index) => {
            //rendering lists common pattern by using the map function of JS
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => {this.nameChangedHandler(event, person.id)}} 
              changedAge={(event) => {this.ageChangedHandler(event, person.id)}}/>
          })}
      </div> 
      );
      btnClass = cssClasses.Red;
      //myStyle.backgroundColor = 'red';
      //get rid of Radium to learn css modules
      //below i am overwritting the pseudo css class; we use a radium feature
      //radium makes it work
      // myStyle[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // };
    }

    let classes = [];
    if(this.state.persons.length <= 2) {
      classes.push(cssClasses.red); // class = ['red']
    }
    if(this.state.persons.length <=1) {
      classes.push(cssClasses.bold); // class = ['red', 'bold']
    }

    return (
      ////get rid of Radium to learn css modules
      // <StyleRoot> //this is the wrapper component from Radium
        <div className={cssClasses.App}>
        <h1>Hi, I am a React App!</h1> 
        <p className={classes.join(' ')}>This is really working! </p>
        <button 
            className={btnClass}
            //onClick={() => this.switchNameHandler('Maximilian!!!')}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
        </div>
      // </StyleRoot>
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
//get rid of Radium to learn css modules
//export default Radium(App); //higher order component = a component wrapping your component injecting some exta features/functionalities to your component
