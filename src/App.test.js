import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('identifies itself as a local tutorial demo and rejects blank input', () => {
  render(<App />);
  expect(screen.getByRole('main', { name: 'Local chat UI demo' })).toBeInTheDocument();
  expect(screen.getByText(/deterministic examples, not AI output/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Go' })).toBeDisabled();
  fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), { target: { value: '  ' } });
  expect(screen.getByRole('button', { name: 'Go' })).toBeDisabled();
});

test('sends a local demo reply without fetching, reopens history and clears it', () => {
  const previousFetch = global.fetch;
  global.fetch = jest.fn();
  try {
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Message' });
    fireEvent.change(input, { target: { value: '  first message  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(screen.getByText('Local demo reply to: first message')).toBeInTheDocument();
    expect(input).toHaveValue('');
    fireEvent.change(input, { target: { value: 'second message' } });
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));
    fireEvent.click(screen.getByRole('button', { name: 'Show conversation: first message' }));
    expect(screen.getByText('Local demo reply to: first message')).toBeInTheDocument();
    expect(screen.queryByText('Local demo reply to: second message')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.queryByText('Local demo reply to: first message')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Show conversation/ })).not.toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  } finally {
    global.fetch = previousFetch;
  }
});
