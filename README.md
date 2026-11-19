# Expression Compiler

An expression compiler visualizer built with React and TypeScript for a university compiler course.

**Live demo:** [Open on Vercel](https://expression-compiler.vercel.app)

## Overview

Created for a university compiler course to show how mathematical input becomes tokens, an abstract syntax tree, and three-address code.

## Features

- Tokenize and validate identifiers, numbers, operators, parentheses, and root expressions.
- Parse expressions with precedence and associativity rules.
- Visualize the AST with react-d3-tree.
- Generate three-address code and test the compiler pipeline with Vitest.

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS, react-d3-tree, Vitest.

## Run locally

Use Node.js 22.12 or newer and npm.

```sh
git clone https://github.com/ThePrimeShak/expression-compiler.git
cd expression-compiler
npm ci
npm run dev
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build |
| `npm run test` | Run automated tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Apply ESLint fixes |
| `npm run format` | Format project files |
| `npm run format:check` | Check formatting |

## Project structure

- `src/features/compiler/core/` — tokenization, validation, parsing, and code generation.
- `src/features/compiler/components/` — compiler views and controls.
- `src/components/layout/` and `src/config/` — shared layout and configuration.

## Scope and limitations

An educational expression compiler with a limited grammar. It does not implement a separate semantic-analysis or optimization pass.

## Author

Built by [ThePrimeShak](https://github.com/ThePrimeShak) · [LinkedIn](https://www.linkedin.com/in/theprimeshak/).
