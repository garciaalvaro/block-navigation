import l from "../../utils/#";

const { __ } = wp.i18n;
const { Component } = wp.element;
const { MenuItem } = wp.components;
const { select } = wp.data;
const {
	getBlock,
	getBlockIndex,
	getClientIdsOfDescendants,
	getTemplateLock,
	getBlockOrder,
	getBlockRootClientId,
	getBlockHierarchyRootClientId
} = select("core/editor");
const { getBlockType } = select("core/blocks");

class MenuItemBlockData extends Component {
	logBlockData = () => {
		const {
			client_id,
			name,
			attributes,
			parent_clientId,
			index,
			title,
			attributes_available,
			templateLock,
			root_clientId,
			children_clientIds,
			descendants_clientIds
		} = this.getBlockData();
		// Safari doesn't log the one line version of the log
		// as desired so we log each property in a different line.
		// https://stackoverflow.com/a/42189492 | CC BY-SA 3.0
		const is_safari = window.safari !== undefined;
		const multiple_log = is_safari;

		console.group(`Block: ${title}`);
		if (multiple_log) {
			l("index:", index);
			l("name:", name);
			l("title:", title);
			l("clientId:", client_id);
			l("attributes:", attributes);
			l("attributes-available:", attributes_available);
			l("templateLock:", templateLock);
			l(
				"Parent-clientId:",
				parent_clientId === "" ? `""` : parent_clientId
			);
			l("Root-clientId:", root_clientId);
			l("Children-clientIds:", children_clientIds);
			l("Descendants-clientIds:", descendants_clientIds);
		} else {
			l(
				`\n`,
				`index: ${index}\n\n`,
				`name: ${name}\n\n`,
				`title: ${title}\n\n`,
				`clientId: ${client_id}\n\n`,
				`Parent-clientId: ${
					parent_clientId === "" ? `""` : parent_clientId
				}\n\n`,
				`Root-clientId: ${root_clientId}\n\n`,
				`templateLock: ${templateLock}\n\n`,
				`attributes:`,
				attributes,
				`\n\n`,
				`attributes-available:`,
				attributes_available,
				`\n\n`,
				`Children-clientIds:`,
				children_clientIds,
				`\n\n`,
				`Descendants-clientIds:`,
				descendants_clientIds,
				`\n\n`
			);
		}
		console.groupEnd();
	};

	getBlockData = () => {
		const { client_id } = this.props;
		const { name, attributes } = getBlock(client_id);
		const parent_clientId = getBlockRootClientId(client_id);
		const index = getBlockIndex(client_id, parent_clientId);
		const { title, attributes: attributes_available } = getBlockType(name);
		const templateLock = getTemplateLock(client_id);
		const root_clientId = getBlockHierarchyRootClientId(client_id);
		const children_clientIds = getBlockOrder(client_id);
		const descendants_clientIds = getClientIdsOfDescendants([client_id]);

		return {
			client_id,
			name,
			attributes,
			parent_clientId,
			index,
			title,
			attributes_available,
			templateLock,
			root_clientId,
			children_clientIds,
			descendants_clientIds
		};
	};

	render() {
		return (
			<MenuItem className="log-block_data" onClick={this.logBlockData}>
				{__("Block Data - Log to the Console")}
			</MenuItem>
		);
	}
}

export default MenuItemBlockData;
