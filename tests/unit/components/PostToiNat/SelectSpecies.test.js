import React from "react";
import { render, screen } from "tests/jest-utils";

import SelectSpecies from "../../../../components/PostToiNat/SelectSpecies";

const renderScreen = () => {
  return render(
    <SelectSpecies
      toggleSpeciesModal={() => jest.fn()}
      image={"some_image"}
      updateTaxon={() => jest.fn()}
      seekId={{
        name: "some_name",
        preferredCommonName: "some_common_name",
        taxaId: 49322
      }}
    />
  );
};

const containerID = "select-species-container";

describe( "SelectSpecies", () => {
  test( "should render correctly", async () => {
    renderScreen();

    const container = await screen.findByTestId( containerID );
    expect( container ).toBeTruthy();

    // Create snapshot
    expect( screen ).toMatchSnapshot();
  } );
} );
