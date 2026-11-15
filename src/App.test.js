import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const originalFetch = global.fetch;
const users = [
  { id: 1, first_name: 'Anna', last_name: 'Example', email: 'anna@example.com' },
  { id: 2, first_name: 'Boris', last_name: 'Example', email: 'boris@example.com' },
];

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ data: users }),
  });
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

test('disables sending until a user is selected and after the last selection is removed', async () => {
  render(<App />);

  const sendButton = screen.getByRole('button', { name: 'Отправить приглашение' });
  expect(sendButton).toBeDisabled();

  const userName = await screen.findByText('Anna Example');
  const action = userName.closest('li').querySelector('.action');
  expect(sendButton).toBeDisabled();

  fireEvent.click(sendButton);
  expect(screen.queryByText('Успешно!')).not.toBeInTheDocument();

  fireEvent.click(action);
  expect(sendButton).toBeEnabled();

  fireEvent.click(action);
  expect(sendButton).toBeDisabled();

  fireEvent.click(sendButton);
  expect(screen.queryByText('Успешно!')).not.toBeInTheDocument();
  expect(userName).toBeInTheDocument();
});

test.each([
  [[1, 2], 2],
  [[1, 2, 1], 1],
])('shows success after sending with selection %j and count %i', async (clicks, count) => {
  render(<App />);

  await screen.findByText('Anna Example');
  expect(screen.queryByText('Успешно!')).not.toBeInTheDocument();

  clicks.forEach((id) => {
    const user = users.find((item) => item.id === id);
    const row = screen.getByText(`${user.first_name} ${user.last_name}`).closest('li');
    fireEvent.click(row.querySelector('.action'));
  });

  fireEvent.click(screen.getByRole('button', { name: 'Отправить приглашение' }));

  expect(screen.getByText('Успешно!')).toBeInTheDocument();
  expect(screen.getByText(`Всем ${count} пользователям отправлено приглашение.`)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Успешно' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Назад' })).toBeInTheDocument();
  expect(screen.queryByText('Anna Example')).not.toBeInTheDocument();
});
