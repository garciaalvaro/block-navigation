import { Div, Icon, Button, Span } from "utils/components";
import { pr_store } from "utils/data/plugin";

type withDispatchProps = {
	setMovingBlock: ActionCreators["setMovingBlock"];
	setMovingType: ActionCreators["setMovingType"];
};

type ParentProps = {
	id: string;
	parent_id: string;
	template_lock: string | undefined;
	block: import("wordpress__blocks").BlockInstance;
	can_move: boolean;
	index: number;
	close: Function;
};

const { __ } = wp.i18n;
const { withDispatch } = wp.data;

export const ButtonMoveTo = withDispatch<withDispatchProps, ParentProps>(
	dispatch => ({
		setMovingBlock: dispatch(pr_store).setMovingBlock,
		setMovingType: dispatch(pr_store).setMovingType
	})
)(props => {
	const {
		id,
		parent_id,
		template_lock,
		block,
		can_move,
		setMovingBlock,
		setMovingType,
		close
	} = props;

	return (
		<Button
			classes={["button-text", "button-menu"]}
			disabled={!can_move}
			onClick={() => {
				close();
				setMovingBlock({
					id,
					parent_id,
					template_lock,
					block_name: block.name
				});
				setMovingType("by_click");
			}}
		>
			<Div classes="menu-icon">
				<Icon icon="move" />
			</Div>
			<Span>{__("Move Block To")}</Span>
		</Button>
	);
});
