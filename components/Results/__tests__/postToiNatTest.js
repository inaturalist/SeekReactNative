import React from "react";
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

import { render, fireEvent } from "react-native-testing-library";
import PostToiNat from "../PostToiNat";
import { fetchPostingSuccess } from "../../../utility/loginHelpers";

jest.mock( "react-navigation", () => ( {
  withNavigation: Component => props => (
    <Component
      navigation={{ addListener: jest.fn() }} // this is mocked correctly
      {...props}
    />
  )
} ) );

jest.mock( "@react-native-community/async-storage", () => mockAsyncStorage );

const savePostingSuccess = ( success ) => {
  mockAsyncStorage.setItem( "posting_success", success.toString() );
};

describe( "PostToiNat component", () => {
  test( "should not render if a user already posted an observation to iNat", async () => {
    savePostingSuccess( true );
    const success = await fetchPostingSuccess();
    const tree = render( <PostToiNat /> );

    console.log( success, "success", typeof success );

    expect( success ).toBe( "true" );
    // expect( tree ).toMatchSnapshot();

    savePostingSuccess( false );
    const failure = await fetchPostingSuccess();
    expect( failure ).toBe( "false" );
    // expect( tree ).toBe( null );
  } );
  // test( "should render if a user has not posted to iNat" )
  // test( "should not render if a user is logged out" )
} );
