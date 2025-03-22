
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Layout from '@/components/Layout';
import ScheduleForm from '@/components/scheduling/ScheduleForm';
import ScheduleTable from '@/components/scheduling/ScheduleTable';
import RescheduleModal from '@/components/scheduling/RescheduleModal';
import { useScheduleData } from '@/hooks/useScheduleData';

const Scheduling = () => {
  const { 
    scheduleData, 
    isLoading, 
    createScheduleItem, 
    deleteScheduleItem, 
    rescheduleItem 
  } = useScheduleData();
  
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const handleReschedule = (item: any) => {
    setSelectedItem(item);
    setIsRescheduleModalOpen(true);
  };

  const handleRescheduleSubmit = async (updatedItem: any) => {
    try {
      await rescheduleItem(selectedItem.id, updatedItem);
      toast.success("Class successfully rescheduled");
      setIsRescheduleModalOpen(false);
    } catch (error) {
      toast.error("Failed to reschedule class");
      console.error(error);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Class Scheduling</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 glass-panel">
            <CardHeader>
              <CardTitle>Create Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <ScheduleForm onSubmit={createScheduleItem} />
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2 glass-panel">
            <CardHeader>
              <CardTitle>Current Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">Loading...</div>
              ) : (
                <ScheduleTable 
                  data={scheduleData} 
                  onReschedule={handleReschedule}
                  onDelete={deleteScheduleItem}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        onSubmit={handleRescheduleSubmit}
        item={selectedItem}
      />
    </Layout>
  );
};

export default Scheduling;
