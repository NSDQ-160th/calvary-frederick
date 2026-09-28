# Editing the church website

This is the guide for the office. You change words, times, and the bulletin from a form. You do not need to write code.

The form is called Keystatic. It saves into the same files the website is built from.

Sermon video, the church app, and online giving stay in **Subsplash**, the same as today. This form does not replace those.

## Before you start

- Use the shared GitHub login.
- Only one person should be signed in at a time. Sign out when you are done.
- The website people see does not change when you click Save. It changes only after the preview is checked and the update is merged.

## Open the form

1. Go to the admin address you were given. On this computer, during setup, that is [http://127.0.0.1:4321/keystatic](http://127.0.0.1:4321/keystatic).
2. Choose **Login with GitHub**.
3. You should see **Calvary Chapel Frederick** and the words **Hello, NSDQ-160th**.

If the page asks you to create an app again, stop and ask Aaron. The app is already created.

## Do not save on main

Look at **Current branch** near the top.

If it says **main**, you are on the live copy. You may open pages and read them. Do not click **Save**.

## Start this week’s copy

1. Click **New branch**.
2. If the box already shows `content/`, type `this-week` only.
3. If the box is empty, type `content/this-week`.
4. The branch name should read `content/this-week`.

Everything you save after that stays on that copy until someone merges it.

## Change this week’s message

1. Open **Church details**.
2. Under **This week’s message**, change **Message title**. Change **Series** and **Image path** only when the series actually changed.
3. Check the title. It should be the real sermon title, not a guess.
4. Click **Save**.

Times use 24-hour clock. `19:00` is 7:00 PM. `09:00` is 9:00 AM.

## Change a ministry page

1. Open **Ministry pages**.
2. Choose the page, such as Women or Students.
3. Edit the lead, the paragraphs, or the facts.
4. Leave **Page address** alone. That is the public link.
5. Words like `{{sunday}}` and `{{email}}` fill in from Church details. You can leave them in the sentence.
6. Click **Save**.

## A new bulletin

The bulletin box is a path, not an upload button. The file name has to stay exact, including `-pdf`.

Example: `/files/Bulletin-08-16-26-pdf.pdf`

1. Ask Aaron to put the PDF in the site’s files folder with that exact name.
2. In **Church details**, under **Bulletin**, set **PDF path** to that name.
3. Click **Save**.

## See the page before it goes live

1. Go back to the **Dashboard**.
2. Choose **Create pull request**. That opens GitHub.
3. Wait a minute or two. Vercel posts a preview link on that request.
4. Open the link. Click Home, Visit, and the bulletin. This is the real site with your words, at a private address.
5. If something is wrong, return to the form on the same branch, fix it, and save again. The preview updates.
6. When it looks right, tell Aaron. Merging that request is what publishes the site.

## Leave these alone

- Sermon video and audio. Upload those in Subsplash.
- Online giving and the church app. Those stay in Subsplash.
- Wallet numbers, media IDs, and podcast numbers. They are not on this form.
- Page addresses.
- The boxes **Show Israel 2027** and **Show VBS**. Leave them off until the church gives real dates.
- Colors, layout, and new pages. Ask Aaron.

## If you get stuck

Sign out with the control at the bottom left. Tell Aaron what you were changing and which branch you were on. Do not start a second copy of the same week.
