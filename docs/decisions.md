# Design Decisions

This document explains key architectural and implementation choices made during development.

## 1. Separation of Concerns

**Decision:** Split code into three distinct files (calculator.js, dom.js, utils.js)

**Rationale:**
- Makes code easier to test in isolation
- Allows team members to work on different layers simultaneously
- Reduces cognitive load when debugging
- Follows single responsibility principle

**Trade-offs:**
- More files to manage
- Requires discipline to maintain boundaries
- Slightly more complex for very small projects

**Alternatives Considered:**
- Single file approach: Rejected due to poor maintainability
- Class-based architecture: Rejected as overkill for this scope

---

## 2. Internal vs Display Operators

**Decision:** Use standard operators internally (`*`, `/`) but display user-friendly symbols (`×`, `÷`)

**Rationale:**
- JavaScript's native operators work with `*` and `/`
- Users expect to see `×` and `÷` on calculators
- Separation allows logic to remain simple while UI stays intuitive

**Implementation:**
```javascript
// Internal
operator = "*"

// Display
displayOperator = operator === "*" ? "x" : operator
```

**Trade-offs:**
- Requires conversion logic in multiple places
- Could cause confusion if not documented

---

## 3. Floating Point Precision

**Decision:** Round results to 8 decimal places using `toFixed(8)`

**Rationale:**
- JavaScript floating point arithmetic has precision issues
- Example: `0.1 + 0.2 = 0.30000000000000004`
- 8 decimals provides sufficient precision for typical calculator use
- Removes trailing zeros automatically via `parseFloat()`

**Implementation:**
```javascript
function formatNumber(value) {
    return parseFloat(value.toFixed(8));
}
```

**Alternatives Considered:**
- Decimal.js library: Rejected as too heavy for this use case
- No rounding: Rejected due to poor UX
- 10 decimal places: Reduced to 8 for better display

---

## 4. State Management

**Decision:** Use module-level variables for state instead of objects or classes

**Rationale:**
- Simple and direct for small applications
- No need for getters/setters
- Easy to understand for beginners
- Sufficient for single calculator instance

**State Variables:**
```javascript
let currentValue = "";
let previousValue = "";
let operator = "";
let isNewInput = true;
let lastExpression = "";
```

**Trade-offs:**
- Global state can be harder to debug in larger apps
- No encapsulation
- Difficult to create multiple calculator instances

**When to Refactor:**
- If multiple calculators are needed on one page
- If state history/undo is required
- If state needs to persist across sessions

---

## 5. Expression History Display

**Decision:** Show the complete expression only after pressing equals

**Rationale:**
- Provides clear feedback on what was calculated
- Doesn't clutter the display during input
- Matches common calculator UX patterns

**Implementation:**
```javascript
lastExpression = buildExpression(previousValue, operator, currentValue);
historyElement.textContent = lastExpression;
```

---

## 6. Operator Indicator

**Decision:** Display active operator in top-right corner

**Rationale:**
- Provides visual feedback that an operator is pending
- Helps users track multi-step calculations
- Reduces errors from forgetting which operation is queued

**Implementation:**
```javascript
operatorElement.textContent = operator === "*" ? "X" : operator;
```

---

## 7. Delete vs Clear Functionality

**Decision:** Implement both AC (All Clear) and DE (Delete) buttons

**Rationale:**
- AC resets entire calculator state
- DE removes only the last digit
- Provides flexibility for error correction
- Matches physical calculator conventions

**Implementation:**
```javascript
// AC - Full reset
function handleClearInput() {
    currentValue = "";
    previousValue = "";
    operator = "";
    isNewInput = true;
    lastExpression = "";
}

// DE - Remove last digit
function handleDeleteInput() {
    if (currentValue.length == 1) {
        currentValue = "";
        isNewInput = true;
    } else {
        currentValue = currentValue.slice(0, -1);
    }
}
```

---

## 8. Division by Zero Handling

**Decision:** Display "Not Defined" instead of Infinity or throwing an error

**Rationale:**
- More user-friendly than JavaScript's `Infinity`
- Matches mathematical convention
- Prevents cascading errors in chained operations

**Implementation:**
```javascript
if (toNumber(currentValue) === 0) {
    result = "Not Defined";
}
```

**Alternatives Considered:**
- Show "Error": Less informative
- Show "∞": Technically correct but confusing for general users
- Prevent division button: Too restrictive

---

## 9. Data Attributes for Button Types

**Decision:** Use `data-type` and `data-value` attributes instead of classes or IDs

**Rationale:**
- Semantic and self-documenting
- Easy to query and filter
- Separates behavior from styling
- Scales well with additional button types

**Implementation:**
```html
<button data-value="7" data-type="digit" class="button">7</button>
<button data-value="+" data-type="operator" class="button operator">+</button>
```

---

## 10. Script Loading Order

**Decision:** Load scripts in order: utils.js → dom.js → calculator.js

**Rationale:**
- Ensures dependencies are available when needed
- utils.js has no dependencies
- dom.js needs DOM to be ready
- calculator.js uses utility functions

**Trade-offs:**
- Requires careful ordering
- Could use modules (ES6) for explicit dependencies

**Future Consideration:**
- Migrate to ES6 modules with explicit imports/exports

---

## 11. String-Based State

**Decision:** Store `currentValue` and `previousValue` as strings, not numbers

**Rationale:**
- Allows decimal point input without premature conversion
- Handles leading zeros naturally
- Easier to append digits
- Convert to numbers only when calculating

**Example:**
```javascript
// As string: "0.5" → user can type → "0.52"
// As number: 0.5 → harder to append "2"
```

---

## 12. No Keyboard Support (Yet)

**Decision:** Defer keyboard input to future version

**Rationale:**
- Keeps initial implementation focused
- Mouse/touch interaction is primary use case
- Keyboard support requires additional event handling and validation

**Documented in:** `docs/future.md`
