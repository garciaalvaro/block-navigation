import { useSelect } from "@wordpress/data";
import { Icon } from "@wordpress/components";
import { Fragment } from "@wordpress/element";

import { Div, Span } from "utils/Components";

interface Props {
	block_name: State["moving_block"]["block_name"];
}

export const ToolbarMovingBlock: React.ComponentType<Props> = props => {
	const { block_name } = props;
	const block_type = useSelect<BlockProps["block_type"]>(select =>
		select("core/blocks").getBlockType(block_name)
	);

	if (!block_type) {
		return null;
	}

	const { icon, title } = block_type;

	return (
		<Fragment>
			{icon.src && (
				<Div className="block-icon">
					<Icon icon={icon.src} />
				</Div>
			)}

			<Span className="block-title">{title}</Span>
		</Fragment>
	);
};
