import { expect } from "chai";
import { useValidators } from "./use-validators.js";

describe("useValidators", function () {
  const { 
    hasValidName, 
    hasValidEmail, 
    hasValidMin,
    hasValidMax,
    hasValidRange,
    hasValidRequired
  } = useValidators();

  describe("hasValidName", function() {
    it("should pass with valid input", function() {
      expect(hasValidName("test")).to.be.true;
    });

    it("should fail with invalid input", function() {
      expect(hasValidName("*$(")).to.be.false;
    });
  });

  describe("hasValidEmail", function() {
    it("should pass with valid input", function() {
      expect(hasValidEmail("test@test.com")).to.be.true;
    });

    it("should fail with invalid input", function() {
      expect(hasValidEmail("@test.com")).to.be.false;
    });

    it("should fail with invalid input", function() {
      expect(hasValidEmail("test.com")).to.be.false;
    });

    it("should fail with invalid input", function() {
      expect(hasValidEmail("test@")).to.be.false;
    });
  });

  describe("hasValidMin", function () {
    it("should pass with valid input", function () {
      expect(hasValidMin("hello", 2)).to.be.true;
    });

    it("should fail with invalid input", function () {
      expect(hasValidMin("hi", 4)).to.be.false;
    });
  });

  describe("hasValidMax", function () {
    it("should pass with valid input", function () {
      expect(hasValidMax("hello", 10)).to.be.true;
    });

    it("should fail with invalid input", function () {
      expect(hasValidMax("hello", 4)).to.be.false;
    });
  });

  describe("hasValidRange", function () {
    it("should pass with valid input", function () {
      expect(hasValidRange("hello", 2, 10)).to.be.true;
    });

    it("should fail with invalid input", function () {
      expect(hasValidRange("hi", 4, 10)).to.be.false;
    });

    it("should fail with invalid input", function () {
      expect(hasValidRange("hello", 2, 4)).to.be.false;
    });
  });

  describe("hasValidRequired", function () {
    it("should pass with valid input", function () {
      expect(hasValidRequired(true)).to.be.true;
    });

    it("should pass with valid input", function () {
      expect(hasValidRequired("test")).to.be.true;
    });

    it("should fail with invalid input", function () {
      expect(hasValidRequired(false)).to.be.false;
    });

    it("should fail with invalid input", function () {
      expect(hasValidRequired("")).to.be.false;
    });
  });
});
