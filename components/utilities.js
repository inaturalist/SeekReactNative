import inatjs from "inaturalistjs";

const fetchTaxa = () => {
  const params = {
    verifiable: true,
    photos: true,
    per_page: 9,
    lat: 0.0,
    lng: 0.0,
    radius: 50,
    threatened: false,
    oauth_application_id: "2,3",
    hrank: "species",
    include_only_vision_taxa: true,
    not_in_list_id: 945029
  };

  inatjs.observations.speciesCounts( params ).then( ( response ) => {
    return response.results.map( r => r.taxon );
  } );
};

module.exports = fetchTaxa;
