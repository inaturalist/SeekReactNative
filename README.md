# Seek App Version 2.0

Seek is an app built for iOS and Android. 

## Setup

1. Install dependences with `npm install`
2. Run `npm start`
3. Build locally to a device or simulator by running `react-native run-ios` or `react-native run-android`
4. Go to `android/app/src/main/res/values` and rename config.xml.example to config.xml (and change its values to match your API keys)
5. Rename config.example.js to config.js and change the JWT secret.
6. When installing the `react-native-maps` library, you'll need to add one line of code to `react-native-maps/lib/ios/AirMaps/AIRMapUrlTile.m`. This is a fix to make sure tile overlays do not appear choppy on iOS: 

```
if (self.maximumZ) {
  self.tileOverlay.maximumZ = self.maximumZ;
}
self.tileOverlay.tileSize = CGSizeMake(512, 512); // ADD THIS LINE
self.renderer = [[MKTileOverlayRenderer alloc] initWithTileOverlay:self.tileOverlay];
```
