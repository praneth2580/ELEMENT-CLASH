// pages/Demo.jsx
import React from 'react';
import Card from '../components/Card';
import '../Card.css';

const CardsDemo = () => {
  return (
    <div className="cards-grid">
      <Card
        name="Burning Airborne Heal"
        element="Air"
        value={14}
        cost={4}
        type="Heal"
        special={{ name: "Damage-over-time", type: "damage-over-time", value: 16 }}
        rarity="Legendary"
        aura={10}
        specialReady={true}
      />
      <Card
        name="Restoring Wave Crash"
        element="Water"
        value={24}
        cost={4}
        type="Attack"
        special={{ name: "Heal", type: "heal", value: 19 }}
        rarity="Rare"
        aura={6}
      />
      <Card
        name="Energized Ice Shell"
        element="Water"
        value={14}
        cost={4}
        type="Defend"
        special={{ name: "Buff", type: "buff", value: 19 }}
        rarity="Epic"
        aura={5}
      />
    </div>
  );
};

export default CardsDemo;
