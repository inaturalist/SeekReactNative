import { render, screen, fireEvent } from "@testing-library/react-native";
import { LanguageContext } from "../components/UserContext";
import { Alert } from "react-native";

import LanguagePicker from "../components/Settings/LanguagePicker";

import nodeUtil from "util";

function inspect( target ) {
  return nodeUtil.inspect( target, false, null, true );
}

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
  } );
} );
