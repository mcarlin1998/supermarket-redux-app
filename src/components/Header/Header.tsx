import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";
import Basket from "../Basket/Basket";
import styled from "styled-components";
export default function Header() {
  const [isBasketOpen, setIsBasketOpen] = React.useState(false);
  const basketItems = useSelector((state: State) => state.basket.items);

  const totalQuantity = basketItems.reduce(
    (total, item) => total + (item.quantity ?? 1),
    0
  );
  const toggleBasket = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    color: #666472;
    padding: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `;

  const NavList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      align-items: center;
    }
  `;

  const NavItem = styled.li`
    margin: 0 1rem;

    @media (max-width: 768px) {
      margin: 0.5rem 0;
    }
  `;

  const NavLink = styled.a`
    color: #666472;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `;

  const BasketButton = styled.button`
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      color: #ddd;
    }

    .basket-count {
      margin-left: 0.5rem;
      background-color: #1a96f3;
      border-radius: 50%;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }

    svg {
      width: 1.125em;
      height: 1em;
    }
  `;

  const LogoItem = styled.div`
    fontsize: 12;
  `;
  const BasketContainer = styled.div`
    list-style: none;
  `;

  return (
    <header>
      <NavBar>
        <LogoItem>Supermarket Logo</LogoItem>

        <NavList>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/products">Products</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About Us</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact">Contact Us</NavLink>
          </NavItem>
        </NavList>
        <BasketContainer>
          <BasketButton id="basketButton" onClick={toggleBasket}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="shopping-cart"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="svg-inline--fa fa-shopping-cart fa-w-18"
            >
              <path
                fill="#666472"
                d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
              />
            </svg>
            <span className="basket-count badge badge-danger">
              {totalQuantity}
            </span>
          </BasketButton>
          {isBasketOpen && <Basket onClose={toggleBasket} />}
        </BasketContainer>
      </NavBar>
    </header>
  );
}
