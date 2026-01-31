# Playwright Test Project

## Description
A comprehensive end-to-end testing suite built with Playwright for automated browser testing.

## Features
- Cross-browser testing (Chromium, Firefox, WebKit)
- Parallel test execution
- Screenshots and video recording on failures
- HTML test reports

## Prerequisites
- Node.js 18+ 
- npm or yarn

## Installation

### Clone the Repository
```bash
git clone https://github.com/senuriNiwarthana/Playwright-Tesr.git
cd Playwright-Test
```

### Install Dependencies
```bash
npm install
```

### Install Playwright Browsers
```bash
npx playwright install
```

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Tests in UI Mode
```bash
npx playwright test --ui
```

### Run Specific Test File
```bash
npx playwright test tests/example.spec.ts
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

## Project Structure
```
├── tests/              # Test files
├── playwright.config.ts # Playwright configuration
├── package.json        # Project dependencies
└── README.md          # This file
```

## Configuration
Edit `playwright.config.ts` to customize test settings, browsers, timeouts, and reporters.

## License
MIT
