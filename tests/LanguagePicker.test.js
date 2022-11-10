import { render, screen, fireEvent } from "@testing-library/react-native";
import { LanguageContext } from "../components/UserContext";
import { Alert } from "react-native";

import LanguagePicker from "../components/Settings/LanguagePicker";

import nodeUtil from "util";

function inspect( target ) {
  return nodeUtil.inspect( target, false, null, true );
}

describe( "LanguagePicker", ( ) => {
  test( "should render correctly", ( ) => {
    const alertSpy = jest.spyOn( Alert, "alert" );
    const wrapper = render(
      <LanguageContext.Provider value={{
        preferredLanguage: "en",
        toggleLanguagePreference: jest.fn( )
      }}>
        <LanguagePicker />
      </LanguageContext.Provider>
    );
    const picker = screen.getByTestId( "picker" );
    fireEvent( picker, "onValueChange", "af" );
    fireEvent.press( picker );
    expect( alertSpy ).toHaveBeenCalled( );
    // TODO don't just test onValueChange. Instead, test that this does *not*
    // happen on scroll, but only happens when you tap the DONE button
  } );

} );
