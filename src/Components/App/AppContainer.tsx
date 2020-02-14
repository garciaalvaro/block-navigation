import { useSelect } from "@wordpress/data";
import { useRef, useState, useEffect, createContext } from "@wordpress/element";

import { DivRef } from "utils/Components";
import { store_slug } from "utils/data";
import { useWindowSize } from "utils/hooks";

export const ContextContainer = createContext<{
	container_ref: HTMLDivElement | null;
	container_height: number;
	container_width: number;
}>({ container_ref: null, container_height: 0, container_width: 0 });

export const AppContainer: React.ComponentType = props => {
	const view = useSelect<State["view"]>(select =>
		select(store_slug).getView()
	);

	const [type, value] = useSelect<State["color_scheme"]>(select =>
		select(store_slug).getColorScheme()
	).split("-");

	const moving_type = useSelect<State["moving_type"]>(select =>
		select(store_slug).getMovingType()
	);

	const is_moving = !!moving_type;

	const { window_height, window_width } = useWindowSize();
	const [height, setHeight] = useState(555);
	const [width, setWidth] = useState(555);

	const div_ref = useRef<HTMLDivElement>(null);
	const container_ref = useRef<HTMLElement | null>(null);
	const header_ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!div_ref.current) {
			return;
		}

		container_ref.current = (div_ref.current.closest(
			".edit-post-editor-regions__sidebar"
		) ||
			div_ref.current.closest(".block-editor-editor-skeleton__sidebar") ||
			div_ref.current.closest(
				".edit-post-sidebar"
			)) as HTMLElement | null;

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
		if (!div_ref.current || !container_ref.current) return;

		setHeight(
			container_ref.current.offsetHeight -
				(header_ref.current ? header_ref.current.offsetHeight : 0)
		);
	}, [window_height]);

	useEffect(() => {
		if (!container_ref.current) return;

		setWidth(container_ref.current?.offsetWidth || 0);
	}, [window_width]);

	return (
		<ContextContainer.Provider
			value={{
				container_ref: div_ref.current,
				container_height: height,
				container_width: width
			}}
		>
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
