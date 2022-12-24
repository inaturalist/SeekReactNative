import React from "react";
import { View, Text } from "react-native";
import { render, screen } from "tests/jest-utils";

import HorizontalScroll from "../../../../components/UIComponents/HorizontalScroll";

const mockPhotoList = [
    <View key={0} >
        <Text>Item 1</Text>
    </View>,
    <View key={1} >
        <Text>Item 2</Text>
    </View>,
    <View key={2} >
        <Text>Item 3</Text>
    </View>
];

const containerTestId = "horizontal-scroll";

describe( "HorizontalScroll", () => {
  test( "should render correctly", async () => {
    render( <HorizontalScroll photoList={mockPhotoList} /> );
    await screen.findByTestId( containerTestId );
    expect( screen ).toMatchSnapshot();
  } );

  test( "should display the first item in props", async () => {
    render( <HorizontalScroll photoList={mockPhotoList} /> );
    const item1 = await screen.findByText( "Item 1" );
    expect( item1 ).toBeTruthy();
  } );
} );
