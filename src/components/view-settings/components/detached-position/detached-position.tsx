import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { RadioControl } from "@wordpress/components";

import { store_slug } from "@/store";
import type { State } from "@/store";

const options: { value: State["detached_position"]; label: string }[] = [
	{ value: "left", label: "Left" },
	{ value: "right", label: "Right" },
];

export const DetachedPosition: FunctionComponent = () => {
	const detached_position = useSelect(select =>
		select(store_slug).detached_position()
	);

	const { detachedPositionUpdate } = useDispatch(store_slug);

	return (
		<RadioControl
			label={__("Detached position")}
			options={options}
			selected={detached_position}
			onChange={detachedPositionUpdate}
		/>
	);
};
