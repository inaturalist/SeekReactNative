// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/badges/badgeModal";
import badgeImages from "../../assets/badges";
import BannerHeader from "./BannerHeader";
import LargeProgressCircle from "./LargeProgressCircle";
import icons from "../../assets/icons";

type Props = {
  badges: Array<Object>,
  iconicSpeciesCount: number,
  toggleBadgeModal: Function
};

class BadgeModal extends Component<Props> {
  constructor() {
    super();

    this.state = {
      interval: 0
    };
  }

  // scrollToB = () => {
  //   this.setState( {
  //     interval: width * 1
  //   } );
  // }

  // scrollToC = () => {
  //   this.setState( {
  //     interval: width * 2
  //   } );
  // }

  // scrollToTop = () => {
  //   this.setState( {
  //     interval: 0
  //   } );
  // }

  render() {
    const { badges, iconicSpeciesCount, toggleBadgeModal } = this.props;
    const { interval } = this.state;

    const badgeList = [];

    badges.forEach( ( badge, i ) => {
      const badgeInfo = (
        <View
          key={`badge${badge}${i}`}
          style={styles.carousel}
        >
          {badge.earned ? (
            <Image source={badgeImages[badge.earnedIconName]} style={styles.image} />
          ) : (
            <ImageBackground
              source={badgeImages[badge.unearnedIconName]}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <LargeProgressCircle badge={badge} iconicSpeciesCount={iconicSpeciesCount} />
            </ImageBackground>
          )}
          {badge.earned
            ? <Text style={styles.headerText}>{i18n.t( badge.name ).toLocaleUpperCase()}</Text>
            : <Text style={styles.headerText}>{i18n.t( "badges.to_earn" ).toLocaleUpperCase()}</Text>
          }
          <Text style={styles.nameText}>
            {i18n.t( "badges.observe_species" )}
            {" "}
            {i18n.t( badge.infoText )}
          </Text>
        </View>
      );
      badgeList.push( badgeInfo );
    } );

    return (
      <View style={styles.outerContainer}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <View style={styles.container}>
            <BannerHeader text={badges[0].iconicTaxonName.toLocaleUpperCase()} />
            <ScrollView
              horizontal
              pagingEnabled
              snapToInterval={interval}
              showsHorizontalScrollIndicator={false}
            >
              {badgeList}
            </ScrollView>
            <View style={styles.row}>
              <TouchableOpacity onPress={this.scrollToB}>
                <Image
                  source={badges[0].earned ? badgeImages[badges[0].earnedIconName] : badgeImages[badges[0].unearnedIconName]}
                  style={styles.smallImage}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.scrollToC}>
                <Image
                  source={badges[1].earned ? badgeImages[badges[1].earnedIconName] : badgeImages[badges[1].unearnedIconName]}
                  style={styles.smallImage}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.scrollToTop}>
                <Image
                  source={badges[2].earned ? badgeImages[badges[2].earnedIconName] : badgeImages[badges[2].unearnedIconName]}
                  style={styles.smallImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.backButton} onPress={() => toggleBadgeModal()}>
            <Image source={icons.closeModal} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default BadgeModal;
