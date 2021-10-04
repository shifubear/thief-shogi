import App from './App';

test('Parse CSA string works correctly', () => {
  expect(App.prototype.parse_csa_move("7g7f")["from"]).toEqual([2,2]);
})