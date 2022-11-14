import { render, screen } from "@testing-library/react-native";

import { LanguageContext } from "../../../../components/UserContext";
import LanguagePicker from "../../../../components/Settings/LanguagePicker";

const renderPicker = ( ) => {
  render(
    <LanguageContext.Provider value={{
      preferredLanguage: "en",
      toggleLanguagePreference: jest.fn( )
    }}>
      <LanguagePicker />
    </LanguageContext.Provider>
  );
};

describe( "LanguagePicker", ( ) => {
  test( "should render correctly", ( ) => {
    renderPicker();
    const picker = screen.getByTestId( "picker" );
    expect( picker ).toBeTruthy( );
    expect( screen.findByText( "Use device language settings" ) ).toBeTruthy();
    expect( screen ).toMatchSnapshot( );
  } );
} );
