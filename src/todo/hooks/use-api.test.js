import { useApi } from "./use-api.js";
import { useStorage } from "./use-storage.js";
import { mixedTodos } from "../test/data.js";

describe("useApi", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should initialize with empty todos", () => {
        const storage = useStorage();
        const { getTodos } = useApi(storage);
        expect(getTodos().length).toEqual(0);
        storage.destroy();
    });

    it("should initialize with mixed todos", () => {
        const storage = useStorage();
        const { getTodos } = useApi(storage, [...mixedTodos]);
        expect(getTodos().length).toEqual(3);
        storage.destroy();
    });

    it("should add an item", () => {
        const storage = useStorage();
        const { getTodos, addItem } = useApi(storage);
        addItem("Clean Car");
        expect(getTodos().length).toEqual(1);
        storage.destroy();
    });
});