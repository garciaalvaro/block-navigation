import l from "../../utils";
import BlockClassName from "./_BlockClassName";
import Div from "../Utils/_Html";
import DropArea from "./DropArea";

const { Component } = wp.element;

class EndOfList extends Component {
	render() {
		const {
			style_virtual,
			client_id,
			parent_client_id,
			level,
			can_receive_drop,
			can_move
		} = this.props;
		const style = style_virtual !== false ? style_virtual : {};

		return (
			<BlockClassName
				client_id={client_id}
				level={level}
				can_receive_drop={can_receive_drop}
				can_move={can_move}
				is_parent={false}
				is_end_of_list={true}
			>
				{className => (
					<Div className={className} style={style}>
						<DropArea
							parent_client_id={parent_client_id}
							client_id={client_id}
							is_end_of_list={true}
						/>
						<Div className="block-header" />
					</Div>
				)}
			</BlockClassName>
		);
	}
}

export default EndOfList;
