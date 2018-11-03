//Definition: HOCs are React components that are NOT representational, 
//but they WRAP other components to add a certain functionality

//Usabiltity: you can get rid of unnecessary HTML elements, 
//like for example the DIV we used to have before in the return of Cockpit.js

const aux = ( props ) => props.children;

export default aux;