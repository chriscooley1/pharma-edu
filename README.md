# Pharma-Edu Frontend

The frontend for the Pharma-Edu project, built with Vite, TypeScript, and React.

## Features

- **Vite** for fast builds and hot module replacement
- **TypeScript** for strong typing and better developer experience
- **React** for UI development
- **Modern CSS** for styling
- **Docker** support for containerized development
- **GitHub Actions** for automated deployments

## Getting Started

### Prerequisites

- **Node.js** (v14+)
- **npm** or **yarn**
- **Docker** (optional, for containerized development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pharma-edu.git
cd pharma-edu/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Docker Development

1. Build the container:
```bash
docker build -t pharma-edu-frontend .
```

2. Run the container:
```bash
docker run -p 5173:5173 pharma-edu-frontend
```

Or use Docker Compose:
```bash
docker-compose up
```

## Project Structure

```
frontend/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
├── public/            # Public static files
└── tests/             # Test files
```

## Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow ESLint configuration
- Use functional components with hooks
- Implement proper error handling
- Write meaningful component and function names

### Git Workflow

1. Create feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make changes and commit:
```bash
git add .
git commit -m "descriptive message"
```

3. Push changes:
```bash
git push origin feature/your-feature-name
```

4. Create pull request on GitHub

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch.

To manually deploy:

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
VITE_BASE_URL=/pharma-edu/
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure all dependencies are installed
   - Check for TypeScript errors
   - Verify environment variables

2. **Development Server Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall
   - Check port conflicts

3. **Deployment Issues**
   - Verify GitHub Pages settings
   - Check GitHub Actions workflow
   - Ensure correct base URL in vite.config.ts

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## License

[Add your license information here]

## Contact

[Add your contact information here]
