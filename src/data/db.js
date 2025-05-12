import Dexie from "dexie";

const db = new Dexie("CardGameDB");

db.version(1).stores({
  cards: "++id,name,element,type,rarity", // skip special or nested stuff
  decks: "++id,name,type,fg_color,bg_color,cards", // skip special or nested stuff
  stats: "&key,value",
});

export default db;
