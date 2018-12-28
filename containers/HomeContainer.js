import { connect } from "react-redux";
import Home from "../components/Home/HomeScreen";
import { fetchTaxa } from "../ducks/speciesNearby";

function mapStateToProps( state ) {
  console.log( state.species_nearby.loading, "state in map state to props" );
  return {
    taxa: state.species_nearby.taxa,
    loading: state.species_nearby.loading
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    fetchTaxa: () => dispatch( fetchTaxa() )
  };
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( Home );

export default HomeContainer;
