export default function mockFetch(data) {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      ...data,
    }),
  }));
}
