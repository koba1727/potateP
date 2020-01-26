import * as React from "react";
import Login from "./containers/Login";
import About from "./containers/About";
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

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Menu />
          <Switch>
            <Route exact path={"/"} component={Login} />
            <Route path={"/about"} component={About} />
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
