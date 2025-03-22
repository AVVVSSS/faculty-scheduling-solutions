
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger, 
  DialogFooter, 
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { School, Plus, MoreVertical, Search, Users, Calendar, Maximize2, XCircle, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';

type Classroom = {
  id: string;
  name: string;
  building: string;
  capacity: number;
  type: 'lecture hall' | 'lab' | 'seminar room';
  equipment: string[];
  status: 'available' | 'occupied' | 'maintenance';
  schedule?: {
    day: string;
    time: string;
    subject: string;
    faculty: string;
  }[];
};

const mockClassrooms: Classroom[] = [
  {
    id: '1',
    name: 'Room 101',
    building: 'Computer Science Building',
    capacity: 60,
    type: 'lecture hall',
    equipment: ['Projector', 'Whiteboard', 'Computer', 'Audio System'],
    status: 'available',
    schedule: [
      { day: 'Monday', time: '09:00 - 10:30', subject: 'Introduction to Programming', faculty: 'Dr. John Smith' },
      { day: 'Wednesday', time: '13:00 - 14:30', subject: 'Algorithms', faculty: 'Dr. Sarah Parker' },
    ],
  },
  {
    id: '2',
    name: 'Lab 1',
    building: 'Computer Science Building',
    capacity: 30,
    type: 'lab',
    equipment: ['Computers', 'Projector', 'Specialized Software'],
    status: 'occupied',
    schedule: [
      { day: 'Tuesday', time: '10:00 - 12:30', subject: 'Database Lab', faculty: 'Prof. Emily Johnson' },
      { day: 'Thursday', time: '14:00 - 16:30', subject: 'Programming Lab', faculty: 'Dr. John Smith' },
    ],
  },
  {
    id: '3',
    name: 'Room 203',
    building: 'Mathematics Building',
    capacity: 40,
    type: 'lecture hall',
    equipment: ['Whiteboard', 'Projector'],
    status: 'maintenance',
  },
  {
    id: '4',
    name: 'Lab 2',
    building: 'Computer Science Building',
    capacity: 25,
    type: 'lab',
    equipment: ['Computers', 'Specialized Hardware', 'Networking Equipment'],
    status: 'available',
    schedule: [
      { day: 'Thursday', time: '15:00 - 16:30', subject: 'Computer Networks', faculty: 'Prof. David Wilson' },
    ],
  },
  {
    id: '5',
    name: 'Seminar Room 1',
    building: 'Main Building',
    capacity: 20,
    type: 'seminar room',
    equipment: ['Whiteboard', 'Round Table', 'Projector'],
    status: 'available',
  },
  {
    id: '6',
    name: 'Room 102',
    building: 'Computer Science Building',
    capacity: 55,
    type: 'lecture hall',
    equipment: ['Projector', 'Whiteboard', 'Computer'],
    status: 'occupied',
    schedule: [
      { day: 'Tuesday', time: '09:00 - 10:30', subject: 'Database Systems', faculty: 'Dr. Michael Lee' },
    ],
  },
];

const Classrooms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSchedule, setShowSchedule] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);

  const filteredClassrooms = mockClassrooms.filter(classroom => 
    classroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classroom.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classroom.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEditModal = (classroom: Classroom) => {
    setSelectedClassroom(classroom);
    setEditModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500">Available</Badge>;
      case 'occupied':
        return <Badge variant="secondary">Occupied</Badge>;
      case 'maintenance':
        return <Badge variant="destructive">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Classrooms</h1>

          <div className="flex items-center space-x-2">
            <div className="relative flex items-center w-full sm:w-[260px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search classrooms..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="button-animation">
                  <Plus className="mr-2 h-4 w-4" /> Add Classroom
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Classroom</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new classroom.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Classroom Name</Label>
                    <Input id="name" placeholder="Room 101" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="building">Building</Label>
                    <Input id="building" placeholder="Computer Science Building" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="60" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Input id="type" placeholder="Lecture Hall" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="equipment">Equipment (comma separated)</Label>
                    <Input id="equipment" placeholder="Projector, Whiteboard, Computer" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClassrooms.map((classroom) => (
            <motion.div
              key={classroom.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-panel h-full flex flex-col card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <School className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{classroom.name}</CardTitle>
                        <CardDescription>{classroom.building}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditModal(classroom)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowSchedule(classroom.id)}>
                          View Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Capacity: {classroom.capacity}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Maximize2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground capitalize">Type: {classroom.type}</span>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">Equipment:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {classroom.equipment.map((item, index) => (
                          <Badge key={index} variant="secondary" className="font-normal">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t">
                  <div className="flex items-center justify-between w-full">
                    <div>{getStatusBadge(classroom.status)}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary"
                      onClick={() => setShowSchedule(classroom.id)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Dialog open={showSchedule === classroom.id} onOpenChange={(open) => !open && setShowSchedule(null)}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Schedule - {classroom.name}</DialogTitle>
                    <DialogDescription>
                      Classroom's current schedule.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    {classroom.status !== 'maintenance' ? (
                      classroom.schedule && classroom.schedule.length > 0 ? (
                        <div className="space-y-4">
                          {classroom.schedule.map((item, index) => (
                            <div key={index} className="border rounded-md p-3">
                              <div className="flex justify-between mb-2">
                                <div className="font-medium">{item.day}</div>
                                <div className="text-sm text-muted-foreground">{item.time}</div>
                              </div>
                              <div className="text-sm">{item.subject}</div>
                              <div className="text-sm text-muted-foreground">{item.faculty}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center py-10">
                          <div className="text-center">
                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                            <p className="text-lg font-medium">No classes scheduled</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              This classroom is available for scheduling
                            </p>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center py-10">
                        <div className="text-center">
                          <XCircle className="h-12 w-12 text-destructive mx-auto mb-3" />
                          <p className="text-lg font-medium">Classroom unavailable</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            This classroom is currently under maintenance
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setShowSchedule(null)}>Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
        
        {filteredClassrooms.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <School className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No classrooms found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search</p>
          </div>
        )}

        {/* Edit Classroom Dialog */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Classroom</DialogTitle>
              <DialogDescription>
                Update classroom information.
              </DialogDescription>
            </DialogHeader>
            {selectedClassroom && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Classroom Name</Label>
                  <Input id="edit-name" value={selectedClassroom.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-building">Building</Label>
                  <Input id="edit-building" value={selectedClassroom.building} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-capacity">Capacity</Label>
                  <Input id="edit-capacity" type="number" value={selectedClassroom.capacity} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Input id="edit-type" value={selectedClassroom.type} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-equipment">Equipment (comma separated)</Label>
                  <Input id="edit-equipment" value={selectedClassroom.equipment.join(', ')} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <select 
                    id="edit-status" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedClassroom.status}
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </Layout>
  );
};

export default Classrooms;
