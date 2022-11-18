import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";

import { LanguageContext } from "../../../../components/UserContext";
import LanguagePicker from "../../../../components/Settings/LanguagePicker";

const renderPicker = () => {
  render(
    <LanguageContext.Provider
      value={{
        preferredLanguage: "en",
        toggleLanguagePreference: jest.fn()
      }}
    >
      <LanguagePicker />
    </LanguageContext.Provider>
  );
};

const pickerID = "picker";
describe( "LanguagePicker", () => {
  test( "should render correctly", () => {
    renderPicker();
    screen.findByTestId( pickerID );
    const picker = screen.getByTestId( pickerID );
    expect( picker ).toBeTruthy();
    expect( screen.getByText( "Use device language settings" ) ).toBeTruthy();
    expect( screen ).toMatchSnapshot();
  } );

  test( "should open alert on done pressed and not before on iOS", () => {
    const alertSpy = jest.spyOn( Alert, "alert" );
    renderPicker();
    screen.findByTestId( pickerID );
    const picker = screen.getByTestId( pickerID );

    // Change language to "es" no alert should be shown
    fireEvent( picker, "onValueChange", "es" );
    expect( alertSpy ).not.toHaveBeenCalled();
    // Press done, show confirmation alert
    fireEvent( picker, "onDonePress" );
    expect( alertSpy ).toHaveBeenCalled();
    // TODO: this works with the iOS picker, but not with the Android one
    // because Platform.OS always returns "ios" in the test environment
  } );

  test( "should change the language to Spanish", () => {
    renderPicker();
    screen.findByTestId( pickerID );
    const picker = screen.getByTestId( pickerID );

    // Change language to "es" no alert should be shown
    fireEvent( picker, "onValueChange", "es" );
    fireEvent( picker, "onDonePress" );

    // TODO: Press confirm on the Alert, could not get this to work
    // const alertSpy = jest.spyOn( Alert, "alert" );
    // alertSpy.mock.calls[0][2][0].onPress();

    // TODO: Text should be in Spanish
    // expect( screen.findByText( "Usar las opciones de idioma del móvil" ) ).toBeTruthy();
    // expect( screen ).toMatchSnapshot();
  } );

} );
