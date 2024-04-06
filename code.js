import Color from "color";
import designSystemConfigs from "./config/designSystemConfigs.json";

figma.showUI(__html__, { width: 480, height: 640 });

// Function to interpolate between two colors
function interpolateColor(color1, color2, factor) {
  const result = Color(color1).mix(Color(color2), factor).hex();
  return result;
}

// Function to generate a color palette based on an input color and specific color steps
function generatePalette(inputHex, colorSteps) {
  try {
    let palette = [];
    const inputColor = Color(inputHex);
    const lightness = inputColor.lightness();

    // Generate colors based on the provided color steps
    colorSteps.forEach((step) => {
      // Assuming the color steps are percentages
      const adjustedStep = step / 100;
      const color = interpolateColor("#000000", "#FFFFFF", adjustedStep);
      palette.push(color);
    });

    // Construct the result object with scale mappings
    let result = {};
    colorSteps.forEach((step, index) => {
      result[`color${step}`] = { value: palette[index], type: "color" };
    });

    return result;
  } catch (error) {
    console.error("Error generating palette:", error);
    let errorResult = {};
    colorSteps.forEach((step) => {
      errorResult[`color${step}`] = { value: "Invalid color", type: "color" };
    });
    return errorResult;
  }
}

// The message listener to handle messages from the UI
figma.ui.onmessage = (msg) => {
  if (msg.type === "request-design-systems") {
    figma.ui.postMessage({
      type: "set-design-systems",
      designSystems: designSystemConfigs.map((system) => system.name),
    });
  } else if (msg.type === "design-system-selected") {
    const systemConfig = designSystemConfigs.find(
      (system) => system.name === msg.systemName // Corrected from msg.name to msg.systemName
    );
    figma.ui.postMessage({
      type: "set-design-system-colors",
      systemConfig,
    });
  } else if (msg.type === "generate-palettes") {
    let palettesWithName = {};
    msg.colors.forEach((colorInfo) => {
      const systemConfig = designSystemConfigs.find(
        (system) => system.name === colorInfo.name
      );
      const colorConfig = systemConfig.colors.find(
        (c) => c.name === colorInfo.name
      );
      const palette = generatePalette(colorInfo.hex, colorConfig.colorSteps);
      palettesWithName[colorInfo.name] = palette;
    });

    figma.ui.postMessage({
      type: "generated-palettes",
      palettes: palettesWithName,
    });
    figma.notify("Palettes generated successfully!");
  }
};
