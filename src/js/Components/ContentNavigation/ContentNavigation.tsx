import { Div } from "utils/components";
import { pr_store } from "utils/data/plugin";
import { BlockList } from "Components/BlockList/BlockList";
import { MovingByClickToolbar } from "./MovingByClickToolbar";

interface WithSelectProps {
	moving: ReturnType<Selectors["isMoving"]>;
	moving_type: ReturnType<Selectors["getMovingType"]>;
	root_ids: string[];
}
type Props = WithSelectProps;

const { withSelect } = wp.data;
const { Fragment } = wp.element;

export const ContentNavigation = withSelect<WithSelectProps>(select => ({
	moving: select(pr_store).isMoving(),
	moving_type: select(pr_store).getMovingType(),
	root_ids: select("core/block-editor").getBlockOrder()
}))((props: Props) => {
	const { moving, moving_type, root_ids } = props;

	return (
		<Fragment>
			{moving && moving_type === "by_click" && <MovingByClickToolbar />}
			<Div id="navigation">
				<BlockList ids={root_ids} level={0} />
			</Div>
		</Fragment>
	);
});
