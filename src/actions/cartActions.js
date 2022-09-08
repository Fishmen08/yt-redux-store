import { 
    CART_LIST_REQUEST,
    CART_LIST_SUCCESS,
    CART_LIST_FAIL,
    CART_ITEM_ADD_REQUEST,
    CART_ITEM_ADD_SUCCESS, 
    CART_ITEM_ADD_FAIL, 
    CART_ITEM_REMOVE_REQUEST, 
    CART_ITEM_REMOVE_SUCCESS, 
    CART_ITEM_REMOVE_FAIL, 
    CART_ITEM_UPDATE_REQUEST,
    CART_ITEM_UPDATE_SUCCESS,
    CART_ITEM_UPDATE_FAIL
} from '../constants/cartConstants';
import db from '../firebase/firebase';
import { collection, getDocs, doc, setDoc, getDoc, deleteDoc, updateDoc } from '@firebase/firestore';
import nextId from 'react-id-generator'

export const listCartItems = () => async (dispatch) => {
    let cartData = [];

    async function getCartItems(db) {
        const cartCol = collection(db, 'cartItems');
        const cartSnapshot = await getDocs(cartCol);
        const cartList = cartSnapshot.docs.map(doc => doc.data());
        return cartList;
    }

    try {
        dispatch({ type: CART_LIST_REQUEST })
        cartData = await getCartItems(db);
        dispatch({ type: CART_LIST_SUCCESS, payload: cartData })
    } catch (error) {
        dispatch({ type: CART_LIST_FAIL, 
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message 
        })

    }
}

export const addProductToCart = (new_cart_item) => async (dispatch) => {
    let newCartProduct = {};
    // npm i react-id-generator
    const newItemId = nextId();
    // const newItemId = Math.ceil(Math.random() * 10000);
    
    try {
        
        dispatch({
            type: CART_ITEM_ADD_REQUEST,
        })
        const cartItemRef = doc(db, 'cartItems', newItemId);
        const docSnap = await getDoc(cartItemRef);

        if (docSnap.exists()) {
            const existItem = docSnap.data();
            alert(existItem.title + ' is already in your cart')
            dispatch({
                type: CART_ITEM_ADD_FAIL,
            })
        } else {
            console.log('No such document');
            await setDoc(doc(db, 'cartItems', newItemId), {
                id: newItemId,
                title: new_cart_item.title,
                price: new_cart_item.price,
                image: new_cart_item.image,
                qtyInCart: 1,
            })
            alert('Item ' + new_cart_item.title + ' has successfully been added ')
            newCartProduct = new_cart_item;
            dispatch({
                type: CART_ITEM_ADD_SUCCESS,
                payload: newCartProduct,
            })
        }

    } catch (error) {
        alert('Failed to add ' + new_cart_item.title + error)
        dispatch({
            type: CART_ITEM_ADD_FAIL,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const updateCartQty = (cart_item_id, qty) => async (dispatch) => {
    try {
        dispatch({
            type: CART_ITEM_UPDATE_REQUEST,
        })
        
        await updateDoc(doc(db, 'cartItems', cart_item_id), {
            qtyInCart: qty,
        })

        dispatch({
            type: CART_ITEM_UPDATE_SUCCESS,
            payload: qty,
        })
    } catch(error) {
        dispatch({
            type: CART_ITEM_UPDATE_FAIL,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const deleteItemFromCart = (cart_item_id) => async (dispatch) => {
    console.log(cart_item_id)
    try {
        dispatch({
            type: CART_ITEM_REMOVE_REQUEST,
        })
        
        await deleteDoc(doc(db, 'cartItems', cart_item_id));
        console.log('delete')
        alert(cart_item_id + ' was successfully removed from the cart');

        

        dispatch({
            type: CART_ITEM_REMOVE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: CART_ITEM_REMOVE_FAIL,
            playload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}