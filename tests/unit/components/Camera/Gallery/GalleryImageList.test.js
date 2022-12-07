import React from "react";
import { render, screen } from "tests/jest-utils";

import GalleryImageList from "../../../../../components/Camera/Gallery/GalleryImageList";

const mockPhotos = [
  {
    node: {
      group_name: "All Photos",
      image: {
        fileSize: null,
        filename: null,
        height: null,
        playableDuration: null,
        uri: "some_uri_1",
        width: null
      },
      location: null,
      timestamp: 1669976394.6891332,
      type: "image"
    }
  },
  {
    node: {
      group_name: "All Photos",
      image: {
        fileSize: null,
        filename: null,
        height: null,
        playableDuration: null,
        uri: "some_uri_2",
        width: null
      },
      location: null,
      timestamp: 1669976352.0699105,
      type: "image"
    }
  },
  {
    node: {
      group_name: "All Photos",
      image: {
        fileSize: null,
        filename: null,
        height: null,
        playableDuration: null,
        uri: "some_uri_3",
        width: null
      },
      location: null,
      timestamp: 1669976241.7418242,
      type: "image"
    }
  },
  {
    node: {
      group_name: "All Photos",
      image: {
        fileSize: null,
        filename: null,
        height: null,
        playableDuration: null,
        uri: "some_uri_4",
        width: null
      },
      location: null,
      timestamp: 1669801317.2202396,
      type: "image"
    }
  },
  {
    node: {
      group_name: "All Photos",
      image: {
        fileSize: null,
        filename: null,
        height: null,
        playableDuration: null,
        uri: "some_uri_5",
        width: null
      },
      location: null,
      timestamp: 1669801317.2202396,
      type: "image"
    }
  }
];

const containerID = "gallery-image-list";

describe( "GalleryImageList", () => {
  test( "should render correctly", async () => {
    render( <GalleryImageList onEndReached={() => jest.fn()} photos={mockPhotos} setLoading={() => jest.fn()} /> );
    const container = await screen.findByTestId( containerID );
    expect( container ).toBeTruthy();
    expect( screen ).toMatchSnapshot();
  } );
} );
