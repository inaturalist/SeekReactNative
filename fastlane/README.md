fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Distributes a beta version of Seek on TestFlight

### ios release

```sh
[bundle exec] fastlane ios release
```



----


## Android

### android beta

```sh
[bundle exec] fastlane android beta
```

Distributes an Android bundle to the Play Store beta track

### android build_for_screengrab

```sh
[bundle exec] fastlane android build_for_screengrab
```

Build debug and test APK for screenshots

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
