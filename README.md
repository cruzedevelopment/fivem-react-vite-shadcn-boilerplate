# FiveM React Vite shadcn/ui Boilerplate

A modern, production-ready boilerplate for FiveM resources featuring React 18, Vite, TypeScript, and shadcn/ui components. Build professional FiveM interfaces with type safety and modern development tools.

## Features

- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and optimized builds
- **shadcn/ui** components for professional UI design
- **Tailwind CSS** for utility-first styling
- **FiveM NUI integration** with proper message handling
- **ESC key handling** for native FiveM UX
- **Transparent backgrounds** for seamless game integration
- **Development mode detection** for browser testing

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- FiveM server for testing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cruzedevelopment/fivem-react-vite-shadcn-boilerplate.git
cd fivem-react-vite-shadcn-boilerplate
```

2. Install dependencies:
```bash
cd web
npm install
```

3. Build the project:
```bash
npm run build
```

4. Start your FiveM server and use `/show-nui` command in-game

### Development

For development with hot reload:
```bash
npm run dev
```

## Project Structure

```
├── fxmanifest.lua          # FiveM resource manifest
├── shared/
│   └── shared.lua          # Shared Lua code
├── src/
│   ├── client/
│   │   ├── main.lua        # Client-side NUI logic
│   │   └── utils.lua       # Client utilities
│   └── server/
│       └── main.lua        # Server-side logic
└── web/                    # React application
    ├── src/
    │   ├── components/ui/  # shadcn/ui components
    │   ├── hooks/          # Custom React hooks
    │   ├── types/          # TypeScript type definitions
    │   ├── utils/          # Utility functions
    │   └── App.tsx         # Main React component
    ├── package.json
    └── vite.config.ts
```

## Available Commands

### FiveM Commands

- `/show-nui` - Open the React interface
- `ESC` - Close the interface

### Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Adding shadcn/ui Components

Install additional shadcn/ui components:
```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add toast
```

## NUI Integration

The boilerplate includes pre-configured NUI integration:

### Lua to React Communication

```lua
-- Send data to React
SendReactMessage('setVisible', true)
SendReactMessage('updateData', { player = 'John', money = 5000 })
```

### React to Lua Communication

```typescript
// Send data to Lua
fetchNui('hideFrame')
fetchNui('getData', { message: 'Hello from React' })
```

### Custom Hooks

- `useNuiEvent` - Listen for NUI messages
- `useNuiVisibility` - Handle ESC key and visibility

## Customization

### Theming

The project uses shadcn/ui with the "New York" style and "Neutral" color palette. To change themes:

```bash
npx shadcn@latest init --force
```

### Adding New Features

1. Create Lua callbacks in `src/client/main.lua`
2. Add corresponding React handlers in `src/App.tsx`
3. Use TypeScript types in `src/types/fivem.ts`

## Example Implementation

```typescript
// Add to App.tsx
const handleCustomAction = async () => {
  const result = await fetchNui('customCallback', { 
    action: 'doSomething' 
  });
  console.log('Result:', result);
};
```

```lua
-- Add to src/client/main.lua
RegisterNUICallback('customCallback', function(data, cb)
  local result = DoSomeGameFunction(data.action)
  cb(result)
end)
```

## Browser Testing

The boilerplate includes browser development support:

1. Run `npm run dev` in the web directory
2. Open `http://localhost:5173`
3. Test your UI without needing FiveM

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test in both browser and FiveM
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- Check the [Issues](https://github.com/cruzedevelopment/fivem-react-vite-shadcn-boilerplate/issues) page
- Review FiveM documentation for NUI best practices
- Visit [shadcn/ui documentation](https://ui.shadcn.com) for component usage

---

Built with ❤️ for the FiveM community