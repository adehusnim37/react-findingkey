import cart from '../css/OrderComplete.module.css'
import {Link} from "react-router-dom";

const OrderCompleted = () => {

    return (
        <div>
            <form className={cart.form}>
                <p className={cart.title}>Register </p>
                <p className={cart.message}>Signup now and get full access to our app. </p>
                <div className={cart.flex}>
                    <label>
                        <input required="" placeholder="" type="text" className={cart.input}/>
                        <span>Firstname</span>
                    </label>

                    <label>
                        <input required="" placeholder="" type="text" className={cart.input}/>
                        <span>Lastname</span>
                    </label>
                </div>

                <label>
                    <input required="" placeholder="" type="email" className={cart.input}/>
                    <span>Email</span>
                </label>

                <label>
                    <input required="" placeholder="" type="password" className={cart.input}/>
                    <span>Password</span>
                </label>
                <label>
                    <input required="" placeholder="" type="password" className={cart.input}/>
                    <span>Confirm password</span>
                </label>
                <button className={cart.submit}>Submit</button>
                <p className={cart.signin}>Already have an acount ? <Link>Signin</Link></p>
            </form>
        </div>

    );

}

export default OrderCompleted;