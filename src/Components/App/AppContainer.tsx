import { useSelect } from "@wordpress/data";
import { useRef, useState, useEffect, createContext } from "@wordpress/element";

import { DivRef } from "utils/Components";
import { store_slug } from "utils/data";
import { useWindowSize } from "utils/hooks";

export const ContextContainer = createContext<HTMLDivElement | null>(null);

export const AppContainer: React.ComponentType = props => {
	const view = useSelect<State["view"]>(select => select(store_slug).getView());
	const [type, value] = useSelect<State["color_scheme"]>(select =>
		select(store_slug).getColorScheme()
	).split("-");
	const is_moving = useSelect<boolean>(select => select(store_slug).isMoving());
	const moving_type = useSelect<State["moving_type"]>(select =>
		select(store_slug).getMovingType()
	);

	const { window_height } = useWindowSize();
	const [height, setHeight] = useState(555);

	const div_ref = useRef<HTMLDivElement>(null);
	const container_ref = useRef<HTMLElement | null>(null);
	const header_ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!div_ref.current) {
			return;
		}

		container_ref.current = (div_ref.current.closest(
			".edit-post-editor-regions__sidebar"
		) || div_ref.current.closest(".edit-post-sidebar")) as HTMLElement | null;

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
		<ContextContainer.Provider value={div_ref.current}>
			<DivRef
				ref={div_ref}
				id="container"
				className={[
					`color_scheme-type-${type}`,
					`color_scheme-name-${value}`,
					`moving_type-${moving_type}`,
					`${is_moving ? "" : "no-"}moving`
				]}
				style={{ height }}
			>
				{props.children}
			</DivRef>
		</ContextContainer.Provider>
	);
};
