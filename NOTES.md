# NOTES.md — Ready! App

## Trade-offs and Decisions

### Navigation
- Chose React Navigation v7 with Stack + Bottom Tabs as required by the spec. Feature-based navigation structure follows the Figma flow (Auth → Main with tabs).

### State Management
- Used local useState/useContext only. No external state library needed for this scope.
- Mock verification flow with local state (any phone + OTP works).

### Data
- Populated `mock-data/*.json` with realistic content matching Figma visuals.
- Store tab uses placeholder content (future feature).

### UI Implementation
- Used `@gorhom/bottom-sheet` for Home open state as suggested.
- Used `@shopify/flash-list` for question lists.
- Used `expo-image` with `cachePolicy="memory-disk"` for images.
- Built custom UI components from scratch (no UI kits).

## Assumptions

- Figma Design Interpretation: Some UI details ambiguous in Figma — used best judgment:
  - Tab bar icons: Home (house), Settings (gear), Store (shopping bag)
  - Question cards: Expandable with chevron indicator
  - Bottom sheet: Pull-up detail view for questions
- Login: Any 4-digit OTP accepted (mock only)
- Store tab: Placeholder (not in Figma scope)

## Improvements with More Time

- Add skeleton/shimmer loading states
- Implement actual audio playback for "AI VS AI" feature
- Add haptic feedback on buttons
- Smooth screen transitions with react-native-reanimated
- Add accessibility labels throughout
- Implement memo/useMemo for list item performance

## Technical Notes

- TypeScript strict mode enabled — no `any` types
- All theme values via `@/theme/*` tokens
- Feature-based folder structure as specified