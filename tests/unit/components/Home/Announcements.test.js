import React from "react";
import { render, screen } from "tests/jest-utils";
import { waitFor } from "@testing-library/react-native";

import inaturalistjs from "inaturalistjs";

import Announcements from "../../../../components/Home/Announcements/Announcements";

const mockAnnouncement = {
  id: 1,
  body: "<p>This is a mobile announcement</p>",
  dismissible: false,
  start: "2021-01-01T00:00:00.000Z",
  end: "2021-01-31T00:00:00.000Z",
  placement: "mobile/home"
};

const mockDismissibleAnnouncement = {
  id: 2,
  body: "<p>This is a dismissible announcement</p>",
  dismissible: true,
  start: "2021-01-02T00:00:00.000Z",
  end: "2021-01-31T00:00:00.000Z",
  placement: "mobile/home"
};

jest.mock( "inaturalistjs", ( ) => ( {
    __esModule: true,
    default: {
        announcements: {
            search: jest.fn( ( ) => Promise.resolve( {
                total_results: 0,
                results: []
            } ) ),
            dismiss: jest.fn( ( ) => Promise.resolve( { } ) )
        }
    }
} ) );

const containerID = "announcements-container";

describe( "Announcements", () => {
  test( "should call inaturalistjs with locale as param", async () => {
    render( <Announcements /> );
    await waitFor( () => expect( inaturalistjs.announcements.search ).toHaveBeenCalledWith(
        expect.objectContaining( { locale: "en" } ),
        expect.anything()
     ) );
  } );

  test( "should not render without announcements", async () => {
    render( <Announcements /> );
    const container = screen.queryByTestId( containerID );
    expect( container ).toBeNull();
  } );

  describe( "with announcement", () => {
    beforeEach( ( ) => {
        inaturalistjs.announcements.search.mockReturnValueOnce( Promise.resolve( {
            total_results: 1,
            results: [mockAnnouncement]
        } ) );
    } );

    test( "should render correctly", async () => {
        render( <Announcements /> );
        const container = await screen.findByTestId( containerID );
        expect( container ).toBeTruthy();
    } );

    test( "should show body text", async () => {
        render( <Announcements /> );
        const text = await screen.findByText( "This is a mobile announcement" );
        expect( text ).toBeTruthy();
    } );

    test( "should not show close button", async () => {
        render( <Announcements /> );
        await waitFor( () => expect( inaturalistjs.announcements.search ).toHaveBeenCalled() );
        const text = screen.queryByTestId( "close" );
        expect( text ).toBeNull();
    } );
  } );

  describe( "with dismissible announcement", () => {
    beforeEach( ( ) => {
        inaturalistjs.announcements.search.mockReturnValueOnce( Promise.resolve( {
            total_results: 1,
            results: [mockDismissibleAnnouncement]
        } ) );
    } );

    test( "should show close button", async () => {
      render( <Announcements /> );
      const button = await screen.findByText( "CLOSE" );
      expect( button ).toBeTruthy();
    } );
  } );

  describe( "with multiple announcements", () => {
    beforeEach( ( ) => {
        inaturalistjs.announcements.search.mockReturnValueOnce( Promise.resolve( {
            total_results: 2,
            // Oldest last here
            results: [mockDismissibleAnnouncement, mockAnnouncement]
        } ) );
    } );

    test( "show announcement with oldest start date", async () => {
      render( <Announcements /> );
      // Should show the announcement with the oldest start date
      const text = await screen.findByText( "This is a mobile announcement" );
      expect( text ).toBeTruthy();
    } );
  } );

} );
