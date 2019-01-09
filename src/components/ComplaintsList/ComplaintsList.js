import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class ComplaintsList extends Component {
    constructor(props) {
        super(props);
        this.db = this.props.firebase.db;
    }

    voteUp(id) {
        let docRef = this.props.firebase.complaints().doc(id);
        return this.db.runTransaction((transaction) => {
            return transaction.get(docRef).then((doc)=> {
                if(!doc.exists) {
                    throw "Document doesn't exist!"
                } 

                var newVote = doc.data().up_vote + 1 || 1;
                transaction.update(docRef, {up_vote: newVote})
            })
        })
    }

    voteDown(id) {
        let docRef = this.props.firebase.complaints().doc(id);
        return this.db.runTransaction((transaction) => {
            return transaction.get(docRef).then((doc)=> {
                if(!doc.exists) {
                    throw "Document doesn't exist!"
                } 

                var newVote = doc.data().down_votes - 1;
                transaction.update(docRef, {down_votes: newVote})
            })
        })
    }

    render() {
        let { complaints } = this.props;

        if (complaints.length < 1) {
            complaints = [];
        }

        return(
            <div id="feed">
                <header className="feed-header">
                    <h4>Feed</h4>
                </header>
                <section className="feed-body">
                    {complaints.map(complaint => (
                        <div className="feed-item" key={complaint.id}>
                            <div>
                                <strong>{complaint.complaint_text}</strong>
                            </div>
                            <div>
                                <strong>Latitude:</strong> {'loc' in complaint ? complaint.loc.latitude : ""}
                            </div>
                            <div>
                                <strong>Longitude:</strong> {'loc' in complaint ? complaint.loc.longitude : ""}
                            </div>
                            <div>
                                <strong>Up votes:</strong> {'up_vote' in complaint ? complaint.up_vote : ""}
                            </div>
                            <div>
                                <strong>Down votes:</strong> {'down_votes' in complaint ? complaint.down_votes : ""}
                            </div>
                            <button onClick={() => {this.voteUp(complaint.id)} }>Up</button>
                            <button onClick={() => {this.voteDown(complaint.id)}}>Down</button>
                        </div>
                    ))}
                </section>
            </div>
        )
    }
}

export default withFirebase(ComplaintsList);