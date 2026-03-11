# Migrations

## 001_create_pharmacy_user_on_auth_signup.sql

**Purpose:** When a user signs up (including with email verification), Nhost inserts into `auth.users`. This trigger automatically creates the `users` and `pharmacy_users` rows using the pharmacy form data stored in `options.metadata` during sign-up.

**Flow:**
1. User submits sign-up form → `nhost.auth.signUp()` is called with `options.metadata.pharmacy`
2. Nhost creates auth user and stores metadata
3. Trigger fires on `auth.users` INSERT → reads metadata → inserts `users` → inserts `pharmacy_users`

**Requirements:**
- `pharmacy_users` table must have columns: `district_id`, `basetown_id`, `gender`, `cnic`, `phone`, `phone2`, `dob` (in addition to base columns). If not, add them or edit the migration.
- Nhost stores metadata in `auth.users.metadata` or `raw_user_meta_data` — the migration tries both.

**How to run:**
- Nhost Dashboard → Database → SQL Editor, paste and run the migration
- Or use Nhost CLI migrations if configured
