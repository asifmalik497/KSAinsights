# Platform Guidelines for Content Formatting & Editorial Design

## 1. Table Presentation Rules (Strictly Enforced)
- **NEVER use ASCII or Monospace Code Blocks (`+---+`, `|---|`, or ` ``` `) to render tabular data**.
  - Monospace ASCII blocks render as ugly, unstyled terminal/code snippets on user devices with horizontal scrollbars and broken column widths.
- **ALWAYS use standard GitHub Flavored Markdown (GFM) tables**:
  ```markdown
  | Header 1 | Header 2 | Header 3 |
  | :--- | :---: | ---: |
  | **Bold Row Title** | Centered Value | Right Aligned |
  ```
- **Styling Architecture**: All tables are rendered via `ReactMarkdown` through our editorial UI components in `/src/pages/Blog.tsx`:
  - Header: Deep Emerald Green (`bg-primary`, text in `text-secondary` gold)
  - Rows: Zebra styling (`even:bg-gray-50/50`) with emerald hover accents (`hover:bg-emerald-50/40`)
  - Typography: Clear hierarchy with bolded key metrics and proper numerical alignments.
- **Numerical Accuracy & Column Integrity**:
  - Double-check that percentage columns and counts are NEVER swapped or inverted.
  - Verify that percentages sum accurately to 100%.

## 2. Multi-Language Symmetry (English, Arabic, Urdu)
- Any table added or modified in English MUST also be faithfully translated and structurally formatted in Arabic and Urdu.
- Ensure RTL alignment (`rtl:text-right`) and culturally authentic terminology.
