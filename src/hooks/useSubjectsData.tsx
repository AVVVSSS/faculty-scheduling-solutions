
import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockSubjectsData = [
  { id: '1', name: 'Introduction to Programming', department: 'Computer Science', credits: 3 },
  { id: '2', name: 'Data Structures', department: 'Computer Science', credits: 4 },
  { id: '3', name: 'Database Systems', department: 'Computer Science', credits: 3 },
  { id: '4', name: 'Algorithms', department: 'Computer Science', credits: 4 },
  { id: '5', name: 'Computer Networks', department: 'Computer Science', credits: 3 },
];

export const useSubjectsData = () => {
  const [subjectsList, setSubjectsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setSubjectsList(mockSubjectsData);
      setIsLoading(false);
    }, 500);
  }, []);

  return {
    subjectsList,
    isLoading
  };
};
