import { StyleSheet } from "react-native";

const viewStyles = StyleSheet.create( {
  subBullets: {
    marginTop: 15,
    marginRight: 10
  },
  circleStyle: {
    height: 59,
    width: 59
  },
  container: {
    marginBottom: 20,
    marginTop: 36
  },
  marginTop: {
    marginTop: 6
  },
  missionRow: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  textContainer: {
    flex: 1,
    paddingRight: 18
  }
} );

const textStyles = StyleSheet.create( {
  bullets: {
    fontSize: 29,
    marginTop: 7,
    alignItems: "center",
    marginRight: 22
  },
  greenText: {
    marginTop: 9,
    maxWidth: 274
  },
  secondLevelBulletText: {
    marginTop: 6,
    maxWidth: 274
  },
  text: {
    marginTop: 16,
    maxWidth: 274
  }
} );


const imageStyles = StyleSheet.create( {
  checklist: {
    marginTop: 20,
    marginRight: 16
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};

