import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Schedule } from "../components/schedule";

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Schedule)
);
