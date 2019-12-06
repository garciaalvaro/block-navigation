import { withSelect } from "@wordpress/data";

import "./App.styl";
import { store_slug } from "utils/data";
import { Tabs } from "../Tabs/Tabs";
import { AppContainer } from "./AppContainer";
import { ViewNavigation } from "../ViewNavigation/ViewNavigation";
import { ViewSettings } from "../ViewSettings/ViewSettings";

interface WithSelectProps extends Pick<State, "view"> {}

export const App: React.ComponentType = withSelect<WithSelectProps>(select => ({
	view: select(store_slug).getView()
}))(props => {
	const { view } = props;

	return (
		<AppContainer>
			<Tabs />
			{view === "navigation" ? <ViewNavigation /> : <ViewSettings />}
		</AppContainer>
	);
});
