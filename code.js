import Color from "color";
import designSystemConfigs from "./config/designSystemConfigs.json";

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
    let palettesWithName = {};
    msg.colors.forEach((colorInfo) => {
      // Find the design system config for the selected system
      const systemConfig = designSystemConfigs.find(
        (system) => system.name === colorInfo.systemName
      );
      if (!systemConfig) {
        console.error("Design system not found:", colorInfo.systemName);
        return;
      }
      // Assume colorInfo now correctly includes systemName and colorName
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
      // Now, correctly pass the colorSteps for this color
      const palette = generatePalette(colorInfo.hex, colorConfig.colorSteps); // Adjusted to pass colorSteps
      palettesWithName[colorInfo.colorName] = palette;
    });

    figma.ui.postMessage({
      type: "generated-palettes",
      palettes: palettesWithName,
    });
    figma.notify("Palettes generated successfully!");
  }
};
