import BlockClassName from "./_BlockClassName";
import DropArea from "./DropArea";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import ListNested from "../List/ListNested";
import { Div } from "utils/components";

const { withSelect } = wp.data;

const Block = props => {
	const {
		style_virtual,
		client_id,
		parent_client_id,
		level,
		children_client_ids,
		can_receive_drop,
		can_move
	} = props;
	const is_parent = children_client_ids.length > 0;

	return (
		<BlockClassName
			client_id={client_id}
			level={level}
			can_receive_drop={can_receive_drop}
			can_move={can_move}
			is_parent={is_parent}
			is_end_of_list={false}
		>
			{className => (
				<Div id={`bn-${client_id}`} className={className} style={style_virtual}>
					{can_move && (
						<DropArea
							parent_client_id={parent_client_id}
							client_id={client_id}
							is_end_of_list={false}
						/>
					)}
					<Header
						can_move={can_move}
						client_id={client_id}
						parent_client_id={parent_client_id}
						is_parent={is_parent}
						use_events={true}
					/>
					<Menu
						can_move={can_move}
						client_id={client_id}
						parent_client_id={parent_client_id}
						is_parent={is_parent}
					/>
					{is_parent && (
						<ListNested
							client_ids={children_client_ids}
							parent_client_id={client_id}
							level={level}
						/>
					)}
				</Div>
			)}
		</BlockClassName>
	);
};

export default withSelect((select, { client_id }) => {
	const { getBlockOrder } = select("core/editor");

	return {
		children_client_ids: getBlockOrder(client_id)
	};
})(Block);
