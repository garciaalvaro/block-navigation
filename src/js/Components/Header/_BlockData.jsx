import l from "utils";

const { get, throttle } = lodash;
const { compose, withState } = wp.compose;
const { Component } = wp.element;
const { withSelect } = wp.data;

class BlockData extends Component {
	componentWillUnmount = () => {
		this.setCanUpdate.cancel();
	};

	shouldComponentUpdate = nextProps => {
		if (!nextProps.can_update) {
			return false;
		}

		return true;
	};

	componentDidUpdate = () => {
		const { setState } = this.props;

		setState({ can_update: false });
		this.setCanUpdate();
	};

	setCanUpdate = throttle(
		() => {
			const { setState } = this.props;

			setState({ can_update: true });
		},
		1000,
		{
			leading: true,
			trailing: true
		}
	);

	render() {
		const { children, attributes, name, title, icon } = this.props;

		return children({ attributes, name, title, icon });
	}
}

export default compose([
	withState({ can_update: true }),
	withSelect((select, { client_id }) => {
		const block = select("core/editor").getBlock(client_id);
		const name = get(block, "name");
		const block_type = select("core/blocks").getBlockType(name);

		return {
			attributes: get(block, "attributes"),
			name,
			title: get(block_type, "title"),
			icon: get(block_type, "icon.src")
		};
	})
])(BlockData);
