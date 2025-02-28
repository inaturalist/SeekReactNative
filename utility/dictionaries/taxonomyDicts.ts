interface Ranks {
  [key: string]: string;
}

const ranks: Ranks = {
  kingdom: "camera.kingdom",
  phylum: "camera.phylum",
  class: "camera.class",
  order: "camera.order",
  family: "camera.family",
  genus: "camera.genus",
  species: "camera.species"
};

interface TaxaIds {
  [key: string]: number | null;
}

const taxonIds: TaxaIds = {
  birds: 3,
  amphibians: 20978,
  reptiles: 26036,
  mammals: 40151,
  fish: 47178,
  mollusks: 47115,
  insects: 47158,
  arachnids: 47119,
  fungi: 47170,
  plants: 47126,
  all: null
};

export {
  ranks,
  taxonDictForMissions,
};
