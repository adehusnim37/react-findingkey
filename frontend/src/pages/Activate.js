import React, { useState } from 'react';
import '../css/activate.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";

const Activate = () => {
    const [serialKey, setSerialKey] = useState('');
    const [serialVKey, setSerialVKey] = useState('');

    const handleActivate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/activate/${serialKey}/${serialVKey}`);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleActivate}>
                <p className="form-title">Activate your key</p>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter serial number"
                        value={serialKey}
                        onChange={(e) => setSerialKey(e.target.value)}
                    />
                    <span> </span>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter validation key"
                        value={serialVKey}
                        onChange={(e) => setSerialVKey(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit">
                    Activate
                </button>

                <p className="signup-link">
                    No account or key?
                    <Link to={'/store'}>Buy up</Link>
                    <br></br>
                    <Link to={'/activate/free-up'}>Lost or Banned VKey?</Link>
                </p>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Activate;
