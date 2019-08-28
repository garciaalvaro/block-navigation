import { Block } from "Components/ViewNavigation/Block/Block";

interface OwnProps extends Pick<BlockProps, "parent_id" | "level"> {
	ids: string[];
}

interface Props extends OwnProps {}

const { Fragment } = wp.element;

export const BlockList: React.ComponentType<OwnProps> = (props: Props) => {
	const { parent_id, ids, level } = props;

	return (
		<Fragment>
			{ids.map((id, index) => (
				<Block
					key={id}
					id={id}
					parent_id={parent_id}
					level={level}
					index={index}
					is_last_children={index + 1 === ids.length}
				/>
			))}
		</Fragment>
	);
};
