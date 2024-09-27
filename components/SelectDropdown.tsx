import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { PaperSelect } from "react-native-paper-select";

const Dropdown = ({ label, onSelection, options, multiEnable = false, value, mode = "outlined" }: { label: string; onSelection: (value: string) => void; options: Array<{ _id: string; value: string }>; multiEnable?: boolean; value: any; mode?: "flat" | "outlined" | undefined }) => {
	const [item, setItem] = useState({
		value: "",
		list: options,
		selectedList: [],
	});

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
			textInputMode={mode}
		/>
	);
};

export default Dropdown;

const styles = StyleSheet.create({});
