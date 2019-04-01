import React, { useState } from 'react';

function PostSideView(post) {
    
    return (
        <div className="post-side-view" className={post ? "open" : "closed"}>

        </div>
    );
}

export default PostSideView;