import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductList from "./ProductList";
import { ProductProps } from "../../types";
import { act } from "react"; // Import act from react

// Configure the mock store
const mockStore = configureStore([]);

describe("ProductList component", () => {
  let store: ReturnType<typeof mockStore>;

  //Ensures no repitition if test repeated across multiple components, creates a redux mock of the following data
  beforeEach(() => {
    store = mockStore({
      products: {
        items: [
          {
            label: "Item 1",
            name: "Product 1",
            description: "Description 1",
            price: 10.0,
          },
          {
            label: "Item 2",
            name: "Product 2",
            description: "Description 2",
            price: 20.0,
          },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  //After each test clean up
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  //Test for rendering ProductList component
  test("renders product items correctly", () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("£10.00")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("£20.00")).toBeInTheDocument();
  });

  //Test for result of rendering ProductList component if there are no Products available
  test('shows "No products available" when there are no products', () => {
    store = mockStore({
      products: {
        items: [],
      },
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText("No products available")).toBeInTheDocument();
  });

  test("displays product detail when a product is clicked", () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    // Use `act` to ensure any updates are processed
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.click(screen.getByText("Product 1"));
    });

    // Assuming ProductDetail component is rendered and displays the product name
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });
});
