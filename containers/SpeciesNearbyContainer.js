import { connect } from "react-redux";
import SpeciesNearby from "../components/Home/SpeciesNearby";
import { fetchTaxa } from "../ducks/speciesNearby";

function mapStateToProps( state ) {
  console.log( state, "state in map state to props" );
  return {
    taxa: state.species_nearby.taxa
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    fetchTaxa: () => dispatch( fetchTaxa() )
  };
}

const SpeciesNearbyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( SpeciesNearby );

export default SpeciesNearbyContainer;
