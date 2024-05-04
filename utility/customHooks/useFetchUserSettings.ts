import { useState, useEffect } from "react";

import realmConfig from "../../models";

const useFetchUserSettings = ( ) => {
  const [settings, setSettings] = useState<{
    autoCapture?: boolean;
    localSeasonality?: boolean;
    scientificNames?: boolean;
    appVersion?: string;
  }>( { } );

  useEffect( ( ) => {
    let isCurrent = true;

    const fetchUserSettings = async ( ) => {
      const realm = await Realm.open( realmConfig );
      const userSettings = realm.objects( "UserSettingsRealm" );
      if ( isCurrent ) {
        setSettings( userSettings[0] );
      }
    };

    fetchUserSettings( );
    return ( ) => {
      isCurrent = false;
    };
  }, [] );

  return settings;
};

export { useFetchUserSettings };
