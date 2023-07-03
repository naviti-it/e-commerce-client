import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCartOpen: false,
  isMenuCategoryOpen: true,
  cart: [],
  items: [],
  filteredItems: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
    filterByCategory:(state, action)=>{
        const filteredItems = state.items.filter((item) =>
        item.attributes.category === action.payload);
        return {
          ...state,
          filteredItems:
          filteredItems.length > 0 ? filteredItems : [...state.items]
        };
      
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item]
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id)
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++
        }
        return item
      })
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--
        }
        return item
      })
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen
    },
    setIsMenuCategoryOpen:(state)=>{
      state.isMenuCategoryOpen = !state.isMenuCategoryOpen
    }
  }
})

export const { setItems, addToCart, removeFromCart, increaseCount, decreaseCount, setIsCartOpen, setIsMenuCategoryOpen, filterByCategory } =
  cartSlice.actions

export default cartSlice.reducer
