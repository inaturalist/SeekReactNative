import "react-native";
import React, { useContext } from "react";
import { fireEvent, render } from "@testing-library/react-native";
import LanguagePicker from "../LanguagePicker";
import { LanguageContext } from "../../UserContext";
import { renderHook } from "@testing-library/react-hooks";
// import { expect, it } from "@jest/globals";

it( "renders correctly", () => {
  const wrapper = ( { children } ) => (
    <LanguageContext.Provider value={{
      toggleLanguagePreference: jest.fn()
    }}>
      {children}
    </LanguageContext.Provider>
  );

  const { result } = renderHook( () => useContext(), { wrapper } );

  console.log( result, "result in lang picker spec" );

  // const { getByTestId } = render( <LanguagePicker /> );

  // const pickerSelect = getByTestId( "picker" );

  // console.log( pickerSelect, "picker select" );

  // // expect( counterText.props.children ).toEqual( ["Current count: ", 0] );
  // fireEvent.press( pickerSelect );
} );
