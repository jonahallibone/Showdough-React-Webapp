import React, { Component } from "react"
import ComplaintsList from '../ComplaintsList/ComplaintsList';

import { withFirebase } from '../Firebase';

import './Feed.css';

class Feed extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          complaints: []
        }
    }
    async componentDidMount() {
        this.setState({ loading: true});
        await this.props.firebase.complaints().onSnapshot((querySnapshot) => {

            let data = querySnapshot.docs.map(doc => {
                let out = doc.data()
                out.id = doc.id;
                return out;
            });

            this.setState({
                complaints: data,
                loading: false
            })

            return true;

        });
    }

    componentWillUnmount() {

    }
    

    render() {
        const { complaints, loading } = this.state;

        return (
            <div>
                {loading && <div>Loading ...</div>}
                {<ComplaintsList complaints={complaints}/>}
            </div>
        )
    }
      
}


export default withFirebase(Feed);