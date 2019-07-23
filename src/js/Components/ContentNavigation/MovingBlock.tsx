import { Div, Span } from "utils/components";

type withSelectProps = {
	block_type: import("wordpress__blocks").Block | undefined;
};

type ParentProps = {
	block_name: string;
};

type Props = withSelectProps & ParentProps;

const { withSelect } = wp.data;
const { Icon } = wp.components;
const { Fragment } = wp.element;

export const MovingBlock = withSelect<withSelectProps, ParentProps>(
	(select, { block_name }) => ({
		block_type: select("core/blocks").getBlockType(block_name)
	})
)((props: Props) => {
	const { block_type } = props;

	if (!block_type) {
		return null;
	}

	const { icon, title } = block_type;

	return (
		<Fragment>
			{icon.src && (
				<Div classes="block-icon">
					<Icon icon={icon.src} />
				</Div>
			)}
			<Span classes="block-text">{title}</Span>
		</Fragment>
	);
});
