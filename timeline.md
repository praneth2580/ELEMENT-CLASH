---

# 🗓️ timeline.md

# Tactical Card Game Development Timeline

---

## Phase 1: Foundation Systems (Core Battle Loop)

- [ ] **Status Effects System**  
  - Standardize effects: Burn, Freeze, Shock, Root, Weaken, Boost  
  - Add effect durations (e.g., 2 turns)  
  - Define stacking / overwriting rules  

- [ ] **Affinity Strength/Weakness System**  
  - Water > Fire (+50% damage)  
  - Fire > Air (+50% damage)  
  - Air > Earth (+50% damage)  
  - Earth > Water (+50% damage)  
  - Penalty on mismatch (e.g., -10% attack)

- [ ] **Energy / Aura Resource System Finalization**  
  - Base Aura gain per turn (e.g., +1)  
  - Aura cost to attempt Synergy  
  - Certain cards modify Aura

---

## Phase 2: Tactical Layer Systems (Hand and Play Control)

- [ ] **Hand Management Mechanics**  
  - Allow discard of card(s) from hand  
  - Discard cost (e.g., -10 HP) to draw a new card  
  - Limit discards per turn (e.g., 1-2)

- [ ] **Battlefield Conditions**  
  - Random environment effect each match start  
  - Example conditions:  
    - Heavy Rain (Water boost)  
    - Scorching Heat (Fire cost reduction)  
    - Earthquake (Earth crit boost)  
    - Storm Winds (Air dodge boost)  
  - Conditions rotate or persist entire match

---

## Phase 3: Advanced Strategic Systems (Deck and Hero Building)

- [ ] **Dynamic Deck Modifiers (Mini Deckbuilding)**  
  - Post-match deck changes:  
    - Add 1 new card  
    - Remove 1 card (optionally at cost)  
    - Upgrade 1 card  

- [ ] **Card Traits & Personalities**  
  - Traits assigned to cards:  
    - Volatile (explode if discarded)  
    - Loyal (buff if played after same element)  
    - Greedy (higher cost, bigger payoff)

- [ ] **Hero Abilities / Classes**  
  - 3-5 Hero Classes  
  - Each class:  
    - 1 Passive Ability  
    - (Optional) 1 Active Ability  
  - Example Heroes:  
    - Flame Knight: Free Fire synergy once per match  
    - Tidecaller: Heal after Water synergy  
    - Sky Thief: Steal Aura from enemy

---

## Final Polish (Optional Endgame Features)

- [ ] **Combo Chains / Momentum System**  
  - Bonus stacking for consecutive synergies

- [ ] **Interrupt Cards**  
  - Instant-play cards during opponent's turn

- [ ] **Rare Dual-Element Cards**  
  - Special cards that count as two elements

- [ ] **Card Evolution System**  
  - Cards level up or transform after repeated use

---

# 🚀 Priority Timeline Overview

| Order | Feature |
|:---|:---|
| 1 | Status Effects |
| 2 | Affinity Strength/Weakness |
| 3 | Energy / Aura Resource Finalization |
| 4 | Hand Management |
| 5 | Battlefield Conditions |
| 6 | Deck Modification After Matches |
| 7 | Card Traits & Personalities |
| 8 | Hero Classes / Abilities |

---

# 📌 Notes

- Build systems individually, test after each.
- Focus on balance after Phase 1 complete.
- Keep UI/UX feedback strong: clear animations, effects for new mechanics.

---

✅ **Last updated:** 2025-04-28

---

# Example usage:
> Save this file as `timeline.md` inside your `/docs/` or `/planning/` folder in your GitHub repo!

---