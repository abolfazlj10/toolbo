# Toolbo Success Roadmap and Implementation Spec

## Purpose

This document is the implementation-ready product roadmap for making Toolbo a more useful, trusted, and frequently used Persian online toolbox.

The next implementation chat should be able to read this file and execute a selected phase, especially Phase 1, without needing the original brainstorming context.

## Roadmap Maintenance Rule

This file is the single source of truth for Toolbo product direction.

After any product, UI, UX, tool, data, navigation, content, or technical capability is added, removed, or meaningfully changed, this file must be updated in the same work session.

Updates should record:

- What changed.
- Why it changed.
- Which user or product problem it solves.
- What remains incomplete.
- Which phase or backlog priority is affected.

Keep the document written in English. Persian user-facing labels, examples, aliases, and tool names may appear only when they are actual product data or implementation examples.

## Product Vision

Toolbo should become the fastest and most trustworthy Persian toolbox for everyday calculations, conversions, date/time tasks, finance helpers, legal/administrative utilities, text tools, and technology tools.

The product should not win only by having many tools. It should win because each tool:

- Gives a clear answer quickly.
- Explains the result enough to build user trust.
- Lets users copy, share, save, print, or reuse the result.
- Suggests the next useful action.
- Works well in Persian, RTL, mobile, and desktop contexts.
- Has reliable metadata, update dates, and sources where the calculation depends on external rules or rates.

## Current Baseline

Based on the current codebase:

- Framework: Next.js App Router.
- UI stack: React, Tailwind CSS, shadcn/ui primitives, lucide-react icons.
- Data source: `src/data/db.json`.
- Tool registry helpers: `src/lib/tool-data.ts`.
- Tool implementations: mostly centralized in `src/components/tool-runner.tsx`.
- Current number of tools: 50.
- Current categories: 9.
- Current strengths:
  - Persian RTL experience exists.
  - Global search exists.
  - Favorites exist through local storage.
  - Dark mode exists.
  - Recent tools exist through local storage.
  - Result actions exist for several result surfaces.
  - Result history exists for selected repeat-use tools.
  - Tool metadata exists as a TypeScript sidecar for selected tools.
  - Related tools exist inside tool pages.
  - Many basic calculators already work.
- Current gaps:
  - Many results are still basic text or small result grids.
  - Result actions are present but not yet consistently applied to every useful output.
  - Result history is present but not yet standardized across all repeat-use tools.
  - Search supports aliases and keywords for selected tools, but typo tolerance and synonym coverage are still limited.
  - Source/update metadata exists only for selected tools and is not yet mandatory for rule-based tools.
  - Conversion coverage has improved, but conversion discovery and mobile ergonomics still need polish.
  - Tool pages do not consistently explain formulas, examples, edge cases, or limitations.
  - Legal/administrative Iranian tools are missing.
  - Technology/content tools are limited.
  - No analytics/event strategy is defined.

## UI/UX Improvements

This section captures the product-design audit for the current Toolbo experience. It should be updated whenever UI, UX, navigation, information architecture, visual design, accessibility, or content presentation changes.

### Design Goal

Toolbo should feel like a fast, practical Persian utility product, not a marketing landing page.

The interface should help users:

- Find the right tool quickly.
- Understand what each tool does before opening it.
- Enter data with confidence.
- See the result clearly.
- Copy, share, save, print, or reuse the result.
- Trust the calculation through formulas, sources, update dates, and limitation notes.

### Current UI/UX Problems

#### Information Architecture and Navigation

- The primary navigation still behaves like a desktop hover menu. It needs a touch-first mobile pattern with explicit open, close, focus trap, escape, and outside-click behavior.
- Category navigation shows all categories at the same visual priority. High-frequency categories such as time, finance, numbers, and conversions should be easier to reach.
- Header actions compete with each other: categories, recent tools, favorites, utility anchors, theme toggle, and external personal links all appear in the same area.
- The homepage anchor links for useful and recommended tools are weak navigation destinations because they do not represent core user intent.
- External recommendation links are mixed with first-party Toolbo utilities. They should be visually separated so users do not confuse them with internal tools.

#### Homepage

- The homepage starts with useful modules, but the hierarchy still feels like a catalog grid instead of an intent-driven toolbox.
- Category cards show count and title, but not the most useful tools inside each category.
- Recommended tools are external products and should not compete visually with Toolbo's own tool catalog.
- Recent tools are useful, but the empty and low-data states need clearer copy and a stronger next action.
- The daily dashboard is promising, but it needs tighter information density and clearer prioritization on small screens.

#### Category Pages

- Category pages are currently mostly a grid of tool cards. They need a category header, short description, and search/filter/sort affordance.
- Tool cards do not expose enough decision-making information. Users see a title and subtitle, but not whether a tool is popular, new, recently used, trusted, or supports history/actions.
- The card hover effect is visually strong, but hover-only affordances are weak for touch devices.
- Category ordering should be intentional: high-use tools first, secondary tools after, experimental tools clearly marked.

#### Tool Pages

