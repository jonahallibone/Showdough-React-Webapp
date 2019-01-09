import React, { Component } from "react"

import { withFirebase } from '../Firebase';

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
                <h1>Feed</h1>
                {loading && <div>Loading ...</div>}
                {<ComplaintsList complaints={complaints}/>}
            </div>
        )
    }
      
}

const ComplaintsList = ({ complaints }) => (
    <ul>
      {complaints.map(complaint => (
        <li key={complaint.id}>
          <span>
            <strong>ID:</strong> {complaint.cid}
          </span>
          <span>
            <strong>Complaint:</strong> {complaint.complaint_text}
          </span>
          <span>
            <strong>Votes:</strong> {complaint.votes}
          </span>
          <span>
            <strong>Latitude:</strong> {'loc' in complaint ? complaint.loc.latitude : ""}
          </span>
          <span>
            <strong>Longitude:</strong> {'loc' in complaint ? complaint.loc.longitude : ""}
          </span>
        </li>
      ))}
    </ul>
  );

export default withFirebase(Feed);