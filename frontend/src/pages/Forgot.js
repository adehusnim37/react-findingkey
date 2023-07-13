import '../css/forgot.css'
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import React, {useState} from "react";
import {Link} from "react-router-dom";


const Forgot = () => {
    const [serialValidKey, setSerialValidKey] = useState('');

    const handleFreeActivate = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`/user/free/${serialValidKey}`);
            toast.success(response.data.message);
            console.log(response.data)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="form-containerx" >
            <div className="logo-containerx">
                Serial V Key
            </div>
            <form className="formx" onSubmit={handleFreeActivate}>
                <div className="form-groupx">
                    <label>Serial Number</label>
                    <input type="text" value={serialValidKey} onChange={(e) => setSerialValidKey(e.target.value)}
                           placeholder="Enter your Validation Number"/>
                </div>

                <button className="form-submit-btnx" type="submit">Free Activate</button>
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
            <p className="signup-linkx">
                Don't have an account?
                <Link to={'/store'}>Buy</Link>
            </p>
        </div>
    )
}

export default Forgot;