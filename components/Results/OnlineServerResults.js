// @flow

import React, { useReducer, useCallback } from "react";
import type { Node } from "react";

import ConfirmScreen from "./ConfirmScreen";
import ErrorScreen from "./Error";
import { serverBackOnlineTime } from "../../utility/dateHelpers";

const OnlineServerResults = (): Node => {
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "ERROR":
        return { ...state, error: action.error, numberOfHours: action.numberOfHours || null };
      default:
        throw new Error();
    }
  }, {
    error: null,
    numberOfHours: null
  } );

  const {
    error,
    numberOfHours
  } = state;

  const handleServerError = useCallback( ( response ) => {
    if ( !response ) {
      dispatch( { type: "ERROR", error: "onlineVision" } );
    } else if ( response.status && response.status === 503 ) {
      const gmtTime = response.headers.map["retry-after"];
      const hours = serverBackOnlineTime( gmtTime );

      dispatch( { type: "ERROR", error: "downtime", numberOfHours: hours } );
    }
  }, [] );

  //   } ).catch( ( err ) => {
  //     const { response } = err;
  //     handleServerError( response );
  //   } );
  // }, [handleServerError, checkSpeciesSeen] );

  if ( error ) {
    return (
      <ErrorScreen
        error={error}
        number={numberOfHours}
      />
    );
  }

  return (
    <ConfirmScreen />
  );
};

export default OnlineServerResults;
