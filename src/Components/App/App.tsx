import React, { FunctionComponent } from "react";
import { useSelect } from "@wordpress/data";

import "./App.styl";
import { Tabs } from "../Tabs";
import { AppContainer } from "./AppContainer";
import { ViewNavigation } from "../ViewNavigation";
import { ViewSettings } from "../ViewSettings";

export const App: FunctionComponent = () => {
	const view = useSelect(select =>
		select("melonpan/block-navigation").getView()
	);

	return (
		<AppContainer>
			<Tabs />

			{view === "navigation" ? <ViewNavigation /> : <ViewSettings />}
		</AppContainer>
	);
};
