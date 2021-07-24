import React from "react";
import type { FunctionComponent } from "react";

import { context } from "./context";
import { useToggle } from "@/utils";

export const ContextProvider: FunctionComponent = props => {
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
			{props.children}
		</context.Provider>
	);
};
