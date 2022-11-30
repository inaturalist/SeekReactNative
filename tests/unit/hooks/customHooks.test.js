import { renderHook, act } from "@testing-library/react-native";
import {
  useUploadedObservationCount
} from "../../../utility/customHooks";

jest.mock( "inaturalistjs", () => ( {
  __esModule: true,
  default: {
    observations: {
      search: jest.fn( () => ( {
        total_results: 42
      } ) )
    }
  }
} ) );

const login = "some-token";
const username = "some-username";
const year = 2021;

describe( "useUploadedObservationCount", () => {
  test( "returns null if params not given", () => {
    const { result } = renderHook( () => useUploadedObservationCount() );
    expect( result.current ).toBeNull();
  } );

  test( "returns null if year not given", () => {
    const { result } = renderHook( () =>
      useUploadedObservationCount( login, username )
    );
    expect( result.current ).toBeNull();
  } );

  test( "returns number of uploaded observations correctly", async () => {
    const { result } = renderHook( () =>
      useUploadedObservationCount( login, username, year )
    );
    await act( () => result.current );
    expect( result.current ).toBe( 42 );
  } );
} );
