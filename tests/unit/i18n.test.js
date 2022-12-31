import i18n from "../../i18n";

describe( "pluralization", ( ) => {
  it( "should translate few and other forms separately in Croatian", ( ) => {
    const fewForm = i18n.t( "results.error_downtime_plural", { count: 3, locale: "hr" } )
      .replace( "3", "" );
    const otherForm = i18n.t( "results.error_downtime_plural", { count: 30, locale: "hr" } )
      .replace( "30", "" );
    expect( fewForm ).not.toEqual( otherForm );
  } );
} );
