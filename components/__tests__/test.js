import React from "react";
import { View, SafeAreaView } from "react-native";
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

test( "getByTestId, queryByTestId", () => {
  let props;

  beforeEach( () => {
    props = createTestProps( {} );

    const { getByTestId, queryByTestId } = render( <AboutScreen {...props} /> );
    const component = getByTestId( "bananaFresh" );

    expect( component.props.children ).toBe( "not fresh" );
    expect( () => getByTestId( "InExistent" ) ).toThrow( "No instances found" );

    expect( getByTestId( "bananaFresh" ) ).toBe( component );
    expect( queryByTestId( "InExistent" ) ).toBeNull();
  } );
} );

test('renders options.wrapper around updated node', () => {
  const WrapperComponent = ({ children }) => (
    <SafeAreaView testID="wrapper">{children}</SafeAreaView>
  );

  const { toJSON, getByTestId, rerender } = render(<View testID="inner" />, {
    wrapper: WrapperComponent,
  });

  rerender(<View testID="inner" accessibilityLabel="test" />);

  expect(getByTestId('wrapper')).toBeTruthy();
  expect(toJSON()).toMatchInlineSnapshot(`
    <RCTSafeAreaView
      emulateUnlessSupported={true}
      testID="wrapper"
    >
      <View
        accessibilityLabel="test"
        testID="inner"
      />
    </RCTSafeAreaView>
  `);
});