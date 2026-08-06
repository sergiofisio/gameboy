export type CartridgeGame = {
  id: string;
  title: string;
  shortTitle: string;
  labelSrc: string;
  cartSrc?: string;
  videoSrc: string;
};

export const CARTRIDGES: CartridgeGame[] = [
  {
    id: "pokemon-red",
    title: "Pokémon Red",
    shortTitle: "POKÉMON",
    labelSrc: "/cartridges/pokemon-red.jpg",
    cartSrc: "/cartridges/pokemon-red-cart.jpg",
    videoSrc: "/videos/pokemon-red.mp4",
  },
  {
    id: "tetris",
    title: "Tetris",
    shortTitle: "TETRIS",
    labelSrc: "/cartridges/tetris.jpg",
    videoSrc: "/videos/tetris.mp4",
  },
  {
    id: "mario-land",
    title: "Super Mario Land",
    shortTitle: "MARIO",
    labelSrc: "/cartridges/mario-land.jpg",
    cartSrc: "/cartridges/mario-land-cart.jpg",
    videoSrc: "/videos/mario-land.mp4",
  },
  {
    id: "zelda",
    title: "Zelda",
    shortTitle: "ZELDA",
    labelSrc: "/cartridges/zelda.jpg",
    videoSrc: "/videos/zelda.mp4",
  },
  {
    id: "metroid",
    title: "Metroid",
    shortTitle: "METROID",
    labelSrc: "/cartridges/metroid.jpg",
    videoSrc: "/videos/metroid.mp4",
  },
];

export function getCartridge(id: string | null) {
  if (!id) return null;
  return CARTRIDGES.find((game) => game.id === id) ?? null;
}
