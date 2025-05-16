# JyoKit

[![npm version](https://img.shields.io/npm/v/jyokit)](https://www.npmjs.com/package/jyokit)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**JyoKit** is your all-in-one CLI to scaffold full-stack JavaScript project templates — for backend, frontend, and mobile.

### 🚀 Supported Templates:

- `next` → Next.js starter
- `express` → Express REST API server
- `expo` → Expo React Native app with Redux Persist

---

## 📦 Installation

```bash
npm install -g jyokit
# or via npx
npx jyokit --help
```

## 🔧 Usage

```bash
jyokit init <template> --name <project-name> [--output <destination>]
```

### Example

```bash
# Next.js app
jyokit init next --name my-frontend

# Express backend
jyokit init express --name my-backend --output server

# Expo mobile app
jyokit init expo --name my-app
```

## 📂 Folder Structure

Your generated project will be copied from internal /templates/<template> into:

```bash
<output>/<name>/
├── ...
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
MIT © Joachim “Jyok1m” Jasmin
