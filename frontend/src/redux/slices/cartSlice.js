import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        addToCart(state, action) {
            const existing = state.cart.find(item => item.id == action.payload.id)
            if (existing) {
                state.cart = state.cart.filter(item => item.id != existing.id)
                existing.quantity += 1
                state.cart.push(existing)
                alert("Product Already Exist! Quantity Updated!!")
            }
            else {
                const newItem = {...action.payload,quantity:1}
                newItem.quantity = 1
                state.cart.push(newItem)
                alert("Product Added to Cart!!")
            }
        },
        removeFromCart(state, action) {
            state.cart = state.cart.filter(item => item.id != action.payload)
            alert("Product Removed From Cart")
        },
        incrementQuantity(state, action) {
            const existing = state.cart.find(item => item.id == action.payload)
            // state.cart = state.cart.filter(item => item.id != existing.id)
            existing.quantity += 1
            // state.cart.push(existing)
        },
        decrementQuantity(state, action) {
            const existing = state.cart.find(item => item.id == action.payload)
            if (existing.quantity == 1) {
                state.cart = state.cart.filter(item => item.id != existing.id)
                alert("Product Removed From Cart")
            }
            else {
                // state.cart = state.cart.filter(item => item.id != existing.id)
                existing.quantity -= 1
                // state.cart.push(existing)
            }
        },
        checkOut(state){
            state.cart=[]
        }
    }
})

export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity,checkOut}=cartSlice.actions
export default cartSlice.reducer