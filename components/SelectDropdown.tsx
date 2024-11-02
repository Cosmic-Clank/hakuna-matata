import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useState } from "react";
import { PaperSelect } from "react-native-paper-select";
import { useTheme } from "react-native-paper";

const Dropdown = ({ label, onSelection, options, multiEnable = false, value, style, mode = "outlined", defaultValue = [] }: { label: string; onSelection: (value: string) => void; options: Array<{ _id: string; value: string }>; multiEnable?: boolean; value: any; style?: ViewStyle | undefined; mode?: "flat" | "outlined" | undefined; defaultValue?: Array<{ _id: string; value: string }> }) => {
	const [item, setItem] = useState({
		value: "",
		list: options,
		selectedList: defaultValue,
	});

	const theme = useTheme();

	return (
		<PaperSelect
			label={label}
			arrayList={item.list}
			selectedArrayList={item.selectedList}
			value={value}
			onSelection={(value: any) => {
				setItem({
					...item,
					value: value.text,
					selectedList: value.selectedList,
				});

				onSelection(value.text);
			}}
			multiEnable={multiEnable}
			containerStyle={style}
			textInputMode={mode}
			searchStyle={{ backgroundColor: theme.colors.surface }}
			textInputOutlineStyle={{ borderColor: theme.colors.elevation.level5 }}
		/>
	);
};

export default Dropdown;

const styles = StyleSheet.create({});
