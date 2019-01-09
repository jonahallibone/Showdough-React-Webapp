import React, { Component } from "react"

import { withFirebase } from '../Firebase';
import { Z_DEFAULT_COMPRESSION } from "zlib";

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
            console.log(JSON.stringify(querySnapshot.ids))
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
            <strong>Votes:</strong> {complaint.vote}
          </span>
        </li>
      ))}
    </ul>
  );

export default withFirebase(Feed);