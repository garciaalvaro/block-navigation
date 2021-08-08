import type { FunctionComponent, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
	align?: "left" | "right";
	reverse_direction?: boolean;
}

export type Component = FunctionComponent<Props>;
