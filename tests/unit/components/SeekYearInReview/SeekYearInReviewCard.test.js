import React from "react";
import { render, screen } from "tests/jest-utils";

import SeekYearInReviewCard from "../../../../components/Home/SeekYearInReview/SeekYearInReviewCard";
import { useCountObservationsForYear } from "../../../../components/SeekYearInReview/hooks/seekYearInReviewHooks";

jest.mock(
  "../../../../components/SeekYearInReview/hooks/seekYearInReviewHooks",
  () => ( {
    __esModule: true,
    useCountObservationsForYear: jest.fn( () => 100 )
  } )
);

const renderCard = () => {
  render( <SeekYearInReviewCard /> );
};

const cardID = "yir-card";
describe( "SeekYearInReviewCard", () => {
    test( "should not render for zero observations this year", async () => {
        useCountObservationsForYear.mockReturnValueOnce( 0 );
        renderCard();
        expect( screen.queryByTestId( cardID ) ).toBeNull();
    } );

    test( "should not render outside December and January", async () => {
      jest.useFakeTimers().setSystemTime( new Date( 2020, 5, 15 ) );
      renderCard();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      expect( screen.queryByTestId( cardID ) ).toBeNull();
    } );

    test( "should render in December with observations", async () => {
      jest.useFakeTimers().setSystemTime( new Date( 2020, 11, 15 ) );
      renderCard();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      await screen.findByTestId( cardID );
      expect( screen ).toMatchSnapshot();
    } );

    test( "should render in January with observations", async () => {
      jest.useFakeTimers().setSystemTime( new Date( 2020, 0, 15 ) );
      renderCard();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      await screen.findByTestId( cardID );
      expect( screen ).toMatchSnapshot();
    } );
} );
