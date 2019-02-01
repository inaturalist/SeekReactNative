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
    infoText: "Earned after collecting your first bird photo.",
    name: "1st Bird",
    iconicTaxonName: "Birds",
    iconicTaxonId: 3,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-birds",
    index: 102
  },
  fish1: {
    infoText: "Earned after collecting your first fish photo.",
    name: "1st Fish",
    iconicTaxonName: "Fishs",
    iconicTaxonId: 47178,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-fish",
    index: 103
  },
  fungi1: {
    infoText: "Earned after collecting your first fungi photo.",
    name: "1st Fungus",
    iconicTaxonName: "Fungi",
    iconicTaxonId: 47170,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-fungi",
    index: 104
  },
  insect1: {
    infoText: "Earned after collecting your first insect photo.",
    name: "1st Insect",
    iconicTaxonName: "Insects",
    iconicTaxonId: 47158,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-insects",
    index: 105
  },
  mammal1: {
    infoText: "Earned after collecting your first mammal photo.",
    name: "1st Mammal",
    iconicTaxonName: "Mammals",
    iconicTaxonId: 40151,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-mammals",
    index: 106
  },
  mollusk1: {
    infoText: "Earned after collecting your first mollusk photo.",
    name: "1st Mollusk",
    iconicTaxonName: "Mollusks",
    iconicTaxonId: 47115,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-mollusks",
    index: 107
  },
  plant1: {
    infoText: "Earned after collecting your first plant photo.",
    name: "1st Plant",
    iconicTaxonName: "Plants",
    iconicTaxonId: 47126,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-plants",
    index: 108
  },
  reptile1: {
    infoText: "Earned after collecting your first reptile photo.",
    name: "1st Reptile",
    iconicTaxonName: "Reptiles",
    iconicTaxonId: 26036,
    count: 1,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-reptiles",
    index: 109
  }, // start 5s
  amphibian5: {
    infoText: "Earned after collecting your fifth amphibian photo.",
    name: "5th Amphibian",
    iconicTaxonName: "Amphibians",
    iconicTaxonId: 20978,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-amphibians",
    index: 200
  },
  arachnid5: {
    infoText: "Earned after collecting your fifth arachnid photo.",
    name: "5th Arachnid",
    iconicTaxonName: "Arachnids",
    iconicTaxonId: 47119,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-arachnids",
    index: 201
  },
  bird5: {
    infoText: "Earned after collecting your fifth bird photo.",
    name: "5th Bird",
    iconicTaxonName: "Birds",
    iconicTaxonId: 3,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-birds",
    index: 202
  },
  fish5: {
    infoText: "Earned after collecting your fifth fish photo.",
    name: "5th Fish",
    iconicTaxonName: "Fishs",
    iconicTaxonId: 47178,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-fish",
    index: 203
  },
  fungi5: {
    infoText: "Earned after collecting your fifth fungi photo.",
    name: "5th Fungus",
    iconicTaxonName: "Fungi",
    iconicTaxonId: 47170,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-fungi",
    index: 204
  },
  insect5: {
    infoText: "Earned after collecting your fifth insect photo.",
    name: "5th Insect",
    iconicTaxonName: "Insects",
    iconicTaxonId: 47158,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-insects",
    index: 205
  },
  mammal5: {
    infoText: "Earned after collecting your fifth mammal photo.",
    name: "5th Mammal",
    iconicTaxonName: "Mammals",
    iconicTaxonId: 40151,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-mammals",
    index: 206
  },
  mollusk5: {
    infoText: "Earned after collecting your fifth mollusk photo.",
    name: "5th Mollusk",
    iconicTaxonName: "Mollusks",
    iconicTaxonId: 47115,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-mollusks",
    index: 207
  },
  plant5: {
    infoText: "Earned after collecting your fifth plant photo.",
    name: "5th Plant",
    iconicTaxonName: "Plants",
    iconicTaxonId: 47126,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-plants",
    index: 208
  },
  reptile5: {
    infoText: "Earned after collecting your fifth reptile photo.",
    name: "5th Reptile",
    iconicTaxonName: "Reptiles",
    iconicTaxonId: 26036,
    count: 5,
    unearnedIconName: "badge_species-05-empty",
    earnedIconName: "badge_species-05-reptiles",
    index: 209
  }, // start 25
  amphibian25: {
    infoText: "Earned after collecting your 25th amphibian photo.",
    name: "25th Amphibian",
    iconicTaxonName: "Amphibians",
    iconicTaxonId: 20978,
    count: 25,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-amphibians",
    index: 300
  },
  arachnid25: {
    infoText: "Earned after collecting your 25th arachnid photo.",
    name: "25th Arachnid",
    iconicTaxonName: "Arachnids",
    iconicTaxonId: 47119,
    count: 25,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-arachnids",
    index: 301
  },
  bird25: {
    infoText: "Earned after collecting your 25th bird photo.",
    name: "25th Bird",
    iconicTaxonName: "Birds",
    iconicTaxonId: 3,
    count: 25,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-birds",
    index: 302
  },
  fish25: {
    infoText: "Earned after collecting your 25th fish photo.",
    name: "25th Fish",
    iconicTaxonName: "Fishs",
    iconicTaxonId: 47178,
    count: 25,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-fish",
    index: 303
  },
  fungi25: {
    infoText: "Earned after collecting your 25th fungi photo.",
    name: "25th Fungus",
    iconicTaxonName: "Fungi",
    iconicTaxonId: 47170,
    count: 25,
    unearnedIconName: "badge_species-01-empty",
    earnedIconName: "badge_species-01-fungi",
    index: 104
  },
  insect25: {
    infoText: "Earned after collecting your 25th insect photo.",
    name: "25th Insect",
    iconicTaxonName: "Insects",
    iconicTaxonId: 47158,
    count: 25,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-insects",
    index: 305
  },
  mammal25: {
    infoText: "Earned after collecting your 25th mammal photo.",
    name: "25th Mammal",
    iconicTaxonName: "Mammals",
    iconicTaxonId: 40151,
    count: 25,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-mammals",
    index: 306
  },
  mollusk25: {
    infoText: "Earned after collecting your 25th mollusk photo.",
    name: "25th Mollusk",
    iconicTaxonName: "Mollusks",
    iconicTaxonId: 47115,
    count: 25,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-mollusks",
    index: 307
  },
  plant25: {
    infoText: "Earned after collecting your 25th plant photo.",
    name: "25th Plant",
    iconicTaxonName: "Plants",
    iconicTaxonId: 47126,
    count: 25,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-plants",
    index: 308
  },
  reptile25: {
    infoText: "Earned after collecting your 25th reptile photo.",
    name: "25th Reptile",
    iconicTaxonName: "Reptiles",
    iconicTaxonId: 26036,
    count: 25,
    unearnedIconName: "badge_species-25-empty",
    earnedIconName: "badge_species-25-reptiles",
    index: 309
  }
};

export default badges;
