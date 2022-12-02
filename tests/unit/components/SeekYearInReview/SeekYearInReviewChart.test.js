import React from "react";
import { render, screen } from "tests/jest-utils";

import SeekYearInReviewChart from "../../../../components/SeekYearInReview/SeekYearInReviewChart";

const mockData = [
  { count: 11, month: 1 },
  { count: 12, month: 2 },
  { count: 13, month: 3 },
  { count: 14, month: 4 },
  { count: 15, month: 5 },
  { count: 16, month: 6 },
  { count: 18, month: 7 },
  { count: 18, month: 8 },
  { count: 19, month: 9 },
  { count: 20, month: 10 },
  { count: 21, month: 11 },
  { count: 22, month: 12 }
];

const renderPhotos = () => {
  return render( <SeekYearInReviewChart data={mockData} /> );
};

const containerID = "year-in-review-chart-container";

describe( "SeekYearInReviewChart", () => {
  test( "should render correctly", async () => {
    renderPhotos();

    const container = await screen.findByTestId( containerID );
    expect( container ).toBeTruthy();

    expect( screen ).toMatchSnapshot();
  } );

  // TODO: test that chart renders correctly, requires mocking react-native-svg and react-native-svg-charts
} );
