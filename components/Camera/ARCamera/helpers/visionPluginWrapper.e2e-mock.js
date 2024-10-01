// This wraps our vision camera plugin,
// so we can mock it for e2e tests in simulators without camera.
import * as InatVision from "vision-camera-plugin-inatvision";

const mockModelResult = {
  timestamp: Date.now(),
  predictions: [
    {
      name: "Sempervivum tectorum",
      rank_level: 10,
      rank: "species",
      score: 0.96,
      taxon_id: 51779
    }
  ]
};

const mockVision = ( ) => {
  "worklet";

  return mockModelResult;
};

export default {
  ...InatVision,
  inatVision: mockVision
};
