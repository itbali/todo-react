import { TodoType } from './todoType.ts';

export const mockTodos: TodoType[] = [
	{
		_id: 'todo-1', // Генерация уникального идентификатора
		title: 'Buy groceries',
		order: 1,
		completed: false,
		description: 'Milk, Bread, Eggs',
		createdAt: '2025-01-10T08:30.000Z',
		updatedAt: '2025-01-10T08:30.000Z',
	},
	{
		_id: 'todo-2',
		title: 'Finish project report',
		order: 2,
		completed: false,
		description: 'Prepare slides and summary',
		createdAt: '2025-01-11T09:00.000Z',
		updatedAt: '2025-01-11T09:00.000Z',
	},
	{
		_id: 'todo-3',
		title: 'Gym workout',
		order: 3,
		completed: true,
		description: 'Legs and cardio day',
		createdAt: '2025-01-12T10:15.000Z',
		updatedAt: '2025-01-13T07:00.000Z',
	},
	{
		_id: 'todo-4',
		title: 'Call parents',
		order: 4,
		completed: false,
		description: 'Weekly check-in',
		createdAt: '2025-01-13T11:20:00.000Z',
		updatedAt: '2025-01-13T11:20:00.000Z',
	},
	{
		_id: 'todo-5',
		title: 'Read new book',
		order: 5,
		completed: false,
		description: 'Start reading Chapter 1',
		createdAt: '2025-01-14T12:45:00.000Z',
		updatedAt: '2025-01-14T12:45:00.000Z',
	},
];
