package org.inaturalist.seek

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Build
import android.os.Bundle

class MainActivity : ReactActivity() {
  /**
   * Needed for react-native-screens / react-navigation
   * https://reactnavigation.org/docs/getting-started/
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Seek"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  /**
   * https://github.com/facebook/react-native/issues/54887
   * workaround from that thread for a bug in Android 36+ & RN < 0.84 where
   * the app would get in a state where back gesture/press from anywhere in the
   * app would dismiss. This skips the buggy React behavior and is gated to the
   * API version that introduced it.
   * TODO: remove and validate upstream fix after 0.84 upgrade (MOB-1740)
   */
  override fun invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT >= 36) {
      moveTaskToBack(true)
    } else {
      super.invokeDefaultOnBackPressed()
    }
  }
}
