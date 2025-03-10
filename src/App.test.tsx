import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app with header', () => {
    render(<App />);
    expect(screen.getByText('NY Times Most Popular Articles')).toBeInTheDocument();
  });
});
