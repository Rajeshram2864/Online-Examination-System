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

3. Install dependencies
   npm install
   (or) pnpm install

4. Run dev server
   npm run dev
   Open: http://localhost:5173

5. Build for production
   npm run build

6. Preview the production build locally
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
<img width="789" height="838" alt="Screenshot 2025-08-28 234435" src="https://github.com/user-attachments/assets/a5118901-d8a3-4cb4-a572-76538c132e82" />

<img width="666" height="855" alt="Screenshot 2025-08-28 234449" src="https://github.com/user-attachments/assets/474d5219-fb1a-43dc-a263-f2b0165217bf" />
<img width="699" height="829" alt="Screenshot 2025-08-28 234500" src="https://github.com/user-attachments/assets/0f3a37a0-b21d-4bda-b00c-e5df21509d8b" />
<img width="628" height="701" alt="Screenshot 2025-08-28 234516" src="https://github.com/user-attachments/assets/035c930b-6b01-45fa-a159-87a60750a8cf" />

<img width="604" height="710" alt="Screenshot 2025-08-28 234616" src="https://github.com/user-attachments/assets/0bcac7e7-8959-479e-99bf-d00c4af0c681" />
![Uploading Screenshot 2025-08-28 234631.png…]()

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



