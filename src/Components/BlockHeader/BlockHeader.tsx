import React, { FunctionComponent, DragEventHandler } from "react";
import { useDispatch, useSelect } from "@wordpress/data";
import { Icon as WpIcon } from "@wordpress/components";

import "./BlockHeader.styl";
import { Div, Span } from "@/utils/components";
import { BlockContent } from "../BlockContent";

interface Props {
	id: BlockId;
	onDragStart?: DragEventHandler;
	onDragEnd?: DragEventHandler;
}

export const BlockHeader: FunctionComponent<Props> = props => {
	const { id, onDragStart, onDragEnd } = props;

	const { selectBlock } = useDispatch("core/block-editor");

	const name =
		useSelect(select => select("core/block-editor").getBlockName(id)) || "";

	const block_type = useSelect(select =>
		select("core/blocks").getBlockType(name)
	);

	const parent_id =
		useSelect(select =>
			select("core/block-editor").getBlockRootClientId(id)
		) || "";

	const can_move =
		useSelect(select =>
			select("core/block-editor").getTemplateLock(parent_id)
		) !== "all";

	const title = block_type?.title || name;

	const icon = block_type?.icon.src;

	return (
		<Div
			draggable={can_move}
			className="block-header"
			onClick={() => selectBlock(id)}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<Div className="block-header-content">
				{icon && (
					<Div className="block-icon">
						<WpIcon icon={icon} />
					</Div>
				)}

				<Span className="block-title">{title}</Span>

				<BlockContent id={id} name={name} />
			</Div>
		</Div>
	);
};
