## Plan: Transform Item-Vault into Bones N' Roses GM Screen

Transform the existing React item-vault app into a comprehensive Interactive D&D 5e Game Master screen for Loot Tavern hunt modules, featuring multi-hunt architecture, combat tracking, item ledger, role-based access, and harvesting mechanics.

**Steps**

### Phase 1: Core Architecture & Auth Setup
1. Implement password gate with session-storage auth via /api/auth/verify endpoint; store APP_PASSWORD in env.
2. Create two-role access system (GM/Player) with sessionStorage 'bnr_role'; add AuthContext in src/lib/authContext.tsx. Players authenticate via D&D Beyond URL.
3. Add role-based view restrictions across all pages: PCs get read-only views, no controls for phases/waves/HP/etc.
4. Update HuntLevel type to include all required levels: 4|5|7|9|10|13|14|15|16|19.

### Phase 2: Multi-Hunt System & Theming
1. Build hunt selector dropdown with four hunts defined in src/lib/gameData.ts: Bones N' Roses, Hare-Raising, Synaptick Shiver, March of the Living Oasis.
2. Implement per-hunt theme CSS via data-theme attribute on root div; add theme blocks in index.css for colors (background, primary, accent, parchment, etc.).
3. Implement D&D Beyond character import for party: fetch character data from provided URLs (e.g., https://www.dndbeyond.com/characters/141530055); store party in state with stats for harvesting (intMod, dexMod, wisMod, chaMod, profBonus, skillProficiencies).

### Phase 3: Combat & Encounter Tracking
1. Develop Combat tracker page: initiative order, HP tracking, conditions, per-creature attack/trait reference.
2. Add lair action reference with level-scaled DC/damage/distance for all three lair actions per hunt.
3. Implement tracking encounters: three clue encounters per hunt with level-based compositions.
4. Create NPC mood roller: d4 table with sample speech for main NPC per hunt.

### Phase 4: Item Ledger & Import
1. Build Item Ledger page (nav "Items"): display 282 items from src/lib/itemsData.json; add search by name/description/component, filter by rarity/type/attunement, sort A-Z or by rarity.
2. Implement component-crafting data display per card in src/pages/ItemsPage.tsx.
3. Add GM-only bulk item import: collapsible panel accepting .json upload/paste; schema {name, rarity, category, type?, typeDetail?, attunement?, component?, description?}; append/replace modes; import count badge; downloadable sample JSON.

### Phase 5: Harvesting & Aftermath
1. Create Harvesting page (nav "Harvesting"): full Heliana's Guide workflow with creature type/size picker, assess+carve rolls, DiceInput, essence/component tables, result list. Use imported party stats for auto-helpers.
2. Implement Aftermath page: magic item descriptions and gold rewards by level; roll dice/trigger undead horde for March of the Living Oasis alternative ending.

### Phase 6: UI/UX Polish & Integration
1. Update App.tsx for phase navigation (read-only for PCs), hunt switcher (hidden for PCs), GM input bar (hidden for PCs).
2. Ensure responsive design and dark mode compatibility with new themes.
3. Add badges: GM (amber), PC (blue with character name).

**Relevant files**
- src/lib/authContext.tsx — Auth context for roles, including D&D Beyond URL handling
- src/lib/gameData.ts — Hunt definitions and data
- src/lib/itemsData.json — 282 item data
- src/lib/dndBeyondApi.ts — Utility for fetching character data from D&D Beyond URLs
- src/pages/ItemsPage.tsx — Item ledger rendering
- src/pages/CombatPage.tsx — Combat tracker
- src/pages/HarvestingPage.tsx — Harvesting workflow
- src/pages/SetupPage.tsx — Hunt setup with restrictions
- src/pages/AftermathPage.tsx — Treasure and endings
- index.css — Theme CSS variables
- src/types/item.ts — Update for new item schema
- src/types/character.ts — New type for D&D Beyond imported characters

**Verification**
1. Test auth: verify password gate blocks access, roles persist in sessionStorage; test D&D Beyond URL import for players.
2. Test hunts: switch between hunts, confirm themes apply, party imports from D&D Beyond.
3. Test combat: add creatures, track HP/conditions, roll initiative, use lair actions.
4. Test items: search/filter/sort 282 items, bulk import JSON, role restrictions.
5. Test harvesting: select creature, roll dice using imported party stats, display results.
6. Test aftermath: view rewards, trigger alternative endings.
7. E2E: full hunt flow from setup to aftermath, role switching.

**Decisions**
- Retain Vite + React + TS + Tailwind stack.
- Use sessionStorage for auth/roles (client-side only).
- No backend beyond /api/auth/verify for password check; implement D&D Beyond data fetching client-side (may require proxy for CORS).
- Item data in JSON file for simplicity.
- Role restrictions enforced in components (no server-side).
- Themes via CSS variables for easy customization.
- Party dynamically imported from D&D Beyond URLs provided by players.

**Further Considerations**
1. Backend integration: Is /api/auth/verify a real endpoint or mock? If mock, implement simple verification. For D&D Beyond, how to handle API access (public API or proxy)?
2. Data sources: Where to source the 282 items and hunt details? Provide or generate? For characters, ensure fetching works with example URL.
3. Performance: With 282 items, ensure efficient rendering/search. For party, limit to 4-6 members.
