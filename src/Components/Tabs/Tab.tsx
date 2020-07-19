import React, { FunctionComponent } from "react";
import { useSelect, useDispatch } from "@wordpress/data";

import { Button } from "utils/components";

interface Props {
	tab_value: State["view"];
	tab_label: string;
}

export const Tab: FunctionComponent<Props> = props => {
	const { tab_value, tab_label } = props;

	const view = useSelect(select =>
		select("melonpan/block-navigation").getView()
	);

	const { setView } = useDispatch("melonpan/block-navigation");

	const onClick = () => setView(tab_value);

	return (
		<Button
			className={[
				"button",
				"button-tab",
				tab_value === view ? "is_active" : null,
			]}
			onClick={onClick}
		>
			{tab_label}
		</Button>
	);
};
