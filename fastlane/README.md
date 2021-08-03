fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios beta
```
fastlane ios beta
```
Distributes a beta version of Seek on TestFlight
### ios release
```
fastlane ios release
```


----

## Android
### android beta
```
fastlane android beta
```
Distributes an Android bundle to the Play Store beta track
### android build_for_screengrab
```
fastlane android build_for_screengrab
```
Build debug and test APK for screenshots

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
