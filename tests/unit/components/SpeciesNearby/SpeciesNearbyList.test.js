import React from "react";
import { render, screen } from "tests/jest-utils";

import SpeciesNearbyList from "../../../../components/UIComponents/SpeciesNearby/SpeciesNearbyList";

const mockTaxa = [
  {
    ancestor_ids: [48460, 1, 2, 355675, 3, 71261, 5067, 5179, 5212],
    ancestry: "48460/1/2/355675/3/71261/5067/5179",
    atlas_id: null,
    complete_rank: "subspecies",
    complete_species_count: null,
    created_at: "2008-03-13T02:47:36+00:00",
    current_synonymous_taxon_ids: null,
    default_photo: {
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
    },
    english_common_name: "Red-tailed Hawk",
    extinct: false,
    flag_counts: { resolved: 5, unresolved: 0 },
    iconic_taxon_id: 3,
    iconic_taxon_name: "Aves",
    id: 5212,
    is_active: true,
    min_species_ancestry: "48460,1,2,355675,3,71261,5067,5179,5212",
    min_species_taxon_id: 5212,
    name: "Buteo jamaicensis",
    observations_count: 164650,
    parent_id: 5179,
    photos_locked: false,
    preferred_common_name: "Red-tailed Hawk",
    rank: "species",
    rank_level: 10,
    taxon_changes_count: 2,
    taxon_photos: [
      {
        photo: {
          attribution:
            "(c) Craig K. Hunt, some rights reserved (CC BY-NC-ND), uploaded by Craig K. Hunt",
          flags: [],
          id: 101327658,
          large_url:
            "https://inaturalist-open-data.s3.amazonaws.com/photos/101327658/large.jpg",
          license_code: "cc-by-nc-nd",
          medium_url:
            "https://inaturalist-open-data.s3.amazonaws.com/photos/101327658/medium.jpg",
          native_page_url: null,
          native_photo_id: null,
          original_dimensions: [{}],
          original_url:
            "https://inaturalist-open-data.s3.amazonaws.com/photos/101327658/original.jpg",
          small_url:
            "https://inaturalist-open-data.s3.amazonaws.com/photos/101327658/small.jpg",
          square_url:
            "https://inaturalist-open-data.s3.amazonaws.com/photos/101327658/square.jpg",
          type: "LocalPhoto",
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/101327658/square.jpg"
        },
        taxon_id: 5212
      }
    ],
    taxon_schemes_count: 9,
    universal_search_rank: 164650,
    wikipedia_url: "https://en.wikipedia.org/wiki/Red-tailed_hawk"
  }
];
const mockObserved = undefined;

jest.mock( "../../../../utility/customHooks", () => ( {
  __esModule: true,
  useCommonName: jest.fn( () => "Red-tailed Hawk" ),
  useSeenTaxa: jest.fn( () => null )
} ) );

const containerID = "species-nearby-list";

describe( "SpeciesNearbyList", () => {
  test( "should render correctly", async () => {
    render( <SpeciesNearbyList taxa={mockTaxa} observed={mockObserved} /> );
    const container = await screen.findByTestId( containerID );
    expect( container ).toBeTruthy();
    expect( screen ).toMatchSnapshot();
  } );
} );
