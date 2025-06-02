import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { analyzeCards } from "../scripts/Cards";
import { useCardGameStorage } from "../data/hooks/useCardGameStorage";
import { sortByDefinedOrder } from "../functions";

const COLORS = [
  "#FF8042",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#AA00FF",
  "#FF4444",
];

const elementOrder = ["Fire", "Water", "Earth", "Air"];
const typeOrder = ["Attack", "Defend", "Heal"];
const rarityOrder = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
const costOrder = ["0","1","2","3","4","5","6","7","8","9","10"];

export default function CardAnalysis() {
  const { cards } = useCardGameStorage();
  const [summary, setSummary] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [rarityData, setRarityData] = useState([]);
  const [traitData, setTraitData] = useState([]);
  const [costData, setCostData] = useState([]);
  const [avgValueForCostData, setAvgValueForCost] = useState([]);

  useEffect(() => {
    if (!cards || cards.length === 0) return;
    const result = analyzeCards(cards);
    setSummary(result);
    setPieData(
      sortByDefinedOrder(result.byElement, elementOrder)
    );
    setTypeData(
      sortByDefinedOrder(result.byType, typeOrder)
    );
    setRarityData(
      sortByDefinedOrder(result.byRarity, rarityOrder)
    );
    setTraitData(
      Object.entries(result.traits).map(([name, value]) => ({ name, value }))
    );
    setCostData(
      sortByDefinedOrder(result.byCost, costOrder)
    );
    setAvgValueForCost(
      sortByDefinedOrder(result.avgValueForCostByRarity, rarityOrder)
    );
  }, [cards]);

  if (!summary)
    return (
      <div className="p-4 text-center text-gray-500">Loading card data...</div>
    );

  const sectionStyle =
    "bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 mb-6 w-full";

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Card Analysis Dashboard
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl p-4 shadow">
          <p className="text-sm text-white">Total Cards</p>
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300">
            {summary.total}
          </h2>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl p-4 shadow">
          <p className="text-sm text-white">Special Effects</p>
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">
            {summary.specialCount}
          </h2>
        </div>
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-xl p-4 shadow">
          <p className="text-sm text-white">Avg. Cost</p>
          <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">
            {summary.avgCost}
          </h2>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl p-4 shadow">
          <p className="text-sm text-white">Avg. Value</p>
          <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300">
            {summary.avgValue}
          </h2>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl p-4 shadow">
          <p className="text-sm text-white">Avg. Value For Cost</p>
          <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300">
            {summary.avgValueForCost}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={sectionStyle}>
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
            Cards by Element
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={sectionStyle}>
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
            Cards by Type
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={sectionStyle}>
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
            Cards by Rarity
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rarityData}>
              <XAxis dataKey="name" stroke="#82ca9d" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={sectionStyle}>
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
            Cards by Trait
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={traitData}>
              <XAxis dataKey="name" stroke="#FF8042" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#FF8042" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={sectionStyle}>
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
            Cards by Cost
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costData}>
              <XAxis dataKey="name" stroke="#FF8042" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#FF8042" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={sectionStyle}>
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
            Avg. Value For Cost
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgValueForCostData}>
              <XAxis dataKey="name" stroke="#FF8042" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#FF8042" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
