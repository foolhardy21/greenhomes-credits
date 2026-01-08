## IGBC Green Homes UI Documentation

### Overview
Interactive web application for IGBC Green Homes credit assessment with real-time validation, category-based navigation, and professional styling using Tailwind CSS with OKLCH color system.

### 🎨 **Design System**

#### Color Palette (OKLCH)

- Green Theme (Primary)
    - green-primary: #16a34a
    - green-secondary: #f0fdf4
    - green-accent: #16a34a

- Yellow Theme (Potential):
    - yellow-primary: #eab308
    - yellow-secondary: #fefce8
    - yellow-accent: #eab308

- Gray Theme (Total)
    - gray-primary: #6b7280
    - gray-secondary: #f9fafb
    - gray-accent: #d1d5db


### 🧩 **Components**

#### Header
**File:** `src/components/Header.jsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | CSS classes |
| `readOnly` | `boolean` | `false` | Disable dropdown |

**Features:**
- Target Level selector: Platinum/Gold/Silver/Certified
- Responsive design
- Read-only mode for PDF generation

**Usage:**
```jsx
<Header className="mb-4" readOnly={true} />
```

#### Tabs
**File**: src/components/common/Tabs.jsx

Categories: SD, WC, EE, MR, RHW, ID

#### Dropdown
**File**: src/components/common/Dropdown.jsx

**Features:**

- Keyboard navigation (Arrow keys, Enter, Escape)
- Accessible ARIA labels
- Customizable width

#### NumberInput
File: src/components/common/NumberInput.jsx

Props:
| Prop      | Type     | Description    |
|-----------|----------|----------------|
| `min`     | `number` | Minimum value  |
| `max`     | `number` | Maximum value  |
| `value`   | `number` | Current value  |
| `onChange`| `function` | Change handler |


#### CreditsTable
File: src/components/CreditsTable.jsx

Props:
| Prop            | Type      | Description       |
|-----------------|-----------|-------------------|
| `creditsDist`   | `object`  | Credit distribution data |
| `setCreditsDist`| `function`| Update credits    |
| `category`      | `string`  | Current category  |
| `errors`        | `object`  | Validation errors |
| `setErrors`     | `function`| Update errors     |
| `readOnly`      | `boolean` | Disable inputs    |

### 📊 Data Structure

constants.js

```js
CATEGORIES: {
  SD: "Sustainable Development",
  WC: "Water Conservation", 
  EE: "Energy Efficiency",
  MR: "Material Resources",
  RHW: "Regional & Heritage",
  ID: "Innovation & Design"
}

CREDIT_DISTRIBUTION: {
  [category]: {
    [creditName]: {
      yes: 0,
      maybe: 0, 
      no: 0,
      notes: "",
      required: boolean,
      max: number
    }
  }
}
```

### State Management
- creditsDist: Category → Credit → {yes, maybe, no, notes}
- errors: { [creditPath]: errorMessage }
- category: Active tab ("SD", "WC", etc.)
- targetLevel: "platinum" | "gold" | "silver" | "certified"

### 🎯 User Workflow

1. Select Target Level (Header)
2. Switch Categories (Tabs)
3. Enter Yes/Maybe/No points per credit
4. Add implementation notes  
5. Fix validation errors (red highlights)
6. Click "Export to PDF" → Download A3 report

### 🎨 **PDF Mode**
✅ Read-only tables (no inputs)
✅ Stats cards (Yes/Maybe/Total)
✅ All categories rendered
✅ Preserved notes & colors
✅ A3 print layout
