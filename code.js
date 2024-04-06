import Color from "color";
import designSystemConfigs from "./config/designSystemConfigs.json";

let palettesWithName = {}; // Define this variable at the top level of your script

figma.showUI(__html__, { width: 480, height: 640 });

function interpolateColor(color1, color2, factor) {
  const result = Color(color1).mix(Color(color2), factor).hex();
  return result;
}

function generatePalette(inputHex, colorSteps) {
  try {
    let result = {};
    const inputColor = Color(inputHex);
    const lightness = inputColor.lightness();

    // Adjustments based on lightness for interpolation
    const darkAdjustment = inputColor
      .lightness(Math.max(5, lightness * 0.1))
      .hex();
    const lightAdjustment = inputColor
      .lightness(Math.min(95, lightness + (100 - lightness) * 0.9))
      .hex();

    // Determine the position of the input color among the provided color steps
    const sortedSteps = [...colorSteps].sort((a, b) => a - b); // Ensure steps are sorted in ascending order
    const maxStep = Math.max(...sortedSteps);
    const minStep = Math.min(...sortedSteps);
    const range = maxStep - minStep; // Total range of steps
    const stepFactor = range / sortedSteps.length; // Average factor for each step; used for interpolation

    // Generate colors for each step
    sortedSteps.forEach((step) => {
      const position = (step - minStep) / range; // Position of current step in the range
      let adjustedColor;
      if (position < 0.5) {
        // Closer to dark adjustment
        adjustedColor = interpolateColor(
          darkAdjustment,
          inputColor.hex(),
          position * 2
        );
      } else {
        // Closer to light adjustment
        adjustedColor = interpolateColor(
          inputColor.hex(),
          lightAdjustment,
          (position - 0.5) * 2
        );
      }
      result[step.toString()] = { value: adjustedColor, type: "color" };
    });

    return result;
  } catch (error) {
    console.error("Error generating palette:", error);
    // Prepare an error result
    let errorResult = {};
    colorSteps.forEach((step) => {
      errorResult[step] = { value: "Invalid color", type: "color" };
    });
    return errorResult;
  }
}

figma.ui.onmessage = (msg) => {
  console.log("Received message:", msg);
  if (msg.type === "request-design-systems") {
    figma.ui.postMessage({
      type: "set-design-systems",
      designSystems: designSystemConfigs.map((system) => system.name),
    });
  } else if (msg.type === "design-system-selected") {
    const systemConfig = designSystemConfigs.find(
      (system) => system.name === msg.systemName
    );
    figma.ui.postMessage({
      type: "set-design-system-colors",
      systemConfig,
    });
  } else if (msg.type === "generate-palettes") {
    try {
      palettesWithName = {};
      msg.colors.forEach((colorInfo) => {
        const systemConfig = designSystemConfigs.find(
          (system) => system.name === colorInfo.systemName
        );
        if (!systemConfig) {
          console.error("Design system not found:", colorInfo.systemName);
          return;
        }
        const colorConfig = systemConfig.colors.find(
          (c) => c.name === colorInfo.colorName
        );
        if (!colorConfig) {
          console.error(
            "Color not found in system:",
            colorInfo.colorName,
            colorInfo.systemName
          );
          return;
        }
        const palette = generatePalette(colorInfo.hex, colorConfig.colorSteps); // Adjusted to pass colorSteps
        console.log(`Palette for ${colorInfo.colorName}:`, palette);
        palettesWithName[colorInfo.colorName] = palette;
        figma.ui.postMessage({ type: "enable-generate-shapes" });
      });

      figma.ui.postMessage({
        type: "generated-palettes",
        palettes: palettesWithName,
      });
      figma.notify("Palettes generated successfully!");
    } catch (error) {
      console.error("Error processing generate-palettes message:", error);
    }
  } else if (msg.type === "generate-shapes") {
    // This should be an independent condition
    console.log("Shapes are about to be generated with:", palettesWithName);
    generateShapes();
  }
};

function generateShapes() {
  console.log("generateShapes called:", palettesWithName);
  const gap = 16; // Gap between rectangles
  let currentPosition = 0; // Starting position for the first rectangle

  Object.entries(palettesWithName).forEach(([name, palette]) => {
    Object.entries(palette).forEach(([step, colorInfo]) => {
      const rect = figma.createRectangle();
      rect.name = `${name}-${step}`; // Naming the rectangle
      rect.resize(100, 100); // Setting size to 100px by 100px
      rect.fills = [{ type: "SOLID", color: hexToRgb(colorInfo.value) }]; // Setting the fill color
      rect.x = currentPosition;

      // Update currentPosition for the next rectangle
      currentPosition += rect.width + gap;
    });
    figma.notify("Shapes generated successfully!");
  });

  // Optionally, select and center the view on the newly created shapes
  if (figma.currentPage.selection.length > 0) {
    figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
  }
}

// Utility function to convert hex to Figma's RGB format
function hexToRgb(hex) {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length == 7) {
    r = parseInt(hex.substring(1, 3), 16) / 255;
    g = parseInt(hex.substring(3, 5), 16) / 255;
    b = parseInt(hex.substring(5, 7), 16) / 255;
  }
  return { r, g, b };
}
