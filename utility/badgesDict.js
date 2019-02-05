const badges = {
  tadpole: {
    infoText: "Earned after collecting your third species.",
    name: "Tadpole",
    count: 3,
    unearnedIconName: "badge_naturalist-empty",
    earnedIconName: "badge_naturalist-03-tadpole",
    index: 0
  },
  cub: {
    infoText: "Earned after collecting your 15th species.",
    name: "Cub",
    count: 15,
    unearnedIconName: "badge_naturalist-empty",
    earnedIconName: "badge_naturalist-15-cub",
    index: 1
  },
  surveyor: {
    infoText: "Earned after collecting your 35th species.",
    name: "Surveyor",
    count: 35,
    unearnedIconName: "badge_naturalist-empty",
    earnedIconName: "badge_naturalist-35-surveyor",
    index: 2
  },
  naturalist: {
    infoText: "Earned after collecting your 65th species.",
    name: "Naturalist",
    count: 65,
    unearnedIconName: "badge_naturalist-empty",
    earnedIconName: "badge_naturalist-65-naturalist",
    index: 3
  },
  explorer: {
    infoText: "Earned after collecting your 100th species.",
    name: "Explorer",
    count: 100,
    unearnedIconName: "badge_naturalist-empty",
    earnedIconName: "badge_naturalist-100-explorer",
    index: 4
  },
  amphibian1: {
    infoText: "Earned after collecting your first amphibian photo.",
    name: "1st Amphibian",
    iconicTaxonName: "Amphibians",
    iconicTaxonId: 20978,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-amphibians",
    index: 100
  },
  arachnid1: {
    infoText: "Earned after collecting your first arachnid photo.",
    name: "1st Arachnid",
    iconicTaxonName: "Arachnids",
    iconicTaxonId: 47119,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-arachnids",
    index: 101
  },
  bird1: {
    infoText: "badges.bird_1",
    name: "1st Bird",
    iconicTaxonName: "Birds",
    iconicTaxonId: 3,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-birds",
    index: 102
  },
  fish1: {
    infoText: "badges.fish_1",
    name: "1st Fish",
    iconicTaxonName: "Fishs",
    iconicTaxonId: 47178,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-fish",
    index: 103
  },
  fungi1: {
    infoText: "badges.fungi_1",
    name: "1st Fungus",
    iconicTaxonName: "Fungi",
    iconicTaxonId: 47170,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-fungi",
    index: 104
  },
  insect1: {
    infoText: "badges.insect_1",
    name: "1st Insect",
    iconicTaxonName: "Insects",
    iconicTaxonId: 47158,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-insects",
    index: 105
  },
  mammal1: {
    infoText: "badges.mammal_1",
    name: "1st Mammal",
    iconicTaxonName: "Mammals",
    iconicTaxonId: 40151,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-mammals",
    index: 106
  },
  mollusk1: {
    infoText: "badges.mollusk_1",
    name: "1st Mollusk",
    iconicTaxonName: "Mollusks",
    iconicTaxonId: 47115,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-mollusks",
    index: 107
  },
  plant1: {
    infoText: "badges.plant_1",
    name: "1st Plant",
    iconicTaxonName: "Plants",
    iconicTaxonId: 47126,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-plants",
    index: 108
  },
  reptile1: {
    infoText: "badges.reptile_1",
    name: "1st Reptile",
    iconicTaxonName: "Reptiles",
    iconicTaxonId: 26036,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-reptiles",
    index: 109
  }, // start 5s
  amphibian5: {
    infoText: "badges.amphibian_5",
    name: "5th Amphibian",
    iconicTaxonName: "Amphibians",
    iconicTaxonId: 20978,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-amphibians",
    index: 200
  },
  arachnid5: {
    infoText: "badges.arachnid_5",
    name: "5th Arachnid",
    iconicTaxonName: "Arachnids",
    iconicTaxonId: 47119,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-arachnids",
    index: 201
  },
  bird5: {
    infoText: "badges.bird_5",
    name: "5th Bird",
    iconicTaxonName: "Birds",
    iconicTaxonId: 3,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-birds",
    index: 202
  },
  fish5: {
    infoText: "badges.fish_5",
    name: "5th Fish",
    iconicTaxonName: "Fishs",
    iconicTaxonId: 47178,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-fish",
    index: 203
  },
  fungi5: {
    infoText: "badges.fungi_5",
    name: "5th Fungus",
    iconicTaxonName: "Fungi",
    iconicTaxonId: 47170,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-fungi",
    index: 204
  },
  insect5: {
    infoText: "badges.insect_5",
    name: "5th Insect",
    iconicTaxonName: "Insects",
    iconicTaxonId: 47158,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-insects",
    index: 205
  },
  mammal5: {
    infoText: "badges.mammal_5",
    name: "5th Mammal",
    iconicTaxonName: "Mammals",
    iconicTaxonId: 40151,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-mammals",
    index: 206
  },
  mollusk5: {
    infoText: "badges.mollusk_5",
    name: "5th Mollusk",
    iconicTaxonName: "Mollusks",
    iconicTaxonId: 47115,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-mollusks",
    index: 207
  },
  plant5: {
    infoText: "badges.plant_5",
    name: "5th Plant",
    iconicTaxonName: "Plants",
    iconicTaxonId: 47126,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-plants",
    index: 208
  },
  reptile5: {
    infoText: "badges.reptile_5",
    name: "5th Reptile",
    iconicTaxonName: "Reptiles",
    iconicTaxonId: 26036,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-reptiles",
    index: 209
  }, // start 15
  amphibian15: {
    infoText: "badges.amphibian_15",
    name: "25th Amphibian",
    iconicTaxonName: "Amphibians",
    iconicTaxonId: 20978,
    count: 15,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-amphibians",
    index: 300
  },
  arachnid15: {
    infoText: "badges.arachnid_15",
    name: "25th Arachnid",
    iconicTaxonName: "Arachnids",
    iconicTaxonId: 47119,
    count: 15,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-arachnids",
    index: 301
  },
  bird15: {
    infoText: "badges.bird_15",
    name: "25th Bird",
    iconicTaxonName: "Birds",
    iconicTaxonId: 3,
    count: 15,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-birds",
    index: 302
  },
  fish15: {
    infoText: "badges.fish_15",
    name: "25th Fish",
    iconicTaxonName: "Fishs",
    iconicTaxonId: 47178,
    count: 15,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-fish",
    index: 303
  },
  fungi15: {
    infoText: "badges.fungi_15",
    name: "25th Fungus",
    iconicTaxonName: "Fungi",
    iconicTaxonId: 47170,
    count: 15,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-fungi",
    index: 104
  },
  insect15: {
    infoText: "badges.insect_15",
    name: "25th Insect",
    iconicTaxonName: "Insects",
    iconicTaxonId: 47158,
    count: 15,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-insects",
    index: 305
  },
  mammal15: {
    infoText: "badges.mammal_15",
    name: "25th Mammal",
    iconicTaxonName: "Mammals",
    iconicTaxonId: 40151,
    count: 15,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-mammals",
    index: 306
  },
  mollusk15: {
    infoText: "badges.mollusk_15",
    name: "25th Mollusk",
    iconicTaxonName: "Mollusks",
    iconicTaxonId: 47115,
    count: 15,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-mollusks",
    index: 307
  },
  plant15: {
    infoText: "badges.plant_15",
    name: "25th Plant",
    iconicTaxonName: "Plants",
    iconicTaxonId: 47126,
    count: 15,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-plants",
    index: 308
  },
  reptile15: {
    infoText: "badges.reptile_15",
    name: "25th Reptile",
    iconicTaxonName: "Reptiles",
    iconicTaxonId: 26036,
    count: 15,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-reptiles",
    index: 309
  }
};

export default badges;
