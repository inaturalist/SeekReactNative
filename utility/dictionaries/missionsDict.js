const missions = [
  {
    // apr 2019
    0: {
      number: 10,
      types: ["all"]
    }
  },
  {
    // may 2019
    0: {
      number: 4,
      types: ["birds", "mammals", "reptiles", "amphibians", "fish"]
    },
    1: {
      number: 4,
      types: ["insects"]
    },
    2: {
      number: 3,
      types: ["arachnids"]
    },
    3: {
      number: 6,
      types: ["plants"]
    },
    4: {
      number: 3,
      types: ["fungi"]
    }
  },
  {
    // jun 2019
    0: {
      number: 6,
      types: ["plants"]
    },
    1: {
      number: 3,
      types: [
        "Orthoptera",
        "Lepidoptera",
        "Camelids",
        "Ruminantia",
        "Mysticeti",
        "Proboscidea",
        "Diprotodontia",
        "Perissodactyla",
        "Lagomorpha",
        "Rodentia",
        "Sirenians"
      ]
    },
    2: {
      number: 2,
      types: ["carnivora", "arachnids", "mantid"]
    },
    3: {
      number: 2,
      types: ["fungi"]
    }
  },
  {
    // aug 2019
    0: {
      number: 10,
      types: ["insects"]
    }
  },
  {
    // sep 2019
    0: {
      number: 10,
      types: [
        "Odonata",
        "Amphibia",
        "Actinopterygii",
        "Anseriformes",
        "Nymphaeales",
        "Pontederiaceae",
        "Lemnoideae",
        "Typhaceae",
        "Polypodiopsida",
        "Bryophyta",
        "Cyperaceae"
      ]
    }
  },
  {
    // oct 2019
    0: {
      number: 5,
      types: ["birds"]
    }
  },
  {
    // nov 2019
    0: {
      number: 10,
      types: [
        "Pinales",
        "Arecaceae",
        "Fagales",
        "Sapindales",
        "Magnoliales",
        "Aquifoliales",
        "Sorbus",
        "Prunus",
        "Pyrus",
        "Malus",
        "Celtis",
        "Populus",
        "Salix",
        "Laurales",
        "Ulmaceae",
        "Rhamnaceae",
        "Moraceae",
        "Rhizophoraceae",
        "Combretaceae",
        "Cornales"
      ]
    }
  },
  {
    // dec 2019
    0: {
      number: 20,
      types: ["plants"]
    }
  },
  {
    // apr 2020
    0: {
      number: 10,
      types: ["all"]
    }
  },
  {
    // may 2020
    0: {
      number: 5,
      types: ["plants"]
    },
    1: {
      number: 2,
      types: ["insects"]
    },
    2: {
      number: 1,
      types: ["arachnids"]
    },
    3: {
      number: 2,
      types: ["birds"]
    }
  },
  {
    // jun 2020
    0: {
      number: 2,
      types: ["Asterales"]
    },
    1: {
      number: 3,
      types: ["Passeriformes"]
    },
    2: {
      number: 1,
      types: ["Coleoptera"]
    }
  },
  {
    // jul 2020
    0: {
      number: 2,
      types: ["amphibians", "fish"]
    },
    1: {
      number: 3,
      types: [
        "Anseriformes",
        "Charadriiformes",
        "Coraciiformes",
        "Gaviiformes",
        "Gruiformes",
        "Pelecaniformes",
        "Phoenicopteriformes",
        "Podicipediformes",
        "Procellariformes",
        "Sphenisciformes",
        "Suliformes"
      ]
    },
    2: {
      number: 1,
      types: ["mollusks"]
    }
  },
  {
    // aug 2020
    0: {
      number: 2,
      types: ["Lamiales"]
    },
    1: {
      number: 1,
      types: ["Asteraceae"]
    },
    2: {
      number: 1,
      types: ["Rosales"]
    },
    3: {
      number: 2,
      types: ["Hymenoptera", "Lepidoptera", "Coleoptera", "Diptera"]
    }
  },
  {
    // sep 2020
    0: {
      number: 10,
      types: ["plants"]
    },
    1: {
      number: 1,
      types: ["mammals"]
    },
    2: {
      number: 2,
      types: ["Lepidoptera", "Hemiptera"]
    }
  },
  {
    // oct 2020
    0: {
      number: 4,
      types: ["fungi"]
    },
    1: {
      number: 1,
      types: ["Accipitriformes", "Cathartiformes", "carnivora"]
    },
    2: {
      number: 1,
      types: ["mollusks"]
    },
    3: {
      number: 1,
      types: ["Arthropoda"]
    }
  },
  {
    // nov 2020
    0: {
      number: 1,
      types: ["Columbiformes"]
    },
    1: {
      number: 1,
      types: ["Fabales"]
    },
    2: {
      number: 1,
      types: ["arachnids"]
    },
    3: {
      number: 2,
      types: ["insects"]
    }
  },
  {
    // dec 2020
    0: {
      number: 3,
      types: ["Vertebrata"]
    },
    1: {
      number: 3,
      types: ["plants"]
    },
    2: {
      number: 3,
      types: ["insects"]
    },
    3: {
      number: 1,
      types: ["arachnids"]
    }
  },
  {
    // natgeo challenges 2021
    0: {
      // mar 2021
      number: 10,
      types: ["all"]
    }
  },
  {
    // apr 2021
    0: {
      number: 2,
      types: ["mollusks", "Crustacea"]
    },
    1: {
      number: 6,
      types: ["plants"]
    },
    2: {
      number: 2,
      types: ["fungi"]
    }
  },
  {
    // may 2021
    0: {
      number: 5,
      types: [
        "Asteraceae",
        "Fabaceae",
        "Lamiaceae",
        "Acanthaceae",
        "Malvaceae",
        "Bignoniaceae",
        "Passifloraceae"
      ]
    },
    1: {
      number: 2,
      types: ["Arthropoda"]
    }
  },
  {
    // june 2021
    0: {
      number: 1,
      types: ["Lycopodiopsida", "Polypodiopsida"]
    },
    1: {
      number: 1,
      types: ["Pinopsida"]
    },
    2: {
      number: 1,
      types: ["Angiospermae"]
    },
    3: {
      number: 1,
      types: ["fungi"]
    },
    4: {
      number: 2,
      types: ["Vertebrata"]
    },
    5: {
      number: 1,
      types: ["insects"]
    },
    6: {
      number: 1,
      types: ["Araneae"]
    }
  },
  {
    // august 2021
    0: {
      number: 5,
      types: [
        "Mantodea",
        "Odonata",
        "Megaloptera",
        "Neuroptera",
        "Coccinellidae",
        "Chilopoda",
        "arachnids"
      ]
    }
  },
  {
    // september 2021
    0: {
      number: 10,
      types: ["all"]
    }
  },
  {
    // october 2021
    0: {
      number: 4,
      types: ["arachnids"]
    }
  },
  {
    // november 2021
    0: {
      number: 5,
      types: [
        "Pterygota",
        "Accipitriformes",
        "Anseriformes",
        "Bucerotiformes",
        "Caprimulgiformes",
        "Cathartiformes",
        "Charadriiformes",
        "Ciconiiformes",
        "Coliiformes",
        "Columbiformes",
        "Coraciiformes",
        "Cuculiformes",
        "Falconiformes",
        "Galbuliformes",
        "Galliformes",
        "Gaviiformes",
        "Gruiformes",
        "Musophagiformes",
        "Opisthocomiformes",
        "Otidiformes",
        "Passeriformes",
        "Pelecaniformes",
        "Phaethontiformes",
        "Phoenicopteriformes",
        "Piciformes",
        "Podicipediformes",
        "Procellariiformes",
        "Psittaciformes",
        "Pterocliformes",
        "Strigiformes",
        "Suliformes",
        "Tinamiformes",
        "Trogoniformes"
      ]
    }
  },
  {
    // december 2021
    0: {
      number: 2,
      types: [
        "Accipitriformes",
        "Falconiformes",
        "Strigiformes",
        "carnivora",
        "Squamata"
      ]
    }
  },
  {
    // jan 2022
    0: {
      number: 2,
      types: [
        "Cetacea",
        "Pinnipedia",
        "Lutrinae",
        "Actinopterygii",
        "Elasmobranchii",
        "Pelecaniformes",
        "Coraciiformes",
        "Podicipediformes",
        "Suliformes",
        "Sphenisciformes"
      ]
    }
  },
  {
    // feb 2022
    0: {
      number: 2,
      types: ["Amphibia", "Charadriiformes"]
    }
  },
  {
    // mar 2022
    0: {
      number: 3,
      types: ["Pinopsida", "Cycadopsida", "Ginkgoopsida"]
    }
  },
  {
    // apr 2022
    0: {
      number: 10,
      types: ["Angiospermae"]
    }
  },
  {
    // may 2022
    0: {
      number: 3,
      types: ["Anthophila"]
    }
  },
  {
    // june 2022
    0: {
      number: 2,
      types: ["Angiospermae"]
    },
    1: {
      number: 2,
      types: ["Coleoptera", "Diptera", "Lepidoptera", "Anthophila"]
    }
  },
  {
    // july 2022
    0: {
      number: 5,
      types: ["Arthropoda"]
    }
  },
  {
    // august 2022
    0: {
      number: 3,
      types: ["Pinopsida", "Angiospermae"]
    },
    1: {
      number: 3,
      types: ["birds", "mammals", "Formicidae"]
    }
  },
  {
    // sept 2022
    0: {
      number: 5,
      types: ["plants"]
    }
  },
  {
    // oct 2022
    0: {
      number: 3,
      types: [
        "Ixodida",
        "Culicidae",
        "Siphonaptera",
        "Phthiraptera",
        "Santalales",
        "Cuscuta",
        "Orobanchaceae"
      ]
    }
  },
  {
    // nov 2022
    0: {
      number: 4,
      types: [
        "Brassicaceae",
        "Lamiaceae",
        "Poaceae",
        "Blattodea",
        "Rodentia",
        "Columbiformes",
        "Corvidae",
        "Passer",
        "Acridotheres",
        "Gekkota"
      ]
    }
  },
  {
    // dec 2022
    0: {
      number: 4,
      types: ["fungi"]
    },
    1: {
      number: 1,
      types: ["Accipitriformes", "Cathartiformes", "carnivora"]
    },
    2: {
      number: 1,
      types: ["mollusks"]
    },
    3: {
      number: 1,
      types: ["Arthropoda"]
    }
  },
  {
    // jan 2023
    0: {
      number: 1,
      types: ["Columbiformes"]
    },
    1: {
      number: 1,
      types: ["Fabales"]
    },
    2: {
      number: 1,
      types: ["arachnids"]
    },
    3: {
      number: 2,
      types: ["insects"]
    }
  },
  {
    // feb 2023
    0: {
      number: 20,
      types: ["plants"]
    }
  },
  {
    // mar 2023
    0: {
      number: 10,
      types: [
        "Odonata",
        "Amphibia",
        "Actinopterygii",
        "Anseriformes",
        "Nymphaeales",
        "Pontederiaceae",
        "Lemnoideae",
        "Typhaceae",
        "Polypodiopsida",
        "Bryophyta",
        "Cyperaceae"
      ]
    }
  },
  {
    // apr 2023
    0: {
      number: 10,
      types: ["all"]
    }
  },
  {
    // may 2023
    0: {
      number: 4,
      types: ["birds", "mammals", "reptiles", "amphibians", "fish"]
    },
    1: {
      number: 4,
      types: ["insects"]
    },
    2: {
      number: 3,
      types: ["arachnids"]
    },
    3: {
      number: 6,
      types: ["plants"]
    },
    4: {
      number: 3,
      types: ["fungi"]
    }
  },
  {
    // jun 2023
    0: {
      number: 10,
      types: ["plants"]
    },
    1: {
      number: 1,
      types: ["mammals"]
    },
    2: {
      number: 2,
      types: ["Lepidoptera", "Hemiptera"]
    }
  },
  {
    // jul 2023
    0: {
      number: 6,
      types: ["plants"]
    },
    1: {
      number: 3,
      types: [
        "Orthoptera",
        "Lepidoptera",
        "Camelids",
        "Ruminantia",
        "Mysticeti",
        "Proboscidea",
        "Diprotodontia",
        "Perissodactyla",
        "Lagomorpha",
        "Rodentia",
        "Sirenians"
      ]
    },
    2: {
      number: 2,
      types: ["carnivora", "arachnids", "mantid"]
    },
    3: {
      number: 2,
      types: ["fungi"]
    }
  },
  {
    // aug 2023
    0: {
      number: 10,
      types: ["insects"]
    }
  },
  {
    // sep 2023
    0: {
      number: 10,
      types: ["all"]
    }
  },
  {
    // oct 2023
    0: {
      number: 5,
      types: ["birds"]
    }
  },
  {
    // nov 2023
    0: {
      number: 10,
      types: [
        "Pinales",
        "Arecaceae",
        "Fagales",
        "Sapindales",
        "Magnoliales",
        "Aquifoliales",
        "Sorbus",
        "Prunus",
        "Pyrus",
        "Malus",
        "Celtis",
        "Populus",
        "Salix",
        "Laurales",
        "Ulmaceae",
        "Rhamnaceae",
        "Moraceae",
        "Rhizophoraceae",
        "Combretaceae",
        "Cornales"
      ]
    }
  },
  {
    // dec 2023
    0: {
      number: 3,
      types: ["Vertebrata"]
    },
    1: {
      number: 3,
      types: ["plants"]
    },
    2: {
      number: 3,
      types: ["insects"]
    },
    3: {
      number: 1,
      types: ["arachnids"]
    }
  }
];
export default missions;
