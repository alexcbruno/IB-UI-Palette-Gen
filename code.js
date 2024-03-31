import Color from "color";

figma.showUI(__html__, { width: 480, height: 360 }); // Adjust the UI size as needed

// Function to interpolate between two colors remains unchanged
function interpolateColor(color1, color2, factor) {
  const result = Color(color1).mix(Color(color2), factor).hex();
  return result;
}

// Function to generate the palette and produce JSON in the specified schema
function generatePalette(inputHex) {
  try {
    let palette = new Array(14).fill(null);
    const inputColor = Color(inputHex);
    const lightness = inputColor.lightness();

    // Determine the position of the input color based on its lightness
    const positionOfInputColor = Math.round((lightness * 13) / 100); // Adjusted for 0-13 range

    palette[positionOfInputColor] = inputColor.hex(); // Place the input hex in its position

    // Interpolate colors before the input color towards black
    for (let i = 0; i < positionOfInputColor; i++) {
      const factor = i / positionOfInputColor;
      palette[i] = interpolateColor("#000000", inputColor.hex(), factor);
    }

    // Interpolate colors after the input color towards white
    for (let i = positionOfInputColor + 1; i < 14; i++) {
      const factor = (i - positionOfInputColor) / (14 - positionOfInputColor);
      palette[i] = interpolateColor(inputColor.hex(), "#FFFFFF", factor);
    }

    // Construct the result object with scale mappings
    let result = {};
    palette.forEach((color, index) => {
      const scale = (index + 1) * 100; // Generates scale values (100, 200, ..., 1400)
      result[scale.toString()] = { value: color, type: "color" };
    });

    return result;
  } catch (error) {
    console.error("Error generating palette for", inputHex, ":", error);
    // Prepare error result for each scale if there's an error
    let errorResult = {};
    for (let i = 1; i <= 14; i++) {
      const scale = i * 100;
      errorResult[scale.toString()] = { value: "Invalid color", type: "color" };
    }
    return errorResult;
  }
}

// The message listener and posting logic remain unchanged
figma.ui.onmessage = (msg) => {
  if (msg.type === "generate-palettes" && Array.isArray(msg.colors)) {
    let palettesWithName = {}; // Object to hold palettes keyed by name

    msg.colors.forEach((color) => {
      // Assume color is an object {name: "colorName", hex: "#hexValue"}
      const palette = generatePalette(color.hex);
      palettesWithName[color.name] = palette; // Nest palette under color name
    });

    figma.ui.postMessage({
      type: "generated-palettes",
      palettes: palettesWithName,
    });
    figma.notify("Palettes generated successfully!");
  }
};
