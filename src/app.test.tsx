import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './app';

const server = setupServer(
  rest.get('*/users', (req, res, ctx) => {
    if (req.url.searchParams.get('name') === 'John Doe') {
      return res(ctx.status(404), ctx.json('Not found'));
    }

    return res(
      ctx.json([
        { name: 'Sandra Schmidt Sr.', id: 1 },
        { name: 'Sandra Welch', id: 2 },
      ]),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<App />', () => {
  test('should render the results', async () => {
    render(<App />);
    const input = screen.getByRole('textbox', {
      name: /search by user name:/i,
    });

    act(() => {
      input.focus();
    });

    fireEvent.change(input, { target: { value: 'sandra' } });

    const option = await waitFor(() => screen.findByText(/Schmidt Sr/i));
    expect(option).toBeInTheDocument();
  });

  test('should select the value', async () => {
    render(<App />);
    const input = screen.getByRole('textbox', {
      name: /search by user name:/i,
    });

    act(() => {
      input.focus();
    });

    fireEvent.change(input, { target: { value: 'sandra' } });

    const option = await waitFor(() => screen.findByText(/Schmidt Sr/i));

    fireEvent.click(option);

    const displayedValue = screen.getByText(
      /{"value":1,"label":"Sandra Schmidt Sr."}/i,
    );

    expect(displayedValue).toBeInTheDocument();
  });

  test('should render the no results state', async () => {
    render(<App />);
    const input = screen.getByRole('textbox', {
      name: /search by user name:/i,
    });

    act(() => {
      input.focus();
    });

    fireEvent.change(input, { target: { value: 'John Doe' } });

    const option = await waitFor(() =>
      screen.findByText(/No users found. Try a new search./i),
    );

    expect(option).toBeInTheDocument();
  });

  test('should render the empty state', async () => {
    render(<App />);
    const input = screen.getByRole('textbox', {
      name: /search by user name:/i,
    });

    act(() => {
      input.focus();
    });

    const option = await waitFor(() =>
      screen.findByText(/Do a search to find users/i),
    );

    expect(option).toBeInTheDocument();
  });

  test('should close the dropdown when clicking outside', async () => {
    render(<App />);
    const input = screen.getByRole('textbox', {
      name: /search by user name:/i,
    });

    act(() => {
      input.focus();
    });

    const visibleOption = await waitFor(() =>
      screen.findByText(/Do a search to find users/i),
    );

    expect(visibleOption).toBeInTheDocument();

    fireEvent.mouseDown(document);

    const hiddenOption = screen.queryByText(/Do a search to find users/i);

    expect(hiddenOption).not.toBeInTheDocument();
  });

  test('should keep the dropdown open clicking on parent element', async () => {
    render(<App />);
    const input = screen.getByRole('textbox', {
      name: /search by user name:/i,
    });

    act(() => {
      input.focus();
    });

    const visibleOption = await waitFor(() =>
      screen.findByText(/Do a search to find users/i),
    );

    expect(visibleOption).toBeInTheDocument();

    fireEvent.mouseDown(input);

    const keepVisibleOption = screen.queryByText(/Do a search to find users/i);

    expect(keepVisibleOption).toBeInTheDocument();
  });
});
