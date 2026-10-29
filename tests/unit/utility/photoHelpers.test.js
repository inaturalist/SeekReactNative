jest.mock( "@dr.pogodin/react-native-fs", () => ( {
  appendFile: jest.fn(),
  ExternalStorageDirectoryPath: "/external",
  mkdir: jest.fn(),
  moveFile: jest.fn(),
  stat: jest.fn(),
  unlink: jest.fn(),
} ) );

jest.mock( "realm", () => ( {
  __esModule: true,
  default: {
    open: jest.fn(),
    Object: class {},
  },
} ) );

jest.mock( "../../../i18n", () => ( {
  __esModule: true,
  default: { t: jest.fn( ( key ) => key ) },
} ) );

jest.mock( "../../../models/index", () => ( {} ) );
jest.mock( "../../../styles/global", () => ( { dimensions: { width: 400 } } ) );
jest.mock( "../../../utility/androidHelpers.android", () => ( {
  checkSavePermissions: jest.fn(),
} ) );
jest.mock( "../../../utility/dateHelpers", () => ( {
  formatHourMonthSecond: jest.fn(),
  formatYearMonthDay: jest.fn(),
  namePhotoByTime: jest.fn(),
  setISOTime: jest.fn(),
} ) );
jest.mock( "../../../utility/dirStorage", () => ( { dirPictures: "/pictures" } ) );
jest.mock( "../../../utility/logManagementHelpers", () => ( {
  ensureLogDirectory: jest.fn(),
  getTodayLogFilePath: jest.fn(),
} ) );

import ImageResizer from "@bam.tech/react-native-image-resizer";

import { resizeImage } from "../../../utility/photoHelpers";

describe( "resizeImage", () => {
  beforeEach( () => {
    ImageResizer.createResizedImage.mockClear();
  } );

  it( "prefixes bare absolute paths with file:// for the resizer", async () => {
    const barePath = "/data/user/0/org.inaturalist.seek/cache/photo.jpg";
    await resizeImage( barePath, 2048 );

    expect( ImageResizer.createResizedImage.mock.calls[0][0] ).toBe(
      `file://${barePath}`,
    );
  } );

  it( "passes file:// URIs through unchanged", async () => {
    const uri = "file:///already/prefixed.jpg";
    await resizeImage( uri, 2048 );

    expect( ImageResizer.createResizedImage.mock.calls[0][0] ).toBe( uri );
  } );

  it( "passes content:// URIs through unchanged", async () => {
    const uri = "content://media/123";
    await resizeImage( uri, 2048 );

    expect( ImageResizer.createResizedImage.mock.calls[0][0] ).toBe( uri );
  } );

  it( "passes ph:// URIs through unchanged", async () => {
    const uri = "ph://asset";
    await resizeImage( uri, 2048 );

    expect( ImageResizer.createResizedImage.mock.calls[0][0] ).toBe( uri );
  } );
} );
