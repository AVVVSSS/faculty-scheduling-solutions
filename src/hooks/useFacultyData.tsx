
import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockFacultyData = [
  { id: '1', name: 'Dr. John Smith', department: 'Computer Science', isAvailable: true },
  { id: '2', name: 'Prof. Emily Johnson', department: 'Mathematics', isAvailable: true },
  { id: '3', name: 'Dr. Michael Lee', department: 'Physics', isAvailable: false },
  { id: '4', name: 'Prof. Sarah Parker', department: 'Chemistry', isAvailable: true },
  { id: '5', name: 'Dr. David Wilson', department: 'Biology', isAvailable: true },
];

export const useFacultyData = () => {
  const [facultyList, setFacultyList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setFacultyList(mockFacultyData);
      setIsLoading(false);
    }, 500);
  }, []);

  // Update faculty availability
  const updateFacultyAvailability = (id: string, isAvailable: boolean) => {
    setFacultyList(prev => 
      prev.map(faculty => 
        faculty.id === id ? { ...faculty, isAvailable } : faculty
      )
    );
  };

  return {
    facultyList,
    isLoading,
    updateFacultyAvailability
  };
};
