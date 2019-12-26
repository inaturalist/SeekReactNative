import React from "react";
import { render } from "react-native-testing-library";

import AboutScreen from "../AboutScreen";

const createTestProps = ( props: Object ) => ( {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn()
  },
  ...props
} );

test( "About Screen loads and renders", () => {
  let props;

  beforeEach( () => {
    props = createTestProps( {} );
    const { debug } = render( <AboutScreen {...props} /> );

    debug( "debug message" );
  } );
} );

