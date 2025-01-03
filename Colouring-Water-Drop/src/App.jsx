import React, { useState, useEffect } from "react";
import "./App.css"; // Import CSS
import { motion } from "framer-motion";
const App = () => {
  const rows = 15; // 15 rows
  const cols = 20; // 20 columns
  const dropInterval = 100; // Interval for moving drops
  const newDropInterval = 100; // Interval for starting new drops
  const trailLength = 7; // 7 Drops

  const [activeDrops, setActiveDrops] = useState([]); // Array of active drops
  // Start with a random rgb
  const [currentColor, setCurrentColor] = useState({
    red: Math.floor(Math.random() * 256),
    green: Math.floor(Math.random() * 256),
    blue: Math.floor(Math.random() * 256),
  });

  // Generate a random color
  const generateRandomColor = () => {
    setCurrentColor({
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
    });
  };

  useEffect(() => {
    // Interval for changing colors every 2 seconds
    const colorChangeInterval = setInterval(() => {
      generateRandomColor();
    }, 2000);

    return () => {
      clearInterval(colorChangeInterval);
    };
  }, []);

  // Remove and add new drops -- Main Logic --
  useEffect(() => {
    // Timer for moving drops
    const moveDrops = setInterval(() => {
      setActiveDrops(
        (prevDrops) =>
          prevDrops
            .map((drop) => ({ ...drop, row: drop.row + 1 })) // Move each drop down
            .filter((drop) => drop.row < rows + trailLength) // Remove drops completely out of bounds
      );
    }, dropInterval);

    // Timer for starting new drops
    const addNewDrops = setInterval(() => {
      const newDrop = {
        column: Math.floor(Math.random() * cols), // Random column 0 to 14
        row: -7, // Start at the first row
      };
      setActiveDrops((prevDrops) => [...prevDrops, newDrop]);
    }, newDropInterval);

    return () => {
      clearInterval(moveDrops);
      clearInterval(addNewDrops);
    };
  }, []);

  const getCellColor = (rowIndex, colIndex) => {
    let finalColor = null;

    activeDrops.forEach((drop) => {
      if (drop.column === colIndex) {
        const gradientIndex = -rowIndex + drop.row; // Distance from the drop head
        if (gradientIndex >= 0 && gradientIndex < trailLength) {
          // Calculate the darkening factor for this step
          const factor = gradientIndex / (trailLength - 1); // Increases from 0 (solid color) to 1 (darkest)
          const darkRed = Math.floor(currentColor.red * (1 - factor));
          const darkGreen = Math.floor(currentColor.green * (1 - factor));
          const darkBlue = Math.floor(currentColor.blue * (1 - factor));

          // Set the calculated color for this cell
          finalColor = { red: darkRed, green: darkGreen, blue: darkBlue };
        }
      }
    });

    if (finalColor) {
      return `rgb(${finalColor.red},${finalColor.green},${finalColor.blue})`; // Return the computed color
    }
    return "#ffffff"; // Default cell color for background
  };

  return (
    <>
    <div
      className="h-screen w-screen"
      style={{
        "--dot-bg": "#0a0a0a",
        "--dot-color": "#848282",
        "--dot-size": "1px",
        "--dot-space": "20px",
        background: `
      linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
      linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
      var(--dot-color)
    `,
      }}
    > 
      {/* Background */}
      <div className="flex flex-col justify-center items-center pt-5">


        <div className="text-4xl font-bold text-white font-sans p-10 tracking-wider">
          COLORING WATER DROP
        </div>
        {/* Grid row=15, col=20 */}
        
        <div className="grid pt-20">
          {Array.from({ length: rows }).map((_, rowIndex) =>
            Array.from({ length: cols }).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="cell"
                style={{ backgroundColor: getCellColor(rowIndex, colIndex) }}
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