- Tool pages use a two-column layout with a narrow sidebar. On desktop, the sidebar content can feel cramped; on mobile, it should become a clearer section below the primary tool.
- The favorite explanation card is too verbose for a repeated utility action. Favorite should be a compact action near the tool title.
- Breadcrumbs are useful but visually heavy inside the title block. They should support orientation without competing with the tool itself.
- Related tools are shown, but they are category-neighbor related rather than always intent-related. Metadata-defined related tools should be preferred.
- Explainer blocks are valuable, but they should stay below the task flow and be visually quieter than the form and result.

#### Forms and Inputs

- Numeric inputs use text inputs for Persian/English digit support, but they need stronger validation, examples, and inline error messages.
- Form errors often appear as result text instead of field-level guidance. Users should know which field needs correction.
- The primary action button is repeated across tools, but its visual style is heavy and should be standardized through the component system.
- Some tools calculate on submit, while conversions calculate live. This is acceptable, but each tool should make the interaction model obvious.
- Inputs need consistent placeholder style, help text, unit labels, and support for Persian and English digits.

#### Results, History, and Actions

- Result boxes are functional, but the most important result should be visually dominant.
- Result grids need better hierarchy for primary value, secondary values, warnings, and metadata.
- Copy/share/print/download actions exist, but they must be consistently available on every meaningful result.
- Table outputs such as loan schedules need export formats that match the content, such as `.csv` for tabular data and `.txt` for summaries.
- Result history should clearly explain that it is local to the browser and should avoid sensitive data by default.
- Empty, invalid, and loading states should be designed as states, not only strings inside result boxes.

#### Search

- Search results should group categories, tools, and external recommendations more clearly.
- Search should support synonyms, aliases, Persian/Arabic variants, Persian and English digits, and common English terms.
- No-result states should suggest alternative searches or popular tools.
- Search result ranking should be based on intent, not only string inclusion.
- The search panel needs robust keyboard support: arrow navigation, enter to open, escape to close, and focus return.

#### Visual Design System

- The current palette is dominated by blue, dark navy, and gray. It needs a more deliberate design-token system with semantic roles for primary, success, warning, danger, neutral, info, and surface states.
- Dark mode exists, but contrast and hierarchy should be audited per component instead of relying on direct dark equivalents.
- Shadows, glass effects, gradients, and hover fills are inconsistent across cards, nav, results, and dashboards.
- Border radius should be standardized. Repeated utility cards and controls should stay compact and professional.
- Typography uses a single Persian font heavily. Headings, labels, helper text, numbers, and technical English values need clearer type roles.
- Mobile font sizes become too small in several breakpoints. Touch-first readability should be protected before fitting more content.

#### Layout and Responsiveness

- The CSS contains many narrow breakpoint overrides. This creates maintenance risk and should be simplified into fewer responsive patterns.
- Tool grids, category grids, dashboard panels, result grids, and sidebars should use shared responsive rules.
- Mobile navigation should not rely on desktop menu positioning.
- Fixed or near-fixed widths should be replaced with fluid constraints where possible.
- Every primary viewport must be checked for horizontal overflow at `390px`, `768px`, `1024px`, and `1440px`.

#### Accessibility and RTL/LTR

- Existing improvements include skip link, accessible labels on several icon actions, `aria-live` result containers, and reduced-motion support.
- Remaining work should focus on consistency: every interactive icon must have an accessible name, every input must have a programmatic label, and every menu must support keyboard and touch interaction.
- Focus states should be visible across header, cards, forms, menus, result actions, and footer.
- English technical values such as `IP`, `URL`, `JSON`, `UTC`, units, and filenames should render in LTR-safe contexts inside RTL layouts.
- Decorative icons should be hidden from assistive technologies.
- Heading hierarchy should be audited so each page has one clear primary heading and section headings follow logical order.

#### Trust and Content

- Rule-based or externally dependent tools must not ship without status, last-updated date, source, and limitation notes.
- Stable formula-based tools should show formula or method when it improves trust.
- Medical, legal, finance, and administrative tools need stronger limitation copy than simple calculators.
- Tool subtitles should be rewritten to be useful, precise, and consistent. Some current copy is too vague or informal.

### Phase 1A: UI/UX Quality Pass

Phase 1A should run before adding more high-risk or rule-dependent tools.

Goal:

Fix the highest-impact experience issues that affect discovery, mobile usability, accessibility, and trust.

P0 work:

- Replace the desktop-first hover navigation with a mobile-safe menu pattern.
- Standardize focus states and keyboard behavior for search, menus, cards, forms, and result actions.
- Remove stale accessibility notes and keep this roadmap aligned with the current implementation.
- Make result action availability consistent for all meaningful results.
- Audit mobile layouts for overflow and unreadably small text.
- Separate internal Toolbo tools from external recommended projects.
- Make favorite and recent-tool actions compact, understandable, and less repetitive.

P1 work:

