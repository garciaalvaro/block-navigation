import { useSelect, useDispatch } from "@wordpress/data";

import { Button } from "utils/Components";
import { store_slug } from "utils/data";

interface Props {
	tab_value: State["view"];
	tab_label: string;
}

export const Tab: React.ComponentType<Props> = props => {
	const { tab_value, tab_label } = props;

	const view = useSelect<State["view"]>(select =>
		select(store_slug).getView()
	);

	const { setView } = useDispatch(store_slug);

	const onClick = () => setView(tab_value);

	return (
		<Button
			className={[
				"button",
				"button-tab",
				tab_value === view ? "is_active" : null
			]}
			onClick={onClick}
		>
			{tab_label}
		</Button>
	);
};
