import { Block } from "Components/Block/Block";

type Props = {
	ids: string[];
	level: number;
	ancestor_is_closed: boolean;
	id?: string;
};

const { Fragment } = wp.element;

export const BlockList: React.ComponentType<Props> = props => {
	const { id: parent_id, ids, level, ancestor_is_closed } = props;

	return (
		<Fragment>
			{ids.map((id, index) => (
				<Block
					key={id}
					id={id}
					parent_id={parent_id || ""}
					level={level}
					index={index}
					ancestor_is_closed={ancestor_is_closed}
				/>
			))}
		</Fragment>
	);
};
