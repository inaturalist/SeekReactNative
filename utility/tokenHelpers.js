// @flow
import createUserAgent from "./userAgent";
import { handleServerError } from "./serverHelpers";

const fetchJSONWebToken = async ( loginToken: string ): Promise<any> => {
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": createUserAgent(),
    Authorization: `Bearer ${loginToken}`
  };

  const site = "https://www.inaturalist.org";

  try {
    const r = await fetch( `${site}/users/api_token`, { headers } );
    const parsedResponse = await r.json();
    return parsedResponse.api_token;
  } catch ( e ) {
    if ( e.response && e.response.status && e.response.status === 503 ) {
      // not 100% sure if this is working
      return {
        error: {
          type: "downtime",
          errorText: e.message,
          numOfHours: handleServerError( e )
        }
      };
    }
    if ( e.message === "timeout" ) {
      return {
        error: {
          type: "timeout"
        }
      };
    }
    return {
      error: {
        type: "login",
        errorText: e.message
      }
    };
  }
};

export { fetchJSONWebToken };
