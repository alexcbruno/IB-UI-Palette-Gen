import Color from "color";

figma.showUI(__html__, { width: 480, height: 640 }); // Adjust the UI size as needed

// Function to interpolate between two colors
// color1 and color2 are the hex codes of the colors to interpolate between
// factor is a value between 0 and 1 indicating the interpolation factor
function interpolateColor(color1, color2, factor) {
  const result = Color(color1).mix(Color(color2), factor).hex(); // Mixes color1 and color2 based on the given factor
  return result;
}

// Function to generate a color palette based on an input color
// inputHex is the hex code of the input color
function generatePalette(inputHex) {
  try {
    let palette = new Array(14).fill(null); // Initializes an array for 14 color palette entries
    const inputColor = Color(inputHex); // Creates a Color object for the input hex code
    const lightness = inputColor.lightness(); // Gets the lightness of the input color

    // Determine adjustments for the dark and light extremes of the palette
    // Ensures that the darkest color is not pure black and the lightest is not pure white
    const darkAdjustment = inputColor
      .lightness(Math.max(5, lightness * 0.1))
      .hex(); // Dark adjustment with a lightness floor of 5%
    const lightAdjustment = inputColor
      .lightness(Math.min(95, lightness + (100 - lightness) * 0.9))
      .hex(); // Light adjustment with a lightness ceiling of 95%

    // Determines the position of the input color within the palette based on its lightness
    const positionOfInputColor = Math.round((lightness * 13) / 100);

    palette[positionOfInputColor] = inputColor.hex(); // Sets the input color in its calculated position within the palette

    // Generate darker colors by interpolating between the dark adjustment and the input color
    for (let i = 0; i < positionOfInputColor; i++) {
      const factor = i / positionOfInputColor; // Calculates the interpolation factor based on position
      palette[i] = interpolateColor(darkAdjustment, inputColor.hex(), factor);
    }

    // Generate lighter colors by interpolating between the input color and the light adjustment
    for (let i = positionOfInputColor + 1; i < 14; i++) {
      const factor = (i - positionOfInputColor) / (14 - positionOfInputColor); // Calculates the interpolation factor based on position
      palette[i] = interpolateColor(inputColor.hex(), lightAdjustment, factor);
    }

    // Construct the final result object mapping each color in the palette to a scale
    let result = {};
    palette.forEach((color, index) => {
      const scale = (index + 1) * 100; // Scale values from 100 to 1400
      result[scale.toString()] = { value: color, type: "color" }; // Maps each color in the palette to a scale value
    });

    return result; // Returns the final color palette as an object
  } catch (error) {
    console.error("Error generating palette:", error);
    // Prepare an error result in case of failure, indicating an invalid color input
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
