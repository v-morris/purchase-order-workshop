/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  render, screen, fireEvent, act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateOrder from './CreateOrder';

// Mocking ResizeObserver
class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

test('renders Create Order heading', () => {
  render(<CreateOrder />);
  expect(screen.getByRole('heading')).toHaveTextContent('Create Order');
});

test('renders button with correct text', () => {
  render(<CreateOrder />);
  expect(screen.getByRole('button')).toHaveTextContent('Next');
});

test('renders correct default form values', () => {
  render(<CreateOrder />);
  expect(screen.getByRole('form')).toHaveFormValues({
    vendor: '',
    orderTitle: '',
  });
});

test('validates user input for Vendor field', async () => {
  // This field has a 50 character max validation, but cannot test this due to the input
  // preventing the user from inputting custom values

  render(<CreateOrder />);

  // Required field validation
  await act(async () => {
    fireEvent.change(screen.getByLabelText(/Vendor/i), {
      target: { value: '' },
    });
    fireEvent.submit(screen.getByRole('form'));
  });
  expect(screen.getByText('Vendor is required')).toBeInTheDocument();

  // Valid Input
  await act(async () => {
    await userEvent.click(screen.getByRole('searchbox'));
  });
  await act(async () => {
    await userEvent.click(screen.getAllByRole('option')[0]);
  });
  expect(screen.queryByText('Vendor is required')).not.toBeInTheDocument();
});

test('validates user input for Order Title field', async () => {
  render(<CreateOrder />);

  // Required field validation
  await act(async () => {
    fireEvent.change(screen.getByLabelText(/Order Title/i), {
      target: { value: '' },
    });
    fireEvent.submit(screen.getByRole('form'));
  });
  expect(screen.getByText('Order Title is required')).toBeInTheDocument();

  // Max 50 characters validation
  await act(async () => {
    const fiftyOneCharacters = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy';
    fireEvent.change(screen.getByLabelText(/Order Title/i), {
      target: { value: fiftyOneCharacters },
    });
    fireEvent.submit(screen.getByRole('form'));
  });
  expect(screen.getByText('Order Title cannot be more than 50 characters in length')).toBeInTheDocument();

  // Valid Input
  await act(async () => {
    const fiftyOneCharacters = 'Testing Order Title';
    fireEvent.change(screen.getByLabelText(/Order Title/i), {
      target: { value: fiftyOneCharacters },
    });
    fireEvent.submit(screen.getByRole('form'));
  });
  expect(screen.queryByText('Order Title cannot be more than 50 characters in length')).not.toBeInTheDocument();
});

test('should have correct vendor list available to the user', async () => {
  const mockVendorData = [
    'The Paper Supply Co.',
    'Beef Jerky Inc.',
    'Boxes & More',
  ];

  render(<CreateOrder />);

  await act(async () => {
    await userEvent.click(screen.getByRole('searchbox'));
  });

  expect(screen.getAllByRole('option').length).toBe(3);
  mockVendorData.forEach((vendor) => {
    expect(screen.getByText(vendor)).toBeInTheDocument();
  });
});
