import { FunctionComponent, useState } from "react";

interface QuantifierProps {
    productId: string;
    quantity: number;
    onQuantityChange: (productId: string, newQuantity: number) => void;
}

const Quantifier: FunctionComponent<QuantifierProps> = ({ productId, quantity, onQuantityChange }) => {
    let [currentQuantity, setCurrentQuantity] = useState(quantity);

    let handleIncQuantity = () => {
        let newQuantity = currentQuantity++;
        setCurrentQuantity(newQuantity);
        onQuantityChange(productId, newQuantity)
    };
    let handleDecQuantity = () => {
        if (currentQuantity > 1) {
            let newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            onQuantityChange(productId, newQuantity)
        }
    };


    return (
        <>
            <button className="btn" onClick={handleDecQuantity}>-</button>
            <span>{currentQuantity}</span>
            <button className="btn" onClick={handleIncQuantity}>+</button>        </>
    )
}

export default Quantifier;