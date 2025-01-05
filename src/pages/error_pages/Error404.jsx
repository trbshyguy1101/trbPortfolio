import React from 'react';
import '../error.css';

const Error404 = () => {
    return (
        <div className='error-main'>
            <div className='error-container'>
                <h1 id="frown">:(</h1>
                <h1>404 Page Not Found</h1>
                <p>Oops! The page you are looking for does not exist.</p>
            </div>
        </div>
    );
};

export default Error404;