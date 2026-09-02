import React from "react";
import { act, fireEvent, getAllByTestId, render, screen, waitFor } from "@testing-library/react";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "../reducer";
import ProductDetail from "../pages/ProductDetail";
import { Routes, Route } from "react-router-dom";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import { thunk } from "redux-thunk";
import { expect } from "vitest";
import { BrowserRouter,MemoryRouter  } from "react-router-dom";
import Navbar from "../components/Navbar";
import '@testing-library/jest-dom';
const mockproduct = [{
    "id": 1,
    "title": "Essence Mascara Lash Princess",
    "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    "category": "beauty",
    "price": 9.99,
    "discountPercentage": 7.17,
    "rating": 4.94,
    "stock": 5,
    "tags": [
        "beauty",
        "mascara"
    ],
    "brand": "Essence",
    "sku": "RCH45Q1A",
    "weight": 2,
    "dimensions": {
        "width": 23.17,
        "height": 14.43,
        "depth": 28.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "Low Stock",
    "reviews": [
        {
            "rating": 2,
            "comment": "Very unhappy with my purchase!",
            "date": "2024-05-23T08:56:21.618Z",
            "reviewerName": "John Doe",
            "reviewerEmail": "john.doe@x.dummyjson.com"
        },
        {
            "rating": 2,
            "comment": "Not as described!",
            "date": "2024-05-23T08:56:21.618Z",
            "reviewerName": "Nolan Gonzalez",
            "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
        },
        {
            "rating": 5,
            "comment": "Very satisfied!",
            "date": "2024-05-23T08:56:21.618Z",
            "reviewerName": "Scarlett Wright",
            "reviewerEmail": "scarlett.wright@x.dummyjson.com"
        }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 24,
    "meta": {
        "createdAt": "2024-05-23T08:56:21.618Z",
        "updatedAt": "2024-05-23T08:56:21.618Z",
        "barcode": "9164035109868",
        "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
    },
    "images": [
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
    ],
    "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
}]
const initialState = {
    product: mockproduct,
    wl: [],
    quantity: 1,
    wishlist: [],
    cart: [],
    wishlistItems:[],
    cartItems:[],
}
const renderWithRedux = (
    component,initialRoute = "/",
    { initState = initialState, store = createStore(reducer, initialState, applyMiddleware(thunk)) } = {}
) => {
    return {
        ...render(<Provider store={store}>
             <MemoryRouter initialEntries={[initialRoute]}>
                <Routes>
                    <Route path="/" element={component} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes> </MemoryRouter>
        </Provider>),
        store,
    };
};
it("check detail product page", async () => {

    const { getByTestId } = renderWithRedux(<ProductDetail />, { initialState });
    screen.debug();
    await waitFor(() => {
        expect(getByTestId("title").textContent).to.equal("Essence Mascara Lash Princess");
    });
});
it("check quantity plus", async () => {

    const { getByTestId } = renderWithRedux(<ProductDetail />, { initialState });
    screen.debug();
    fireEvent.click(getByTestId("plus"));
    expect(getByTestId("quantity").textContent).to.equal("2");
});

it("check wishlist", async () => {

    const { getByTestId } = renderWithRedux(<ProductDetail />, { initialState });
    screen.debug();
    fireEvent.click(getByTestId("wishlist"));
    await waitFor(() => {
        expect(getByTestId("wishlist").textContent).to.equal(" WISHLISTED");
    });
    initialState.wishlist = mockproduct;
    initialState.wishlistItems=mockproduct;
    const mockSetNavbarHeight = vi.fn();
    renderWithRedux(<Navbar setNavbarHeight={mockSetNavbarHeight}/>, { initialState });
      const wishlist_link = screen.getByTestId("wishlist_link");
      fireEvent.click(wishlist_link);
    
      await waitFor(() => {
        screen.debug();
        expect(screen.getByText(/My Wishlist/i)).toBeInTheDocument();
        expect(screen.getAllByTestId("title")[0].textContent).toEqual("Essence Mascara Lash Princess");
      });
      act(() => {
        window.history.back();
    });

  
      await waitFor(() => {
          expect(screen.getAllByText(/Essence Mascara Lash Princess/i)[0]).toBeInTheDocument();
      });
});
it("check add to cart", async () => {

    const { getByTestId } = renderWithRedux(<ProductDetail />, { initialState });
    screen.debug();
    fireEvent.click(getByTestId("cart"));
    await waitFor(() => {
        expect(getByTestId("cart").textContent).to.equal(" GO TO CART ->");
        fireEvent.click(getByTestId("cart"));
    });
    initialState.cart = mockproduct;
    initialState.cartItems=mockproduct;
    await waitFor(() => {
        screen.debug();
        expect(screen.getAllByText(/CART/i)[0]).toBeInTheDocument();
        expect(screen.getAllByTestId("title")[0].textContent).toEqual("Essence Mascara Lash Princess");
      });
});