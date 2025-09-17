# Timer Application Design Guidelines

## Design Approach
**System-Based Approach**: Material Design with minimalist adaptations
- Focus on utility and clarity for time-critical functionality
- Clean, distraction-free interface prioritizing readability
- Emphasis on accessibility and immediate visual feedback

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 59 91% 50% (vibrant blue for active elements)
- Surface: 0 0% 98% (clean background)
- Text: 220 13% 18% (high contrast dark)
- Success: 142 76% 36% (for completion states)
- Warning: 38 92% 50% (for alerts/notifications)

**Dark Mode:**
- Primary: 217 91% 60% (lighter blue for visibility)
- Surface: 222 84% 5% (deep dark background)
- Text: 210 40% 98% (high contrast light)
- Success: 142 69% 58% (adjusted for dark backgrounds)
- Warning: 48 96% 53% (bright for visibility)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Timer Display**: JetBrains Mono (monospaced for consistent digit width)
- Sizes: Timer display (text-6xl to text-8xl), controls (text-base), labels (text-sm)

### Layout System
**Spacing Units**: Tailwind 4, 6, 8, 12 units
- Consistent 4-unit base rhythm
- Generous 8-unit spacing around timer display
- 6-unit spacing for button groups
- 12-unit margins for section separation

### Component Library

**Timer Display**
- Large, monospaced digits in circular or rounded rectangular container
- Subtle background with border for definition
- Color transitions: neutral → warning (last 10 seconds) → danger (last 5 seconds)

**Input Controls**
- Number inputs for minutes/seconds with increment/decrement buttons
- Clear labels and validation states
- Grouped in horizontal layout on larger screens

**Action Buttons**
- Primary: Start/Resume (filled button with primary color)
- Secondary: Pause (outline button)
- Tertiary: Reset (ghost/text button)
- Large touch targets (minimum 44px) with rounded corners

**Progress Indicator**
- Circular progress ring around timer display
- Smooth animation showing time remaining
- Color matches current timer state

**Audio Controls**
- Volume slider and mute toggle
- Sound selection dropdown (optional enhancement)
- Visual indicator for audio alerts

### Interaction States
- **Idle**: Clean, minimal appearance with muted colors
- **Running**: Active primary colors, animated progress indicator
- **Paused**: Amber/warning colors to indicate paused state
- **Complete**: Success colors with gentle pulse animation
- **Alert**: High contrast warning state with clear visual feedback

### Layout Structure
**Single-Screen Design**:
1. **Header**: App title and optional settings
2. **Timer Input**: Minutes/seconds selectors (collapsible when running)
3. **Timer Display**: Large countdown with progress ring
4. **Controls**: Start/Pause/Reset button group
5. **Audio Settings**: Compact controls at bottom

### Responsive Behavior
- **Mobile**: Stacked vertical layout, large touch targets
- **Desktop**: Centered card layout with optimal proportions
- **Keyboard Navigation**: Full support for accessibility

### Visual Hierarchy
- Timer display dominates the interface (largest element)
- Controls secondary but easily accessible
- Input fields minimized during active timing
- Clear visual separation between interface sections

This design prioritizes clarity and functionality while maintaining visual appeal through thoughtful use of color, typography, and spacing.