- Add category headers, descriptions, and intent-based sorting.
- Improve tool cards with useful metadata such as popular, new, recent, trusted, or supports history.
- Standardize result hierarchy with primary value, secondary values, warnings, and actions.
- Improve empty states for search, favorites, recent tools, history, and category pages.
- Create shared visual tokens for colors, shadows, surfaces, borders, radii, and typography.
- Rewrite key UI copy for clarity, consistency, and professional Persian product tone.

P2 work:

- Add analytics-informed popular tools after privacy and provider decisions are made.
- Add lightweight feedback prompts to identify confusing tools.
- Add SEO and FAQ content only after the primary tool experience is strong.
- Consider a broader visual refresh after the utility workflow is stable.

### UI/UX Acceptance Criteria

- Users can reach any primary category on mobile without hover.
- Users can search, move through results, open a result, and close search with keyboard only.
- Every result that can be reused has copy; important results also have share, print, or download.
- No primary page has horizontal overflow at `390px`.
- Text inside buttons, cards, and result boxes does not overlap or truncate awkwardly.
- Form errors identify the specific field and do not appear only as generic result text.
- The most important result value is visually obvious.
- Dark mode preserves contrast, hierarchy, and focus visibility.
- Internal tools and external links are visually distinct.
- Tool pages show trust metadata whenever the tool depends on a source, date, external API, law, rate, or medical/finance interpretation.

## Competitor and Pattern Insights

### Kitset

Kitset is the closest direct Persian competitor.

Observed strengths to borrow:

- Larger catalog, roughly around 100 tools across more categories.
- Stronger category coverage:
  - Legal tools.
  - Women/pregnancy tools.
  - Exam and score tools.
  - Barcode and QR tools.
  - More conversion tools.
- Tool pages feel more complete because they include related tools, comments, and visible user/team interaction.
- Some tools support richer output actions, such as QR code generation with size/color/download controls.
- The site gives a stronger sense that tools are actively maintained.

How Toolbo should respond:

- Do not simply duplicate the catalog.
- Add the highest-value categories first.
- Make each important tool more useful than Kitset by adding better result actions, source metadata, examples, and better mobile ergonomics.

### Bahesab

Bahesab is strong in everyday Persian utilities.

Observed strengths to borrow:

- Everyday tools are grouped naturally:
  - Calendar.
  - Date conversion.
  - Prayer times.
  - World time.
  - Deposit/loan calculators.
  - Unit conversion.
- Map-related utilities are highly practical:
  - Distance between cities.
  - Route planning.
  - Area measurement.
  - Perimeter measurement.
  - Coordinates and elevation.

How Toolbo should respond:

- Make daily-use tools easier to discover from the homepage.
- Add "daily utilities" as a product concept, not only as individual tools.
- Consider map tools in a later phase, but do not start with them because they require external APIs, map UI, and accuracy decisions.

### Time.ir

Time.ir is focused and habit-forming.

Observed strengths to borrow:

- Calendar, today, events, prayer times, and date conversion are immediately useful.
- It gives users a reason to return daily.
- It focuses on date/time information density.

How Toolbo should respond:

- Make the date/time section feel like a daily dashboard.
- Add official holidays, important events, working-day calculations, and date arithmetic.

### Omni Calculator

Omni Calculator is a global benchmark for calculator depth.

Observed strengths to borrow:

- Very large, deeply segmented calculator catalog.
- Each tool is framed as a specific user problem.
- Tools often include explanation, examples, and related formulas.
- The product is built around intent, not only categories.

How Toolbo should respond:

- Split generic tools into scenario-based helpers where it helps user intent.
- Add use-case examples to important tools.
- Build a data model that can support many future tools without turning `tool-runner.tsx` into an unmaintainable file.

### Calculator.net

Calculator.net is a benchmark for result usefulness.

Observed strengths to borrow:

- Results are rich, not only a number.
- Finance tools often include tables, summaries, charts, and printable outputs.
- Health tools include interpretation, ranges, and context.

How Toolbo should respond:

- Make important results structured and reusable.
- Add amortization tables for loan calculators.
- Add interpretation bands for BMI and health tools.
- Add print/share/download actions.

### UnitConverters.net and RapidTables

These are benchmarks for conversion and utility tools.

Observed strengths to borrow:

- Many conversion categories.
- Quick conversion patterns.
- Common conversion presets.
- Tables of equivalent values.
- Developer/text tools are simple but very practical.

How Toolbo should respond:

- Expand conversions early.
- Add batch-friendly and copy-friendly outputs.
- Add common conversion presets below conversion forms.

## Strategic Product Principles

1. Utility first.
   - The first screen should help users reach tools quickly.
   - Avoid marketing-first screens.

2. Trust every calculation.
   - For static formulas, show the formula.
   - For rule-based tools, show source and last-updated date.
   - For uncertain or jurisdiction-dependent tools, include a clear limitation note.

3. Make results portable.
   - Every result should support copy.
   - Important results should support share, print, and download.
   - Repeat-use tools should support local history.

4. Keep Persian UX excellent.
   - Use clear Persian labels.
   - Support Persian and English digits where possible.
   - Preserve RTL layout.
   - Put technical English identifiers in LTR-safe contexts when shown in UI.

