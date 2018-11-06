const capitalizeNames = ( name ) => {
  const titleCaseName = name.split( " " )
    .map( string => string.charAt( 0 ).toUpperCase() + string.substring( 1 ) )
    .join( " " );
  return titleCaseName;
};

const truncateCoordinates = ( coordinate ) => {
  return Number( coordinate.toFixed( 2 ) );
};

export {
  capitalizeNames,
  truncateCoordinates
};
