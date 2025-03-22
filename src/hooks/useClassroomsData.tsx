
import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockClassroomsData = [
  { id: '1', name: 'Room 101', capacity: 30, isAvailable: true },
  { id: '2', name: 'Lab 3', capacity: 25, isAvailable: true },
  { id: '3', name: 'Room 102', capacity: 40, isAvailable: true },
  { id: '4', name: 'Auditorium A', capacity: 100, isAvailable: false },
  { id: '5', name: 'Lab 2', capacity: 20, isAvailable: true },
];

export const useClassroomsData = () => {
  const [classroomsList, setClassroomsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setClassroomsList(mockClassroomsData);
      setIsLoading(false);
    }, 500);
  }, []);

  // Update classroom availability
  const updateClassroomAvailability = (id: string, isAvailable: boolean) => {
    setClassroomsList(prev => 
      prev.map(room => 
        room.id === id ? { ...room, isAvailable } : room
      )
    );
  };

  return {
    classroomsList,
    isLoading,
    updateClassroomAvailability
  };
};
