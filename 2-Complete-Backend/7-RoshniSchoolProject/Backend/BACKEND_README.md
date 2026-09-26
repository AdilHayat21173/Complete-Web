### Result System (`/api/results`) — admin + teacher
| Method | Path | Notes |
|---|---|---|
# Roshni Public School — Backend

Node/Express + MongoDB (auth) + Google Drive (Fee & Result Excel files).
Pure backend — no frontend in this project.

## What's in here

```
src/
├── app.js                          Express app, mounts all routes
├── db/db.js                        MongoDB connection (unchanged)
├── models/
│   └── user.model.js               role: "admin" | "teacher"
├── middlewares/
│   ├── auth.middleware.js          verifies JWT -> req.user = {id, role}
│   └── role.middleware.js          restrictTo("admin"), restrictTo("admin","teacher")
├── services/
│   ├── googleDrive.service.js      generic Drive file download/upload
│   ├── excelWorkbook.service.js    generic multi-sheet read/write (shared)
│   ├── fee.service.js              Fee System logic (one sheet tab per month)
│   └── result.service.js           Result System logic (one sheet tab per term)
├── controllers/
│   ├── auth.controller.js
│   ├── fee.controller.js
│   ├── result.controller.js
│   └── dashboard.controller.js
└── routes/
    ├── auth.routes.js
    ├── fee.routes.js               admin only
    ├── result.routes.js            admin + teacher
    └── dashboard.routes.js         admin only

scripts/createFirstAdmin.js         one-time: create/promote the first admin
server.js                           entry point (unchanged)
```

## Access model

| Role      | Dashboard | Fee System | Result System |
|-----------|:---------:|:----------:|:--------------:|
| **admin**   | ✅ | ✅ | ✅ (view + add/edit) |
| **teacher** | ❌ | ❌ | ✅ (view + add/edit) |

Every route except `/auth/register` and `/auth/login` requires a valid
JWT (sent as the `token` cookie set at login, or an
`Authorization: Bearer <token>` header). `restrictTo(...)` then checks
the role embedded in that token.

**Registration always creates a `teacher` account.** There's no way for
someone to register themselves as `admin` — that's intentional, so a
public sign-up form can't be used to grant admin access. To make the
first admin:

```bash
node scripts/createFirstAdmin.js owner@school.com somePassword "School Owner"
```

After that, admins can promote/demote anyone else via:
```
PATCH /auth/users/:id/role     { "role": "admin" }   (admin only)
GET   /auth/users                                     (admin only, lists everyone)
```

## Setup

### 1. Install dependencies
```bash
npm install
```
(Added `cors`, `googleapis`, `xlsx` on top of what you already had. Also
corrected `dotenv` in package.json from `^18.0.2` — that version doesn't
exist — to `^16.4.5`.)

### 2. Fill in `.env`
Copy `.env.example`, then merge in your existing Mongo/JWT values plus
the Google credentials from your other `.env` (Client ID, Secret,
refresh token — same three values work for both files since they
authenticate the Google account, not a specific file):

```
MONGO_URI=...
JWT_SECRET=...
CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...

GOOGLE_FEES_FILE_ID=...      # your existing Fee System Drive file
GOOGLE_RESULTS_FILE_ID=...   # the Result System Drive file
GOOGLE_FINANCE_FILE_ID=...   # the Finance workbook described below
GOOGLE_STUDENT_ROSTER_FILE_ID=1QO8My6Nz4WNmdLYIDgbLx8FCf0HqBUKd # student roster Sheet
```

## Finance workbook structure

Create a separate Excel workbook in Google Drive and put its file ID in
`GOOGLE_FINANCE_FILE_ID`. Use one sheet named `Finance` with this header row:

```text
S. No | Date | Month | Category | Description | Income | Expense | Net Profit | Notes
```

Use `Category` values such as `Fee Received`, `Teacher Salary`, `Building`,
`Utilities`, `Supplies`, and `Other`. `Net Profit` is calculated as
`Income - Expense`; fee receipts can be copied from the fee workbook while
salary and building costs are entered as expenses. Future monthly sheets can
use the same columns and names such as `September2026`.

### 3. Create the first admin
```bash
node scripts/createFirstAdmin.js you@school.com yourPassword "Your Name"
```

### 4. Run it
```bash
npm run dev    # or: npm start
```

## API reference

### Auth (`/auth`)
| Method | Path | Access | Notes |
|---|---|---|---|
| POST | `/auth/register` | public | always creates a `teacher` |
| POST | `/auth/login` | public | sets `token` cookie, also returns it in the body |
| POST | `/auth/logout` | public | clears the cookie |
| GET | `/auth/me` | logged in | current user, minus password |
| GET | `/auth/users` | admin | list everyone |
| PATCH | `/auth/users/:id/role` | admin | body: `{ "role": "admin" \| "teacher" }` |

### Fee System (`/api/fees`) — admin only
| Method | Path | Notes |
|---|---|---|
| GET | `/api/fees/records` | every row, all months combined |
| GET | `/api/fees/months` | sheet-tab names, for a month filter/dropdown |
| GET | `/api/fees/summary?month=August` | totals; omit `month` for all-time |
| GET | `/api/fees/recent-payments` | last 10 by date |
| POST | `/api/fees/payment` | body: `{ idNo, month, amount, date? }` |
| POST | `/api/fees/records` | add a new fee row; body: `{ idNo, name, father, class, month, monthlyFee, promotionFee, admissionFee, books, examFee, others }` |
| GET | `/api/fees/debug/sheets` | which tabs were found, row counts |

