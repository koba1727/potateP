import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "./store";
import { withRouter } from "react-router";
// import LoadingOverlay from "react-loading-overlay";

const mapStateToProps = (AppState: AppState) => ({
  user: AppState.user
});
interface AuthProps {}
export class Auth extends React.Component<AppState, AuthProps> {
  render() {
    if (this.props.user.isLogin) {
      return this.props.children;
    } else {
      return <Redirect to={"/"} />;
    }
  }
}
export default withRouter(connect(mapStateToProps)(Auth));
