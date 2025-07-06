// @flow
import i18n from "../i18n";

import { serverBackOnlineTime } from "./dateHelpers";

const handleServerError = ( error: {
  response: {
    status: number,
    headers: {
      map: {
        "retry-after": string,
      },
    },
  },
} ): any => {
  const { response } = error;

  if ( !response ) {
    return null;
  }

  if ( response.status && response.status === 503 ) {
    const gmtTime = response.headers.map["retry-after"];
    const hours = serverBackOnlineTime( gmtTime );
    return hours;
  }
  return i18n.t( "post_to_inat_card.error_downtime_a_few_hours" );
};

export {
  handleServerError
};
