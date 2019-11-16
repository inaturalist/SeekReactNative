/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

static NSString *hasMigratedRealmDatabaseFromContainer = @"HasMigratedRealmDatabaseFromContainer";
static NSString *hasMigratedPhotosFromContainer = @"HasMigratedPhotosFromContainer";
static NSString *appGroupId = @"group.org.inaturalist.CardsSharing";

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];

  if (![[NSUserDefaults standardUserDefaults] boolForKey:hasMigratedRealmDatabaseFromContainer]) {
    [self migrateRealmDatabaseFromSharedContainer];
  }
  
  if (![[NSUserDefaults standardUserDefaults] boolForKey:hasMigratedPhotosFromContainer]) {
    [self migratePhotosFromSharedContainer];
  }
  
  NSURL *jsCodeLocation;

  #ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Seek"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
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
