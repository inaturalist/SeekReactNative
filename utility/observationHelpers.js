import taxaIds from "./iconicTaxonDictById";
import { sortNewestToOldest } from "./helpers";

const createSectionList = ( realm ) => {
  const observations = [];
  const species = realm.objects( "ObservationRealm" );

  const taxaIdList = Object.keys( taxaIds ).reverse();
  taxaIdList.pop();

  taxaIdList.forEach( ( id ) => {
    const data = species
      .filtered( `taxon.iconicTaxonId == ${id}` )
      .sorted( "date", true );

    const badgeCount = realm.objects( "BadgeRealm" )
      .filtered( `iconicTaxonId == ${id} AND earned == true` ).length;

    observations.push( {
      id,
      data: data.length > 0 ? data : [],
      badgeCount,
      open: true
    } );
  } );

  sortNewestToOldest( observations );

  const otherData = species
    .filtered( "taxon.iconicTaxonId == 1 OR taxon.iconicTaxonId == 47686 OR taxon.iconicTaxonId == 48222" )
    .sorted( "date", true );
  // added protozoans here because they weren't saving with iconicTaxonId == 1 on iOS

  observations.push( {
    id: 1,
    data: otherData,
    badgeCount: -1,
    open: true
  } );

  return species.length > 0 ? observations : [];
};

export default createSectionList;
