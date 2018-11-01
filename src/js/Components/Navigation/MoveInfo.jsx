import l, { plugin_namespace } from "../../utils/#";
import withFinishMove from "../Utils/_withFinishMove";
import Header from "../Header/Header";
import Html from "../Utils/_Html";

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Component } = wp.element;
const { Button } = wp.components;
const { withSelect } = wp.data;

class MoveInfo extends Component {
	render() {
		const { moving_block_client_id, finishMove } = this.props;

		return (
			<Html id="bn-move-info">
				<Header client_id={moving_block_client_id} use_events={false} />
				<Button className="cancel-move" onClick={finishMove}>
					<Html html_element="span">{__("Cancel Move")}</Html>
				</Button>
			</Html>
		);
	}
}

export default compose([
	withFinishMove,
	withSelect(select => {
		const { getMovingBlockClientId } = select(plugin_namespace);

		return {
			moving_block_client_id: getMovingBlockClientId()
		};
	})
])(MoveInfo);
