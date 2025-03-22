
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
import { 
  BookOpen, 
  Plus, 
  MoreVertical, 
  Search, 
  Clock, 
  User,
  Users,
  CalendarClock
} from 'lucide-react';
import Layout from '@/components/Layout';

type Subject = {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  hours: number;
  type: 'lecture' | 'lab' | 'seminar';
  requiresLab: boolean;
  assignedFaculty: string[];
  prerequisites: string[];
};

const mockSubjects: Subject[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    department: 'Computer Science',
    credits: 3,
    hours: 3,
    type: 'lecture',
    requiresLab: true,
    assignedFaculty: ['Dr. John Smith'],
    prerequisites: [],
  },
  {
    id: '2',
    code: 'CS201',
    name: 'Data Structures',
    department: 'Computer Science',
    credits: 4,
    hours: 4,
    type: 'lecture',
    requiresLab: true,
    assignedFaculty: ['Prof. Emily Johnson'],
    prerequisites: ['CS101'],
  },
  {
    id: '3',
    code: 'CS202',
    name: 'Database Systems',
    department: 'Computer Science',
    credits: 3,
    hours: 3,
    type: 'lecture',
    requiresLab: true,
    assignedFaculty: ['Dr. Michael Lee'],
    prerequisites: ['CS101'],
  },
  {
    id: '4',
    code: 'CS301',
    name: 'Algorithms',
    department: 'Computer Science',
    credits: 4,
    hours: 4,
    type: 'lecture',
    requiresLab: false,
    assignedFaculty: ['Dr. Sarah Parker'],
    prerequisites: ['CS201'],
  },
  {
    id: '5',
    code: 'CS302',
    name: 'Artificial Intelligence',
    department: 'Computer Science',
    credits: 3,
    hours: 3,
    type: 'lecture',
    requiresLab: false,
    assignedFaculty: ['Dr. Sarah Parker'],
    prerequisites: ['CS301'],
  },
  {
    id: '6',
    code: 'CS401',
    name: 'Computer Networks',
    department: 'Computer Science',
    credits: 3,
    hours: 3,
    type: 'lecture',
    requiresLab: true,
    assignedFaculty: ['Prof. David Wilson'],
    prerequisites: ['CS201'],
  },
];

const Subjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const filteredSubjects = mockSubjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEditModal = (subject: Subject) => {
    setSelectedSubject(subject);
    setEditModalOpen(true);
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
          <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>

          <div className="flex items-center space-x-2">
            <div className="relative flex items-center w-full sm:w-[260px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subjects..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="button-animation">
                  <Plus className="mr-2 h-4 w-4" /> Add Subject
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Subject</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new subject.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="code">Subject Code</Label>
                      <Input id="code" placeholder="CS101" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="credits">Credits</Label>
                      <Input id="credits" type="number" placeholder="3" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Subject Name</Label>
                    <Input id="name" placeholder="Introduction to Programming" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" placeholder="Computer Science" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="hours">Hours per Week</Label>
                      <Input id="hours" type="number" placeholder="3" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Type</Label>
                      <select 
                        id="type" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="lecture">Lecture</option>
                        <option value="lab">Lab</option>
                        <option value="seminar">Seminar</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="faculty">Assigned Faculty</Label>
                    <Input id="faculty" placeholder="Dr. John Smith" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="prerequisites">Prerequisites (comma separated)</Label>
                    <Input id="prerequisites" placeholder="CS101, CS201" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="requires-lab"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="requires-lab">Requires Lab</Label>
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
          {filteredSubjects.map((subject) => (
            <motion.div
              key={subject.id}
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
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{subject.name}</CardTitle>
                        </div>
                        <CardDescription className="flex items-center gap-1">
                          <span className="font-mono">{subject.code}</span>
                          <span className="text-xs">•</span>
                          <span>{subject.department}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditModal(subject)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowDetails(subject.id)}>
                          View Details
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
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Faculty: {subject.assignedFaculty.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {subject.hours} hours/week • {subject.credits} credits
                        </span>
                      </div>
                    </div>
                    
                    {subject.prerequisites.length > 0 && (
                      <div className="mt-4">
                        <div className="text-sm font-medium mb-2">Prerequisites:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {subject.prerequisites.map((prereq, index) => (
                            <Badge key={index} variant="secondary" className="font-normal">
                              {prereq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t">
                  <div className="flex items-center justify-between w-full">
                    <Badge variant="outline" className="capitalize">
                      {subject.type}
                    </Badge>
                    {subject.requiresLab && (
                      <Badge className="bg-blue-500/80">
                        Lab Required
                      </Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary"
                      onClick={() => setShowDetails(subject.id)}
                    >
                      Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Dialog open={showDetails === subject.id} onOpenChange={(open) => !open && setShowDetails(null)}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{subject.code}: {subject.name}</DialogTitle>
                    <DialogDescription>
                      Subject details and information.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Department</div>
                        <div className="text-sm">{subject.department}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Type</div>
                        <div className="text-sm capitalize">{subject.type}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Credits</div>
                        <div className="text-sm">{subject.credits}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Hours per Week</div>
                        <div className="text-sm">{subject.hours}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Assigned Faculty</div>
                      <div className="space-y-2">
                        {subject.assignedFaculty.map((faculty, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{faculty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Prerequisites</div>
                      {subject.prerequisites.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {subject.prerequisites.map((prereq, index) => (
                            <Badge key={index} variant="secondary" className="font-normal">
                              {prereq}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">None</div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="detail-requires-lab"
                        checked={subject.requiresLab}
                        disabled
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor="detail-requires-lab">Requires Lab</Label>
                    </div>
                    
                    <div className="p-4 bg-secondary/50 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-3">
                        <CalendarClock className="h-5 w-5 text-primary" />
                        <div className="font-medium">Scheduling Information</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        This subject is typically scheduled as {subject.hours} hours of {subject.type} sessions per week.
                        {subject.requiresLab && " An additional lab session is required for this subject."}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setShowDetails(null)}>Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
        
        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No subjects found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search</p>
          </div>
        )}

        {/* Edit Subject Dialog */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Subject</DialogTitle>
              <DialogDescription>
                Update subject information.
              </DialogDescription>
            </DialogHeader>
            {selectedSubject && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-code">Subject Code</Label>
                    <Input id="edit-code" value={selectedSubject.code} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-credits">Credits</Label>
                    <Input id="edit-credits" type="number" value={selectedSubject.credits} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Subject Name</Label>
                  <Input id="edit-name" value={selectedSubject.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Input id="edit-department" value={selectedSubject.department} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-hours">Hours per Week</Label>
                    <Input id="edit-hours" type="number" value={selectedSubject.hours} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-type">Type</Label>
                    <select 
                      id="edit-type" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={selectedSubject.type}
                    >
                      <option value="lecture">Lecture</option>
                      <option value="lab">Lab</option>
                      <option value="seminar">Seminar</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-faculty">Assigned Faculty (comma separated)</Label>
                  <Input id="edit-faculty" value={selectedSubject.assignedFaculty.join(', ')} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-prerequisites">Prerequisites (comma separated)</Label>
                  <Input id="edit-prerequisites" value={selectedSubject.prerequisites.join(', ')} />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-requires-lab"
                    checked={selectedSubject.requiresLab}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="edit-requires-lab">Requires Lab</Label>
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

export default Subjects;
