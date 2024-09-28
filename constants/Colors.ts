const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
	light: {
		colors: {
			primary: "#fe5e00", // Bright Orange
			onPrimary: "rgb(255, 255, 255)", // White text/icons on primary color
			primaryContainer: "rgb(255, 219, 203)", // Lighter shade for container backgrounds
			onPrimaryContainer: "rgb(52, 16, 0)", // Dark text on primary container

			secondary: "#ffd6b8", // Rich, warm dark orange/red for secondary actions
			onSecondary: "rgb(255, 255, 255)", // White on secondary elements
			secondaryContainer: "#FFF2E5", // Lighter shade for secondary container
			onSecondaryContainer: "rgb(59, 9, 0)", // Dark text on secondary container

			tertiary: "#006874", // Teal shade for tertiary elements
			onTertiary: "rgb(255, 255, 255)", // White on tertiary
			tertiaryContainer: "rgb(151, 240, 255)", // Light teal container
			onTertiaryContainer: "rgb(0, 31, 36)", // Dark text for tertiary container

			error: "rgb(186, 26, 26)", // Standard error red
			onError: "rgb(255, 255, 255)", // White text/icons on error
			errorContainer: "rgb(255, 218, 214)", // Lighter red for error containers
			onErrorContainer: "rgb(65, 0, 2)", // Dark text for error containers

			background: "rgb(255, 255, 255)", // Pure white background
			onBackground: "rgb(32, 26, 24)", // Dark text on background

			surface: "rgb(255, 255, 255)", // Pure white surface (e.g., cards)
			onSurface: "rgb(32, 26, 24)", // Dark text on surface

			surfaceVariant: "#FFF2E5", // Light beige for surface variants
			onSurfaceVariant: "rgb(82, 68, 61)", // Darker text for surface variants

			outline: "rgb(133, 115, 108)", // Light outline color for borders
			outlineVariant: "rgb(215, 194, 185)", // Softer outline variant

			shadow: "rgb(0, 0, 0)", // Black for shadows
			scrim: "rgb(0, 0, 0)", // Black scrim for modal overlays

			inverseSurface: "rgb(54, 47, 44)", // Dark surface for inversed UI elements
			inverseOnSurface: "rgb(251, 238, 233)", // Light text on dark inverse surface

			inversePrimary: "rgb(255, 182, 147)", // Lighter version of primary for inverse UI

			elevation: {
				level0: "transparent", // No elevation
				level1: "#FFF2E5", // Light shadow on primary color
				level2: "rgb(247, 236, 235)", // Slightly deeper shadow
				level3: "#FFF2E5", // Moderate shadow
				level4: "rgb(244, 229, 224)", // Deeper shadow
				level5: "#a2958f", // Strongest shadow
			},

			surfaceDisabled: "rgba(32, 26, 24, 0.12)", // Disabled surface background
			onSurfaceDisabled: "rgba(32, 26, 24, 0.38)", // Disabled text/icons
			backdrop: "rgba(59, 46, 40, 0.4)", // Dimmed backdrop for modal overlays
		},
	},

	dark: {
		colors: {
			primary: "rgb(255, 130, 0)", // Toned down orange
			onPrimary: "rgb(0, 0, 0)", // Black text/icons on primary color
			primaryContainer: "rgb(85, 33, 0)", // Darker primary container background
			onPrimaryContainer: "rgb(255, 219, 203)", // Lighter text on primary container

			secondary: "rgb(255, 179, 128)", // Softened secondary color
			onSecondary: "rgb(0, 0, 0)", // Black text on secondary elements
			secondaryContainer: "rgb(85, 45, 20)", // Darker orange for secondary container
			onSecondaryContainer: "rgb(255, 219, 209)", // Light text on secondary container

			tertiary: "rgb(0, 94, 110)", // Dark teal for tertiary elements
			onTertiary: "rgb(255, 255, 255)", // White on tertiary
			tertiaryContainer: "rgb(0, 64, 78)", // Dark teal container
			onTertiaryContainer: "rgb(151, 240, 255)", // Lighter text for tertiary container

			error: "rgb(186, 26, 26)", // Standard error red
			onError: "rgb(255, 255, 255)", // White text/icons on error
			errorContainer: "rgb(103, 0, 0)", // Darker red for error containers
			onErrorContainer: "rgb(255, 180, 171)", // Light text for error containers

			background: "rgb(18, 18, 18)", // Dark background
			onBackground: "rgb(255, 255, 255)", // Light text on dark background

			surface: "rgb(28, 28, 30)", // Darker surface color
			onSurface: "rgb(255, 255, 255)", // Light text on surface

			surfaceVariant: "rgb(49, 47, 50)", // Dark surface variant
			onSurfaceVariant: "rgb(215, 194, 185)", // Lighter text on surface variants

			outline: "rgb(125, 125, 125)", // Slightly lighter outline
			outlineVariant: "rgb(49, 47, 50)", // Dark outline variant

			shadow: "rgb(0, 0, 0)", // Black shadows
			scrim: "rgb(0, 0, 0)", // Black scrim for modal overlays

			inverseSurface: "rgb(255, 255, 255)", // Light surface for inversed UI
			inverseOnSurface: "rgb(32, 26, 24)", // Dark text on inverse surface

			inversePrimary: "rgb(255, 182, 147)", // Inverse of primary for dark mode

			elevation: {
				level0: "transparent", // No elevation
				level1: "rgb(39, 35, 41)", // Darker shadow at level 1
				level2: "rgb(44, 40, 48)", // Deeper shadow
				level3: "rgb(50, 44, 55)", // Moderate shadow
				level4: "rgb(52, 46, 57)", // Even deeper shadow
				level5: "rgb(82,82,82)", // Deepest shadow
			},

			surfaceDisabled: "rgba(255, 255, 255, 0.12)", // Disabled surface in dark mode
			onSurfaceDisabled: "rgba(255, 255, 255, 0.38)", // Disabled text/icons

			backdrop: "rgba(51, 47, 55, 0.4)", // Dark backdrop for modal overlays
		},
	},
};
