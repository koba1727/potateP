import * as React from "react";
import { Navbar, Nav, NavItem, Container, Row, Col, NavLink } from "reactstrap";
import classNames from "classnames";
import st from "./sidebar.module.css";
import { NavLink as RRNavLink } from "react-router-dom";
interface OwnProps {
  eid: string;
}
interface OwnState {}
export class WithEventSideBar extends React.Component<OwnProps, OwnState> {
  public linkList = [
    {
      title: "hoge",
      url: "/home"
    },
    {
      title: "fuga",
      url: "/home"
    },
    {
      title: "piyo",
      url: "/home"
    }
  ];
  render() {
    return (
      <>
        <div className={classNames(st.sidemenu)}>
          <Container>
            {this.linkList.map((value, idx) => {
              return (
                <Row className={st.sideList} key={idx}>
                  <Col xs={{ size: 10, offset: 1 }} className={st.link}>
                    <NavLink tag={RRNavLink} to={value.url}>
                      {value.title}
                    </NavLink>
                  </Col>
                </Row>
              );
            })}
          </Container>
        </div>
        <div className={st.mainpain}>{this.props.children}</div>
      </>
    );
  }
}
