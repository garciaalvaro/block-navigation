// import { Div } from "utils/components";
// import { DropArea } from "../Block/DropArea";
// import { pr_store } from "utils/data/plugin";

// interface WithSelectProps {
// 	moving_is_over: boolean;
// };

// interface WithStateProps {
// 	moving_is_over: boolean;
// };

// type OwnProps = {
// 	parent_id: string;
// 	index: number;
// };

// type Props = WithStateProps & OwnProps & { setState(obj: any): void };

// const { withState, compose } = wp.compose;
// const { withSelect } = wp.data;

// export const DropAreaEndOfList = compose([
// 	withState<WithStateProps>({
// 		moving_is_over: false
// 	}),
// 	withSelect<WithSelectProps, OwnProps>((select, { parent_id }) => {
// 		const { canInsertBlockType } = select("core/block-editor");
// 		const moving_block: State["moving_block"] = select(
// 			pr_store
// 		).getMovingBlock();

// 		return {
// 			moving_block,
// 			moving_can_be_sibling: canInsertBlockType(
// 				moving_block.block_name,
// 				parent_id
// 			)
// 		};
// 	})
// ])((props: Props) => {
// 	const {
// 		moving_block,
// 		moving_is_over,
// 		index,
// 		parent_id,
// 		setState,
// 		level,
// 		moving_can_be_sibling
// 	} = props;
// 	const can_receive_drop =
// 		moving_block.template_lock === "insert"
// 			? moving_block.parent_id === parent_id
// 			: moving_can_be_sibling;

// 	if (!can_receive_drop) {
// 		return null;
// 	}

// 	return (
// 		<Div
// 			classes={[
// 				"drop_area_end_of_list",
// 				`level-${level}`,
// 				moving_is_over ? "moving_is_over" : "no-moving_is_over"
// 			]}
// 		>
// 			<DropArea
// 				cancelMovingIsOver={() => setState({ moving_is_over: false })}
// 				toggleMovingIsOver={() => setState({ moving_is_over: !moving_is_over })}
// 				index={index}
// 				parent_id={parent_id}
// 			/>
// 		</Div>
// 	);
// });
