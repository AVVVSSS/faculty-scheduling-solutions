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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserRound, Plus, MoreVertical, Mail, Phone, Search, Clock, XCircle, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';

type FacultyMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  subjects: string[];
  status: 'active' | 'on leave' | 'unavailable';
  availability: {
    day: string;
    timeSlots: string[];
  }[];
};

const mockFaculty: FacultyMember[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    email: 'john.smith@university.edu',
    phone: '(555) 123-4567',
    department: 'Computer Science',
    subjects: ['Introduction to Programming', 'Algorithms', 'Machine Learning'],
    status: 'active',
    availability: [
      { day: 'Monday', timeSlots: ['09:00 - 11:00', '13:00 - 15:00'] },
      { day: 'Wednesday', timeSlots: ['09:00 - 11:00', '13:00 - 15:00'] },
      { day: 'Friday', timeSlots: ['09:00 - 11:00'] },
    ],
  },
  {
    id: '2',
    name: 'Prof. Emily Johnson',
    email: 'emily.johnson@university.edu',
    phone: '(555) 234-5678',
    department: 'Computer Science',
    subjects: ['Data Structures', 'Database Systems', 'Web Development'],
    status: 'active',
    availability: [
      { day: 'Tuesday', timeSlots: ['10:00 - 12:00', '14:00 - 16:00'] },
      { day: 'Thursday', timeSlots: ['10:00 - 12:00', '14:00 - 16:00'] },
    ],
  },
  {
    id: '3',
    name: 'Dr. Michael Lee',
    email: 'michael.lee@university.edu',
    phone: '(555) 345-6789',
    department: 'Mathematics',
    subjects: ['Calculus', 'Linear Algebra', 'Discrete Mathematics'],
    status: 'on leave',
    availability: [],
  },
  {
    id: '4',
    name: 'Dr. Sarah Parker',
    email: 'sarah.parker@university.edu',
    phone: '(555) 456-7890',
    department: 'Computer Science',
    subjects: ['Artificial Intelligence', 'Computer Vision', 'Natural Language Processing'],
    status: 'active',
    availability: [
      { day: 'Monday', timeSlots: ['11:00 - 13:00', '15:00 - 17:00'] },
      { day: 'Wednesday', timeSlots: ['11:00 - 13:00', '15:00 - 17:00'] },
      { day: 'Friday', timeSlots: ['11:00 - 13:00'] },
    ],
  },
  {
    id: '5',
    name: 'Prof. David Wilson',
    email: 'david.wilson@university.edu',
    phone: '(555) 567-8901',
    department: 'Computer Science',
    subjects: ['Computer Networks', 'Operating Systems', 'Cybersecurity'],
    status: 'unavailable',
    availability: [],
  },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
  '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
  '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
  '16:00 - 17:00'
];

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState('all');
  const [showAvailability, setShowAvailability] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  const filteredFaculty = mockFaculty.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = tabValue === 'all' || 
                      (tabValue === 'active' && faculty.status === 'active') ||
                      (tabValue === 'unavailable' && (faculty.status === 'on leave' || faculty.status === 'unavailable'));
    
    return matchesSearch && matchesTab;
  });

  const openEditModal = (faculty: FacultyMember) => {
    setSelectedFaculty(faculty);
    setEditModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'on leave':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">On Leave</Badge>;
      case 'unavailable':
        return <Badge variant="destructive">Unavailable</Badge>;
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
          <h1 className="text-3xl font-bold tracking-tight">Faculty</h1>

          <div className="flex items-center space-x-2">
            <div className="relative flex items-center w-full sm:w-[260px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search faculty..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="button-animation">
                  <Plus className="mr-2 h-4 w-4" /> Add Faculty
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Faculty</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new faculty member.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Dr. John Smith" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.smith@university.edu" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="(555) 123-4567" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" placeholder="Computer Science" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subjects">Subjects (comma separated)</Label>
                    <Input id="subjects" placeholder="Introduction to Programming, Algorithms" />
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

        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Faculty</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="unavailable">Unavailable</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFaculty.map((faculty) => (
                <motion.div
                  key={faculty.id}
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
                            <UserRound className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{faculty.name}</CardTitle>
                            <CardDescription>{faculty.department}</CardDescription>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditModal(faculty)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setShowAvailability(faculty.id)}>
                              View Availability
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
                        <div className="flex items-start text-sm">
                          <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span className="text-muted-foreground">{faculty.email}</span>
                        </div>
                        <div className="flex items-start text-sm">
                          <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span className="text-muted-foreground">{faculty.phone}</span>
                        </div>
                        <div className="mt-4">
                          <div className="text-sm font-medium mb-2">Subjects:</div>
                          <div className="flex flex-wrap gap-1.5">
                            {faculty.subjects.map((subject, index) => (
                              <Badge key={index} variant="secondary" className="font-normal">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 border-t">
                      <div className="flex items-center justify-between w-full">
                        <div>{getStatusBadge(faculty.status)}</div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary"
                          onClick={() => setShowAvailability(faculty.id)}
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          Availability
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>

                  <Dialog open={showAvailability === faculty.id} onOpenChange={(open) => !open && setShowAvailability(null)}>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Availability - {faculty.name}</DialogTitle>
                        <DialogDescription>
                          Faculty member's available time slots.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        {faculty.status === 'active' ? (
                          <div className="space-y-4">
                            {days.map((day) => {
                              const dayAvailability = faculty.availability.find(a => a.day === day);
                              return (
                                <div key={day} className="border rounded-md p-3">
                                  <div className="font-medium mb-2">{day}</div>
                                  {dayAvailability ? (
                                    <div className="flex flex-wrap gap-2">
                                      {dayAvailability.timeSlots.map((slot, index) => (
                                        <Badge key={index} className="bg-primary/15 text-primary border border-primary/20 hover:bg-primary/20">
                                          {slot}
                                        </Badge>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-sm text-muted-foreground">No availability</div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center py-10">
                            <div className="text-center">
                              <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                              <p className="text-lg font-medium">Faculty currently unavailable</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {faculty.status === 'on leave' ? 'Faculty member is on leave' : 'Faculty member is not available for scheduling'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button onClick={() => setShowAvailability(null)}>Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
            
            {filteredFaculty.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <UserRound className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No faculty members found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          {/* Other tabs content will be automatically shown by the Tabs component */}
        </Tabs>

        {/* Edit Faculty Dialog */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Faculty</DialogTitle>
              <DialogDescription>
                Update faculty member's information and availability.
              </DialogDescription>
            </DialogHeader>
            {selectedFaculty && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input id="edit-name" value={selectedFaculty.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" value={selectedFaculty.email} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" value={selectedFaculty.phone} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Input id="edit-department" value={selectedFaculty.department} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-subjects">Subjects (comma separated)</Label>
                  <Input id="edit-subjects" value={selectedFaculty.subjects.join(', ')} />
                </div>
                
                <div className="border rounded-md p-4 mt-2">
                  <div className="font-medium mb-4">Availability</div>
                  <div className="space-y-4">
                    {days.map(day => (
                      <div key={day} className="space-y-2">
                        <div className="font-medium text-sm">{day}</div>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.slice(0, 3).map(time => {
                            const isAvailable = selectedFaculty.availability.some(
                              a => a.day === day && a.timeSlots.includes(time)
                            );
                            return (
                              <div key={time} className="flex items-center space-x-2">
                                <Checkbox id={`${day}-${time}`} checked={isAvailable} />
                                <Label htmlFor={`${day}-${time}`} className="text-xs">{time}</Label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
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

export default Faculty;
