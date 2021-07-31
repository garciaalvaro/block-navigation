import React from "react";
import type { FunctionComponent } from "react";

import { useToggle } from "@/utils";

import { context } from "./context";

export const ContextProvider: FunctionComponent = props => {
	const { children } = props;

	const {
		toggle: toggleMenu,
		close: closeMenu,
		is_open: menu_is_open,
	} = useToggle(false);

	return (
		<context.Provider
			value={{
				toggleMenu,
				closeMenu,
				menu_is_open,
			}}
		>
			{children}
		</context.Provider>
	);
};
