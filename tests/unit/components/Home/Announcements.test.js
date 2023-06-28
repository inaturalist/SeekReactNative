import React from "react";
import { render, screen } from "tests/jest-utils";
import { waitFor } from "@testing-library/react-native";

import inaturalistjs from "inaturalistjs";

import Announcements from "../../../../components/Home/Announcements/Announcements";

const mockAnnouncement = {
  id: 1,
  body: "<p>This is a mobile announcement</p>",
  dismissible: false,
  start: "1971-01-01T00:00:00.000Z",
  end: "3021-01-31T00:00:00.000Z",
  placement: "mobile/home"
};

const mockDismissibleAnnouncement = {
  id: 2,
  body: "<p>This is a dismissible announcement</p>",
  dismissible: true,
  start: "1971-01-02T00:00:00.000Z",
  end: "3021-01-31T00:00:00.000Z",
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

    await waitFor( () => expect( inaturalistjs.announcements.search ).toHaveBeenCalled() );

    const container = screen.queryByTestId( containerID );
    expect( container ).toBeNull();
  } );

  describe( "with announcement", () => {
    beforeEach( ( ) => {
        inaturalistjs.announcements.search.mockReturnValue( Promise.resolve( {
            total_results: 1,
            results: [mockAnnouncement]
        } ) );
    } );

    test( "should render correctly", async () => {
        render( <Announcements /> );

        await waitFor( () => expect( inaturalistjs.announcements.search ).toHaveBeenCalled() );

        const container = await screen.findByTestId( containerID );
        expect( container ).toBeTruthy();
    } );

    test( "should show body text", async () => {
        render( <Announcements /> );

        await waitFor( () => expect( inaturalistjs.announcements.search ).toHaveBeenCalled() );

        const webview = await screen.findByTestId( "announcements-webview" );
        expect( webview ).toBeTruthy();
        expect( webview.props.source ).toStrictEqual( {
          html: mockAnnouncement.body
        } );
    } );

    test( "should not show dismiss button", async () => {
        render( <Announcements /> );

        await waitFor( () => expect( inaturalistjs.announcements.search ).toHaveBeenCalled() );

        const text = screen.queryByText( "DISMISS" );
        expect( text ).toBeNull();
    } );
  } );

  describe( "with dismissible announcement", () => {
    beforeEach( ( ) => {
        inaturalistjs.announcements.search.mockReturnValue( Promise.resolve( {
            total_results: 1,
            results: [mockDismissibleAnnouncement]
        } ) );
    } );

    test( "should show dismiss button", async () => {
      render( <Announcements /> );

      await waitFor( () => expect( inaturalistjs.announcements.search ).toHaveBeenCalled() );

      const button = await screen.findByText( "DISMISS" );
      expect( button ).toBeTruthy();
    } );
  } );

  describe( "with multiple announcements", () => {
    beforeEach( ( ) => {
        inaturalistjs.announcements.search.mockReturnValue( Promise.resolve( {
            total_results: 2,
            // Oldest last here
            results: [mockDismissibleAnnouncement, mockAnnouncement]
        } ) );
    } );

    test( "show announcement with oldest start date", async () => {
      render( <Announcements /> );

      await waitFor( () =>
        expect( inaturalistjs.announcements.search ).toHaveBeenCalled()
      );

      // Test for oldest announcement
      const webview = await screen.findByTestId( "announcements-webview" );
      expect( webview ).toBeTruthy();
      expect( webview.props.source ).toStrictEqual( {
        html: mockAnnouncement.body
      } );
    } );
  } );

} );
