/**
 * Collection of helper methods to validate strings.
 *
 * @returns Methods to interact with useValidators.
 */
export const useValidators = () => {
  const EMAIL_REGEXP =
    /* eslint-disable-next-line no-useless-escape */
    /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/;
  const ALPHA_NUMBERIC_REGEXP = /^[a-zA-Z0-9]+$/;

  /**
   * Checks for valid alpha-numeric input.
   *
   * @param {string} value
   * @returns Validity of input value.
   */
  const hasValidName = (value) => {
    return ALPHA_NUMBERIC_REGEXP.test(value);
  };

  /**
   * Checks for valid email input.
   *
   * @param {string} value
   * @returns Validity of input value.
   */
  const hasValidEmail = (value) => {
    return EMAIL_REGEXP.test(value);
  };

  /**
   * Checks for min length of input.
   *
   * @param {string} value
   * @returns Validity of input value.
   */
  const hasValidMin = (value, min) => {
    return value.length >= min;
  };

  /**
   * Checks for max length of input.
   *
   * @param {string} value
   * @returns Validity of input value.
   */
  const hasValidMax = (value, max) => {
    return value.length <= max;
  };

  /**
   * Checks for range of input.
   *
   * @param {string} value
   * @returns Validity of input value.
   */
  const hasValidRange = (value, min, max) => {
    return value.length >= min && value.length <= max;
  };

  /**
   * Checks for boolean input or input length.
   *
   * @param {string} value
   * @returns Validity of input value.
   */
  const hasValidRequired = (value) => {
    switch (typeof value) {
      case "boolean":
        return value === true;
      default:
        return value.length > 0;
    }
  };

  return {
    hasValidName,
    hasValidEmail,
    hasValidMin,
    hasValidMax,
    hasValidRange,
    hasValidRequired,
  };
};
