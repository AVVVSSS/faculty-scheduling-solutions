
import { useState, useEffect } from 'react';
import { useFacultyData } from './useFacultyData';
import { useClassroomsData } from './useClassroomsData';
import { useSubjectsData } from './useSubjectsData';
import { toast } from "sonner";

// Mock data for demonstration - in a real app, this would come from an API
const mockScheduleData = [
  { 
    id: '1', 
    day: 'Monday', 
    startTime: '9:00', 
    duration: '1.5',
    facultyId: '1',
    roomId: '1',
    subjectId: '1',
    needsRescheduling: false
  },
  { 
    id: '2', 
    day: 'Tuesday', 
    startTime: '11:00', 
    duration: '1',
    facultyId: '2',
    roomId: '2',
    subjectId: '2',
    needsRescheduling: true
  },
  { 
    id: '3', 
    day: 'Wednesday', 
    startTime: '14:00', 
    duration: '2',
    facultyId: '3',
    roomId: '3',
    subjectId: '3',
    needsRescheduling: false
  }
];

export const useScheduleData = () => {
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { facultyList } = useFacultyData();
  const { classroomsList } = useClassroomsData();
  const { subjectsList } = useSubjectsData();

  // Fetch schedule data with related entities
  useEffect(() => {
    const fetchData = () => {
      try {
        // In a real app, this would be an API call
        // Simulate API delay
        setTimeout(() => {
          const enrichedData = mockScheduleData.map(item => ({
            ...item,
            faculty: facultyList.find(f => f.id === item.facultyId),
            room: classroomsList.find(r => r.id === item.roomId),
            subject: subjectsList.find(s => s.id === item.subjectId),
          }));
          
          setScheduleData(enrichedData);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
        toast.error("Failed to load schedule data");
        setIsLoading(false);
      }
    };

    if (facultyList.length > 0 && classroomsList.length > 0 && subjectsList.length > 0) {
      fetchData();
    }
  }, [facultyList, classroomsList, subjectsList]);

  // Create a new schedule item
  const createScheduleItem = (data: any) => {
    try {
      // In a real app, this would be an API call
      const newItem = {
        id: Date.now().toString(),
        ...data,
        faculty: facultyList.find(f => f.id === data.facultyId),
        room: classroomsList.find(r => r.id === data.roomId),
        subject: subjectsList.find(s => s.id === data.subjectId),
        needsRescheduling: false
      };
      
      // Check for conflicts
      const hasConflict = checkForConflicts(newItem);
      
      if (hasConflict) {
        toast.error("Scheduling conflict detected! Please choose different time/room/faculty.");
        return;
      }
      
      setScheduleData(prev => [...prev, newItem]);
      toast.success("Class successfully scheduled");
    } catch (error) {
      console.error("Error creating schedule item:", error);
      toast.error("Failed to create schedule");
    }
  };

  // Delete a schedule item
  const deleteScheduleItem = (id: string) => {
    try {
      // In a real app, this would be an API call
      setScheduleData(prev => prev.filter(item => item.id !== id));
      toast.success("Schedule item deleted");
    } catch (error) {
      console.error("Error deleting schedule item:", error);
      toast.error("Failed to delete schedule item");
    }
  };

  // Reschedule an item
  const rescheduleItem = (id: string, updatedData: any) => {
    try {
      // In a real app, this would be an API call
      const updatedItem = {
        id,
        ...updatedData,
        faculty: facultyList.find(f => f.id === updatedData.facultyId),
        room: classroomsList.find(r => r.id === updatedData.roomId),
        subject: subjectsList.find(s => s.id === updatedData.subjectId),
        needsRescheduling: false
      };
      
      // Check for conflicts (excluding the current item being updated)
      const hasConflict = checkForConflicts(updatedItem, id);
      
      if (hasConflict) {
        toast.error("Scheduling conflict detected! Please choose different time/room/faculty.");
        return Promise.reject("Scheduling conflict");
      }
      
      setScheduleData(prev => 
        prev.map(item => item.id === id ? updatedItem : item)
      );
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error rescheduling item:", error);
      return Promise.reject(error);
    }
  };

  // Mark an item as needing rescheduling
  const markForRescheduling = (id: string, reason: string) => {
    setScheduleData(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, needsRescheduling: true, rescheduleReason: reason } 
          : item
      )
    );
    toast.warning(`A class needs rescheduling: ${reason}`);
  };

  // Check for scheduling conflicts
  const checkForConflicts = (item: any, excludeId?: string) => {
    // Check for faculty conflicts (same faculty, same day and time)
    const facultyConflict = scheduleData.some(existing => 
      existing.id !== excludeId &&
      existing.day.toLowerCase() === item.day.toLowerCase() &&
      existing.facultyId === item.facultyId &&
      timeOverlap(
        existing.startTime, 
        addTime(existing.startTime, existing.duration),
        item.startTime,
        addTime(item.startTime, item.duration)
      )
    );
    
    // Check for room conflicts (same room, same day and time)
    const roomConflict = scheduleData.some(existing => 
      existing.id !== excludeId &&
      existing.day.toLowerCase() === item.day.toLowerCase() &&
      existing.roomId === item.roomId &&
      timeOverlap(
        existing.startTime, 
        addTime(existing.startTime, existing.duration),
        item.startTime,
        addTime(item.startTime, item.duration)
      )
    );
    
    return facultyConflict || roomConflict;
  };
  
  // Helper function to check if time periods overlap
  const timeOverlap = (start1: string, end1: string, start2: string, end2: string) => {
    const s1 = timeToMinutes(start1);
    const e1 = timeToMinutes(end1);
    const s2 = timeToMinutes(start2);
    const e2 = timeToMinutes(end2);
    
    return s1 < e2 && s2 < e1;
  };
  
  // Helper to convert time to minutes for comparison
  const timeToMinutes = (time: string) => {
    const [hours] = time.split(':').map(Number);
    return hours * 60;
  };
  
  // Helper to add duration to time
  const addTime = (time: string, duration: string | number) => {
    const [hours] = time.split(':').map(Number);
    const durationNum = typeof duration === 'string' ? parseFloat(duration) : duration;
    const newHours = hours + durationNum;
    return `${newHours}:00`;
  };

  return {
    scheduleData,
    isLoading,
    createScheduleItem,
    deleteScheduleItem,
    rescheduleItem,
    markForRescheduling
  };
};
