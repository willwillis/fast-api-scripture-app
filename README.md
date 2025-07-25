# Fast Scriptures

A modern, mobile-first scripture reading application that makes exploring the LDS scriptures fast, beautiful, and accessible.

![Scripture App Screenshot](./docs/screenshots/scriptures-app-screenshot.png)

## ✨ Features

- **🔍 Powerful Search** - Full-text search across all LDS scriptures
- **📱 Mobile-First Design** - Beautiful, responsive interface that works everywhere
- **🎨 Dark Theme** - Cursor-inspired dark interface that's easy on the eyes
- **🎲 Random Scriptures** - Discover inspiring verses with one click
- **⚡ Lightning Fast** - Built with modern technologies for speed
- **🌐 Always Available** - Deployed and ready to use at [scriptures-fast-api.onrender.com](https://scriptures-fast-api.onrender.com)


## 🚀 Getting Started

### New to the Project?

👋 **Welcome!** Whether you want to contribute, explore, or just run the app locally, we've got you covered:

**[📖 Getting Started Guide](./docs/getting-started.md)** - Complete setup instructions and your first contribution

**[📚 Documentation Hub](./docs/README.md)** - All documentation organized and easy to navigate

### Quick Try

Want to see it in action? Visit the live app: **[scriptures-fast-api.onrender.com](https://scriptures-fast-api.onrender.com)**

### Quick Local Setup

```bash
# Clone and setup
git clone https://github.com/willwillis/fast-api-scripture-app.git
cd fast-api-scripture-app
git submodule update --init --recursive

# Backend (Terminal 1)
cd backend && uv sync && python setup_database.py
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Frontend (Terminal 2)
cd frontend && npm install && npm run dev
```

Visit http://localhost:5173 to see your local version!

## 🏗️ Architecture

Fast Scriptures is built with a modern, clean architecture:

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: FastAPI + Python + SQLite
- **Data**: LDS Scriptures database (as git submodule)
- **Deployment**: Render (auto-deploy from main branch)
- **CI/CD**: GitHub Actions with comprehensive testing

See our **[Architecture Overview](./docs/architecture.md)** *(coming soon)* for detailed system design.

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

1. **Start with our [Getting Started Guide](./docs/getting-started.md)** - Everything you need to know
2. **Browse the [Documentation](./docs/README.md)** - Organized by what you want to do
3. **Check [Issues](https://github.com/willwillis/fast-api-scripture-app/issues)** - Find something to work on
4. **Join the conversation** - Create issues, ask questions, share ideas

### Quick Contribution Flow
```bash
git checkout -b your-feature-name
# Make your changes
git commit -m "feat: describe your change"
git push -u origin your-feature-name
# Create a Pull Request
```

All PRs get automatic testing across Python 3.9-3.12 and comprehensive quality checks.

## 📡 API Reference

The FastAPI backend provides a RESTful API for accessing scripture data.

### Try It Live
- **API Docs**: [scriptures-fast-api.onrender.com/docs](https://scriptures-fast-api.onrender.com/docs) - Interactive Swagger UI
- **Alternative Docs**: [scriptures-fast-api.onrender.com/redoc](https://scriptures-fast-api.onrender.com/redoc) - ReDoc interface

### Quick API Example
```bash
# Get a random scripture
curl -s 'https://scriptures-fast-api.onrender.com/api/scriptures/random' | jq -r '"\(.verse_title)\n\(.scripture_text)"'

# Search for "love"
curl -s 'https://scriptures-fast-api.onrender.com/api/scriptures/search?q=love&limit=3'
```

For complete API documentation, see our **[API Standards Guide](./docs/api-standards.md)**.

## 📚 Documentation

Our documentation is organized to help you find exactly what you need:

- **[📖 Getting Started](./docs/getting-started.md)** - New contributor onboarding
- **[📚 Documentation Hub](./docs/README.md)** - All docs organized by role and task
- **[🛠️ Development Workflow](./docs/development-workflow.md)** - How we develop and collaborate
- **[📋 API Standards](./docs/api-standards.md)** - Comprehensive API design principles
- **[🚀 Deployment Guide](./docs/deployment.md)** - How to deploy to production
- **[📊 Monitoring](./docs/monitoring-setup.md)** - New Relic observability setup

## 🏆 Project Status

- ✅ **Active Development** - Regularly updated and maintained
- ✅ **Production Ready** - Deployed and stable at [scriptures-fast-api.onrender.com](https://scriptures-fast-api.onrender.com)
- ✅ **Well Tested** - Comprehensive test suite with CI/CD
- ✅ **Documented** - Extensive documentation for contributors
- ✅ **Open Source** - MIT License, community contributions welcome

## 📞 Support & Community

- **🐛 Report Issues**: [GitHub Issues](https://github.com/willwillis/fast-api-scripture-app/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/willwillis/fast-api-scripture-app/discussions)
- **📖 Documentation**: [docs/README.md](./docs/README.md)
- **🤝 Contributing**: [docs/getting-started.md](./docs/getting-started.md)

---

## License

This project is open source and available under the [MIT License](LICENSE).
