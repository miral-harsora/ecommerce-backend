import React from "react";
import '@testing-library/jest-dom'; 
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import { store } from "../store";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";  // Import Login for testing navigation

afterEach(cleanup);

const renderWithRouterAndRedux = (component, initialRoute = "/") => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={component} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

it("renders login link inside the navbar", () => {
  const mockSetNavbarHeight = vi.fn(); // Vitest mock function
  renderWithRouterAndRedux(<Navbar setNavbarHeight={mockSetNavbarHeight} />);

  const navbar = screen.getByTestId("navbar");
  const login = screen.getByTestId("login");
  const cart = screen.getByTestId("cart");
  const wishlist = screen.getByTestId("wishlist_link");

  expect(navbar).toContainElement(login); 
  expect(login).toBeInTheDocument();   
  expect(navbar).toContainElement(cart); 
  expect(cart).toBeInTheDocument();   
  expect(navbar).toContainElement(wishlist); 
  expect(wishlist).toBeInTheDocument();      
});

it("navigates to the login page when Login link is clicked", async () => {
  const mockSetNavbarHeight = vi.fn(); // Vitest mock function
  renderWithRouterAndRedux(<Navbar setNavbarHeight={mockSetNavbarHeight} />);
  
  const loginLink = screen.getByTestId("login");
  fireEvent.click(loginLink);

  await waitFor(() => {
    expect(screen.getByText(/Connect with Us – Login | Sign Up/i)).toBeInTheDocument();
  });
});


