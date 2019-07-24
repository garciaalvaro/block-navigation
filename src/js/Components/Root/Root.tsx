import { pr_store } from "utils/data/plugin";
import { Tabs } from "./Tabs";
import { Container } from "./Container";
import { ContentNavigation } from "Components/ContentNavigation/ContentNavigation";
import { ContentSettings } from "Components/ContentSettings/ContentSettings";

interface WithSelectProps {
	view: ReturnType<Selectors["getView"]>;
}

type Props = WithSelectProps;

const { withSelect } = wp.data;

export const Root = withSelect<WithSelectProps>(select => ({
	view: select(pr_store).getView()
}))((props: Props) => {
	const { view } = props;

	return (
		<Container>
			<Tabs />
			{view === "navigation" ? <ContentNavigation /> : <ContentSettings />}
		</Container>
	);
});