### Result System (`/api/results`) — admin + teacher
| Method | Path | Notes |
|---|---|---|
| GET | `/api/results/records` | all term and monthly result rows |
| GET | `/api/results/terms` | periods currently present in result rows |
| GET | `/api/results/classes` | unique class names read live from the student roster Sheet |
| GET | `/api/results/students?class=Nursery` | unique students in that class, read live from the student roster Sheet |
| GET | `/api/results/subjects?class=Nursery&examType=Term%20Result` | subjects with mark caps/components |
| GET | `/api/results/summary?examType=Monthly%20Test&month=January&class=Nursery` | pass/fail counts, average % |
| POST | `/api/results/record` | add-or-update a term or monthly result |
| GET | `/api/results/debug/sheets` | sheet names and row counts |

`POST /api/results/record` term body:
```json
{
  "idNo": "128",
  "name": "Sufwan Khan",
  "father": "Adnan Khan",
  "class": "Nursery",
  "examType": "Term Result",
  "term": "First Term",
  "marks": {
    "EnglishWritten": 40,
    "EnglishViva": 45,
    "UrduWritten": 42,
    "UrduViva": 44,
    "MathWritten": 48,
    "MathViva": 47,
    "Nazira": 45
  }
}
```
For a monthly result, send `"examType": "Monthly Test"` and a `month`
from January to December instead of `term`. Totals, percentage, grade,
and Pass/Fail are computed automatically. Upserts use ID, class, exam
type, and term/month.

### Dashboard (`/api/dashboard`) — admin only
| Method | Path | Notes |
|---|---|---|
| GET | `/api/dashboard/summary?month=August&term=Final Term&class=Class 7` | combined `{ fees, results }` object for the overview cards |

## Result Workbook

The workbook has exactly two result tabs: `Term Result` and `Monthly Test`.
Each row includes its class and selected term/month; columns for subjects
that do not apply to that class are stored as zero. Saving a result migrates
rows from older per-term/per-class tabs into these two tabs.

Each class has its own subject list, so a sheet tab can't mix classes
with different columns. Instead, **each sheet tab is one Term + Class
combination** — e.g. `"Final Term - 1st"`, `"Final Term - 6th"` — and
every row in that tab shares the same subject columns.

Current subject list, from `src/services/result.service.js`:

| Class | Subjects |
|---|---|
| Playgroup, Nursery, KG | English, Urdu, Math, Nazira |
| 1st, 2nd, 3rd | English, Urdu, Math, Islamiat, Wafqiyat, Nazira |
| 4th, 5th, 6th | English, Urdu, Math, Islamiat, Pak Study, Science |
| 7th–10th | **assumed** same as 6th — please confirm or correct |

Edit the `CLASS_SUBJECTS` object at the top of `result.service.js` to
change any of this — nothing else needs to change to add/remove a
subject or a class.

### Excel Columns and Marks

Both tabs start with `S. No | ID. No | Name of Student | Father name | Class`.
`Term Result` then has `Term`, English/Urdu/Math Written and Viva columns,
subject aggregate columns, all other term subjects, and computed totals.
Playgroup/Nursery/KG Written and Viva are each out of 50; English, Urdu, and Math
aggregate to 100. Other term subjects are out of 100 except Nazira (50).

`Monthly Test` has `Month`, English, Urdu, Math, Islamiat, Wafqiyat,
Pak Study, and Science columns. Applicable subjects are out of 50;
Nazira is excluded. The backend computes the total, percentage, grade,
and result columns. Term passing is 33%; monthly passing is 35%.

Term values are `First Term`, `Second Term`, `Third Term`, and `Final Term`.
Month values are January through December.

### Result System endpoints (updated)
| Method | Path | Notes |
|---|---|---|
| GET | `/api/results/classes` | the known class names |
| GET | `/api/results/subjects?class=1st&examType=Term%20Result` | subjects, caps, and components |
| GET | `/api/results/terms` | distinct saved terms and months |
| POST | `/api/results/record` | body requires class, exam type, and term/month |

`POST /api/results/record` body:
```json
{
  "idNo": "128",
  "name": "Sufwan Khan",
  "father": "Adnan Khan",
  "class": "1st",
  "examType": "Term Result",
  "term": "Final Term",
  "marks": {
    "English": 78,
    "Urdu": 65,
    "Math": 90,
    "Islamiat": 88,
    "Wafqiyat": 70,
    "Nazira": 95
  }
}
```
Marks outside the selected class/exam's subject list are ignored. Values
over the allowed subject maximum are rejected.

## Bugs fixed while wiring this up

- `src/models/User.Model.js` was renamed to `user.model.js` — the
  controller already `require`s it in lowercase, which only worked
  before because Windows filesystems ignore case. On a Linux server
  (most hosting), that mismatch would have crashed the app at startup.
- Login wasn't returning a `token` in the JSON body, only the cookie —
  added it, since a mobile app or a frontend on a different domain often
  can't rely on cookies alone.
