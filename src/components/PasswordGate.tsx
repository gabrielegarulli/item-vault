import { useState } from 'react';
import { useAuth } from '../lib/authContext';

const PasswordGate: React.FC = () => {
  const { setRole, setPlayerUrl } = useAuth();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    setError('');
    // Mock API call to /api/auth/verify
    // For now, client-side check
    const password = 'gabriele1'; // import.meta.env.VITE_APP_PASSWORD;
    console.log('Password from env:', password);
    console.log('Input:', input);
    const dndBeyondRegex = /^https:\/\/www\.dndbeyond\.com\/characters\/\d+$/;

    if (input === password) {
      setRole('gm');
    } else if (dndBeyondRegex.test(input)) {
      setRole('player');
      setPlayerUrl(input);
    } else {
      setError('Invalid password or D&D Beyond URL');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Bones N' Roses GM Screen</h1>
        <p className="mb-4 text-center">Enter GM password or D&D Beyond character URL</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password or https://www.dndbeyond.com/characters/..."
          className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:border-gray-600"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleVerify}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default PasswordGate;
