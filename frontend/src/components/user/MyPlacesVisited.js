import React from 'react';

// redux 
import { connect } from 'react-redux';


class MyPlacesVisited extends React.Component {

    render() {
        return (
            <p>My places visited</p>
        )
    }
}


export default connect(null, {})(MyPlacesVisited);


