import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import HomeAppBar from "@/components/navigation/HomeAppBar";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
	const theme = useTheme();
	return (
		<Tabs
			screenOptions={{
				header: () => <HomeAppBar backable={false} />,
			}}
			tabBar={({ navigation, state, descriptors, insets }) => (
				<BottomNavigation.Bar
					style={{ ...styles.tabBar, backgroundColor: theme.colors.surface }}
					navigationState={state}
					safeAreaInsets={insets}
					onTabPress={({ route, preventDefault }) => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						});

						if (event.defaultPrevented) {
							preventDefault();
						} else {
							navigation.dispatch({
								...CommonActions.navigate(route.name, route.params),
								target: state.key,
							});
						}
					}}
					renderIcon={({ route, focused, color }) => {
						const { options } = descriptors[route.key];
						if (options.tabBarIcon) {
							return options.tabBarIcon({ focused, color, size: 24 });
						}

						return null;
					}}
					getLabelText={({ route }) => {
						const { options } = descriptors[route.key];
						const label = typeof options.tabBarLabel === "string" ? options.tabBarLabel : typeof options.title === "string" ? options.title : route.name;

						return label;
					}}
				/>
			)}>
			<Tabs.Screen
				name='index'
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />,
				}}
			/>
			<Tabs.Screen
				name='qrcode'
				options={{
					title: "QR Code",
					tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "qr-code" : "qr-code-outline"} color={color} />,
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					title: "Settings",
					tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "cog" : "cog-outline"} color={color} />,
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: "Profile",
					tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />,
					href: null,
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		borderTopLeftRadius: 20, // Rounded top-left corner
		borderTopRightRadius: 20, // Rounded top-right corner
		elevation: 5, // Elevation for Android
	},
});
