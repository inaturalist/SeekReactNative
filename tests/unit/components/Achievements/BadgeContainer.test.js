import React from "react";
import { render, screen } from "@testing-library/react-native";
import BadgeContainer from "../../../../components/Achievements/BadgeContainer";

const containerID = "badge-container";

describe( "BadgeContainer", () => {
  test( "should render correctly", async () => {
    const data = [{ name: "test", earnedIconName: "test" }];
    const mockFn = jest.fn();
    render( <BadgeContainer data={data} renderItem={mockFn} /> );
    const container = await screen.findByTestId( containerID );
    expect( container ).toBeTruthy();
    expect( mockFn ).toHaveBeenCalledTimes( 1 );
    expect( screen ).toMatchSnapshot();
  } );
} );
