import { render, screen, fireEvent } from "@testing-library/react-native";
import { LanguageContext } from "../components/UserContext";
import { Alert } from "react-native";

import LanguagePicker from "../components/Settings/LanguagePicker";

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
  } );

  test( "should open alert on done pressed and not before on iOS", () => {
    const alertSpy = jest.spyOn( Alert, "alert" );
    renderPicker();
    const picker = screen.getByTestId( "picker" );

    // Change language to "es" no alert should be shown
    fireEvent( picker, "onValueChange", "es" );
    expect( alertSpy ).not.toHaveBeenCalled( );
    // Press done, show confirmation alert
    fireEvent( picker, "onDonePress" );
    expect( alertSpy ).toHaveBeenCalled();
    // TODO: this works with the iOS picker, but not with the Android one
    // because Platform.OS always returns "ios" in the test environment
  } );
} );
