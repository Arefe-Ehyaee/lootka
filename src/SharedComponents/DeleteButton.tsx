import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface DeleteButtonProps {
  restaurantId?: string;
  hostelId?: string;
  attractionId?: string;
  onDeleteSuccess?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ restaurantId, hostelId,attractionId, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);

      let url = '';
      if (restaurantId) {
        url = `http://82.115.25.241:2000/rm_place/${restaurantId}`;
      } else if (hostelId) {
        url = `http://82.115.25.241:2000/rm_hostel/${hostelId}`;
      }
     else if (attractionId) {
      url = `http://82.115.25.241:2000/rm_attraction/${attractionId}`;
    }
    else {
      throw new Error('No valid ID provided for deletion.');
    }

    const response = await fetch(url, { method: 'POST' });

    if (!response.ok) {
      throw new Error('Failed to delete item');
    }

    onDeleteSuccess ? onDeleteSuccess() : window.location.href = '/';
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An error occurred while deleting');
    console.error('Error deleting item:', err);
  } finally {
    setIsDeleting(false);
    setShowConfirm(false);
  }
};

return (
  <>
    {!showConfirm ? (
      <button
        onClick={() => setShowConfirm(true)}
        className="flex mt-2 items-center w-full text-center justify-center bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-full py-1.5 transition-colors"
        disabled={isDeleting}
      >
        <TrashIcon className="h-4 w-4 ml-1" />
        <span className='text-center'>حذف مکان</span>
      </button>
    ) : (
      <div className="flex items-center space-x-2 space-x-reverse">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white hover:bg-red-700 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
          disabled={isDeleting}
        >
          {isDeleting ? 'در حال حذف...' : 'تایید حذف'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
          disabled={isDeleting}
        >
          لغو
        </button>
      </div>
    )}

    {error && (
      <div className="mt-2 text-red-600 text-sm">
        {error}
      </div>
    )}
  </>
);
};

export default DeleteButton;
