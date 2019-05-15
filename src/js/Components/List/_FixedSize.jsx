import l, { pr_store } from "utils";
import DivForwardRef from "../Utils/_HtmlForwardRef";

const { debounce } = lodash;
const { compose, withGlobalEvents, withState } = wp.compose;
const { Component, createRef } = wp.element;
const { withSelect } = wp.data;

class FixedSize extends Component {
	constructor(props) {
		super(props);

		this.ref = createRef();
	}

	componentDidMount = () => {
		this.calculateSize();
	};

	componentDidUpdate = prevProps => {
		const { move_type } = this.props;

		if (
			(move_type === "by_click" && prevProps.move_type !== "by_click") ||
			(move_type !== "by_click" && prevProps.move_type === "by_click")
		) {
			this.calculateSize();
		}
	};

	calculateSize = () => {
		if (this.ref.current === null) {
			return;
		}
		const $listcontainer = jQuery(this.ref.current);
		const $edit_post_sidebar = $listcontainer.closest(".edit-post-sidebar");
		const $edit_post_sidebar_header = $edit_post_sidebar.children(
			".edit-post-sidebar-header:visible"
		);
		const $edit_post_sidebar_header_small = $edit_post_sidebar.children(
			".edit-post-sidebar-header__small:visible"
		);
		const height =
			$edit_post_sidebar.outerHeight() -
			$edit_post_sidebar_header.outerHeight() -
			$edit_post_sidebar_header_small.outerHeight() -
			(this.props.move_type === "by_click" ? 50 : 0) -
			50; // Toggle panels
		const width = $edit_post_sidebar.outerWidth();

		this.props.setState({ height: height, width: width });
	};

	handleResize = debounce(this.calculateSize, 200, {
		leading: false,
		trailing: true
	});

	render() {
		const { children, height } = this.props;

		return <DivForwardRef ref={this.ref}>{children(height)}</DivForwardRef>;
	}
}

export default compose([
	withSelect(select => {
		const { getMoveType } = select(pr_store);

		return {
			move_type: getMoveType()
		};
	}),
	withState({
		height: 500,
		width: 614
	}),
	withGlobalEvents({
		resize: "handleResize"
	})
])(FixedSize);
