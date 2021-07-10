import React, { FunctionComponent } from "react";
import { useSelect, useDispatch } from "@wordpress/data";

import styles from "./tab.styl";
import { Button } from "../../button";
import { store_slug } from "@/store";

interface Props {
	value: State["view"];
	label: string;
}

export const Tab: FunctionComponent<Props> = props => {
	const { value, label } = props;
	const view = useSelect(select => select(store_slug).getView());
	const { setView } = useDispatch(store_slug);
	const onClick = () => setView(value);

	return (
		<Button
			className={[
				styles.container,
				value === view ? styles.is_active : null,
			]}
			onClick={onClick}
		>
			{label}
		</Button>
	);
};
