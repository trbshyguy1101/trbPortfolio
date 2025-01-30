import React from "react";
import { Card } from "./Card/Card.jsx";
import './billboard.css';

export const Billboard = () => {
    return (
        <div className='billboard'>
            <div className="billboard-header">
                <h1 style={{
                    fontSize: '4rem'
                    }}>Billboard
                </h1>
                <p style={{
                    fontSize: '1.2rem'
                }}>
                    You can share your thoughts and stuff here if you want to, say something nice :)
                </p>
                <p style={{
                    fontSize: '1.2rem'
                }}>
                    <span style={{
                        color: "rgb(0, 255, 208)"
                    }}>Please</span> keep it clean and respectful, thank you!
                </p>
            </div>
            
            <div className="billboard-body">
                <Card title="" description='This is the first card'/>
                <Card title='Card 2' description='This is the second card'/>
                <Card title='Card 3' description='This is the third card'/>
                <Card title='Card 4' description='This is the fourth card'/>
                <Card title='Card 5' description='This is the fifth card'/>
                <Card title='Card 6' description='This is the sixth card'/>
                <Card title='Card 7' description='This is the seventh card'/>
                <Card title='Card 8' description='This is the eighth card'/>
                <Card title='Card 9' description='This is the ninth card'/>
                <Card title='Card 10' description='This is the tenth card'/>
            </div>
            
        </div>
    );
};