import { __ } from "@wordpress/i18n";
import { withDispatch } from "@wordpress/data";

import { Div, Icon, Button, Span } from "utils/Components";
import { store_slug } from "utils/data";

interface WithDispatchProps {
	setMovingBlock: ActionCreators["setMovingBlock"];
	setMovingType: ActionCreators["setMovingType"];
}

interface OwnProps extends MenuProps {}

interface Props extends OwnProps, WithDispatchProps {}

export const ButtonMoveTo: React.ComponentType<OwnProps> = withDispatch<
	WithDispatchProps,
	OwnProps
>(dispatch => ({
	setMovingBlock: dispatch(store_slug).setMovingBlock,
	setMovingType: dispatch(store_slug).setMovingType
}))((props: Props) => {
	const {
		id,
		parent_id,
		template_lock,
		block,
		can_move,
		setMovingBlock,
		setMovingType,
		close,
		is_expanded,
		collapseBlock,
		index
	} = props;
	const onClick = () => {
		close();
		collapseBlock();
		setMovingType("by_click");
		setMovingBlock({
			id,
			parent_id,
			template_lock,
			block_name: block.name,
			index,
			was_expanded: is_expanded
		});
	};

	return (
		<Button
			className={["button", "button-menu", !can_move ? "is_disabled" : null]}
			onClick={onClick}
		>
			<Div className="menu-icon">
				<Icon icon="move" />
			</Div>
			<Span>{__("Move Block To")}</Span>
		</Button>
	);
});
