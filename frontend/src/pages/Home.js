import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/card.css';
import {Link} from "react-router-dom";

const Home = () => {
    const [showUser, setShowUser] = useState([]);

    useEffect(() => {
        handleShow();
    }, []);

    const handleShow = async () => {
        try {
            const response = await axios.get(`/userAll`);
            setShowUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
            <div className="card-container">
                {showUser.map((result) => (
                    <div className="flip-card" key={result._id}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <p className="title">{result.name}</p>
                            </div>
                            <div className="flip-card-back">
                                <p className="title">Detail User</p>
                                <p>{result.address}</p>
                                <p>{result.phone}</p>
                                <p>{result.serial_number}</p>
                                <Link to={'/activate/device'}>Activate</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

    );
};

export default Home;
