#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <RNQuickActionManager.h>

static NSString *hasMigratedRealmDatabaseFromContainer = @"HasMigratedRealmDatabaseFromContainer";
static NSString *hasMigratedPhotosFromContainer = @"HasMigratedPhotosFromContainer";
static NSString *appGroupId = @"group.org.inaturalist.CardsSharing";

// #ifdef FB_SONARKIT_ENABLED
// #import <FlipperKit/FlipperClient.h>
// #import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
// #import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
// #import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
// #import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
// #import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

// static void InitializeFlipper(UIApplication *application) {
//   FlipperClient *client = [FlipperClient sharedClient];
//   SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//   [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
//   [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//   [client addPlugin:[FlipperKitReactPlugin new]];
//   [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//   [client start];
// }
// #endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // #if DEBUG
  // #ifdef FB_SONARKIT_ENABLED
  //   InitializeFlipper(application);
  // #endif
  // #endif

  if (![[NSUserDefaults standardUserDefaults] boolForKey:hasMigratedRealmDatabaseFromContainer]) {
    [self migrateRealmDatabaseFromSharedContainer];
  }
  
  if (![[NSUserDefaults standardUserDefaults] boolForKey:hasMigratedPhotosFromContainer]) {
    [self migratePhotosFromSharedContainer];
  }

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                      moduleName:@"Seek"
                                               initialProperties:nil];
  
  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
}

- (void)application:(UIApplication *)application performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem completionHandler:(void (^)(BOOL succeeded)) completionHandler {
  [RNQuickActionManager onQuickActionPress:shortcutItem completionHandler:completionHandler];
}

- (void)migrateRealmDatabaseFromSharedContainer {
  NSString *realmDbFilename = @"db.realm";
  // fm lets us do operations on the filesystem
  NSFileManager *fm = [NSFileManager defaultManager];
  // base url for the shared container
  NSURL *containerUrl = [fm containerURLForSecurityApplicationGroupIdentifier:appGroupId];
  if (containerUrl) {
    // url for the realm database in the container
    NSURL *containerRealmUrl = [containerUrl URLByAppendingPathComponent:realmDbFilename];
    if ([fm fileExistsAtPath:containerRealmUrl.path]) {
      // get the app document directory
      NSURL *documentsUrl =   [[fm URLsForDirectory:NSDocumentDirectory
                                          inDomains:NSUserDomainMask] lastObject];
      // url for the realm database in the app documents directory
      NSURL *documentsRealmUrl = [documentsUrl URLByAppendingPathComponent:realmDbFilename];
      // move error will go here
      NSError *moveError = nil;
      // perform the move
      [fm moveItemAtURL:containerRealmUrl toURL:documentsRealmUrl error:&moveError];
      if (moveError) {
        NSLog(@"error moving file: %@", moveError.localizedDescription);
      }
    }
  }

  // update the user defaults
  [[NSUserDefaults standardUserDefaults] setBool:YES
                                          forKey:hasMigratedRealmDatabaseFromContainer];
  [[NSUserDefaults standardUserDefaults] synchronize];
}

- (void)migratePhotosFromSharedContainer {
  // fm lets us do operations on the filesystem
  NSFileManager *fm = [NSFileManager defaultManager];
  // base url for the shared container
  NSURL *containerUrl = [fm containerURLForSecurityApplicationGroupIdentifier:appGroupId];
  if (containerUrl) {
    // url for the photo directory in the container
    NSURL *containerPhotoBaseUrl = [containerUrl URLByAppendingPathComponent:@"large"];
    NSString *containerPhotoBasePath = [containerPhotoBaseUrl path];
    
    // documents directory for photos
    NSString *documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
    NSString *documentPhotoBasePath = [documentsPath stringByAppendingPathComponent:@"large"];
    if (![fm fileExistsAtPath:documentPhotoBasePath]) {
      NSError *mkdirError = nil;
      [fm createDirectoryAtPath:documentPhotoBasePath
    withIntermediateDirectories:NO
                     attributes:nil
                          error:&mkdirError];
      if (mkdirError) {
        NSLog(@"error creating large directory: %@", mkdirError.localizedDescription);
        return;
      }
    }
    
    NSError *fileScanError = nil;
    NSArray *contents = [fm contentsOfDirectoryAtPath:containerPhotoBasePath
                                                error:&fileScanError];
    if (fileScanError) {
      NSLog(@"error scanning filesystem: %@", fileScanError.localizedDescription);
      return;
    }
    
    for (NSString *containerPhoto in contents) {
      NSString *containerPhotoPath = [containerPhotoBasePath stringByAppendingPathComponent:containerPhoto];
      NSString *documentPhotoPath = [documentPhotoBasePath stringByAppendingPathComponent:containerPhoto];
      
      NSError *moveError = nil;
      [fm moveItemAtPath:containerPhotoPath
                  toPath:documentPhotoPath
                   error:&moveError];
      if (moveError) {
        NSLog(@"error moving photo file: %@", moveError.localizedDescription);
        return;
      }
    }
    
    // update the user defaults
    [[NSUserDefaults standardUserDefaults] setBool:YES
                                            forKey:hasMigratedPhotosFromContainer];
    [[NSUserDefaults standardUserDefaults] synchronize];

  }
}

@end
