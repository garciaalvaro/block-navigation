import { Div, Icon, Button, Span } from "utils/Components";
import { store_prefix } from "utils/data";

interface WithDispatchProps {
	setMovingBlock: ActionCreators["setMovingBlock"];
	setMovingType: ActionCreators["setMovingType"];
}

interface OwnProps extends MenuProps {}

interface Props extends OwnProps, WithDispatchProps {}

const { __ } = wp.i18n;
const { withDispatch } = wp.data;

export const ButtonMoveTo: React.ComponentType<OwnProps> = withDispatch<
	WithDispatchProps,
	OwnProps
>(dispatch => ({
	setMovingBlock: dispatch(store_prefix).setMovingBlock,
	setMovingType: dispatch(store_prefix).setMovingType
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
		close_children,
		index
	} = props;
	const onClick = () => {
		close();
		close_children();
		setMovingType("by_click");
		setMovingBlock({
			id,
			parent_id,
			template_lock,
			block_name: block.name,
			index
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
