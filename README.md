# NY Times Most Popular Articles
A React application that displays the NY Times Most Popular Articles using the NY Times API. The application follows a master/detail pattern, showing a list of articles that can be clicked to view more details.

## Features

- Display a list of most popular articles from NY Times
- View detailed information about each article
- Responsive design using Material-UI
- TypeScript support
- Comprehensive test coverage
- Modern React practices using hooks and functional components

## Demo
<img width="1439" alt="Screenshot 2025-03-10 at 1 41 02 AM" src="https://github.com/user-attachments/assets/08f6d30a-a410-4804-9ff0-39d4452de3a9" />
<img width="1440" alt="Screenshot 2025-03-10 at 1 41 50 AM" src="https://github.com/user-attachments/assets/20b3b8db-656c-4215-8d36-983159896c47" />



## Prerequisites

- Node.js (v18 or later)
- npm (v7 or later)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/AsimIqbal1/ny-times-articles.git
cd ny-times-articles
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your NY Times API key:

```bash
REACT_APP_NYT_APP_KEY=your_api_key_here
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
npm run test:coverage
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

This project uses the NY Times Most Popular Articles API.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