5. Build a scalable tool system.
   - Avoid making every new tool a one-off block inside one giant component.
   - Add metadata and shared result components.
   - Prefer reusable definitions for calculators/converters when possible.

6. Improve discovery.
   - Search should understand aliases.
   - Categories should show the most useful tools first.
   - Tool pages should suggest related and next-step tools.

## Roadmap Overview

### Phase 1: Utility Foundation and Conversion Expansion

Goal:

Make Toolbo immediately more useful by improving result actions, adding recent/history behavior, expanding unit conversions, improving search metadata, and making existing important tools feel more complete.

Why this phase first:

- It improves almost every existing tool.
- It creates reusable primitives for later phases.
- It reduces the gap with Kitset and conversion-focused sites quickly.
- It avoids legal/rate-sensitive features before the trust/source system exists.

### Phase 2: Iranian Legal, Administrative, and Finance Tools

Goal:

Add high-intent tools that Persian users search for frequently and that competitors use as utility anchors.

Candidate tools:

- Dowry value calculator.
- Blood money calculator.
- Court fee calculator.
- Notary fee calculator.
- Attorney fee estimate.
- Property commission calculator.
- Car transfer cost calculator.
- Salary tax calculator.
- Insurance contribution calculator.
- Severance calculator.
- Year-end bonus calculator.
- Unemployment insurance estimate.

Important requirement:

Phase 2 must include source metadata, update dates, and visible limitation notes. Do not ship rule-dependent calculators without maintainability and source fields.

### Phase 3: Daily Dashboard and Habit Tools

Goal:

Make Toolbo useful even when the user does not have a specific calculator in mind.

Candidate features:

- Today dashboard.
- Official holidays.
- Events and occasions.
- Prayer times improvements.
- Working-day calculator.
- Add/subtract days from a date.
- World clock.
- Time zone difference.
- Countdown to important dates.
- Recently used tools on homepage.

### Phase 4: Technology, Text, and Content Utilities

Goal:

Grow practical usage among developers, students, marketers, admins, and content creators.

Candidate tools:

- QR code generator.
- Barcode generator.
- URL encoder/decoder.
- Base64 encoder/decoder.
- JSON formatter/validator.
- Hash generator.
- UUID generator.
- Color converter.
- Markdown preview.
- Regex tester.
- Case converter improvements.
- Whitespace cleaner.
- Duplicate line remover.
- Persian/Arabic character normalizer.

### Phase 5: UX, SEO, Analytics, and Growth

Goal:

Turn the improved utility into measurable growth.

Candidate features:

- Tool-specific SEO content blocks.
- FAQ sections.
- Structured data for tool pages.
- Analytics events.
- Popular tools ranking.
- Feedback prompts.
- Bug report flow.
- Lightweight comments or reactions.
- Shareable result URLs.
- PWA support.

## Phase 1 Detailed Implementation Spec

### Phase 1 Scope

Phase 1 should deliver these capabilities:

1. Unified result actions.
2. Recent tools.
3. Result history for selected repeat-use tools.
4. Expanded conversion categories.
5. Better conversion UX.
6. Tool metadata foundation.
7. Improved search aliases.
8. Enhanced important existing tools.
9. Basic trust/explanation blocks.

### Phase 1 Non-Goals

Do not include these in Phase 1:

- Legal calculators that depend on current laws/rates.
- External map APIs.
- User accounts.
- Server-side persistence.
- Comments system.
- Full analytics integration unless the project already has analytics configured.
- Major visual redesign.
- Homepage redesign beyond small utility additions.

### Phase 1 Files Likely To Change

Likely files:

- `src/data/db.json`
- `src/lib/tool-data.ts`
- `src/lib/unit-conversions.ts`
- `src/lib/tool-utils.ts`
- `src/components/tool-runner.tsx`
- `src/components/site-shell.tsx`
- `src/components/home-page.tsx`
- `src/components/tool-card.tsx`
- `src/components/favorites-provider.tsx`
- `src/app/globals.css`

Potential new files:

- `src/components/result-actions.tsx`
- `src/components/recent-tools-provider.tsx`
- `src/components/tool-explainer.tsx`
- `src/components/tool-history.tsx`
- `src/lib/tool-metadata.ts`
- `src/lib/search-utils.ts`
- `src/lib/result-format.ts`

If the implementation becomes large, split `tool-runner.tsx` by tool family:

- `src/tools/conversions.tsx`
- `src/tools/time-tools.tsx`
- `src/tools/finance-tools.tsx`
- `src/tools/text-tools.tsx`
- `src/tools/technology-tools.tsx`

Do this only if it reduces complexity without causing a broad unrelated refactor.

### Phase 1 Data Model Additions

Add optional metadata to each tool record or create a sidecar metadata map keyed by tool URL.

Recommended metadata fields:

