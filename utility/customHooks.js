import { useEffect } from "react";
import { Platform } from "react-native";

const useScrollToTop = ( scrollView, navigation ) => {
  const scrollToTop = () => {
    if ( scrollView && scrollView.current !== null ) {
      scrollView.current.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  };

  useEffect( () => {
    navigation.addListener( "willFocus", () => {
      scrollToTop();
    } );
  } );
};

export default useScrollToTop;
