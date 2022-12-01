import { renderHook, act } from "@testing-library/react-native";
import {
  useUploadedObservationCount,
  useSpeciesCount
} from "../../../utility/customHooks";

jest.mock( "inaturalistjs", () => ( {
  __esModule: true,
  default: {
    observations: {
      search: jest.fn( ( params, options ) => {
        const total_results = params?.year === 2021 ? 12 : 42;
        return {
          total_results
        };
      } )
    }
  }
} ) );

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

    expect( result.current ).toBe( 42 );
  } );

  test( "should return number of uploaded observations for one year correctly", async () => {
    const { result } = renderHook( () =>
      useUploadedObservationCount( { login, username, year } )
    );
    await act( () => result.current );

    expect( result.current ).toBe( 12 );
  } );
} );

describe( "useSpeciesCount", () => {
  test( "should return number of recorded species correctly", async () => {
    const { result } = renderHook( () => useSpeciesCount( ) );
    await act( () => result.current );

    expect( result.current ).toBe( 42 );
  } );
} );
