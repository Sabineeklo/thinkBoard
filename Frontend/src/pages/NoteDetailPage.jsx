import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.log('Error fetching note:', error);
        toast.error('Something went wrong while fetching the note.');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await api.delete(`/notes/deleteNote/${id}`);
      toast.success('Note deleted successfully');
      navigate('/');
    } catch (error) {
      console.log('Error deleting note:', error);
      toast.error('Something went wrong while deleting the note.');
    }
  }


  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()) {
      toast.error('Title and Content cannot be empty.');
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/updateNote/${id}`, note);
      toast.success('Note updated successfully');
      navigate('/');
    } catch (error) {
      console.log('Error updating note:', error);
      toast.error('Something went wrong while updating the note.');
    } finally {
      setSaving(false);
    } 
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-base-200'>
        <LoaderIcon className='size-10 animate-spin' />
      </div>
    );
  }

  return (
     <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
