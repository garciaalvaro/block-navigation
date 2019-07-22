import { pr_store } from "utils/data/plugin";
import { Tabs } from "./Tabs";
import { Container } from "./Container";
import { ContentNavigation } from "Components/ContentNavigation/ContentNavigation";
// import { ContentSettings } from "Components/ContentSettings/ContentSettings";

type withSelectProps = {
	view: ReturnType<Selectors["getView"]>;
};

type Props = withSelectProps;

const { withSelect } = wp.data;

export const Root = withSelect<withSelectProps>(select => ({
	view: select(pr_store).getView()
}))((props: Props) => {
	const { view } = props;

	return (
		<Container>
			<Tabs />
			<ContentNavigation />
			{/* {tab_open === "navigation" ? <ContentNavigation /> : <ContentSettings />} */}
		</Container>
	);
});
