import { useKeyListener } from "./use-keylisteners.js";

describe("useKeyListener", () => {
    const handleEnter = jest.fn();
    const handleEscape = jest.fn();
    const handleSpace = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should use callbacks", () => {
        const input = document.createElement("input");
        document.body.append(input);

        const listeners = useKeyListener({
            target: input,
            event: "keyup",
            callbacks: {
              ["Enter"]: handleEnter,
              ["Escape"]: handleEscape,
              [" "]: handleSpace,
            },
        });

        listeners.connect();

        input.focus();
        input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
        expect(handleEnter).toHaveBeenCalled();
        input.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));
        expect(handleSpace).toHaveBeenCalled();
        input.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }));
        expect(handleEscape).toHaveBeenCalled();

        listeners.disconnect();
        input.focus();
        input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
        expect(handleEnter).toHaveBeenCalledTimes(1);
        input.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));
        expect(handleSpace).toHaveBeenCalledTimes(1);
        input.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }));
        expect(handleEscape).toHaveBeenCalledTimes(1);
    });
});