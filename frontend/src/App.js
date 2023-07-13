import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import DetailUser from "./pages/DetailUser";
import Activate from "./pages/Activate";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Forgot from "./pages/Forgot";
import OrderCompleted from "./pages/OrderCompleted";
import Error404 from "./pages/error404";

function App() {
    return (<BrowserRouter>
        <div className={"container"}>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/detailuser'} element={<DetailUser />}/>
                <Route path={'/activate/device'} element={<Activate/>}/>
                <Route path={'/store'} element={<Store/>}/>
                <Route path={'/payments'} element={<Cart />}/>
                <Route path={'/activate/free-up'} element={<Forgot />}/>
                <Route path={'/order/success'} element={<OrderCompleted/>}/>
                <Route path={'/*'} element={<Error404/>}/>
            </Routes>
        </div>
    </BrowserRouter>);
}

export default App;
