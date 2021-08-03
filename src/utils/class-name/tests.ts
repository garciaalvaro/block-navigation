import { className } from "./class-name";

test("className", () => {
	expect(className("aaa")).toBe("aaa");

	expect(className("aaa", "bbb")).toBe("aaa bbb");

	expect(className("aaa", null)).toBe("aaa");

	expect(className(null, "aaa")).toBe("aaa");

	expect(className(undefined, "aaa", "bbb")).toBe("aaa bbb");

	expect(className(undefined, null, "aaa")).toBe("aaa");

	expect(className("aaa", null, "bbb")).toBe("aaa bbb");

	expect(className({ aaa: true })).toBe("aaa");

	expect(className({ aaa: false, bbb: true })).toBe("bbb");

	expect(className({ aaa: true, bbb: false })).toBe("aaa");

	expect(className()).toBe("");
});
