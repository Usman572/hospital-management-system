# Coding Standards

## General Principles

- Write clean and readable code.
- Keep functions small and focused.
- Follow the Single Responsibility Principle.
- Avoid duplicated code.
- Prefer composition over inheritance.

## Naming Conventions

### Variables

Use camelCase.

Example:

```ts
patientName
appointmentDate
```

### Classes

Use PascalCase.

```ts
PatientService
AppointmentController
```

### Constants

Use UPPER_SNAKE_CASE.

```ts
DEFAULT_PAGE_SIZE
JWT_SECRET
```

## Folder Structure

Each feature should be isolated within its own module.

## Comments

Write comments only when the code cannot explain itself.

## Formatting

- TypeScript
- Prettier
- ESLint