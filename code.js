import Color from "color";
import "./style.css";

figma.showUI(__html__, { width: 480, height: 640 }); // Adjust the UI size as needed

function interpolateColor(color1, color2, factor) {
  const result = Color(color1).mix(Color(color2), factor).hex();
  return result;
}

function generatePalette(inputHex) {
  try {
    let palette = new Array(14).fill(null);
    const inputColor = Color(inputHex);
    const lightness = inputColor.lightness();

    // Calculate the new lightness values for the dark and light extremes
    const darkAdjustment = inputColor
      .lightness(Math.max(5, lightness * 0.1))
      .hex(); // Ensures dark is not pure black
    const lightAdjustment = inputColor
      .lightness(Math.min(95, lightness + (100 - lightness) * 0.9))
      .hex(); // Ensures light is not pure white

    const positionOfInputColor = Math.round((lightness * 13) / 100);

    palette[positionOfInputColor] = inputColor.hex();

    // Interpolate colors towards the dark adjustment
    for (let i = 0; i < positionOfInputColor; i++) {
      const factor = i / positionOfInputColor;
      palette[i] = interpolateColor(darkAdjustment, inputColor.hex(), factor);
    }

    // Interpolate colors towards the light adjustment
    for (let i = positionOfInputColor + 1; i < 14; i++) {
      const factor = (i - positionOfInputColor) / (14 - positionOfInputColor);
      palette[i] = interpolateColor(inputColor.hex(), lightAdjustment, factor);
    }

    let result = {};
    palette.forEach((color, index) => {
      const scale = (index + 1) * 100;
      result[scale.toString()] = { value: color, type: "color" };
    });

    return result;
  } catch (error) {
    console.error("Error generating palette:", error);
    let errorResult = {};
    for (let i = 1; i <= 14; i++) {
      errorResult[i * 100] = { value: "Invalid color", type: "color" };
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
