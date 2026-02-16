Simple Calculator

A minimal web-based calculator built using HTML, CSS, and JavaScript, following clean architecture principles and separation of concerns.

This project focuses on structured code organization, predictable state management, and maintainable frontend practices.

⸻

🚀 Features
	•	Basic arithmetic operations
	•	Addition
	•	Subtraction
	•	Multiplication
	•	Division
	•	Floating point precision handling
	•	Chained operations support
	•	Clear (AC) and Delete (DE) functionality
	•	Expression history display
	•	Active operator indicator (top-right corner)
	•	Clean and responsive UI layout

⸻

🧠 Architecture Overview

The project is structured to maintain strict separation of responsibilities:

1. calculator.js

Handles:
	•	Calculator state
	•	Arithmetic logic
	•	State transitions
	•	Expression generation

Does NOT handle:
	•	DOM manipulation
	•	UI rendering

⸻

2. dom.js

Handles:
	•	Event listeners
	•	Button interaction
	•	Updating display elements
	•	Rendering state to UI

Does NOT handle:
	•	Arithmetic
	•	Business logic

⸻

3. utils.js

Contains pure helper functions:
	•	Number formatting
	•	Operator display formatting
	•	Safe number conversion
	•	Expression building

These functions are reusable and independent of state or DOM.

⸻

📁 Folder Structure

simple-calculator/
│
├── index.html
├── README.md
│
├── assets/
│   └── styles/
│       └── main.css
│
├── src/
│   └── js/
│       ├── calculator.js
│       ├── dom.js
│       └── utils.js
│
└── docs/
    ├── architecture.md
    ├── decisions.md
    └── future.md

⸻

🔄 Data Flow

User Action
→ DOM event listener
→ Calculator state update
→ DOM re-render

One-directional flow ensures predictable behavior.

⸻

🛠 Design Decisions
	•	Internal operators use standard arithmetic symbols (*, /)
	•	UI displays user-friendly symbols (×)
	•	Floating point errors are handled using controlled rounding
	•	State is stored explicitly:
	•	currentValue
	•	previousValue
	•	operator
	•	lastExpression

⸻

📌 Future Improvements
	•	Keyboard support
	•	Scientific operations
	•	Memory functions (M+, M-, MR)
	•	Theme toggle (dark/light mode)
	•	Better overflow handling for long numbers
	•	Unit testing for calculation logic

⸻

🎯 Learning Objectives

This project demonstrates:
	•	Separation of concerns
	•	State-driven UI rendering
	•	Utility abstraction
	•	Clean folder organization
	•	Structured frontend architecture

⸻

🧾 License

This project is open for learning and experimentation.