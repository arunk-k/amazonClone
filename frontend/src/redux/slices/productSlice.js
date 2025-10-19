import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsThunk = createAsyncThunk("products/fetchProductsThunk", async () => {
    const response = await axios.get("https://dummyjson.com/products")
    sessionStorage.setItem("apiData", JSON.stringify(response.data.products))
    return response.data.products
})

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: "",
        productDupe: [],
        productPerPage: 10,
        currentPage: 1
    },
    reducers: {
        search(state, action) {
                state.products = state.productDupe.filter(item => item.title.toLowerCase().includes(action.payload.toLowerCase()))
        },
        previousPage(state) {
            if (state.currentPage > 1) {
                state.currentPage -= 1
            }
        },
        nextPage(state) {
            state.currentPage += 1
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
            state.products = action.payload
            state.productDupe = action.payload
            state.loading = false
            state.error = ""
        }),
            builder.addCase(fetchProductsThunk.pending, (state, action) => {
                state.products = []
                state.loading = true
                state.error = ""
            }),
            builder.addCase(fetchProductsThunk.rejected, (state, action) => {
                state.products = []
                state.loading = false
                state.error = "Api Call Failed"
            })
    }
})

export default productSlice.reducer
export const { search, previousPage, nextPage }  = productSlice.actions