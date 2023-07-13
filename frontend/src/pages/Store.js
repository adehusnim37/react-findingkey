import {useEffect, useState} from "react";
import CardStore from "../card/CardStore";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Store = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/product"); // Replace with your API endpoint for retrieving products
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addToCart = async (product) => {
        setSelectedProducts([...selectedProducts, product]);
        history("/payments", { state: { product } });
    }


    return (
        <div className="card-container">
            {products.map((product) => (
                <CardStore
                    key={product.id}
                    name={product.nameProduct}
                    description={product.description}
                    price={product.price}
                    AddToCart={() => addToCart(product)}
                />
            ))}
        </div>
    );
};

export default Store;
