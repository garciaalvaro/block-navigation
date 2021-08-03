export type Util = (
	selectors: Record<string, (...args: unknown[]) => unknown>
) => void;
