# NY Times Most Popular Articles

A React application that displays the NY Times Most Popular Articles using the NY Times API. The application follows a master/detail pattern, showing a list of articles that can be clicked to view more details.

## Features

- Display a list of most popular articles from NY Times
- View detailed information about each article
- Responsive design using Material-UI
- TypeScript support
- Comprehensive test coverage
- Modern React practices using hooks and functional components

## Prerequisites

- Node.js (v18 or later)
- npm (v7 or later)

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd ny-times-articles
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your NY Times API key:

```bash
REACT_APP_NY_TIMES_API_KEY=your_api_key_here
```

## Running the Application

To start the development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Running Tests

To run the test suite:

```bash
npm test
```

To run tests with coverage report:

```bash
npm test -- --coverage
```

## Project Structure

```
src/
  ├── components/        # React components
  │   ├── Layout.tsx    # Main layout component
  │   ├── ArticleList.tsx   # Article list view
  │   ├── ArticleDetail.tsx # Article detail view
  │   └── __tests__/    # Component tests
  ├── services/         # API services
  ├── types/           # TypeScript type definitions
  └── App.tsx          # Main application component
```

## Technologies Used

- React
- TypeScript
- Material-UI
- React Router
- Axios
- Jest
- React Testing Library

## API Documentation

This project uses the NY Times Most Popular Articles API. For more information, visit:
[NY Times API Documentation](https://developer.nytimes.com/docs/most-popular-product/1/overview)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
