interface OklchColor {
  l: number;
  c: number;
  h: number;
}

interface ColorPalette {
  [key: string]: string;
}

export interface ThemeVariables {
  [key: string]: string;
}

export function useTheme() {
  
  // Utility function to convert hex to OKLCH
  function hexToOklch(hex: string): OklchColor {

    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    // Convert RGB to linear RGB
    const linearR = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const linearG = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const linearB = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    // Convert linear RGB to OKLCH (simplified approximation)
    // For production use, consider using a proper color conversion library like culori
    const L = 0.4122214708 * linearR + 0.5363325363 * linearG + 0.0514459929 * linearB;
    const M = 0.2119034982 * linearR + 0.6806995451 * linearG + 0.1073969566 * linearB;
    const S = 0.0883024619 * linearR + 0.2817188376 * linearG + 0.6299787005 * linearB;
    
    const l = Math.cbrt(L);
    const m = Math.cbrt(M);
    const s = Math.cbrt(S);
    
    const lightness = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
    const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
    const b_val = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
    
    const chroma = Math.sqrt(a * a + b_val * b_val);
    const hue = Math.atan2(b_val, a) * 180 / Math.PI;
    
    return {
      l: Math.max(0, Math.min(1, lightness)),
      c: Math.max(0, chroma),
      h: hue >= 0 ? hue : hue + 360
    };
  }
  
  // Generate OKLCH palette from base color
  function generateOklchPalette(baseHex: string): ColorPalette {
    const baseOklch = hexToOklch(baseHex);
    
    // Tailwind-like lightness scale (approximate values)
    const lightnessScale: Record<string, number> = {
      50: 0.97,
      100: 0.94,
      200: 0.87,
      300: 0.78,
      400: 0.66,
      500: 0.55,  // Base color lightness (approximately)
      600: 0.45,
      700: 0.35,
      800: 0.25,
      900: 0.17,
      950: 0.10
    };
    
    const palette: ColorPalette = {};
    
    Object.entries(lightnessScale).forEach(([shade, targetLightness]) => {

      // Adjust chroma based on lightness for better visual consistency
      let adjustedChroma = baseOklch.c;
      
      // Reduce chroma for very light and very dark shades
      if (targetLightness > 0.9) {
        adjustedChroma *= 0.3;
      } 
      else if (targetLightness > 0.8) {
        adjustedChroma *= 0.6;
      } 
      else if (targetLightness < 0.2) {
        adjustedChroma *= 0.8;
      }
      
      palette[shade] = 
        `oklch(${targetLightness.toFixed(3)} ${adjustedChroma.toFixed(3)} ${baseOklch.h.toFixed(1)})`;
    })
    
    return palette;
  }
  

  // Generate tailwind css varibles from OKLCH palette
  function createTailwindVariables(primaryColor: string): ThemeVariables {
    const palette = generateOklchPalette(primaryColor);
    
    return {
      "--ui-primary": primaryColor,
      "--ui-color-primary-50": palette[50] ?? "",
      "--ui-color-primary-100": palette[100] ?? "",
      "--ui-color-primary-200": palette[200] ?? "",
      "--ui-color-primary-300": palette[300] ?? "",
      "--ui-color-primary-400": palette[400] ?? "",
      "--ui-color-primary-500": palette[500] ?? "",
      "--ui-color-primary-600": palette[600] ?? "",
      "--ui-color-primary-700": palette[700] ?? "",
      "--ui-color-primary-800": palette[800] ?? "",
      "--ui-color-primary-900": palette[900] ?? "",
      "--ui-color-primary-950": palette[950] ?? ""
    };
  }

  
  // Watch for changes to primary color css variable and update app style
  function watchTailwindVariables(indexStore: ReturnType<typeof useIndexStore>) {
    watch( () => indexStore.app.theme.primaryColor.tailwindVariables, (newVariables) => {

        const cssString = `:root { ${Object.entries(newVariables)
          .map(([prop, value]) => `${prop}: ${value}`)
          .join('; ')} }`;
          
        // Update the existing style tag directly
        const themeStyleTag = document.querySelector('#erp-dynamic-colors')
        if (themeStyleTag) {
          themeStyleTag.textContent = cssString
        }
      },
      { deep: true }
    )
  }

  return {
    createTailwindVariables,
    watchTailwindVariables
  }
}