// import { FunctionComponent } from "react";
// import { Button, Stack } from "react-bootstrap";
// import { currencyFormat } from "../services/CurrencyFormat";
// import { useShoppingCart } from "../context/ShoppingCartContext";

// interface CartItemProps {

// }

// const CartItem: FunctionComponent<CartItemProps> = () => {
//     const { removeFromCart } = useShoppingCart()
//     const item = storeItems.find(i => i.id === id)
//     if (item == null) return null

//     return (
//         <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
//             <img
//                 src={item.imgUrl}
//                 style={{ width: "125px", height: "75px", objectFit: "cover" }} alt=""
//             />
//             <div className="me-auto">
//                 <div>
//                     {item.name}{" "}
//                     {quantity > 1 && (
//                         <span className="text-muted" style={{ fontSize: ".65rem" }}>
//                             x{quantity}
//                         </span>
//                     )}
//                 </div>
//                 <div className="text-muted" style={{ fontSize: ".75rem" }}>
//                     {currencyFormat(item.price)}
//                 </div>
//             </div>
//             <div> {currencyFormat(item.price * quantity)}</div>
//             <Button
//                 variant="outline-danger"
//                 size="sm"
//                 onClick={() => removeFromCart(item.id)}
//             >
//                 &times;
//             </Button>
//         </Stack>
//     )
// }
// export default CartItem;
import { FunctionComponent } from "react";

interface CartItemProps {

}

const CartItem: FunctionComponent<CartItemProps> = () => {
    return (
        <>
            This is CartItem
        </>
    )
}

export default CartItem;