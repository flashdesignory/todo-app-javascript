import { useRouter } from "./use-router.js";

describe("useRouter", () => {
    const update = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should use callback on load", () => {
        const { initRouter, getRoute, disableRouter } = useRouter();

        initRouter(update);
        expect(update).toHaveBeenCalledTimes(0);

        document.location.hash = "home"
        window.dispatchEvent(new Event("load"));

        expect(update).toHaveBeenCalledTimes(1);
        expect(update).toHaveBeenCalledWith("#home");
        expect( getRoute()).toEqual("#home");

        disableRouter();
    });

    it("should use callback on hashchange", () => {
        const { initRouter, getRoute, disableRouter } = useRouter();

        initRouter(update);
        expect(update).toHaveBeenCalledTimes(0);

        document.location.hash = "work"
        window.dispatchEvent(new Event("hashchange"));

        expect(update).toHaveBeenCalledTimes(1);
        expect(update).toHaveBeenCalledWith("#work");
        expect( getRoute()).toEqual("#work");

        disableRouter();
    });
});