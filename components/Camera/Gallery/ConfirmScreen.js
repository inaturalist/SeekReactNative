// @flow

import React from "react";
import type { Node } from "react";

import ErrorScreen from "./Error";
import { useObservation } from "../../Providers/ObservationProvider";

const ConfirmScreen = ( ): Node => {
  const { error } = useObservation();

  if ( error ) {
    return (
      <ErrorScreen
        error={error.error}
        number={error.numberOfHours}
      />
    );
  }
};

export default ConfirmScreen;
