import React from "react";
import { render } from "@testing-library/react-native";

import GalleryHeader from "../GalleryHeader";
import i18n from "../../../../i18n";

describe( "GalleryHeader", () => {
  describe( "before album names are loaded", () => {
    const { getByTestId } = render( <GalleryHeader /> );
    it( "displays plain text that says camera roll", () => {
      const cameraRollText = i18n.t( "gallery.camera_roll" ).toLocaleUpperCase();

      expect( getByTestId( "cameraRollText" ).props.children ).toEqual( cameraRollText );
    } );
  } );
} );
