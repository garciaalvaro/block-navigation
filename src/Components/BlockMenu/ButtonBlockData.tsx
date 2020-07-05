import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";

import { Div, Icon, Button, Span } from "utils/components";

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		safari?: any;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const l = (...args: any[]) => console.log(...args);

// Safari doesn't log the one-line version of the log
// as desired so we log each property in a different line.
// https://stackoverflow.com/a/42189492 | CC BY-SA 3.0
const is_safari = window.safari !== undefined;

const multiple_log = is_safari;

export const ButtonBlockData: React.ComponentType<MenuProps> = props => {
	const { id, closeMenu } = props;

	const { name, attributes: attributes_value } = useSelect(select =>
		select("core/block-editor").getBlock(id)
	) || { name: "", attributes: {} };

	const parent_id =
		useSelect(select =>
			select("core/block-editor").getBlockRootClientId(id)
		) || "";

	const index = useSelect(select =>
		select("core/block-editor").getBlockIndex(id, parent_id)
	);

	const template_lock = useSelect(select =>
		select("core/block-editor").getTemplateLock()
	);

	const block_type = useSelect(select =>
		select("core/blocks").getBlockType(name)
	);

	const descendants_clientIds = useSelect(select =>
		select("core/block-editor").getClientIdsOfDescendants([id])
	);

	const children_clientIds = useSelect(select =>
		select("core/block-editor").getBlockOrder(id)
	);

	const root_clientId = useSelect(select =>
		select("core/block-editor").getBlockHierarchyRootClientId(id)
	);

	const onClick = () => {
		closeMenu();

		if (!block_type) {
			return;
		}

		const { title, attributes: attributes_definition } = block_type;

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
	};

	return (
		<Button className={["button", "button-menu"]} onClick={onClick}>
			<Div className="menu-icon">
				<Icon icon="log" />
			</Div>

			<Span>{__("Console log Block Data")}</Span>
		</Button>
	);
};
