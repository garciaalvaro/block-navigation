import React from "react";
import type { FunctionComponent } from "react";
import { useMemo } from "@wordpress/element";

import { useToggle } from "@/utils";

import { context } from "./context";

export const ContextProvider: FunctionComponent = props => {
	const { children } = props;

	const {
		toggle: toggleMenu,
		close: closeMenu,
		is_open: menu_is_open,
	} = useToggle(false);

	const value = useMemo(
		() => ({
			toggleMenu,
			closeMenu,
			menu_is_open,
		}),
		[toggleMenu, closeMenu, menu_is_open]
	);

	return <context.Provider value={value}>{children}</context.Provider>;
};
