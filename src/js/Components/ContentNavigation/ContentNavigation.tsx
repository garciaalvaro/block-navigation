import { Div } from "utils/components";
import { pr_store } from "utils/data/plugin";
// import ListRoot from "../List/ListRoot";
import { MovingByClickToolbar } from "./MovingByClickToolbar";
import { BlockList } from "Components/BlockList/BlockList";
import { Fragment } from "react";

type withSelectProps = {
	moving: ReturnType<Selectors["isMoving"]>;
	moving_type: ReturnType<Selectors["getMovingType"]>;
	root_ids: string[];
};
type Props = withSelectProps;

const { withSelect } = wp.data;

export const ContentNavigation = withSelect<withSelectProps>(select => ({
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
