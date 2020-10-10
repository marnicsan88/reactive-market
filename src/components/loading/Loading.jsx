import React from 'react';
import './css/loading.css';

const Loading = ({msg}) => {
    return(
        <div style={{textAlign:"center"}}>
            <h1>{msg}...</h1>
            <div className="loadingio-spinner-ripple-wds2kxijsd8">
                <div className="ldio-14z9oruy10q">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Loading;