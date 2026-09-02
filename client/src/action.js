import { api } from "./api"
import { ADD_TO_CART, ADD_TO_WISHLIST, GET_CART, GET_CATEGORIES, GET_CATEGORIZED_PRODUCTS, GET_PRODUCTS, GET_SINGLE_PRODUCT, GET_WISHLIST, REMOVE_FROM_CART, REMOVE_FROM_WL, SEARCH_PROD } from "./actionType"

export const getProducts = () => {
    return (dispatch) => {
        api.get("/products")
            .then((res) => {
                dispatch(
                    ((data) => {
                        return {
                            type: GET_PRODUCTS,
                            payload: {
                                httpResponse: data
                            }
                        }
                    })(res.data)
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getCategories = () => {
    return (dispatch) => {
        api.get("/products/category-list")
            .then((res) => {
                dispatch(
                    ((data) => {
                        return {
                            type: GET_CATEGORIES,
                            payload: {
                                httpResponse: data
                            }
                        }
                    })(res.data)
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getCategorizedProducts = (value) => {
    return (dispatch) => {
        api.get(`/products/category/${encodeURIComponent(value)}`)
            .then((res) => {
                dispatch(
                    ((data) => {
                        return {
                            type: GET_CATEGORIZED_PRODUCTS,
                            payload: {
                                httpResponse: data
                            }
                        }
                    })(res.data)
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // return {
    //     type:GET_CATEGORIZED_PRODUCTS,
    //     payload:value
    // }
}
export const getSingleProduct = (value) => {
    return {
        type: GET_SINGLE_PRODUCT,
        payload: value
    }
}
// export const addToCart=(value)=>{
// return {
//     type:ADD_TO_CART,
//     payload:value
// }
export const addToCart = (product) => {
    return (dispatch, getState) => {
        const state = getState();
        const existingItem = state.cart.find(item => item.id === product.id);

        if (existingItem) {

            // Product exists: update quantity on backend
            const updatedProduct = {
                ...existingItem,
                quantity: existingItem.quantity + product.quantity,
            };
            console.log("existingItem " + updatedProduct)
            api.put(`/cart/${product.id}`, updatedProduct)
                .then(res => {
                    // dispatch({
                    //     type: ADD_TO_CART,
                    //     payload: {
                    //         httpResponse: res.data
                    //     }

                    //});
                    dispatch(getCart())
                })
                .catch(err => {
                    console.error('Error updating cart item:', err);
                });
        } else {
            console.log("Product doesn't exist: add new product to cart " + JSON.stringify(product))
            // Product doesn't exist: add new product to cart
            api.post("/cart", product)
                .then(res => {
                    // dispatch({
                    //     type: ADD_TO_CART,
                    //     payload: {
                    //         httpResponse: res.data
                    //     }
                    // });
                    dispatch(getCart())
                })
                .catch(err => {
                    console.error('Error adding new item to cart:', err);
                });
        }
    };
};
// }
export const getCart = () => {
    return (dispatch) => {
        api.get("/cart")
            .then((res) => {
                dispatch(
                    ((data) => {
                        return {
                            type: GET_CART,
                            payload: {
                                httpResponse: data
                            }
                        }
                    })(res.data)
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
export const updateCart = (product) => {
    return (dispatch) => {
       
            api.put(`/cart/${product.id}`, product)
                .then(res => {
                    // dispatch({
                    //     type: ADD_TO_CART,
                    //     payload: {
                    //         httpResponse: res.data
                    //     }

                    //});
                    dispatch(getCart())
                })
                .catch(err => {
                    console.error('Error updating cart item:', err);
                });
        }
    }
export const addToWishlist = (product) => {
    // return {
    //     type: ADD_TO_WISHLIST,
    //     payload: value
    // }
    return (dispatch) => {
        api.post("/wishlist", product)
        .then(res => {
            dispatch(getWishlist())
        })
        .catch(err => {
            console.error('Error adding new item to wishlist:', err);
        });
}
}
export const getWishlist=()=>{
    return (dispatch) => {
        api.get("/wishlist")
            .then((res) => {
                dispatch(
                    ((data) => {
                        return {
                            type: GET_WISHLIST,
                            payload: {
                                httpResponse: data
                            }
                        }
                    })(res.data)
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
export const searchProd = (value) => {
    return {
        type: SEARCH_PROD,
        payload: value
    }
}
export const removeFromWL = (value) => {
    // return {
    //     type: REMOVE_FROM_WL,
    //     payload: value
    // }
    return (dispatch) => {
        api.delete(`/wishlist/${value}`)
            .then(res => {
                dispatch(((data) => {
                    if(JSON.stringify(data).includes("success")){
                            dispatch(getWishlist())
                    }
                    // return {
                    //     type: REMOVE_FROM_CART,
                    //     payload: {
                    //         httpResponse: data
                    //     },
                    // }
                })(res.data)
                )
            })
            .catch(err => {
                console.log(err)
            });
    }
}
export const removeFromCart = (value) => {
    // return {
    //     type: REMOVE_FROM_CART,
    //     payload: value
    // }
    return (dispatch) => {
        api.delete(`/cart/${value}`)
            .then(res => {
                dispatch(((data) => {
                    if(JSON.stringify(data).includes("success")){
                            dispatch(getCart())
                    }
                    // return {
                    //     type: REMOVE_FROM_CART,
                    //     payload: {
                    //         httpResponse: data
                    //     },
                    // }
                })(res.data)
                )
            })
            .catch(err => {
                console.log(err)
            });
    }
}
