import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { RadioControl } from "@wordpress/components";

import { store_slug } from "@/store";

const options: { value: State["block_info_displayed"]; label: string }[] = [
	{ value: "title_content", label: "Title & Content" },
	{ value: "title", label: "Title" },
	{ value: "content", label: "Content" },
];

export const BlockInfoDisplayed: FunctionComponent = () => {
	const block_info_displayed = useSelect(select =>
		select(store_slug).getBlockInfoDisplayed()
	);

	const { setBlockInfoDisplayed } = useDispatch(store_slug);

	return (
		<RadioControl
			label={__("Block info displayed")}
			help={__(
				[
					`Select which info to display from each block.`,
					`When "Content" is selected, if a block does not have content`,
					`or it is not available, the block title will be displayed instead.`,
				].join(" ")
			)}
			selected={block_info_displayed}
			options={options}
			onChange={setBlockInfoDisplayed}
		/>
	);
};
