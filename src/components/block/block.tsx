import React from "react";
import { useContext } from "@wordpress/element";

import type { Component } from "./types";
import { context } from "./context";

export const Block: Component = props => {
	const { style } = props;

	const { id } = useContext(context);

	return <div style={style}>{id}</div>;
};
