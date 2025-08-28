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
<img width="677" height="823" alt="Screenshot 2025-08-28 234631" src="https://github.com/user-attachments/assets/32f40c84-b471-4707-9979-89703e241a44" />
<img width="604" height="710" alt="Screenshot 2025-08-28 234616" src="https://github.com/user-attachments/assets/b675ea5f-d3a9-49ee-8415-0c1620a96c92" />
<img width="628" height="701" alt="Screenshot 2025-08-28 234516" src="https://github.com/user-attachments/assets/6e91c1d2-5e5d-425f-b2e8-22b89332fd26" />
<img width="699" height="829" alt="Screenshot 2025-08-28 234500" src="https://github.com/user-attachments/assets/2a5aced9-0e73-45f0-b1fd-29ebfee3a3a5" />
<img width="666" height="855" alt="Screenshot 2025-08-28 234449" src="https://github.com/user-attachments/assets/6562e70b-1e5d-4e2d-aa02-b2a1a468e48b" />
<img width="789" height="838" alt="Screenshot 2025-08-28 234435" src="https://github.com/user-attachments/assets/0c82ca34-1ab5-47fb-a435-e3b00c238c85" />

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
