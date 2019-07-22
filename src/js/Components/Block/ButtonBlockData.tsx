import { Div, Icon, Button, Span } from "utils/components";
import { pr_store } from "utils/data/plugin";

type withSelectProps = {
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
const { withSelect } = wp.data;
// Safari doesn't log the one line version of the log
// as desired so we log each property in a different line.
// https://stackoverflow.com/a/42189492 | CC BY-SA 3.0
const is_safari = (window as any).safari !== undefined;
const multiple_log = is_safari;

export const ButtonBlockData = withSelect<withSelectProps, ParentProps>(
	select => ({
		setMovingBlock: select(pr_store).setMovingBlock,
		setMovingType: select(pr_store).setMovingType
	})
)(props => {
	const { block, close, index } = props;
	const { title } = block;

	return (
		<Button
			classes={["button-text", "button-menu"]}
			onClick={() => {
				close();

				console.group(`Block: ${title}`);
				if (multiple_log) {
					l("index:", index);
					l("name:", name);
					l("title:", title);
					l("clientId:", client_id);
					l("attributes-value:", attributes_value);
					l("attributes-definition:", attributes_definition);
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
						`attributes-value:`,
						attributes_value,
						`\n\n`,
						`attributes-definition:`,
						attributes_definition,
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
			}}
		>
			<Div classes="menu-icon">
				<Icon icon="log" />
			</Div>
			<Span>{__("Console log Block Data")}</Span>
		</Button>
	);
});
