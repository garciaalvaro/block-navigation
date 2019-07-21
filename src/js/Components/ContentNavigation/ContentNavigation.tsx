import { Div } from "utils/components";
import { pr_store } from "utils/data/plugin";
// import ListRoot from "../List/ListRoot";
import { MovingByClickToolbar } from "./MovingByClickToolbar";
import { BlockList } from "Components/BlockList/BlockList";

type withSelect = {
	moving_type: State["moving_type"];
	root_ids: string[];
};
type Props = withSelect;

const { withSelect } = wp.data;

export const ContentNavigation = withSelect<withSelect>(select => ({
	moving_type: select(pr_store).getMovingType(),
	root_ids: select("core/block-editor").getBlockOrder()
}))((props => {
	const { moving_type, root_ids } = props;

	return (
		<Div id="navigation">
			{moving_type === "by_click" && <MovingByClickToolbar />}
			<BlockList ids={root_ids} level={0} />
		</Div>
	);
}) as React.ComponentType<Props>);
