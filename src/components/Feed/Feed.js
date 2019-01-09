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

        let data = await this.props.firebase.complaints().get().then(querySnapshot => {
            let feed = [];
            querySnapshot.forEach(res => feed.push(res.data()));
            console.log(feed)
            this.setState({
                complaints: feed,
                loading: false
            })
        });
    }



    render() {
        const { complaints, loading } = this.state;

        return (
            <div>
                <h1>Feed</h1>
                {loading && <div>Loading ...</div>}
                <ComplaintsList complaints={complaints}/>
            </div>
        )
    }
      
}

const ComplaintsList = ({ complaints }) => (
    <ul>
      {complaints.map(complaint => (
        <li key={complaint.cid}>
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