import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import NavBar from '../components/NavBar';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/notes');
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log('Error fetching notes:', error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Something went wrong while fetching notes.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <NavBar />
      {isRateLimited && <RateLimitedUI />}

        <div className='max-w-6xl mx-auto px-4 py-8'>
            {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}
            {notes.length > 0 && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </div>
            )}
        </div>
    </div>
  );
};

export default HomePage;
