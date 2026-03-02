# Architecture Documentation

## Overview

This calculator follows a clean architecture pattern with strict separation of concerns. The codebase is divided into three distinct layers, each with specific responsibilities.

## Core Principles

1. **Separation of Concerns**: Each module has a single, well-defined responsibility
2. **Unidirectional Data Flow**: User actions → State updates → UI rendering
3. **Pure Functions**: Utility functions have no side effects
4. **State-Driven UI**: The display always reflects the current state

## Module Breakdown

### 1. calculator.js (State & Logic Layer)

**Responsibilities:**
- Maintain calculator state
- Execute arithmetic operations
- Handle state transitions
- Manage calculation flow

**State Variables:**
```javascript
currentValue   // The number currently being entered or displayed
previousValue  // The first operand in a binary operation
operator       // The current arithmetic operator (+, -, *, /)
isNewInput     // Flag indicating if next digit starts a new number
lastExpression // The complete expression shown after pressing =
```

**Core Functions:**
- `inputDigit(digit)` - Appends digits to current value
- `inputOperator(newOperator)` - Stores operator and prepares for next operand
- `handleEqualInput()` - Performs calculation and updates state
- `handleClearInput()` - Resets all state to initial values
- `handleDeleteInput()` - Removes last digit from current value

**Does NOT:**
- Access or manipulate DOM elements
- Handle user events
- Render UI

---

### 2. dom.js (Presentation Layer)

**Responsibilities:**
- Capture user interactions
- Delegate actions to calculator functions
- Update display elements based on state

**DOM References:**
```javascript
buttons          // All calculator buttons
historyElement   // Expression display area
resultElement    // Current value display
operatorElement  // Active operator indicator
```

**Event Flow:**
1. User clicks button
2. Extract `data-value` and `data-type` attributes
3. Call appropriate calculator function
4. Update display elements

**Does NOT:**
- Perform calculations
- Store state
- Contain business logic

---

### 3. utils.js (Utility Layer)

**Responsibilities:**
- Provide reusable helper functions
- Handle data transformations
- Format values for display

**Functions:**

#### `formatNumber(value)`
Handles floating-point precision issues by rounding to 8 decimal places.

**Example:**
```javascript
0.1 + 0.2 = 0.30000000000000004
formatNumber(0.30000000000000004) = 0.3
```

#### `buildExpression(previous, operator, current)`
Constructs human-readable expression strings for display.

**Example:**
```javascript
buildExpression("5", "*", "6") → "5 x 6"
```

#### `toNumber(value)`
Safely converts string values to numbers for arithmetic operations.

**Example:**
```javascript
toNumber("42") → 42
```

**Does NOT:**
- Access global state
- Manipulate DOM
- Have side effects

---

## Data Flow Diagram

```
User Click
    ↓
DOM Event Listener (dom.js)
    ↓
Calculator Function (calculator.js)
    ↓
State Update
    ↓
Display Update (dom.js)
```

## State Transitions

### Digit Input
```
State: currentValue = "5"
Action: inputDigit("3")
Result: currentValue = "53"
```

### Operator Input
```
State: currentValue = "10"
Action: inputOperator("+")
Result: 
  previousValue = "10"
  operator = "+"
  isNewInput = true
```

### Calculation
```
State: 
  previousValue = "10"
  operator = "+"
  currentValue = "5"
Action: handleEqualInput()
Result:
  currentValue = "15"
  lastExpression = "10 + 5"
  previousValue = ""
  operator = ""
```

## File Loading Order

The HTML loads scripts in this specific order:

1. `utils.js` - Pure functions (no dependencies)
2. `dom.js` - DOM references (no dependencies)
3. `calculator.js` - State and logic (uses utils functions)

This ensures all dependencies are available when needed.

## Design Patterns

### Module Pattern
Each file acts as a module with specific exports (functions) and internal state.

### Observer Pattern
DOM elements observe state changes and update accordingly.

### Strategy Pattern
Different button types trigger different calculation strategies.

## Error Handling

### Division by Zero
```
javascript
if (toNumber(currentValue) === 0) {
    result = "Not Defined";
}
```

### Invalid Operations
The switch statement in `handleEqualInput()` returns early if no operator is set.

## Scalability Considerations

The architecture supports future enhancements:
- Additional operators can be added to the switch statement
- New utility functions can be added without affecting other modules
- UI changes require only dom.js modifications
- State management can be upgraded to a more sophisticated system
