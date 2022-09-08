import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { CartContainerStyle, PageHeading } from "../../styles/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import { listCartItems } from "../../actions/cartActions";

// const cartItems = [{
//     title:  'Amazing Shirt',
//     price: 200,
//     image: 'https://images.unsplash.com/photo-1662436267861-784747134719?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1271&q=80',
//     qtyInCart: 1,
//     },
// ]

const CartScreen = () => {
    const dispatch = useDispatch();

    const cartItemsList = useSelector((state) => state.cartItemsList)

    const { loading, error, cartItems} = cartItemsList;

    useEffect(() => {
        dispatch(listCartItems())
    }, [dispatch])

    return (
        <div>
            {loading ? 
            (<div>Loading...</div>) :
            error ? (<div>{error}</div>) : 
            <>
            <PageHeading>Cart</PageHeading>
            <CartContainerStyle>
                {cartItems.map(item => {
                    return <CartItem key={item.title} item={item} />
                })}
            </CartContainerStyle>
            </>
            }
        </div>
    )
}

export default CartScreen;