import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";

import LanguagePicker from "../../../../components/Settings/LanguagePicker";
import { LanguageContext } from "../../../../components/UserContext";
import { toggleLanguage } from "../../../../utility/settingsHelpers";

// Mock the hooks
jest.mock( "../../../../utility/settingsHelpers" );

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
const newLanguage = "es";
describe( "LanguagePicker", () => {
  test( "should render correctly", async () => {
    renderPicker();
    await screen.findByTestId( pickerID );
    const picker = screen.getByTestId( pickerID );
    expect( picker ).toBeTruthy();
    expect( screen.getByText( "Use device language settings" ) ).toBeTruthy();
    expect( screen ).toMatchSnapshot();
  } );

  test( "should on iOS open alert on Done pressed but not before", async () => {
    const alertSpy = jest.spyOn( Alert, "alert" );
    renderPicker();
    await screen.findByTestId( pickerID );
    const picker = screen.getByTestId( pickerID );

    // Change language to "es" no alert should be shown
    fireEvent( picker, "onValueChange", newLanguage );
    expect( alertSpy ).not.toHaveBeenCalled();
    // Press done, show confirmation alert
    fireEvent( picker, "onDonePress" );
    expect( alertSpy ).toHaveBeenCalledTimes( 1 );
    // TODO: this works with the iOS picker, but not with the Android one
    // because Platform.OS always returns "ios" in the test environment
  } );

  test( "should call the language change hook with the new language", async () => {
    renderPicker();
    await screen.findByTestId( pickerID );
    const picker = screen.getByTestId( pickerID );

    // Change language to "es" no alert should be shown
    fireEvent( picker, "onValueChange", newLanguage );
    fireEvent( picker, "onDonePress" );

    const alertSpy = jest.spyOn( Alert, "alert" );
    // This is a press of the Confirm button on the Alert
    alertSpy.mock.calls[0][2][1].onPress();

    // Expect hook to be called with the new language
    expect( jest.isMockFunction( toggleLanguage ) ).toBeTruthy();
    expect( toggleLanguage ).toBeCalledWith( newLanguage );
  } );

} );
