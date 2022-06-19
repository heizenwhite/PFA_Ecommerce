import React, { useState } from "react";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  HamBurgerIcon,
  NavMenu,
  NavItem,
  NavLinks,
  CartIcon,
  SubMenu,
  SubItem,
  CartCircle,
  Button,
  LogoutButton,
  MobileButton,
  MobileNavItem
} from "./Navigation.elements";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import logo from "../../media/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../actions/userAction'

const Navigation = () => {
  let mobile = false

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const [click, setClick] = useState(false)

  const clickHandler = () => setClick(!click)

  const logoutHandler = () => {
    clickHandler()
    dispatch(logout())
  }

  var url = window.location.href.split("/")[3];

  let home = null;
  let shop = null;
  let shoppingCart = null;

  if (url === "") {
    home = "true";
  } else if (url === "shop") {
    shop = "true";
  } else if (url === "cart") {
    shop = "true";
    shoppingCart = "true";
  } else {
    home = null;
    shop = null;
    shoppingCart = null;
  }

  if(window.screen.width < 1000) {
    mobile = true
  } else {
    mobile = false
  }

  return (
    <IconContext.Provider value={{ color: "#000" }}>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <NavIcon src={logo} style={{fontSize:"10px"}} />
            eez
          </NavLogo>
          <HamBurgerIcon onClick={clickHandler}>
            {click ? <FaTimes /> : <FaBars />}
          </HamBurgerIcon>
          <NavMenu click={click}>
            <NavItem>
              <NavLinks active={home} to="/" onClick={clickHandler}>
                Acceuil
              </NavLinks>
            </NavItem>
            <NavItem>
              {mobile
                ?
                  <MobileNavItem active={shop}>Shop</MobileNavItem>
                :
                  <NavLinks active={shop} to="/shop">Shop</NavLinks>
              }
              <SubMenu>
                <SubItem>
                  <NavLinks active={shop} to="/shop" onClick={clickHandler}>
                    Shop Categorie
                  </NavLinks>
                </SubItem>
                <SubItem>
                  <NavLinks active={shoppingCart} to="/cart" onClick={clickHandler}>
                    Shopping Panier
                  </NavLinks>
                </SubItem>
              </SubMenu>
            </NavItem>
            <NavItem>
              <NavLinks to="/cart" onClick={clickHandler}>
                <CartIcon />
                <CartCircle>{cartItems.length}</CartCircle>
              </NavLinks>
            </NavItem>
            <NavItem>
              {userInfo != null
                ?
                  <>
                    {mobile
                      ?
                        <MobileButton>{userInfo.name}</MobileButton>
                      :
                        <NavLinks to={'/userProfile'}>
                          <Button>{userInfo.name}</Button>
                        </NavLinks>
                    }       
                    <SubMenu>
                      <SubItem>
                        <NavLinks to="/userProfile" onClick={clickHandler}>
                          Profile
                        </NavLinks>
                      </SubItem>
                      <SubItem>
                        <LogoutButton onClick={logoutHandler}>
                          Se Déconnecter
                        </LogoutButton>
                      </SubItem>
                    </SubMenu>
                  </>
                :
                  <>
                  {mobile
                    ?
                      <MobileButton>Se connecter</MobileButton>
                    :
                      <NavLinks to="/login">
                        <Button>Se connecter</Button>
                      </NavLinks>
                  }
                    <SubMenu>
                      <SubItem>
                        <NavLinks to="/login" onClick={clickHandler}>
                          Se connecter 
                        </NavLinks>
                      </SubItem>
                      <SubItem>
                        <NavLinks to="/register" onClick={clickHandler}>
                          S'inscrire
                        </NavLinks>
                      </SubItem>
                    </SubMenu>
                  </>
              }
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navigation;
