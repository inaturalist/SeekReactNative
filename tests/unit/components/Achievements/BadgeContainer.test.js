import React from "react";
import { render, screen } from "@testing-library/react-native";
import BadgeContainer from "../../../../components/Achievements/BadgeContainer";

describe( "BadgeContainer", () => {
  test( "should render correctly", () => {
    const data = [{ name: "test", earnedIconName: "test" }];
    const mockFn = jest.fn();
    render( <BadgeContainer data={data} renderItem={mockFn} /> );
    expect( screen.findByTestId( "badge-container" ) ).toBeTruthy();
    expect( mockFn ).toHaveBeenCalledTimes( 1 );
    expect( screen ).toMatchSnapshot();
  } );
} );
