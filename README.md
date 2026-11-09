# sampaigedavis.com

Static website for Sam Paige Davis, hosted on GitHub Pages.

## What's in this folder

| Path | Page |
|---|---|
| `index.html` | Home |
| `classes/` | Classes |
| `complimentary-classes/` | Free Classes (keeps the old URL) |
| `workshops/` | Workshops (coming soon) |
| `writing/` | Writing |
| `about/` | About |
| `connect/` | Connect |
| `terms-and-conditions/`, `code-of-ethics/`, `privacy-policy/` | Legal pages (attorney text, do not edit) |
| `offerings/`, `yoga/`, `free-classes/` | Redirects from old URLs |
| `404.html` | Page not found |
| `assets/img/` | All images |
| `google-apps-script/Code.gs` | Script that saves Connect form messages to a Google Sheet (not used by the website itself) |
| `CNAME` | Tells GitHub Pages the custom domain (`www.sampaigedavis.com`) |

## Launch steps

### 1. Before you change anything: protect Sam's email
Log in to the domain registrar (GoDaddy, Namecheap, etc.) and open the DNS settings for sampaigedavis.com. Take a screenshot of every record. **Do not delete any MX or TXT records.** Those keep sam@sampaigedavis.com working.

### 2. Connect the contact form to a Google Sheet
Messages from the Connect form are saved as rows in a Google Sheet, and Sam gets an email for each one.

1. In Google Drive, create a new Google Sheet, e.g. "Website Contact Form". (Use the Google account that should own the messages.)
2. In the sheet, open **Extensions > Apps Script**. Delete the sample code, paste in everything from `google-apps-script/Code.gs`, and click **Save**.
3. Click **Deploy > New deployment**. Click the gear icon and choose **Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Click **Deploy**.
4. Google asks you to authorize. Choose your account, click **Advanced > Go to project (unsafe)** (this is normal for your own scripts), then **Allow**.
5. Copy the **Web app URL** (it ends in `/exec`). Open it in a browser to check it says the endpoint is running.
6. In `connect/index.html`, replace `YOUR_APPS_SCRIPT_URL` with that URL.

To stop the email notifications, set `NOTIFY_EMAIL` to `''` in the script. If you edit the script later, use **Deploy > Manage deployments > Edit > New version** so the same URL keeps working.

Until step 6 is done, the Connect form won't save anything.

### 3. Create the GitHub repository
1. Sign in at github.com and click **New repository**. Name it `sampaigedavis.com` (any name works). Set it to **Public**.
2. Click **uploading an existing file** and drag in **everything inside this folder** (not the folder itself), including `CNAME` and `.nojekyll`. Commit.
3. Go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. In the same Pages screen, the custom domain should show `www.sampaigedavis.com` (from the CNAME file). If not, type it in and save.

### 4. Point the domain to GitHub (at the registrar)
Change only these records. Leave MX and TXT records alone.

| Type | Host / Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `YOUR-GITHUB-USERNAME.github.io` |

Delete any old A or CNAME records for `@` and `www` that point to Squarespace. DNS can take from a few minutes up to 24 hours to update.

### 5. Turn on HTTPS
Back in **Settings > Pages**, once GitHub shows the domain check passed, tick **Enforce HTTPS**. (It can take up to an hour to become available.)

### 6. Check the live site
- Open each page from the menu and footer.
- Visit the old links: `/classes`, `/complimentary-classes`, `/about`, `/connect`, `/terms-and-conditions`, `/code-of-ethics`, `/privacy-policy`, plus `/offerings` and `/yoga` (should redirect to Classes).
- Play each video on Free Classes.
- Sign up for the newsletter in the footer with a test email and confirm it appears in Beehiiv.
- Send a test message through the Connect form and check it appears in the Google Sheet (and in Sam's inbox).
- Send a test email to sam@sampaigedavis.com to confirm email still works.

### 7. Then cancel Squarespace
Only after everything above checks out. If the domain itself is registered through Squarespace, transfer it first or keep that part of the plan.

## Making changes later
Edit a file on GitHub (pencil icon) and commit. The site updates within a minute or two.
