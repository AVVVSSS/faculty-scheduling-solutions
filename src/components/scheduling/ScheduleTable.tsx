
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ScheduleTableProps = {
  data: any[];
  onReschedule: (item: any) => void;
  onDelete: (id: string) => void;
};

const formatTime = (time: string) => {
  const [hour] = time.split(':');
  const hourNum = parseInt(hour);
  return `${hourNum > 12 ? hourNum - 12 : hourNum}:00 ${hourNum >= 12 ? 'PM' : 'AM'}`;
};

const ScheduleTable = ({ data, onReschedule, onDelete }: ScheduleTableProps) => {
  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Faculty</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No schedule items found
              </TableCell>
            </TableRow>
          ) : (
            data.sort((a, b) => {
              // Sort by day first
              const dayA = weekDays.indexOf(a.day.toLowerCase());
              const dayB = weekDays.indexOf(b.day.toLowerCase());
              if (dayA !== dayB) return dayA - dayB;
              
              // Then sort by time
              const timeA = parseInt(a.startTime.split(':')[0]);
              const timeB = parseInt(b.startTime.split(':')[0]);
              return timeA - timeB;
            }).map((item) => (
              <TableRow key={item.id}>
                <TableCell>{capitalizeFirstLetter(item.day)}</TableCell>
                <TableCell>
                  {formatTime(item.startTime)} - {formatTime(`${(parseInt(item.startTime.split(':')[0]) + parseFloat(item.duration))}:00`)}
                </TableCell>
                <TableCell>{item.subject?.name || 'Unknown'}</TableCell>
                <TableCell>{item.faculty?.name || 'Unknown'}</TableCell>
                <TableCell>{item.room?.name || 'Unknown'}</TableCell>
                <TableCell>
                  {item.needsRescheduling ? (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" /> 
                      Needs Rescheduling
                    </Badge>
                  ) : (
                    <Badge variant="outline">Scheduled</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    onClick={() => onReschedule(item)} 
                    size="sm" 
                    variant="outline"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={() => onDelete(item.id)} 
                    size="sm" 
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScheduleTable;
