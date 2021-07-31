import type { Util as ClassName, ClassNameProps } from "../class-name";

export type Util = (
	dependencies: unknown[],
	...classNames: ClassNameProps
) => ReturnType<ClassName>;
