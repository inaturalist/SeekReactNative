import React from "react";
import { render, screen } from "tests/jest-utils";

import SpeciesPhotosLandscape from "../../../../components/Species/SpeciesPhotosLandscape";

const mockPhotos = [
    {
        attribution:
        "(c) Craig K. Hunt, some rights reserved (CC BY-NC-ND), uploaded by Craig K. Hunt",
        flags: [],
        id: 101327658,
        license_code: "cc-by-nc-nd",
        medium_url:
        "https://inaturalist-open-data.s3.amazonaws.com/photos/101327658/medium.jpg",
        original_dimensions: [{}],
        square_url:
        "https://inaturalist-open-data.s3.amazonaws.com/photos/101327658/square.jpg",
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/101327658/square.jpg"
    }
];
const mockLoading = false;
const mockId = undefined;

jest.mock( "../../../../utility/customHooks", () => ( {
  __esModule: true,
  useUserPhoto: jest.fn( () => ( { uri: "some_uri"} ) ),
  useSeenTaxa: jest.fn( () => null )
} ) );

const containerID = "species-photos-landscape";

describe( "SpeciesPhotosLandscape", () => {
  test( "should render correctly", async () => {
    render( <SpeciesPhotosLandscape photos={mockPhotos} loading={mockLoading} id={mockId} /> );
    const container = await screen.findByTestId( containerID );
    expect( container ).toBeTruthy();
    expect( screen ).toMatchSnapshot();
  } );
} );
