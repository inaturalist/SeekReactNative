package org.inaturalist.seek;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.inaturalist.inatcamera.nativecamera.INatCameraViewPackage;
import com.rnfs.RNFSPackage;
import io.realm.react.RealmReactPackage;
import com.horcrux.svg.SvgPackage;
import com.opensettings.OpenSettingsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new INatCameraViewPackage(),
            new RNFSPackage(),
            new RealmReactPackage(),
            new SvgPackage(),
            new OpenSettingsPackage(),
            new MapsPackage(),
            new LinearGradientPackage(),
            new RNLanguagesPackage(),
            new ImageResizerPackage(),
            new RNGestureHandlerPackage(),
            new RNGeocoderPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}