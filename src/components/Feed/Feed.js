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
        let data = await this.props.firebase.complaints().get().then((querySnapshot) => {

            return querySnapshot.docs.map(doc => {
                let out = doc.data()
                out.id = doc.id;
                return out;
            });
        });
        console.log(data)

        this.setState({
            complaints: data,
            loading: false
        })
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