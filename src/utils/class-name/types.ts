export type ClassNameProps = (
	| string
	| null
	| undefined
	| Record<string, boolean>
)[];

export type ClassName = (...classNames: ClassNameProps) => string;
