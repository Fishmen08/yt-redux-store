import React, { useState } from "react";
import { CartItemStyle, CartDeleteButtonStyle, CartInfoStyle } from "../../styles/CartScreen";
import { updateCartQty, deleteItemFromCart } from "../../actions/cartActions";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(Number(item.qtyInCart));

    const handleCartQty = (item) => {
        dispatch(updateCartQty(item.id, Number(qty)));
        console.log(item, qty);
    }

    const handleCartDelete = (cartItemId) => {
        dispatch(deleteItemFromCart(cartItemId))
    }

    return (
        <CartItemStyle>
            <img 
            src={item.image} 
            alt={item.name} 
            style={{maxWidth: '150px', maxHeight: '150px'}} 
            />
            <CartInfoStyle>
                <h3>Title</h3>
                <h4>{item.title}</h4>
            </CartInfoStyle>
            <CartInfoStyle>
                <h3>Price</h3>
                <h4><span style={{fontWeight: 600, marginRight: '2px'}}>$</span>{item.price}</h4>
            </CartInfoStyle>
            <CartInfoStyle>
                <h3>Qty in Cart</h3>
                <input type='number' min='1' value={qty} 
                    onChange={(e) => {
                        setQty(e.target.value);
                        handleCartQty(item);
                    }} />
            </CartInfoStyle>
            <CartDeleteButtonStyle onClick={() => handleCartDelete(item.id)}>Delete</CartDeleteButtonStyle>
        </CartItemStyle>
    )
}

export default CartItem;