```ts
type ToolMetadata = {
  url: string;
  title: string;
  aliases?: string[];
  keywords?: string[];
  priority?: number;
  status?: "stable" | "beta" | "needs-review";
  sourceLabel?: string;
  sourceUrl?: string;
  lastUpdated?: string;
  formula?: string;
  examples?: ToolExample[];
  limitations?: string[];
  resultActions?: ResultAction[];
};

type ToolExample = {
  label: string;
  input: Record<string, string>;
  expectedOutputSummary: string;
};

type ResultAction = "copy" | "share" | "print" | "download";
```

Recommended approach:

- Keep `src/data/db.json` simple if editing JSON becomes noisy.
- Add `src/lib/tool-metadata.ts` as a TypeScript sidecar map.
- Use metadata in search, tool pages, and explainer blocks.

### Phase 1 Search Improvements

Current search checks exact inclusion in title/subtitle.

Implement:

- Search by title.
- Search by subtitle.
- Search by category title.
- Search by aliases.
- Search by keywords.
- Normalize Persian/Arabic variants.
- Normalize Persian and English digits.
- Trim repeated whitespace.
- Rank exact title matches first.
- Rank alias matches second.
- Rank subtitle/keyword matches after that.

Suggested aliases:

```ts
{
  "/time/mathAge": ["سن", "تولد", "محاسبه تولد", "age"],
  "/time/convertor": ["تبدیل تاریخ", "شمسی به میلادی", "میلادی به شمسی", "jalali", "gregorian"],
  "/time/religious": ["اذان", "نماز", "اوقات شرعی", "prayer"],
  "/fiscal/loanInterest": ["وام", "قسط", "سود وام", "loan"],
  "/fiscal/Interest": ["سپرده", "سود بانکی", "deposit"],
  "/numbers/percent": ["درصد", "percentage", "percent"],
  "/technology/password-random": ["پسورد", "رمز", "password"],
  "/technology/MyIP": ["آی پی", "ip", "my ip"],
  "/text/counter-word": ["تعداد کلمات", "شمارنده کلمات", "word count"]
}
```

Acceptance criteria:

- Searching `وام` shows loan tools.
- Searching `قسط` shows loan/market installment tools.
- Searching `اذان` shows prayer times.
- Searching `تولد` shows age calculator.
- Searching `ip` shows IP tool.
- Searching `پسورد` and `password` both show password generator.

### Phase 1 Unified Result Actions

Create a reusable result action component.

Minimum actions:

- Copy result.
- Share result if `navigator.share` is available.
- Print current tool result.
- Download result as `.txt` for text/table results.

Component idea:

```tsx
<ResultActions
  title={tool.title}
  text={resultText}
  filenameSlug={tool.slug}
  canPrint
  canDownload
/>
```

Implementation details:

- Convert structured result lines to readable plain text.
- For table-like outputs, include line breaks.
- Use `navigator.clipboard.writeText`.
- Use `navigator.share` only when available.
- Use a blob download for `.txt`.
- For print, either call `window.print()` with print CSS or open a small print-friendly view.
- Keep actions visually small and icon-based using lucide-react:
  - Copy.
  - Share2.
  - Printer.
  - Download.
- Add accessible labels and tooltips/titles.

Acceptance criteria:

- All calculator results have a copy action.
- Conversion results have copy and share actions.
- Password and text tools keep their existing copy behavior but use the shared action where possible.
- Download produces a readable text file.
- No browser error occurs if Web Share API is unavailable.

### Phase 1 Recent Tools

Add a recent tools provider using local storage.

Behavior:

- When a user opens a tool page, add it to recent tools.
- Store up to 8 recent tools.
- Deduplicate by URL.
- Most recent appears first.
- Show recent tools on homepage and/or in the navigation/favorites dropdown area.

Suggested storage key:

```ts
toolbo:recent-tools
```

Acceptance criteria:

- Opening a tool adds it to recent tools.
- Revisiting a tool moves it to the top.
- Recent tools survive refresh.
- Empty state does not create visual clutter.
- Recent tools do not replace favorites.

### Phase 1 Result History

Add local result history only for selected tools where repeat lookup is useful.

Good Phase 1 candidates:

- Date conversion.
- Age calculation.
- Loan calculator.
- Percent calculator.
- Unit conversions.
- Text counter.
- Password generator.

Behavior:

- Store last 5 results per tool.
- Let users copy a previous result.
- Let users clear history for the current tool.
- Do not store sensitive data by default for password generation unless user explicitly saves it.

Suggested storage key pattern:

```ts
toolbo:history:${tool.url}
```

Acceptance criteria:

- Result history appears after at least one calculation.
- History is per tool, not global.
- Clear history works.
- Passwords are not automatically saved without explicit user action.

### Phase 1 Expanded Conversion Categories

Current conversion groups:

- Weight.
- Length.
- Temperature.
- Speed.
- Time.

Add these conversion groups:

1. Area.
2. Volume.
3. Digital storage.
4. Data transfer rate.
5. Energy.
6. Power.
7. Pressure.
8. Angle.
9. Frequency.
10. Electric current.
11. Voltage.
12. Torque.
13. Number base.

