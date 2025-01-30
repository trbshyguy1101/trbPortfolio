import React from 'react';
import './Card.css';

export const Card = ({ title, description }) => {
    return (
        <div className='card-item'>
            <h1>{(title !== "") ? title : "Anonymous says"}</h1>
            <p>{description}</p>
        </div>
    )
}