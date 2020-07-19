import React, { FunctionComponent } from "react";
import { useSelect } from "@wordpress/data";
import { useRef, useState, useEffect, createContext } from "@wordpress/element";

import { DivRef } from "utils/components";
import { useWindowSize } from "utils/hooks";

export const ContextContainer = createContext<{
	container_ref: HTMLDivElement | null;
	container_height: number;
	container_width: number;
}>({ container_ref: null, container_height: 0, container_width: 0 });

export const AppContainer: FunctionComponent = props => {
	const view = useSelect(select =>
		select("melonpan/block-navigation").getView()
	);

	const [type, value] = useSelect(select =>
		select("melonpan/block-navigation").getColorScheme()
	).split("-");

	const moving_type = useSelect(select =>
		select("melonpan/block-navigation").getMovingType()
	);

	const is_moving = !!moving_type;

	const { window_height, window_width } = useWindowSize();
	const [height, setHeight] = useState(555);
	const [width, setWidth] = useState(555);

	const div_ref = useRef<HTMLDivElement | null>(null);
	const container_ref = useRef<HTMLElement | null>(null);
	const header_ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!div_ref.current) return;

		container_ref.current =
			div_ref.current.closest(".edit-post-editor-regions__sidebar") ||
			div_ref.current.closest(".block-editor-editor-skeleton__sidebar") ||
			div_ref.current.closest(".edit-post-sidebar");

		if (!container_ref.current) return;

		header_ref.current = container_ref.current.querySelector(
			".edit-post-sidebar-header"
		);
	}, []);

	useEffect(() => {
		if (!container_ref.current) return;

		container_ref.current.scrollTop = 0;
	}, [view]);

	useEffect(() => {
		if (!div_ref.current || !container_ref.current) return;

		const height =
			container_ref.current.offsetHeight -
			(header_ref.current?.offsetHeight || 0);

		setHeight(height);
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
				container_width: width,
			}}
		>
			<DivRef
				ref={div_ref}
				id="container"
				className={[
					`color_scheme-type-${type}`,
					`color_scheme-name-${value}`,
					`moving_type-${moving_type}`,
					`${is_moving ? "" : "no-"}moving`,
				]}
				style={{ height }}
			>
				{props.children}
			</DivRef>
		</ContextContainer.Provider>
	);
};
