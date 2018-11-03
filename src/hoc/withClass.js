//higherr order component - do not manipulate state or anything else in here
import React, {Component} from 'react';

// const withClass = (WrappedComponent, className) => {
//     return ( props ) => (
//         <div className={className}>
//             <WrappedComponent {...props} /> 
//             {/* use spread operator (...) on the props object to pass them to WrappedComponent 
//             in order to be able to dinalmically pass the props of each component being wrapped
//             with the withClass HOC
//             Ensure the dinamicity of the components remains in place, 
//             e.g. updating the text field produces an update on the screen*/}
//         </div>
//     );
// }

//if you need lifecycle hooks or reach to the web, you will need a stateful component
//so you need to return a stateful component as shown below
//accessing the props is done with THIS in front
//it is a class factory, a function that returns a class on demand, so we do not have a name for the class
const withClass = (WrappedComponent, className) => {
    return class extends Component {
        render () {
            return (
                <div className={className}>
                    <WrappedComponent {...this.props} /> 
                </div>
            )
            };
}
}
export default withClass;