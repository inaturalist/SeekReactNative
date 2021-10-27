// import { getLanguage, toggleLanguage } from "../settingsHelpers";

// describe( "getLanguage", () => {
//   it( "defaults to device locale when toggleLanguage has not been called", async () => {
//     const result = await getLanguage();

//     expect( result ).toEqual( "device" );
//   } );

//   it( "returns the user's saved language preference", async () => {
//     // using the same language as the __mocks__ findBestAvailableLanguage function
//     toggleLanguage( "en-US" );

//     const result = await getLanguage();
//     const expected = "en-US";

//     expect( result ).toEqual( expected );
//   } );

//   it( "returns device locale when toggleLanguage is null", async () => {
//     toggleLanguage( null );

//     const result = await getLanguage();

//     expect( result ).toEqual( "device" );
//   } );
// } );
