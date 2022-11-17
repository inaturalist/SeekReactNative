// @flow
import * as React from "react";
import { Image } from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";

import icons from "../../assets/icons";
import { viewStyles } from "../../styles/seekYearInReview/seekYearInReview";
import {
  useRegion,
  useLocationPermission,
  useTruncatedUserCoords
} from "../../utility/customHooks";

type Props = {
  +region: Object,
  +id: number,
  +seenDate: ?string,
};

const SeekYearInReviewMap = ( { observations }: Props ): React.Node => {
    const granted = useLocationPermission();
    const userCoords = useTruncatedUserCoords( granted );
    // const region = useRegion( userCoords, seenTaxa );
    const region = useRegion( userCoords, userCoords );

  const initialRegion = region || {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  };

  // TODO: Do this filtering higher up, as to not show a map with no markers
  const filteredObservations = observations.filter(
    ( observation ) => observation.latitude && observation.longitude
  );

  // TODO: Optimize shown region based on markers
  return (
    <MapView
      //   maxZoomLevel={7}
      provider={PROVIDER_DEFAULT}
      initialRegion={initialRegion}
      region={region}
      //   rotateEnabled={false}
      //   scrollEnabled={false}
      style={viewStyles.map}
      //   zoomEnabled={false}
    >
      {
        // Map over observations and display a marker for each one
        filteredObservations.map( ( obs ) => {
          const { latitude, longitude, uuidString } = obs;
          return (
            <Marker key={uuidString} coordinate={{ latitude, longitude }}>
              <Image source={icons.cameraOnMap} />
            </Marker>
          );
        } )
      }
      {userCoords?.latitude && (
        <Marker
          coordinate={{ latitude: userCoords.latitude, longitude: userCoords.longitude }}
        >
          <Image source={icons.locationPin} />
        </Marker>
      )}
    </MapView>
  );
};

export default SeekYearInReviewMap;
