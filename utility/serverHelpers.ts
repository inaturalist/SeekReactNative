import i18n from "../i18n";

import { serverBackOnlineTime } from "./dateHelpers";

interface ServerError {
  response: {
    status: number;
    headers: {
      map: {
        "retry-after": string;
      };
    };
  };
}

const handleServerError = ( error: ServerError ): number | string | null => {
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