Add routes in `src/data/db.json` under the conversions category.

Recommended URLs:

```text
/conversions/convert-area
/conversions/convert-volume
/conversions/convert-digital-storage
/conversions/convert-data-transfer
/conversions/convert-energy
/conversions/convert-power
/conversions/convert-pressure
/conversions/convert-angle
/conversions/convert-frequency
/conversions/convert-electric-current
/conversions/convert-voltage
/conversions/convert-torque
/conversions/convert-number-base
```

Recommended Persian titles:

```text
تبدیل مساحت
تبدیل حجم
تبدیل حجم داده
تبدیل سرعت انتقال داده
تبدیل انرژی
تبدیل توان
تبدیل فشار
تبدیل زاویه
تبدیل فرکانس
تبدیل جریان الکتریکی
تبدیل ولتاژ
تبدیل گشتاور
تبدیل مبنای عدد
```

Recommended unit groups:

Area:

- Square millimeter.
- Square centimeter.
- Square meter.
- Square kilometer.
- Hectare.
- Acre.
- Square inch.
- Square foot.
- Square yard.
- Square mile.

Volume:

- Milliliter.
- Liter.
- Cubic centimeter.
- Cubic meter.
- Cubic inch.
- Cubic foot.
- US gallon.
- UK gallon.

Digital storage:

- Bit.
- Byte.
- Kilobyte.
- Megabyte.
- Gigabyte.
- Terabyte.
- Kibibyte.
- Mebibyte.
- Gibibyte.
- Tebibyte.

Data transfer:

- bps.
- Kbps.
- Mbps.
- Gbps.
- B/s.
- KB/s.
- MB/s.
- GB/s.

Energy:

- Joule.
- Kilojoule.
- Calorie.
- Kilocalorie.
- Watt-hour.
- Kilowatt-hour.
- Electronvolt.
  
Power:

- Watt.
- Kilowatt.
- Horsepower.
  
Pressure:

- Pascal.
- Kilopascal.
- Bar.
- Atmosphere.
- PSI.
- Torr.
  
Angle:

- Degree.
- Radian.
- Gradian.
  
Frequency:

- Hertz.
- Kilohertz.
- Megahertz.
- Gigahertz.
  
Electric current:

- Ampere.
- Milliampere.
- Microampere.
  
Voltage:

- Volt.
- Millivolt.
- Kilovolt.
  
Torque:

- Newton meter.
- Kilonewton meter.
- Pound-foot.
- Pound-inch.

Number base:

- Binary.
- Octal.
- Decimal.
- Hexadecimal.

Implementation notes:

- For most conversions, the existing linear conversion helper is enough.
- Temperature remains special because it has offset formulas.
- Number base is not linear and should use custom parsing/formatting.
- Digital storage should be clear about decimal units and binary units.
- Data transfer should distinguish bits from bytes.

Acceptance criteria:

- Conversion category contains at least 18 tools after Phase 1.
- Every new conversion route renders a working tool.
- Every conversion result can be copied.
- Number base conversion supports binary, octal, decimal, and hexadecimal.
- Invalid number base input shows a friendly validation message.

### Phase 1 Better Conversion UX

Improve all conversion tools with:

- Swap units button.
- Copy result action.
- Common presets.
- Optional "all units" output table for the entered value.

Example:

For length conversion with `1 meter`, show:

- 100 centimeters.
- 1000 millimeters.
- 3.28084 feet.
- 39.3701 inches.

Acceptance criteria:

- Users can swap from/to units with one click.
- Result updates immediately when input or units change.
- At least common conversion groups show an "all units" table.
- Result formatting avoids too many meaningless decimals.

### Phase 1 Enhanced Existing Tools

#### Loan Calculator

Current gap:

- Shows monthly payment and total profit but no schedule.

Enhancements:

- Add amortization summary.
- Add monthly payment table.
- Include:
  - Month number.
  - Payment.
  - Principal.
  - Interest.
  - Remaining balance.
- Allow download as `.csv` or `.txt`.

Acceptance criteria:

- Existing output remains available.
- User can see at least first 12 months or the full schedule with a show-more control.
- Download exports the schedule.

#### BMI Calculator

Current gap:

- Numeric result without enough interpretation.

Enhancements:

- Add category interpretation:
  - Underweight.
  - Normal.
  - Overweight.
  - Obesity classes.
- Add healthy weight range for the entered height.
- Add limitation note: BMI is a general screening metric, not medical diagnosis.

Acceptance criteria:

- BMI result includes number, category, and healthy weight range.
- The UI clearly marks the category.

#### BMR Calculator

Enhancements:

- Add activity level selector.
- Show estimated maintenance calories.
- Show common goals:
  - Mild weight loss.
  - Weight maintenance.
  - Mild weight gain.

Acceptance criteria:

- BMR result includes base BMR and activity-adjusted estimate.

#### Date Conversion

Enhancements:

- Add result actions.
- Add examples.
- Add date format labels.
- Add history.
- Consider showing weekday.

