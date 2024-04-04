# SortBot
This project aims to complete the objectives spelled out by the [Thoughtful Technical Screen](https://thoughtfulautomation.notion.site/Technical-Screen-b61b6f6980714c198dc49b91dd23d695).

## Pre-Requisites
- NodeJS/NPM (v18+)

## Project Components

### `libs/sortbot-ts`
This is the TypeScript library used by the React sample application, including jest tests.

### `apps/sortbot`
React application that consumes sortbot-ts library on frontend.

## Getting started
This project uses the [nx build system](https://nx.dev/) for easy setup of multi-project repositories. The `npx` command can be used to run `nx` without requiring local CLI installation. Nx manages cross-project dependencies via the `pnpm` CLI command similar to `npm`.

### Building
```
pnpm install
npx nx build
```

Output:
```
[project root]/dist/
├── apps
│   └── sortbot
│       ├── assets
│       │   ├── index-DJHBqq-X.js
│       │   └── index-nG7Wy3Gc.css
│       ├── favicon.ico
│       └── index.html
└── libs
    └── sortbot-ts
        ├── package.json
        └── src
            ├── index.d.ts
            ├── index.js
            ├── index.js.map
            └── lib
                ├── SortbotLib.d.ts
                ├── SortbotLib.js
                └── SortbotLib.js.map
```

### Running

#### Sample React UI
```
npx nx serve sortbot
```
The React UI will be available at http://localhost:4200 or another port if not available. Populating values in the package attribute fields provides derived info and indication of which stack the package would belong to.

### Tests
```
npx nx run sortbot-lib:test
```
This will execute jest against the sortbot-lib test spec.


### Miscellany
```
npx nx graph
```
Displays a visual dependency graph in browser, in this case showing sortbot React project dependent on sortbot-lib.

## Technical Screen Objective Details

### Objective

Imagine you work in Thoughtful’s robotic automation factory, and your objective is to write a function for one of its robotic arms that will dispatch the packages to the correct stack according to their volume and mass.

### Rules

Sort the packages using the following criteria:

- A package is **bulky** if its volume (Width x Height x Length) is greater than or equal to 1,000,000 cm³ or when one of its dimensions is greater or equal to 150 cm.
- A package is **heavy** when its mass is greater or equal to 20 kg.

You must dispatch the packages in the following stacks:

- **STANDARD**: standard packages (those that are not bulky or heavy) can be handled normally.
- **SPECIAL**: packages that are either heavy or bulky can't be handled automatically.
- **REJECTED**: packages that are **both** heavy and bulky are rejected.

### Implementation

Implement the function **`sort(width, height, length, mass)`** (units are centimeters for the dimensions and kilogram for the mass). This function must return a string: the name of the stack where the package should go.

### Submission Guidance

1. **Time Management**: Allocate no more than 30 minutes to complete this challenge. 
2. **Programming Language**: You may use any programming language you're comfortable with. This is an opportunity to showcase your skills in a language you are proficient in.
3. **Submission Format**:
    - **Option 1**: Submit a public GitHub repository with clear README instructions.
    - **Option 2 (Preferred)**: Host your solution on an online IDE like [Repl.it](http://repl.it/) or CodePen for immediate code review. Ensure the link is accessible for direct execution.
4. **Evaluation Criteria**: Submissions will be assessed on:
    - Correct sorting logic.
    - Code quality.
    - Handling edge cases and inputs.
    - Test coverage.
