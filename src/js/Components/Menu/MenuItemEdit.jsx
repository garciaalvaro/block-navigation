import { icons } from "utils";

const { __ } = wp.i18n;
const { MenuItem } = wp.components;
const { withDispatch } = wp.data;
const { Component } = wp.element;

class MenuItemEdit extends Component {
	openBlockEditor = () => {
		const { client_id, selectBlock, openGeneralSidebar } = this.props;

		selectBlock(client_id);
		openGeneralSidebar("edit-post/block");
	};

	render() {
		return (
			<MenuItem
				className="edit-block"
				icon={icons.edit}
				onClick={this.openBlockEditor}
			>
				{__("Open Block Settings")}
			</MenuItem>
		);
	}
}

export default withDispatch(dispatch => {
	const { openGeneralSidebar } = dispatch("core/edit-post");
	const { selectBlock } = dispatch("core/editor");

	return {
		openGeneralSidebar,
		selectBlock
	};
})(MenuItemEdit);
