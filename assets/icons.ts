import { ImageSourcePropType } from "react-native";

type Icons = {
  [key: string]: ImageSourcePropType;
};

const icons: Icons = {
  completed: require( "./icons/icon-completed.webp" ),
  checklist: require( "./icons/icon-checklist.webp" ),
  filter: require( "./icons/icon-filter.webp" ),
  error: require( "./icons/icon-error.webp" ),
  internet: require( "./icons/icon-internet.webp" ),
  indicator: require( "./icons/icon-locationindicator.webp" ),
  locationPin: require( "./icons/icon-location-onmap.webp" ),
  hamburger: require( "./navbar/Menu.webp" ),
  notifications: require( "./navbar/Notifications.webp" ),
  notificationsInactive: require( "./navbar/Notifications-inactive.webp" ),
  cameraHelp: require( "./icons/icon-help-shadow.webp" ),
  cameraGreen: require( "./navbar/icon-camerabutton.webp" ),
  arCameraButton: require( "./icons/CameraButton.webp" ),
  arCameraGreen: require( "./icons/CameraButton-Species.webp" ),
  backButton: require( "./icons/back.webp" ),
  badgeBanner: require( "./icons/img-badgebanner.webp" ),
  menuHome: require( "./icons/icon-menu-home.webp" ),
  menuAchievements: require( "./badges/observations/icon-badge-gold.webp" ),
  menuChallenges: require( "./icons/icon-menu-challenges.webp" ),
  menuInat: require( "./logos/iNatStatsSpeciesDetail-Bird.webp" ),
  menuObservations: require( "./icons/icon-menu-observations.webp" ),
  menuAbout: require( "./icons/icon-menu-seek.webp" ),
  menuSettings: require( "./icons/icon-menu-settings.webp" ),
  closeWhite: require( "./icons/icon-close-white.webp" ),
  closeModal: require( "./icons/icon-close-modal.webp" ),
  titleBanner: require( "./icons/img-titlebanner.webp" ),
  swipeRight: require( "./icons/img-swipearrow-right.webp" ),
  badgeSwipeRight: require( "./icons/img-badgeswipearrow-right.webp" ),
  onboarding1: require( "./onboarding/img-onboarding-1-2020.webp" ),
  onboarding2: require( "./onboarding/img-onboarding-2-2020.webp" ),
  onboarding3: require( "./onboarding/img-onboarding-3-2020.webp" ),
  cameraHelpTree: require( "./icons/img-camerahelp-tree.webp" ),
  cameraHelpTop: require( "./icons/img-camerahelp-taxonomy.webp" ),
  birdBadge: require( "./icons/img-birdbadge.webp" ),
  speciesNearby: require( "./icons/img-speciesnearby.webp" ),
  greenDot: require( "./icons/GreenCircle-square-shadow.webp" ),
  whiteDot: require( "./icons/WhiteCircle-square-shadow.webp" ),
  legendCamera: require( "./icons/legend-icon-camerabutton.webp" ),
  legendLocation: require( "./icons/legend-icon-location-onmap.webp" ),
  legendObs: require( "./icons/legend-icon-inatobs.webp" ),
  cameraOnMap: require( "./icons/icon-camerabutton-onmap.webp" ),
  flag: require( "./icons/icon-flagidentification.webp" ),
  dropdownOpen: require( "./icons/icon-dropdown-open.webp" ),
  delete: require( "./icons/button-deleteobservation.webp" ),
  warning_1: require( "./icons/icon-donttrespass.webp" ),
  warning_2: require( "./icons/icon-donteat.webp" ),
  warning_3: require( "./icons/icon-donttouch.webp" ),
  grayBullet: require( "./icons/img-bullet-small.webp" ),
  speciesObserved: require( "./icons/icon-speciesobserved.webp" ),
  closeGray: require( "./icons/icon-close-small-gray.webp" ),
  nonPlantsFilter: require( "./icons/plantfilter-nonplantsonly.webp" ),
  plantsFilter: require( "./icons/plantfilter-plantsonly.webp" ),
  plantFilterOff: require( "./icons/plantfilter-off.webp" ),
  iconShare: require( "./icons/icon-share.webp" ),
  cropIcon: require( "./icons/button-crop.webp" ),
  cropIconWhite: require( "./icons/icon-crop.webp" ),
  iNat_valueprop_bullet_1: require( "./icons/icon-sync-green.webp" ),
  iNat_valueprop_bullet_2: require( "./icons/icon-cv-green.webp" ),
  iNat_valueprop_bullet_3: require( "./icons/icon-obs-green.webp" ),
  iNat_valueprop_bullet_4: require( "./icons/icon-person-green.webp" ),
  noProfilePhoto: require( "./icons/img-inatlogin-nophoto.webp" ),
  gallery: require( "./icons/icon-gallery.webp" )
};

export default icons;
