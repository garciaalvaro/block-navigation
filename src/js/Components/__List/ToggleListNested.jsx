import { icons, pr_store } from "utils";

const { Button } = wp.components;
const { withDispatch } = wp.data;

const ToggleListNested = ({
	is_expanded,
	parent_client_id,
	collapseBlock,
	expandBlock
}) => {
	const onClick = () => {
		if (is_expanded) {
			collapseBlock(parent_client_id);
		} else {
			expandBlock(parent_client_id);
		}
	};

	return (
		<Button className="toggle-list" onClick={onClick}>
			{is_expanded ? icons.collapse : icons.expand}
		</Button>
	);
};

export default withDispatch(dispatch => {
	const { collapseBlock, expandBlock } = dispatch(pr_store);

	return {
		collapseBlock,
		expandBlock
	};
})(ToggleListNested);
