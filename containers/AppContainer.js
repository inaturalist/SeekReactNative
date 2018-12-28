import { connect } from "react-redux";
import App from "../components/App";

function mapStateToProps( state ) {
  return state;
}

const AppContainer = connect(
  mapStateToProps
)( App );

export default AppContainer;
