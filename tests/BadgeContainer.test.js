import { render, screen, fireEvent } from "@testing-library/react-native";
import BadgeContainer from "../components/Achievements/BadgeContainer";

test( "test", () => {
  const data = ["q1", "q2"];
  const mockFn = jest.fn();

  render( <BadgeContainer data={data} renderItem={mockFn} /> );

} );
