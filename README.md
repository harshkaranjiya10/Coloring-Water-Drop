# Coloring-Water-Drop
## Approach

    Grid generate:
    - generate a grid with 15 rows and 20 columns (rows = 15, cols = 20) using Array.from for both the rows and columns.
    - For each cell in the grid, the background color is determined by the getCellColor function, which checks if the current cell is part of any active drop’s trail and assigns a color accordingly.

    Drops and Colors
    - Maintain an array activeDrops to keep track of all active drops and their positions (row and column).
    - Also maintain currentColor which stores the RGB values for the color of the water drop, and update it randomly every 2 seconds.

    Move Drops and Add new Drop: 
    - Every dropInterval (100 ms), update the row of each drop(move the drop down by one row).
    - Add New Drops: Every newDropInterval (100 ms), randomly generate a new drop at the top of the grid, with a random column but starting at the top row (row: -7 logic)

    Drop Length and Color
    - Each active drop has a trail with a length of 7, where the color darkens as it falls. The gradientIndex helps to calculate how dark the color should be for each step in the trail.
    - As each drop moves, the cells in the grid change their background color based on the distance from the drop's head. The color darkens as the drop moves further down.
## Run Locally

Clone the project

```bash
cd Colouring-Water-Drop
npm install
npm run start
```

