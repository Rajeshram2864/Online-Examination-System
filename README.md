# Online-Examination-System
Online Examination System (ExamPro)
==================================

Short description
-----------------
A lightweight React + TypeScript frontend for creating, managing and taking exams.
Built with Vite and Tailwind CSS. UI components live under src/components.

Repository
----------
https://github.com/Rajeshram2864/Online-Examination-System.git

Prerequisites
-------------
- Node.js 16+ (install from https://nodejs.org/)
- npm (bundled with Node) or pnpm

Quick setup (Windows)
---------------------
1. Clone repository
   git clone https://github.com/Rajeshram2864/Online-Examination-System.git
   cd Online-Examination-System

2. Install dependencies
   npm install
   (or) pnpm install

3. Run dev server
   npm run dev
   Open: http://localhost:5173

4. Build for production
   npm run build

5. Preview the production build locally
   npm run preview

Key scripts (package.json)
--------------------------
- dev: starts Vite dev server
- build: produce production build
- preview: preview production build locally
- lint: run linter (if configured)

Important files & folders
-------------------------
- src/                 - React + TypeScript source
- src/components/      - UI components (Layout, QuestionBank, Results, ExamInterface)
- src/hooks/useExamStore.ts - app state and seeded data
- vite.config.ts       - Vite configuration (port, aliases)
- tsconfig.json        - TypeScript config
- public/              - static assets (put screenshots here or in screenshots/)

Notes
-----
- The project uses path alias @ -> src (see tsconfig.json and vite.config.ts).
- Default sample data and questions are seeded in src/hooks/useExamStore.ts. Edit there to change defaults.
- If the UI height jumps when switching pages, adjust the main content min-height in src/components/Layout.tsx (header height may be h-16 = 4rem).

Screenshots
-----------
Place screenshot files in a screenshots/ folder at the repo root (or public/screenshots/) and reference them from the README.

Suggested filenames:
- screenshots/result-modal.png
- screenshots/take-exam.png
- screenshots/edit-question-modal.png
- screenshots/question-bank.png
- screenshots/dashboard.png
- screenshots/results-page.png

Embed in README.md (example)
-----------------------------

<img width="666" height="855" alt="Screenshot 2025-08-28 234449" src="https://github.com/user-attachments/assets/ae5dd83f-d3d0-4c08-b6be-f61cc16d44d5" />
<img width="789" height="838" alt="Screenshot 2025-08-28 234435" src="https://github.com/user-attachments/assets/6a37cd9d-cc3a-457a-a8d4-691dc75bc453" />
<img width="677" height="823" alt="Screenshot 2025-08-28 234631" src="https://github.com/user-attachments/assets/68fe7f7c-bcde-4611-94cf-122c50d2c69b" />
<img width="604" height="710" alt="Screenshot 2025-08-28 234616" src="https://github.com/user-attachments/assets/8bd2065f-b65e-4ba5-bdb9-cdbe31205177" />
<img width="628" height="701" alt="Screenshot 2025-08-28 234516" src="https://github.com/user-attachments/assets/8e9b7da4-a335-4a20-82cb-d3405e961f5e" />
<img width="699" height="829" alt="Screenshot 2025-08-28 234500" src="https://github.com/user-attachments/assets/3cd85e16-3a2d-4c96-958b-d411b6667409" />


Troubleshooting
---------------
- Port already in use: stop other dev servers or change Vite port in vite.config.ts.
- Type errors: ensure Node and TypeScript versions match project expectations.
- Missing assets: confirm screenshots are added under screenshots/ or public/ and paths match.

Contributing
------------
Open issues or PRs. Keep changes small and follow existing component/style conventions.

License
-------
No license provided in repo. Add LICENSE if you plan to publish.

Contact / Author
----------------

Use GitHub issues on the repository

