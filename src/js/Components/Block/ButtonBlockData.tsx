import { Div, Icon, Button, Span } from "utils/components";
import { MenuProps } from "./Menu";

type withSelectProps = {
	descendants_clientIds: string[];
	children_clientIds: string[];
	root_clientId: string;
};

const { __ } = wp.i18n;
const { withSelect } = wp.data;
// Safari doesn't log the one line version of the log
// as desired so we log each property in a different line.
// https://stackoverflow.com/a/42189492 | CC BY-SA 3.0
const is_safari = (window as any).safari !== undefined;
const multiple_log = is_safari;

export const ButtonBlockData = withSelect<withSelectProps, MenuProps>(
	(select, { id }) => ({
		descendants_clientIds: select(
			"core/block-editor"
		).getClientIdsOfDescendants([id]),
		children_clientIds: select("core/block-editor").getBlockOrder(id),
		root_clientId: select("core/block-editor").getBlockHierarchyRootClientId(id)
	})
)(props => {
	const {
		id,
		parent_id,
		block,
		block_type,
		close,
		index,
		template_lock,
		descendants_clientIds,
		children_clientIds,
		root_clientId
	} = props;
	const { name, attributes: attributes_value } = block;
	const { title, attributes: attributes_definition } = block_type;

	// l("block", block);
	// l("block_type", block_type);
	return (
		<Button
			classes={["button", "button-menu"]}
			onClick={() => {
				close();

				console.group(`Block: ${title}`);
				if (multiple_log) {
					l("name:", name);
					l("title:", title);
					l("index:", index);
					l("clientId:", id);
					l("attributes-value:", attributes_value);
					l("attributes-definition:", attributes_definition);
					l("templateLock:", template_lock);
					l("Parent-clientId:", parent_id);
					l("Root-clientId:", root_clientId);
					l("Children-clientIds:", children_clientIds);
					l("Descendants-clientIds:", descendants_clientIds);
				} else {
					l(
						`\n`,
						`name: ${name}\n\n`,
						`title: ${title}\n\n`,
						`index: ${index}\n\n`,
						`clientId: ${id}\n\n`,
						`attributes-value:`,
						attributes_value,
						`\n\n`,
						`attributes-definition:`,
						attributes_definition,
						`\n\n`,
						`templateLock: ${template_lock}\n\n`,
						`Parent-clientId: ${parent_id === "" ? `""` : parent_id}\n\n`,
						`Root-clientId: ${root_clientId}\n\n`,
						`Children-clientIds:`,
						children_clientIds,
						`\n\n`,
						`Descendants-clientIds:`,
						descendants_clientIds,
						`\n\n`
					);
				}
				console.groupEnd();
			}}
		>
			<Div classes="menu-icon">
				<Icon icon="log" />
			</Div>
			<Span>{__("Console log Block Data")}</Span>
		</Button>
	);
});
