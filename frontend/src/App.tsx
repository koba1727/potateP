import * as React from "react";
import Login from "./features/login/containers/login";
import Home from "./features/home/containers/home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink
} from "reactstrap";
import SignUp from "./features/signup/containers/signup";
import Auth from "./Auth";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path={"/"} component={Login} />
            <Route path={"/signup"} component={SignUp} />
            <Auth>
              <Switch>
                <div>
                  <Menu />
                  <Route path={"/home"} component={Home} />
                </div>
              </Switch>
            </Auth>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

type MenuProps = {};
const Menu: React.FC<MenuProps> = () => {
  return (
    <div>
      <Navbar expand="md">
        <NavbarBrand href="/">Todo</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink herf="/">HOME</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>option1</DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </div>
  );
};
