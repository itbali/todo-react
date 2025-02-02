import { TodoType } from './todoType.ts';

export const mockTodos: TodoType[] = [
	{
		_id: '1',
		title: 'Сделать утреннюю зарядку',
		order: 1,
		completed: false,
		description: '10 минут растяжки и 20 минут кардио',
		createdAt: '2025-01-28T08:00:00Z',
		updatedAt: '2025-01-28T08:00:00Z',
	},
	{
		_id: '2',
		title: 'Проверить почту',
		order: 2,
		completed: true,
		description: 'Ответить на все срочные письма',
		createdAt: '2025-01-27T09:15:00Z',
		updatedAt: '2025-01-27T10:00:00Z',
	},
	{
		_id: '3',
		title: 'Завершить отчет по проекту',
		order: 3,
		completed: false,
		description: 'Подготовить финальную версию отчета для клиента',
		createdAt: '2025-01-25T14:30:00Z',
		updatedAt: '2025-01-26T12:45:00Z',
	},
	{
		_id: '4',
		title: 'Купить продукты',
		order: 4,
		completed: false,
		description: 'Составить список покупок и сходить в магазин',
		createdAt: '2025-01-27T17:20:00Z',
		updatedAt: '2025-01-27T17:20:00Z',
	},
	{
		_id: '5',
		title: 'Посмотреть вебинар',
		order: 5,
		completed: true,
		description: 'Тема: Новые технологии в веб-разработке',
		createdAt: '2025-01-26T11:00:00Z',
		updatedAt: '2025-01-26T13:00:00Z',
	},
];
