package org.inaturalist.seek;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import android.os.Bundle;

public class MainActivity extends ReactActivity {
    /**
     * react-native-screens says this is needed to avoid random crashes when restoring app from the background
     * (this discards any Activity state persisted during the Activity restart process)
     * https://github.com/software-mansion/react-native-screens#android
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Seek";
    }

    /**
    * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
    * you can specify the rendered you wish to use (Fabric or the older renderer).
    */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new MainActivityDelegate(this, getMainComponentName());
    }
    public static class MainActivityDelegate extends ReactActivityDelegate {
        public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
            super(activity, mainComponentName);
        }
        @Override
        protected ReactRootView createRootView() {
            // Added from RNGestureHandler package
            ReactRootView reactRootView = new RNGestureHandlerEnabledRootView(getContext());

            // If you opted-in for the New Architecture, we enable the Fabric Renderer.
            reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
            return reactRootView;
        }
    }
}
