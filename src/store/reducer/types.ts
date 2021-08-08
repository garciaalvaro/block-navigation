import type { Action } from "../actions";
import type { State } from "../state";

export type Reducer = (state: State | undefined, action: Action) => State;
