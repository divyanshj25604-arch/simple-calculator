/**
 * Formats a numeric value to avoid floating point precision issues.
 *
 * JavaScript arithmetic can produce long decimal results
 * (e.g., 0.1 + 0.2 = 0.30000000000000004).
 *
 * This function:
 * 1. Rounds the number to 10 decimal places
 * 2. Converts it back to a float to remove trailing zeros
 *
 * @param {number} value - The numeric result to format
 * @returns {number} - A cleaned numeric value with controlled precision
 */
function formatNumber(value) {
    value = parseFloat(value.toFixed(8));
    return value;
};

/**
 * Builds a human-readable mathematical expression string
 * for display in the calculator history area.
 *
 * This function separates internal logic symbols from UI symbols.
 * For example:
 *  - Internal operator "*" is converted to display symbol "x"
 *
 * This ensures:
 *  - Business logic remains consistent
 *  - UI representation remains user-friendly
 *
 * @param {string} previous - The first operand
 * @param {string} operator - The arithmetic operator used internally
 * @param {string} current - The second operand
 * @returns {string} - A formatted expression string (e.g., "5 x 6")
 */
function buildExpression(previous, operator, current) {
    let displayOperator = operator;

    if (operator === "*") {
        displayOperator = "x";
    }

    let expression = previous + " " + displayOperator + " " + current;
    return expression;
};

/**
 * Safely converts a value into a numeric type.
 *
 * This ensures arithmetic operations are performed on numbers
 * instead of strings.
 *
 * Example:
 *  "5" → 5
 *
 * @param {string|number} value - The value to convert
 * @returns {number} - Numeric representation of the input
 */
function toNumber(value) {
    value = Number(value);
    return value;
};

