import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className={`
      flex min-h-screen flex-col items-center justify-center bg-gray-100
    `}>
      <h1 className="text-5xl font-bold">404 - Not Found</h1>
      <p className="mt-4 text-lg">The page you are looking for does not exist.</p>
      <Link to="/" className={`
        mt-6 text-blue-500
        hover:underline
      `}>
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
