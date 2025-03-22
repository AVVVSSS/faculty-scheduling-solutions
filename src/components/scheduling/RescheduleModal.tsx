
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ScheduleForm from './ScheduleForm';

type RescheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  item: any | null;
};

const RescheduleModal = ({ isOpen, onClose, onSubmit, item }: RescheduleModalProps) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reschedule Class</DialogTitle>
          <DialogDescription>
            Update the schedule information to reschedule this class.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <ScheduleForm 
            onSubmit={onSubmit} 
            initialValues={{
              day: item.day,
              startTime: item.startTime,
              duration: item.duration,
              subjectId: item.subject?.id || '',
              facultyId: item.faculty?.id || '',
              roomId: item.room?.id || '',
            }} 
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;
