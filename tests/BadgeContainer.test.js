import { render } from "@testing-library/react-native";
import BadgeContainer from "../components/Achievements/BadgeContainer";

describe( "BadgeContainer", () => {
  test( "should render correctly", () => {
    const data = [{ name: "test", earnedIconName: "test" }];
    const mockFn = jest.fn();

    const wrapper = render( <BadgeContainer data={data} renderItem={mockFn} /> );

  } );
} );
