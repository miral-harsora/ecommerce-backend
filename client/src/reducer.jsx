import { ADD_TO_CART, ADD_TO_WISHLIST, GET_CART, GET_CATEGORIES, GET_CATEGORIZED_PRODUCTS, GET_PRODUCTS, GET_SINGLE_PRODUCT, GET_WISHLIST, REMOVE_FROM_CART, REMOVE_FROM_WL, SEARCH_PROD } from "./actionType"

const INIT_STATE = {
    products: [],
    categories: [],
    filtered: [],
    product: [],
    cart: [],
    wishlist: []
}

export const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS: {
                       return { ...state, products: action.payload.httpResponse.filter((product) => (product.category != "motorcycle" && product.category != "vehicle" && product.category != "groceries")) }
        }
        case GET_CATEGORIES: {
            return { ...state, categories: action.payload.httpResponse.filter((cat) => (cat != "motorcycle" && cat != "vehicle")) }
        }
        case GET_CATEGORIZED_PRODUCTS: {
            return { ...state, filtered: action.payload.httpResponse.filter((product) => (product.category != "motorcycle" && product.category != "vehicle" && product.category != "groceries")) }
            //return { ...state, filtered: state.products.filter((product) => product.category == action.payload) }
        }
        case SEARCH_PROD: {
            const searchTerm = action.payload.trim().toLowerCase();
            const search = state.products.filter(product =>
                product.title.toLowerCase().includes(searchTerm)
            );
            console.log(search);
            return { ...state, filtered: search };
        }
        case GET_SINGLE_PRODUCT: {
           // const single = state.products.find((product) => (product.id == action.payload))
            ///console.log("single " + JSON.stringify(state.products.find((product) => (product.id == action.payload))))
            const single = state.products.find(prod=>{
                //console.log("one prod = "+JSON.stringify(prod))
                return prod.id==action.payload
              
            })
            console.log("find "+JSON.stringify(single))
            return { ...state, product: state.products.find((product) => (product.id == action.payload)) }
        }
        // case ADD_TO_CART: {
        //     // if (state.cart.some(item => item.id === action.payload.id)) {
        //     //     // Product exists: update the quantity
        //     //     return {
        //     //         ...state,
        //     //         cart: state.cart.map(item =>
        //     //             item.id === action.payload.id
        //     //                 ? { ...item, quantity: item.quantity + action.payload.quantity }
        //     //                 : item
        //     //         )
        //     //     };
        //     // } else {
        //     //     // Product doesn't exist: add it to the cart
        //     //     return {
        //     //         ...state,
        //     //         cart: [...state.cart, action.payload]
        //     //     };
        //     // }
        //     console.log("add to cart "+ JSON.stringify(action.payload.httpResponse))
        //     return { ...state, cart: action.payload.httpResponse.product }
        // }
        case GET_CART:{
            console.log("cart "+JSON.stringify(action.payload.httpResponse))
            return { ...state, cart: action.payload.httpResponse }
        }

        case GET_WISHLIST: {
            console.log("wishlist "+JSON.stringify(action.payload.httpResponse))
            return { ...state, wishlist: action.payload.httpResponse }
        }
        // case REMOVE_FROM_WL: {
        //     const remove_from_wl = state.wishlist.filter((wl) => wl.id != action.payload.id)
        //     return { ...state, wishlist: remove_from_wl }
        // }
        // case REMOVE_FROM_CART: {
        //     console.log(JSON.stringify(action.payload.httpResponse).includes("success"))
        //     if(JSON.stringify(action.payload.httpResponse).includes("success")){
        //     const remove_from_cart = state.cart.filter((c) => c.id != action.payload.id)
        //     return { ...state, cart: remove_from_cart }
        //     }
        // }
        default:
            return state
    }
}