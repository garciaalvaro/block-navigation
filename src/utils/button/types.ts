import type { FunctionComponent, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	button_type?: "icon" | "text";
}

export type Component = FunctionComponent<Props>;
