import { renderHook, act } from "@testing-library/react-native";
import { useUploadedObservationCount } from "../../../utility/customHooks";

jest.mock( "inaturalistjs", () => ( {
  __esModule: true,
  default: {
    observations: {
      search: jest.fn( ( params, options ) => {
        const total_results = params?.year === 2021 ? 42 : 142;
        return {
          total_results
        };
      } )
    }
  }
} ) );

jest.mock( "realm", () => {
  const actualRealm = jest.requireActual( "realm" );
  actualRealm.open = jest.fn( ( config ) => new Promise( ( resolve ) =>  {
    resolve( {
      objects: jest.fn( ( ) => [{ observationCount: 142 }] ),
      write: jest.fn( ( ) => { } )
    } );
  } ) );
  return actualRealm;
} );

const login = "some-token";
const username = "some-username";
const year = 2021;

describe( "useUploadedObservationCount", () => {
  test( "should error if params not given", () => {
    expect( () => useUploadedObservationCount() ).toThrow();
  } );

  test( "should return number of uploaded observations correctly", async () => {
    const { result } = renderHook( () =>
      useUploadedObservationCount( { login, username } )
    );
    await act( () => result.current );
    expect( result.current ).toBe( 142 );
  } );

  test( "should return number of uploaded observations for one year correctly", async () => {
    const { result } = renderHook( () =>
      useUploadedObservationCount( { login, username, year } )
    );
    await act( () => result.current );
    expect( result.current ).toBe( 42 );
  } );
} );
