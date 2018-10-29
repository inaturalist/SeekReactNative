// @flow
import React from "react";
import Path from "react-native-svg";
import { AreaChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

type Props = {
  data: Array<number>
};

const SpeciesChart = ( { data }: Props ) => {
  // console.log( data, "props passed down" );
  const Line = ( { line } ) => (
    <Path
      key={"line"}
      d={line}
      stroke={"rgb(134, 65, 244)"}
      fill={"none"}
    />
  );

  return (
    <AreaChart
      style={{ height: 200, marginLeft: 15, marginRight: 15 }}
      data={data}
      contentInset={{ top: 30, bottom: 30 }}
      curve={shape.curveNatural}
      svg={{ fill: "rgba(134, 65, 244, 0.2)" }}
    >
      <Grid />
      <Line />
    </AreaChart>
  );
};

export default SpeciesChart;
