import React, { useState, useEffect } from 'react';
import "./PostEditor.css";

function PostEditor({match}) {
    const[post, setPost] = useState({});

    useEffect(() => {
        
    }, []);   
    
    return(
        <div className="post-editor">
            <h3>Create New Post</h3>
            <form>
                <div className="input-container col-span-6">
                    <label>Event Title</label>
                    <input type="text" />
                </div>
                <div className="input-container col-span-6">
                    <label>Date</label>
                    <input type="text" />
                </div>
                <div className="input-container col-span-6">
                    <label>Description</label>
                    <textarea />
                </div>
            </form>
        </div>
    )
}

export default PostEditor;