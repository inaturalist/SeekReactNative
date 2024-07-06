echo "iOS simulator cache"
rm -rf ~/Library/Developer/CoreSimulator/Caches

echo "React-native cache"
rm -rf $TMPDIR/react-*

echo "Metro bundler cache"
rm -rf $TMPDIR/metro-*

echo "Watchman cache"
watchman watch-del-all

echo "iOS build folder"
rm -rf ios/build

echo "system iOS pods cache"
(cd ios && pod cache clean --all)

echo "Android build folder"
rm -rf android/build

echo "Android gradle folder"
rm -rf android/.gradle

echo "Android clean project"
(cd android && ./gradlew --stop && ./gradlew clean)
