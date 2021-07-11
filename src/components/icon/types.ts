import { FunctionComponent } from "react";

interface Props {
	icon:
		| "detach"
		| "close"
		| "remove"
		| "copy"
		| "log"
		| "edit"
		| "collapse"
		| "expand"
		| "menu"
		| "move";
}

export type Component = FunctionComponent<Props>;
