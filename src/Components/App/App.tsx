import { useSelect } from "@wordpress/data";

import "./App.styl";
import { store_slug } from "utils/data";
import { Tabs } from "../Tabs/Tabs";
import { AppContainer } from "./AppContainer";
import { ViewNavigation } from "../ViewNavigation/ViewNavigation";
import { ViewSettings } from "../ViewSettings/ViewSettings";

export const App: React.ComponentType = () => {
	const view = useSelect<State["view"]>(select =>
		select(store_slug).getView()
	);

	return (
		<AppContainer>
			<Tabs />

			{view === "navigation" ? <ViewNavigation /> : <ViewSettings />}
		</AppContainer>
	);
};
