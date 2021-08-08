import { getPrevId } from "./get-prev-id";

const ids = ["a", "b", "c", "d"];

test("getPrevId returns the previous id", () => {
	expect(getPrevId("b", ids)).toBe("a");
	expect(getPrevId("d", ids)).toBe("c");
});

test("getPrevId returns null if there is no previous id", () => {
	expect(getPrevId("a", ids)).toBe(null);
});

test("getPrevId returns null if the id doesn't exists in ids", () => {
	expect(getPrevId("z", ids)).toBe(null);
});
