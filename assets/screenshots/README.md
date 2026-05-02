# Screenshots To Take

Put the screenshots for the PDF report in this folder.

## Console

- [ ] `01-console-message-logging.png`
  - Click the log buttons: Info, Warning, Error, Table, Group, and Custom.

- [ ] `02-browser-messages.png`
  - Click Cause 404, Cause TypeError, and Cause Violation.

- [ ] `03-filter-log-level.png`
  - Use the Console level filter to show only warnings or errors.

- [ ] `04-filter-text-regex.png`
  - Try filtering with `PET-ERROR`.
  - Also try `/^\[PET/`.

- [ ] `05-filter-source-user.png`
  - Show filtering by `script.js` or user messages.

## Sources

- [ ] `06-sources-ui.png`
  - Open `script.js` in the Sources tab.

- [ ] `07-breakpoint-scope.png`
  - Put a breakpoint in `runBuggyAddition`.
  - Use 5 and 1, then click Buggy Add.
  - Screenshot the Scope pane while paused.

- [ ] `08-watch-expression-console.png`
  - Add watch expression: `typeof sum`.
  - Open the Console drawer and try: `Number(addend1) + Number(addend2)`.

- [ ] `09-apply-fix.png`
  - Click Fixed Add and show `5 + 1 = 6`.

## PDF

After screenshots are done:

1. Open `assets/devtools-implementation-report.html` in Chrome.
2. Add or check the screenshots in the report.
3. Press `Command + P`.
4. Save as `assets/devtools-implementation-report.pdf`.
