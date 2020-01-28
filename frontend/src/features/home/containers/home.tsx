import { withRouter } from "react-router";
import { Home } from "../components/home";
import { connect } from "react-redux";

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
