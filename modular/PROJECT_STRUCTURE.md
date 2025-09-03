---

# 📂 PROJECT\_STRUCTURE.md

This document explains the role of each file and folder in the **Card Battle Game (React.js)** project.

---

## **Root Files**

* **`App.jsx`** → Entry point for the game UI. Loads routes, menus, and core components like Deck Builder and Battle Arena.
* **`index.js`** → React bootstrap file. Renders `<App />` into the DOM.

---

## **components/**

UI components (React). Purely visual, no battle logic here.

* **Card/**

  * **`CardView.jsx`** → Full card view showing all stats, rarity, traits, and abilities.
  * **`MiniCard.jsx`** → Compact card view (used in hand/deck). Shows only essential info (cost, value, rarity color).
  * **`CardStyles.css`** → Styling for card components.

* **`DeckBuilder.jsx`** → UI for players to pick cards from the generated pool to build their deck. Handles selection, limits, and rules.

* **`BattleArena.jsx`** → Main battle screen. Displays player hand, AI hand, and battlefield. Connects UI with `battleEngine`.

* **`FusionPreview.jsx`** → Shows a preview of the possible fusion result when two cards are selected together.

---

## **core/**

Core game logic. These files are **framework-agnostic** (no React code).

* **`cardGenerator.js`** → Handles random generation of cards using elements, rarity, types, traits, and stats.

* **`fusionRules.js`** → Contains fusion recipes. Example: Fire + Air → *Flame Tornado*. Also provides helper `checkFusion()` to merge two cards.

* **`battleEngine.js`** → Core battle calculation logic. Given two cards, it applies stats, traits, and abilities, then returns the result (damage, heal, logs).

* **`turnResolver.js`** → Orchestrates a full turn:

  1. Checks if selected cards should fuse.
  2. Applies battle resolution using `battleEngine`.
  3. Returns updated game state.

* **`traits.js`** → Defines how each trait modifies a card (e.g., *Fierce* = +10% attack, *Resilient* = +2 defense).

---

## **state/**

Game-wide state and persistence.

* **`gameState.js`** → Defines the main game state (health, decks, aura, tac-aura, logs). Can be implemented via React Context, Redux, or Zustand.

* **`logger.js`** → Utility for logging actions (plays, damage, heals, fusions). Stores logs with timestamps for debugging or replay features.

---

## **utils/**

Small reusable helpers.

* **`random.js`** → RNG utilities (random int, chance %, weighted selection). Used by `cardGenerator` and `battleEngine`.

* **`mathHelpers.js`** → Damage/heal formulas, stat scaling, rounding functions.

* **`constants.js`** → Global constants and enums:

  ```js
  export const ELEMENTS = ["Air", "Water", "Fire", "Earth"];
  export const TYPES = ["Attack", "Defend", "Heal"];
  export const RARITIES = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
  export const TRAITS = ["Fierce", "Tactical", "Swift", "Resilient", "Mystic", "Strategic"];
  ```

---

## ✅ Benefits of This Structure

* **UI separated from game logic** → easy to swap components.
* **Battle system modular** → can test without React.
* **Fusion and traits are data-driven** → easy to expand without changing core logic.
* **Logs isolated** → helps debugging and future replay system.

---
