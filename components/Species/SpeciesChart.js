import React from "react";
import { AreaChart, Grid, YAxis } from "react-native-svg-charts";
import { Defs, LinearGradient, Stop } from "react-native-svg";

const SpeciesChart = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const Gradient = ( { index } ) => (
    <Defs key={index}>
      <LinearGradient id="gradient" x1="0%" y="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="rgb(255, 255, 255)" stopOpacity={0.8} />
        <Stop offset="100%" stopColor="rgb(255, 255, 255)" stopOpacity={0.2} />
      </LinearGradient>
    </Defs>
  );

  return (
    <AreaChart
      style={{ height: 200, marginLeft: 15, marginRight: 15 }}
      data={data}
      contentInset={{ top: 20, bottom: 20 }}
      svg={{ fill: "url(#gradient)" }}
    >
      <YAxis
        data={data}
        contentInset={{ top: 20, bottom: 20 }}
        svg={{ fill: "url(#gradient)" }}
        min={0}
        numberOfTicks={ 3 }
        formatLabel={ value => Math.round( value )}
      />
      <Grid />
      {
        data.forEach( ( item, i ) => <Gradient index={i} /> )
      }
    </AreaChart>
  );
};

export default SpeciesChart;
