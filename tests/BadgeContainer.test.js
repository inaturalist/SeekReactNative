import { render } from "@testing-library/react-native";
import BadgeContainer from "../components/Achievements/BadgeContainer";

describe( "BadgeContainer", () => {
  test( "that badge container renders", () => {
    const data = [{ name: "test", earnedIconName: "test" }];
    const mockFn = jest.fn();

    render( <BadgeContainer data={data} renderItem={mockFn} /> );

  } );
} );
