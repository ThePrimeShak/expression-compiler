
# Expression Compiler

This project is a simple expression compiler built for a university compiler course. It demonstrates the main stages of compilation for mathematical expressions:

- **Lexical Analysis**: Tokenizes the input string (identifiers, numbers, operators, parentheses, functions).
- **Parsing**: Builds an Abstract Syntax Tree (AST) from the token stream.
- **AST Visualization**: Shows the parse tree using a graphical tree view.
- **Code Generation**: Produces three-address code (TAC) from the AST.

## Features

- Input and validate math expressions (supports variables, numbers, +, -, *, /, ^, parentheses, and `sqrt` function).
- See the token list, transformed expression, parse tree, and generated TAC.
- Compiler logic is isolated from the React interface and covered by unit tests.
- Visualizes the parse tree using `react-d3-tree`.
- Styled with Tailwind CSS.

## Main Packages Used

- [React](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS framework
- [react-d3-tree](https://github.com/bkrem/react-d3-tree) — parse tree visualization

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` — start the local development server.
- `npm run build` — type-check and create a production build.
- `npm test` — run the compiler unit tests once.
- `npm run test:watch` — run tests in watch mode.
- `npm run lint` — check the codebase with ESLint.
- `npm run format` — format the source with Prettier.

## Project Structure

```text
src/
├── components/layout/        # Shared application shell
├── config/                   # Site-wide links and configuration
├── features/compiler/
│   ├── components/           # Compiler-specific React UI
│   ├── core/                 # Lexer, parser, validation, AST adapter, TAC
│   ├── constants.ts          # Example expressions
│   └── types.ts              # Tokens, AST, tree, and result types
├── pages/                    # Route-level pages
├── App.tsx                   # Routes and application layout
└── main.tsx                  # React entry point
```

The compiler pipeline is exposed through
`src/features/compiler/core/analyze-expression.ts`. Keeping that orchestration
outside React makes the domain logic easier to test and reuse.

---

This project is for educational purposes and demonstrates the basic steps of compiling and visualizing simple math expressions in a web app.
