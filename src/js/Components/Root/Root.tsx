import { pr_store } from "utils/data/plugin";
import { Tabs } from "./Tabs";
import { Container } from "./Container";
import { ViewNavigation } from "Components/ViewNavigation/ViewNavigation";
import { ViewSettings } from "Components/ViewSettings/ViewSettings";

interface WithSelectProps extends Pick<State, "view"> {}

interface Props extends WithSelectProps {}

const { withSelect } = wp.data;

export const Root: React.ComponentType = withSelect<WithSelectProps>(
	select => ({
		view: select(pr_store).getView()
	})
)((props: Props) => {
	const { view } = props;

	return (
		<Container>
			<Tabs />
			{view === "navigation" ? <ViewNavigation /> : <ViewSettings />}
		</Container>
	);
});
