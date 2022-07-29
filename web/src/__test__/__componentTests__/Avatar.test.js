import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar from '../../Components/Avatar';

describe("Avatar", () => {
  it('should render alt text passed into name prop and no href prop', () => {
    render(
        <Avatar 
          name="Test"
          src="https://via.placeholder.com/150"
          nohref={true}
        />
    );
    const imgElement = screen.getByAltText('Test');
    expect(imgElement).toBeInTheDocument();
  });
  it('should render avatar image', () => {
    render(
        <Avatar 
          name="Test"
          src="https://via.placeholder.com/150"
          nohref={true}
        />
    );
    const imgElement = screen.getByAltText('Test');
    expect(imgElement).toHaveAttribute("src", "https://via.placeholder.com/150");
  });
})