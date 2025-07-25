# Contributing to Fast Scriptures

Thank you for your interest in contributing to Fast Scriptures! We welcome contributions from everyone, whether you're fixing a typo, adding a feature, or improving documentation.

## 🚀 Quick Start for Contributors

### First Time Contributing?

1. **Read our [Developer Guide](./docs/developer-guide.md)** - Complete setup and development workflow
2. **Check out [open issues](https://github.com/willwillis/fast-api-scripture-app/issues)** - Find something to work on
3. **Join the conversation** - Comment on issues or start discussions

### Ready to Contribute?

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch** from main
4. **Make your changes** following our guidelines below
5. **Test thoroughly** using our testing guide
6. **Submit a pull request** with a clear description

## 🎯 Types of Contributions Welcome

### 🐛 Bug Fixes
- Fix typos in documentation
- Improve error messages
- Add missing TypeScript types
- Fix responsive design issues
- Resolve performance problems

### ✨ Features
- Add new search filters or capabilities
- Improve keyboard navigation
- Add loading states and better UX
- Enhance accessibility
- Implement user-requested features

### 📖 Documentation
- Add code comments and documentation
- Create tutorials and examples
- Improve setup instructions
- Add architecture diagrams
- Write blog posts or guides

### 🧪 Testing
- Add test cases for existing functionality
- Improve test coverage
- Add integration tests
- Create visual regression tests
- Performance testing

### 🔧 Infrastructure
- Improve CI/CD pipeline
- Enhance monitoring and observability
- Optimize build processes
- Security improvements

## 📋 Contribution Guidelines

### Code Style

We maintain consistent code style across the project:

#### Backend (Python)
- **Formatting**: Black with line length 88
- **Import sorting**: isort with black profile
- **Linting**: flake8 with max line length 88
- **Type hints**: Required for all public functions
- **Docstrings**: Google style for modules and classes

```python
# Good example
def search_scriptures(query: str, limit: int = 10) -> List[ScriptureResult]:
    """Search scriptures by text query.

    Args:
        query: The search term to look for
        limit: Maximum number of results to return

    Returns:
        List of scripture results matching the query
    """
```

#### Frontend (TypeScript/React)
- **Formatting**: ESLint + Prettier
- **Naming**: camelCase for variables, PascalCase for components
- **Types**: Explicit TypeScript types for all props and functions
- **Components**: Functional components with hooks
- **Styling**: Tailwind CSS classes

```typescript
// Good example
interface ScriptureSearchProps {
  query: string;
  onResultsChange: (results: ScriptureResult[]) => void;
}

export const ScriptureSearch: React.FC<ScriptureSearchProps> = ({
  query,
  onResultsChange,
}) => {
  // Component implementation
};
```

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear, semantic commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring without functionality changes
- `test`: Test additions or modifications
- `chore`: Build, tooling, or dependency updates

#### Examples
```bash
feat(api): add verse bookmark functionality
fix(frontend): resolve search input validation bug
docs(readme): update deployment instructions
test(backend): add comprehensive scripture search tests
chore(deps): update FastAPI to v0.104.0
```

### Pull Request Process

1. **Create descriptive PR title** following commit message format
2. **Fill out the PR template** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Testing instructions
   - Breaking changes (if any)

3. **Ensure all checks pass**:
   - All tests pass locally and in CI
   - Code follows style guidelines
   - No security vulnerabilities introduced
   - Documentation updated if needed

4. **Request review** from maintainers
5. **Address feedback** promptly and professionally
6. **Squash commits** if requested before merge

### Testing Requirements

All contributions must include appropriate tests:

#### Backend Changes
- **Unit tests** for new functions and classes
- **Integration tests** for API endpoints
- **Performance tests** for critical paths
- **Error handling tests** for edge cases

```bash
# Run backend tests
cd backend
uv run pytest tests/ -v --cov=app
```

#### Frontend Changes
- **Component tests** using React Testing Library
- **Hook tests** for custom hooks
- **Integration tests** for user interactions
- **Accessibility tests** for UI components

```bash
# Run frontend tests
cd frontend
npm run test
npm run test:coverage
```

## 🔍 Code Review Guidelines

### For Contributors
- **Self-review** your changes before submitting
- **Keep PRs focused** - one feature or fix per PR
- **Write clear descriptions** of what and why
- **Be responsive** to feedback and questions
- **Test thoroughly** on different devices/browsers

### For Reviewers
- **Be constructive** and helpful in feedback
- **Focus on code quality** and user experience
- **Check for security issues** and best practices
- **Verify tests** cover the changes adequately
- **Consider maintainability** and future impact

## 🚨 Security

### Reporting Security Issues
- **DO NOT** open public issues for security vulnerabilities
- **Email** maintainers privately at [security email]
- **Include** steps to reproduce and potential impact
- **Allow** reasonable time for response before disclosure

### Security Best Practices
- Never commit secrets, API keys, or passwords
- Validate and sanitize all user inputs
- Use parameterized queries for database operations
- Keep dependencies updated
- Follow principle of least privilege

## 📚 Development Resources

### Getting Started
- **[Developer Guide](./docs/developer-guide.md)** - Complete development setup
- **[Testing Guide](./docs/testing-guide.md)** - Comprehensive testing practices
- **[API Standards](./docs/api-standards.md)** - API design principles
- **[Operations Guide](./docs/operations-guide.md)** - Monitoring and deployment

### Tools and Documentation
- **[FastAPI Documentation](https://fastapi.tiangolo.com/)**
- **[React Documentation](https://react.dev/)**
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**
- **[Tailwind CSS](https://tailwindcss.com/docs)**

### Community
- **[GitHub Discussions](https://github.com/willwillis/fast-api-scripture-app/discussions)** - Ask questions and share ideas
- **[Issues](https://github.com/willwillis/fast-api-scripture-app/issues)** - Report bugs and request features

## 🎯 Beginner-Friendly Issues

Looking for a place to start? Check out issues labeled:
- `good first issue` - Perfect for new contributors
- `documentation` - Help improve our docs
- `bug` - Fix something that's broken
- `enhancement` - Add new functionality

## 📞 Getting Help

### Stuck on Something?
1. **Check our documentation** - Most questions are answered there
2. **Search existing issues** - Someone might have asked already
3. **Create a discussion** - Ask questions and get help
4. **Review existing code** - See how similar features are implemented

### Communication Guidelines
- **Be respectful** and inclusive in all interactions
- **Search first** before asking questions
- **Provide context** when asking for help
- **Say thank you** - We're all volunteers here!

## 🏆 Recognition

We appreciate all contributions! Contributors will be:
- **Listed** in our README contributors section
- **Mentioned** in release notes for significant contributions
- **Invited** to join our contributors team

## 📝 License

By contributing to Fast Scriptures, you agree that your contributions will be licensed under the same [MIT License](./LICENSE) as the project.

---

## Quick Contribution Checklist

Before submitting your PR, make sure you can check all these boxes:

- [ ] I've read the [Developer Guide](./docs/developer-guide.md)
- [ ] My code follows the project's style guidelines
- [ ] I've tested my changes thoroughly
- [ ] I've added tests for new functionality
- [ ] I've updated documentation if needed
- [ ] My commits follow the conventional commit format
- [ ] I've filled out the PR template completely
- [ ] All CI checks are passing

**Thank you for contributing to Fast Scriptures!** 🎉

Your contributions help make scripture study more accessible and enjoyable for everyone.

---

**Quick Links:** [Developer Guide](./docs/developer-guide.md) | [Testing Guide](./docs/testing-guide.md) | [Documentation Index](./docs/README.md) | [Issues](https://github.com/willwillis/fast-api-scripture-app/issues)
