import { useState, useEffect } from "react";

import realmConfig from "../../models";

const useFetchUserSettings = ( ) => {
  const [settings, setSettings] = useState<{
    scientificNames?: boolean;
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
