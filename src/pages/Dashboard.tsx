
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { Calendar, Clock, Users, BookOpen, School, ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const mockScheduleData = [
  { day: 'Monday', classes: 12, faculty: 8, hours: 18 },
  { day: 'Tuesday', classes: 14, faculty: 10, hours: 21 },
  { day: 'Wednesday', classes: 15, faculty: 9, hours: 20 },
  { day: 'Thursday', classes: 11, faculty: 7, hours: 16 },
  { day: 'Friday', classes: 10, faculty: 6, hours: 14 },
];

const mockSchedule = [
  { id: 1, day: 'Monday', time: '09:00 - 10:30', subject: 'Introduction to Programming', faculty: 'Dr. John Smith', room: 'Room 101' },
  { id: 2, day: 'Monday', time: '11:00 - 12:30', subject: 'Data Structures', faculty: 'Prof. Emily Johnson', room: 'Lab 3' },
  { id: 3, day: 'Tuesday', time: '09:00 - 10:30', subject: 'Database Systems', faculty: 'Dr. Michael Lee', room: 'Room 102' },
  { id: 4, day: 'Wednesday', time: '13:00 - 14:30', subject: 'Algorithms', faculty: 'Dr. Sarah Parker', room: 'Room 101' },
  { id: 5, day: 'Thursday', time: '15:00 - 16:30', subject: 'Computer Networks', faculty: 'Prof. David Wilson', room: 'Lab 2' },
];

const colors = ['#66a3ff', '#ff6666', '#66cc99', '#ffcc66', '#cc99ff'];

const Dashboard = () => {
  const [selectedDay, setSelectedDay] = useState(weekDays[0]);

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Link to="/scheduling">
            <Button className="button-animation">
              <Plus className="mr-2 h-4 w-4" /> Create Schedule
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-panel card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">62</div>
                  <div className="text-xs text-muted-foreground">+8% from last week</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Faculty Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">18</div>
                  <div className="text-xs text-muted-foreground">2 on leave</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-xs text-muted-foreground">5 new this semester</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Classrooms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <School className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">2 under maintenance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2 glass-panel">
            <CardHeader>
              <CardTitle>Weekly Schedule Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockScheduleData} barSize={36} barGap={0}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="classes" name="Classes" radius={[4, 4, 0, 0]}>
                    {mockScheduleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Day Overview</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      const currentIndex = weekDays.indexOf(selectedDay);
                      const newIndex = (currentIndex - 1 + weekDays.length) % weekDays.length;
                      setSelectedDay(weekDays[newIndex]);
                    }}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      const currentIndex = weekDays.indexOf(selectedDay);
                      const newIndex = (currentIndex + 1) % weekDays.length;
                      setSelectedDay(weekDays[newIndex]);
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {selectedDay}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSchedule
                  .filter(s => s.day === selectedDay)
                  .map(schedule => (
                    <motion.div
                      key={schedule.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="p-3 rounded-lg bg-secondary border flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{schedule.time}</span>
                      </div>
                      <div className="font-medium">{schedule.subject}</div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-2">
                        <Users className="h-3.5 w-3.5" />
                        <span>{schedule.faculty}</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-2">
                        <School className="h-3.5 w-3.5" />
                        <span>{schedule.room}</span>
                      </div>
                    </motion.div>
                  ))}
                {mockSchedule.filter(s => s.day === selectedDay).length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    No classes scheduled for this day
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
