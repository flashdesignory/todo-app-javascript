import { useDoubleClick } from "./use-doubleclick.js";

describe("useDoubleClick", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("should call callback", () => {
        const callback = jest.fn();

        const callMe = useDoubleClick(callback, 500);

        callMe();
        jest.advanceTimersByTime(50);
        expect(callback).toHaveBeenCalledTimes(0);

        callMe();
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should not call callback", () => {
        const callback = jest.fn();

        const callMe = useDoubleClick(callback, 500);

        callMe();
        jest.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(0);

        callMe();
        expect(callback).toHaveBeenCalledTimes(0);
    });
});