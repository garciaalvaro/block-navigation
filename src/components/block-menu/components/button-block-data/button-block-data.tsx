import React from "react";
import type { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { useContext } from "@wordpress/element";

import { Button } from "../button";
import { context } from "@/components/block";

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		safari?: any;
	}
}

// Safari doesn't log the one-line version of the log
// as desired so we log each property in a different line.
// https://stackoverflow.com/a/42189492 | CC BY-SA 3.0
const is_safari = window.safari !== undefined;

const multiple_log = is_safari;

export const ButtonBlockData: FunctionComponent = () => {
	const { id, parent_id } = useContext(context);

	const { name, attributes: attributes_value } = useSelect(
		select =>
			select("core/block-editor").getBlock(id) || {
				name: "",
				attributes: {},
			}
	);

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
		if (!block_type) return;

		const { log, group, groupEnd } = console;
		const { title, attributes: attributes_definition } = block_type;

		group(`Block: ${title}`);

		if (multiple_log) {
			log("name:", name);
			log("title:", title);
			log("index:", index);
			log("clientId:", id);
			log("attributes-value:", attributes_value);
			log("attributes-definition:", attributes_definition);
			log("templateLock:", template_lock);
			log("Parent-clientId:", parent_id);
			log("Root-clientId:", root_clientId);
			log("Children-clientIds:", children_clientIds);
			log("Descendants-clientIds:", descendants_clientIds);
		} else {
			log(
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

		groupEnd();
	};

	return (
		<Button onClick={onClick} icon="log">
			{__("Console log Block Data")}
		</Button>
	);
};
