const React = require( "react" );
const { View } = require( "react-native" );

const MOCK_MAP_BOUNDARIES = {
  northEast: { latitude: 3, longitude: 4 },
  southWest: { latitude: 1, longitude: 2 },
};

const animateToRegion = jest.fn();

const MockMapView = React.forwardRef( ( { children, ...props }, ref ) => {
  React.useImperativeHandle( ref, () => ( {
    animateToRegion,
    getMapBoundaries: () => Promise.resolve( MOCK_MAP_BOUNDARIES ),
  } ) );
  return React.createElement( View, props, children );
} );

const MockUrlTile = ( { testID, urlTemplate, ...props } ) => (
  React.createElement( View, { testID, urlTemplate, ...props } )
);

const MockMarker = ( { children, ...props } ) => (
  React.createElement( View, props, children )
);

const MockCircle = ( { children, ...props } ) => (
  React.createElement( View, props, children )
);

const MockOverlay = ( { children, ...props } ) => (
  React.createElement( View, props, children )
);

const MockCallout = ( { children, ...props } ) => (
  React.createElement( View, props, children )
);

const MAP_TYPES = {
  STANDARD: "standard",
  SATELLITE: "satellite",
  HYBRID: "hybrid",
  TERRAIN: "terrain",
  NONE: "none",
  MUTEDSTANDARD: "mutedStandard",
  SATELLITE_FLYOVER: "satelliteFlyover",
  HYBRID_FLYOVER: "hybridFlyover",
};

const Animated = MockMapView;
Animated.Animated = Animated;

const MarkerAnimated = { Animated: MockMarker };
const OverlayAnimated = { Animated: MockOverlay };

module.exports = {
  default: MockMapView,
  __esModule: true,
  animateToRegion,
  MOCK_MAP_BOUNDARIES,
  MAP_TYPES,
  Animated,
  Marker: MockMarker,
  UrlTile: MockUrlTile,
  Polyline: View,
  Polygon: View,
  Circle: MockCircle,
  Heatmap: View,
  WMSTile: View,
  LocalTile: View,
  Overlay: MockOverlay,
  Callout: MockCallout,
  CalloutSubview: View,
  Geojson: View,
  MarkerAnimated,
  OverlayAnimated,
  PROVIDER_GOOGLE: "google",
  PROVIDER_DEFAULT: "default",
};
