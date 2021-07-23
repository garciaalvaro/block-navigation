export type ClassNameProps = (
	| string
	| false
	| null
	| undefined
	| Record<string, boolean>
)[];

export type Util = (...classNames: ClassNameProps) => string;
