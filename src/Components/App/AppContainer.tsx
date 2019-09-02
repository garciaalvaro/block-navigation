import { DivRef } from "utils/Components";
import { store_slug } from "utils/data";
import { useWindowSize } from "utils/hooks";

interface WithSelectProps
	extends Pick<State, "view" | "moving_type" | "color_scheme"> {
	moving: boolean;
}

interface OwnProps {
	children: React.ReactNode;
}

const { useRef, useState, useEffect } = wp.element;
const { withSelect } = wp.data;

export const AppContainer: React.ComponentType<OwnProps> = withSelect<
	WithSelectProps,
	OwnProps
>(select => ({
	view: select(store_slug).getView(),
	color_scheme: select(store_slug).getColorScheme(),
	moving: select(store_slug).isMoving(),
	moving_type: select(store_slug).getMovingType()
}))(props => {
	const { children, moving, moving_type, color_scheme, view } = props;
	const [type, value] = color_scheme.split("-");
	const classes = [
		`color_scheme-type-${type}`,
		`color_scheme-name-${value}`,
		`moving_type-${moving_type}`,
		`${moving ? "" : "no-"}moving`
	];
	const { window_height } = useWindowSize();
	const div_ref = useRef<HTMLDivElement>(null);
	const container_ref = useRef<HTMLElement | null>(null);
	const header_ref = useRef<HTMLElement | null>(null);
	const [height, setHeight] = useState(555);

	useEffect(() => {
		if (!div_ref.current) {
			return;
		}

		container_ref.current = div_ref.current.closest(
			".edit-post-sidebar"
		) as HTMLElement | null;

		if (container_ref.current) {
			header_ref.current = container_ref.current.querySelector(
				".edit-post-sidebar-header"
			);
		}
	}, []);

	useEffect(() => {
		if (!container_ref.current) {
			return;
		}

		container_ref.current.scrollTop = 0;
	}, [view]);

	useEffect(() => {
		if (!div_ref.current || !container_ref.current) {
			return;
		}

		setHeight(
			container_ref.current.offsetHeight -
				(header_ref.current ? header_ref.current.offsetHeight : 0)
		);
	}, [window_height]);

	return (
		<DivRef ref={div_ref} id="container" className={classes} style={{ height }}>
			{children}
		</DivRef>
	);
});
