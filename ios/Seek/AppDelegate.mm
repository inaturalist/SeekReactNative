#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <React/RCTAppSetupUtils.h>

#import <RNQuickActionManager.h>

static NSString *hasMigratedRealmDatabaseFromContainer = @"HasMigratedRealmDatabaseFromContainer";
static NSString *hasMigratedPhotosFromContainer = @"HasMigratedPhotosFromContainer";
static NSString *appGroupId = @"group.org.inaturalist.CardsSharing";

#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>

#import <react/config/ReactNativeConfig.h>

static NSString *const kRNConcurrentRoot = @"concurrentRoot";

@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTAppSetupPrepareApp(application);

  if (![[NSUserDefaults standardUserDefaults] boolForKey:hasMigratedRealmDatabaseFromContainer]) {
    [self migrateRealmDatabaseFromSharedContainer];
  }

  if (![[NSUserDefaults standardUserDefaults] boolForKey:hasMigratedPhotosFromContainer]) {
    [self migratePhotosFromSharedContainer];
  }

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

#if RCT_NEW_ARCH_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
#endif

  NSDictionary *initProps = [self prepareInitialProps];
  UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"Seek", initProps);

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

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feture is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  // Switch this bool to turn on and off the concurrent root
  return true;
}

- (NSDictionary *)prepareInitialProps
{
  NSMutableDictionary *initProps = [NSMutableDictionary new];

#ifdef RCT_NEW_ARCH_ENABLED
  initProps[kRNConcurrentRoot] = @([self concurrentRootEnabled]);
#endif

  return initProps;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
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

#if RCT_NEW_ARCH_ENABLED

#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                             delegate:self
                                                            jsInvoker:bridge.jsCallInvoker];
  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}

#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     initParams:
                                                         (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  return RCTAppSetupDefaultModuleFromClass(moduleClass);
}

#endif

@end