Acceptance criteria:

- Result includes Jalali, Gregorian, and Islamic date when possible.
- Result includes weekday.
- Previous conversions are visible in history.

#### Text Counter

Enhancements:

- Add:
  - Characters with spaces.
  - Characters without spaces.
  - Words.
  - Sentences.
  - Paragraphs.
  - Estimated reading time.
- Copy summary.

Acceptance criteria:

- Long Persian and English text works.
- Empty text shows zero values.

### Phase 1 Tool Explainer Blocks

Add a small optional block below important tools:

Recommended sections:

- What this tool does.
- Formula or method.
- Example.
- Limitations.
- Related tools.

Keep this block concise in Phase 1.

Example for percentage:

- Formula: `(percent / 100) * number`.
- Example: `20% of 150 = 30`.

Example for BMI:

- Formula: `weight / height^2`.
- Limitation: Not a medical diagnosis.

Acceptance criteria:

- At least 8 high-use tools include explainer metadata.
- Explainer blocks do not make the primary tool harder to use.

### Phase 1 Trust Metadata Foundation

Add support for:

- Last updated date.
- Source label.
- Source URL.
- Status.
- Limitation notes.

Phase 1 should use this mostly for static or low-risk tools.

Do not fake sources.

If no source is available, omit source fields.

Acceptance criteria:

- Tool page can render metadata if available.
- Missing metadata does not break the page.
- Future Phase 2 legal tools can reuse the same metadata fields.

### Phase 1 Accessibility and RTL Requirements

Acceptance criteria:

- Buttons have accessible labels.
- Icon-only actions have `aria-label` and `title`.
- Inputs have labels.
- Result actions are keyboard accessible.
- RTL remains correct.
- English technical values in results are readable.
- Mobile layout does not overflow.

### Phase 1A Accessibility and Interaction Audit

Current status:

- The project already includes a skip link, several accessible icon labels, result `aria-live` behavior, and reduced-motion support.
- The remaining problem is consistency across every surface, especially navigation, search, forms, cards, and result actions.

Known issues to fix:

- Main menus still depend too much on hover behavior and need a complete touch and keyboard interaction model.
- Search needs arrow-key navigation, escape-to-close behavior, and focus return after closing.
- Mobile navigation still behaves like a compressed desktop navigation instead of a dedicated mobile pattern.
- Field validation is not consistently inline or field-specific.
- Numeric text inputs need consistent `name`, `inputMode`, validation copy, examples, and Persian/English digit handling.
- Result and error states should be announced consistently to assistive technologies.
- Decorative icons should consistently use `aria-hidden`.
- Heading hierarchy should be audited across homepage, category pages, tool pages, and footer.
- Empty states should provide context and a useful next action.
- Share cancellation should never create an unhandled client or dev-server error.
- Live dashboard time must avoid hydration mismatch by rendering client-only time safely.
- All focus states must remain visible in light and dark mode.

### Phase 1 Performance Requirements

Acceptance criteria:

- No heavy dependency is added for simple functionality.
- Local storage reads are guarded for client-only execution.
- Search remains fast with the expanded catalog.
- Tool pages do not crash during server rendering.

### Phase 1 Testing and Verification

Minimum checks:

- `npm run lint`
- `npm run build`
- Manual browser verification on:
  - Homepage.
  - Search.
  - One existing calculator.
  - One new conversion tool.
  - Date conversion.
  - Loan calculator.
  - BMI calculator.
  - Recent tools after visiting multiple tools.

Manual test cases:

1. Search `وام`.
   - Loan calculator appears.

2. Search `password`.
   - Password generator appears.

3. Open `/conversions/convert-area`.
   - Enter `1` square meter to square centimeter.
   - Result should be `10000`.

4. Open `/conversions/convert-number-base`.
   - Convert decimal `255` to hex.
   - Result should be `FF` or `ff`.

5. Open loan calculator.
   - Enter a realistic amount, profit, and period.
   - Monthly payment and schedule appear.

6. Open BMI calculator.
   - Enter height and weight.
   - BMI category and healthy range appear.

7. Copy a result.
   - Clipboard receives readable text.

8. Use recent tools.
   - Recent list updates after opening tools.

9. Refresh page.
   - Favorites and recent tools remain.

## Phase 2 Detailed Direction

Phase 2 should add Iranian legal, administrative, salary, and finance tools.

Before implementing Phase 2:

- Create a reliable source/update workflow.
- Decide where official rates and yearly values live.
- Add clear disclaimers.
- Prefer data-driven calculators for yearly values.

Recommended data files:

- `src/data/legal-rates.json`
- `src/data/tax-rates.json`
- `src/data/insurance-rates.json`

Recommended metadata:

```ts
type VersionedRate = {
  year: number;
  label: string;
  value: number;
  sourceLabel: string;
  sourceUrl?: string;
  lastVerified: string;
};
```

High-priority Phase 2 tools:

1. Dowry value calculator.
2. Blood money calculator.
3. Salary tax calculator.
4. Insurance contribution calculator.
5. Severance and year-end bonus calculator.
6. Property commission calculator.
7. Car transfer cost calculator.

