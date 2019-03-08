import React from "react";

const FirebaseContext = React.createContext({
    user: {},
    setUser: () => {}
});

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;