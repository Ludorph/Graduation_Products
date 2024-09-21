// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', async () => {
//   render(<App />);
  
//   const linkElement = await screen.findByText((content, node) => {
//     return node.textContent.includes("learn react"); // 단순 포함 검사로 변경
//   });
  
//   expect(linkElement).toBeInTheDocument();
// });

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/YUJA/i);
  expect(linkElement).toBeInTheDocument();
});