import React from "react";
import { render, screen } from "tests/jest-utils";

import ObsList from "../../../../components/Observations/ObsList";

const mockObservations = [
  { data: [
    {
        "date": new Date( "2022-12-02T10:19:54.000Z" ),
        "latitude": null,
        "longitude": null,
        "taxon": {
            "ancestorIds": [48460, 47126, 211194, 47125, 47124, 71275, 54330, 54331],
            "defaultPhoto": {
                "backupUri": "some_backup_uri",
                "lastUpdated": new Date( "2022-12-02T10:19:54.000Z" ),
                "mediumUrl": "some_url"},
            "iconicTaxonId": 47126,
            "id": 54329,
            "name": "some_name_1",
            "preferredCommonName": "some_common_name_1"
        },
        "uuidString": "15aa735d-5d01-4667-8e82-02d2088d0b5a"
    },
    {
        "date": new Date( "2022-12-02T10:19:12.000Z" ),
        "latitude": null,
        "longitude": null,
        "taxon": {
            "ancestorIds": [48460, 47126, 211194, 47125, 47124, 71275, 54330, 54331],
            "defaultPhoto": {
                "backupUri": "some_backup_uri",
                "lastUpdated": new Date( "2022-12-02T10:19:54.000Z" ),
                "mediumUrl": "some_url"},
            "iconicTaxonId": 47126,
            "id": 54329,
            "name": "some_name_2",
            "preferredCommonName": "some_common_name_2"
        },
        "uuidString": "daa32e9e-4e12-492e-ab3a-8ca3b0782339"
    },
    {
        "date": new Date( "2022-12-02T10:17:21.000Z" ),
        "latitude": null,
        "longitude": null,
        "taxon": {
            "ancestorIds": [48460, 47126, 211194, 47125, 47124, 71275, 54330, 54331],
            "defaultPhoto": {
                "backupUri": "some_backup_uri",
                "lastUpdated": new Date( "2022-12-02T10:19:54.000Z" ),
                "mediumUrl": "some_url"},
            "iconicTaxonId": 47126,
            "id": 54329,
            "name": "some_name_3",
            "preferredCommonName": "some_common_name_3"
        },
        "uuidString": "1976be58-6db2-4743-83c8-f1f871a28b1e"
    }],
    id: 47126 },
  { data: [], id: 3 },
  { data: [], id: 40151 },
  { data: [], id: 47115 },
  { data: [], id: 47158 },
  { data: [], id: 26036 },
  { data: [], id: 47119 },
  { data: [], id: 20978 },
  { data: [], id: 47178 },
  { data: [], id: 47170 },
  { data: [], id: 1 }
];

jest.mock( "../../../../utility/customHooks", () => {
  const actual = jest.requireActual( "../../../../utility/customHooks" );
  return {
    ...actual,
    __esModule: true,
    useUserPhoto: jest.fn( () => ( {
      uri: "some_uri"
    } ) )
  };
} );

const containerID = "observations-list";

describe( "ObsList", () => {
  test( "should render correctly", async () => {
    render(
      <ObsList
        fetchFilteredObservations={() => jest.fn()}
        observations={mockObservations}
        searchText={""}
        openModal={() => jest.fn()}
        updateObs={() => jest.fn()}
        clearText={() => jest.fn()}
      />
    );
    const container = await screen.findByTestId( containerID );
    expect( container ).toBeTruthy();
    expect( screen ).toMatchSnapshot();
  } );
} );