Important:

- These tools are high-value but can be risky if outdated.
- Every rule-based output should show the year and last verified date.
- Users should understand that outputs are estimates when exact legal context matters.

## Phase 3 Detailed Direction

Phase 3 should make Toolbo habit-forming.

Features:

- Today dashboard.
- Date/time homepage section.
- Official holidays.
- Events.
- Working-day calculator.
- Add/subtract days.
- World clock.
- Time zone difference.
- Improved prayer times.

Implementation considerations:

- Avoid unreliable external APIs if static/calculable data is enough.
- Separate calendar data from UI code.
- Support Jalali/Gregorian/Islamic dates consistently.
- Add clear update process for yearly events.

## Phase 4 Detailed Direction

Phase 4 should expand technology and content workflows.

Priority tools:

1. QR Code generator.
2. URL encoder/decoder.
3. Base64 encoder/decoder.
4. JSON formatter/validator.
5. Hash generator.
6. UUID generator.
7. Color converter.
8. Persian/Arabic text normalizer.
9. Duplicate line remover.
10. Markdown preview.

Implementation considerations:

- Use proven libraries for QR/barcode generation if already available or lightweight.
- Avoid network dependencies for simple transformations.
- Keep privacy clear: text tools should run locally in the browser.

## Phase 5 Detailed Direction

Phase 5 turns utility into growth.

Features:

- SEO content blocks.
- FAQ sections.
- Structured data.
- Popular tools.
- Feedback.
- Lightweight reactions.
- Shareable result URLs.
- PWA support.
- Basic analytics events.

Recommended analytics events:

- `tool_opened`
- `tool_calculated`
- `result_copied`
- `result_shared`
- `result_downloaded`
- `tool_favorited`
- `search_performed`
- `search_result_clicked`

Do not add analytics until privacy expectations and provider choice are clear.

## Suggested Priority Backlog

### P0

- Phase 1A UI/UX quality pass.
- Mobile-safe navigation and search interaction.
- Accessibility consistency across menus, forms, cards, and result actions.
- Mobile overflow and touch-target audit.
- Unified result actions.
- Expanded conversions.
- Search aliases.
- Recent tools.
- BMI interpretation.
- Loan schedule.

### P1

- Result history.
- Tool explainer blocks.
- Trust metadata rendering.
- Text counter improvements.
- BMR activity levels.
- Date conversion history and weekday.

### P2

- Full print layout.
- Result download formats.
- Homepage daily utility area.
- Popular tools.
- Shareable result URLs.

### P3

- Comments/feedback.
- PWA.
- Map tools.
- User accounts.

## Definition of Success

Toolbo is moving in the right direction when:

- Users can find a tool faster.
- Users trust the result more.
- Users can do something useful with the result.
- Users return because recent/favorite/daily tools are helpful.
- New tools can be added without creating messy one-off code.
- Rule-based tools have visible source/update metadata.

## Implementation Guidance For The Next Chat

If the next chat is asked to "execute Phase 1", it should:

1. Read this file.
2. Inspect the current codebase.
3. Keep edits scoped to Phase 1.
4. Start with reusable foundations:
   - Tool metadata sidecar.
   - Search normalization and aliases.
   - Result actions.
   - Recent tools provider.
5. Then expand conversion groups.
6. Then enhance selected existing tools.
7. Run lint/build.
8. Start the dev server if needed and visually verify key flows.
9. Report exactly what was implemented and what remains.

Recommended first implementation slice:

1. Add `src/lib/tool-metadata.ts`.
2. Update `getSearchResults` to use aliases/keywords.
3. Add `ResultActions`.
4. Add result actions to generic `ResultBox`.
5. Add recent tools provider.
6. Expand conversion groups and routes.
7. Add swap button and all-units table for conversions.

This slice creates visible value quickly while setting up later work cleanly.

## Change Log: UX Flow Redesign (2026-10-20)

- Header: category mega menu showing each category's top tools, a persistent search trigger (`⌘K` / `/`), a saved-tools counter, and a touch-first mobile drawer.
- Search: command palette with recent and popular tools shown before typing, grouped results, keyboard hints, and a saved-tools tab.
- Home: a hero search with live suggestions comes first, then quick links, recent and saved tools for returning users, popular tools, category cards listing their top tools, value props, and a full A–Z directory.
- Category pages: a header with description and count, pill navigation between categories, editor's picks sorted first, and search inside the category.
- Tool pages: compact header with share and save buttons, live results for calculators (except random generators), a sticky sidebar of related tools that prefers metadata-defined relations, and a "how it works" section with method, formula, examples and limitations.
- Footer: full site map (categories, popular tools, the creator's other projects).
- SEO: `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph tags, and WebApplication + Breadcrumb JSON-LD on every tool page. Set `NEXT_PUBLIC_SITE_URL` before deploying.
- Remaining: analytics events, per-tool FAQ content, and source/update metadata for every rule-based tool.
