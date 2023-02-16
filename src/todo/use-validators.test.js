import { expect } from "chai";
import { useValidators } from "./use-validators.js";

describe("useValidators", function () {
  const { hasValidMin } = useValidators();

  describe("hasValidMin", function () {
    it("should pass with valid input", function () {
      expect(hasValidMin("hello", 2)).to.be.true;
    });

    it("should fail with invalid input", function () {
      expect(hasValidMin("hi", 4)).to.be.false;
    });
  });

  
});
