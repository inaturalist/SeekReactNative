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
      combined_score: 96.8,
      taxon_id: 51779
    }
  ]
};

const mockVision = ( ) => {
  "worklet";

  return mockModelResult;
};

/*
  We are mocking the frame processor plugin to return a defined mocked prediction.
  Note that we are not mocking the getPredictionsForImage function of the plugin,
  so in the e2e test when the mocked camera "saves" the photo and the app navigates
  to the suggestions screen, the real example cv model is run on the still image and
  the e2e test checks for a real prediction from the model.
*/
export default {
  ...InatVision,
  inatVision: mockVision
};
