// @flow
import React, { useCallback } from "react";
import { Image } from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import icons from "../../assets/icons";
import { viewStyles } from "../../styles/seekYearInReview/seekYearInReview";
import {
  useLocationPermission,
  useTruncatedUserCoords
} from "../../utility/customHooks";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { getBounds, getCenterOfBounds } from "geolib";

type Props = {
  +region: Object,
  +id: number,
  +seenDate: ?string,
};

const SeekYearInReviewMap = ( { observations }: Props ): React.Node => {
  const navigation = useNavigation();

  const granted = useLocationPermission();
  const userCoords = useTruncatedUserCoords( granted );

  const centerRegion = useCallback(
    () => {
      const coordsArray = observations.map( ( observation ) => {
        const { latitude, longitude } = observation;
        return { latitude, longitude };
      } );
      const bounds = getBounds( coordsArray );
      userCoords && coordsArray.push( userCoords );
      const center = getCenterOfBounds( coordsArray );
      return {
        latitude: center.latitude,
        longitude: center.longitude,
        latitudeDelta: Math.abs(
          ( center.latitude - Math.min( bounds.maxLat, bounds.minLat ) ) * 2
        ),
        longitudeDelta: Math.abs(
          ( center.longitude - Math.min( bounds.maxLng, bounds.minLng ) ) * 2
        )
      };
    },
    [observations, userCoords],
  );

  const navToObsMap = useCallback(
    () => navigation.navigate( "SeekYearInReviewMapScreen", { region: centerRegion() } ),
    [navigation, centerRegion]
  );

  return (
    <>
      <MapView
        onPress={navToObsMap}
        provider={PROVIDER_DEFAULT}
        initialRegion={centerRegion()}
        region={centerRegion()}
        rotateEnabled={false}
        scrollEnabled={false}
        style={viewStyles.map}
        zoomEnabled={false}
      >
        {
          // Map over observations and display a marker for each one
          observations.length > 0 &&
            observations.map( ( obs ) => {
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
            coordinate={{
              latitude: userCoords.latitude,
              longitude: userCoords.longitude
            }}
          >
            <Image source={icons.locationPin} />
          </Marker>
        )}
      </MapView>
      <GreenButton
        handlePress={navToObsMap}
        text="seek_year_in_review.view_observations_map"
      />
    </>
  );
};

export default SeekYearInReviewMap;
