package org.inaturalist.seek;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import org.inaturalist.inatcamera.nativecamera.INatCameraViewPackage;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
        packages.add( new INatCameraViewPackage() );
      return packages;
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
    try {
      /*
        This try/catch is intended to patch fix the Google Maps server issue introduced 4/24/20
      */
      SharedPreferences hasFixedGoogleBug154855417 = getSharedPreferences("google_bug_154855417", Context.MODE_PRIVATE);
      if (!hasFixedGoogleBug154855417.contains("fixed")) {
        File corruptedZoomTables = new File(getFilesDir(), "ZoomTables.data");
        File corruptedSavedClientParameters = new File(getFilesDir(), "SavedClientParameters.data.cs");
        File corruptedClientParametersData =
            new File(
              getFilesDir(),
              "DATA_ServerControlledParametersManager.data.v1."
                  + getBaseContext().getPackageName());
        corruptedZoomTables.delete();
        corruptedSavedClientParameters.delete();
        corruptedClientParametersData.delete();
        hasFixedGoogleBug154855417.edit().putBoolean("fixed", true).apply();
      }
    } catch (Exception e) {

    }

    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager()); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("org.inaturalist.Seek.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
          .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}