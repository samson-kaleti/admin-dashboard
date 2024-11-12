"use client";
import { useState } from "react";
import { Search, FileText, Briefcase, Users, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useGetStudents } from "../../hooks/students/useGetStudents";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/loader";

type Student = {
  _id: number;
  username: string;
  course: string;
  printDocuments: string[];
  internshipApplications: string[];
};

export default function StudentDetailsPage() {
  const { data: students = [], isLoading, error } = useGetStudents();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const router = useRouter();
  const collegeList = [
    "College of Engineering",
    "Business School",
    "Arts and Sciences",
    "Medical School",
  ];

 

if (isLoading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner />
    </div>
  );
}

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto mt-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            No Student Data Available
          </CardTitle>
          <CardDescription className="text-xl mt-2">
            This section is visible only to administrators
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="bg-secondary/10 rounded-full p-6 mb-6">
            <Users className="h-24 w-24 text-secondary" />
          </div>
          <p className="text-center text-muted-foreground mb-6 max-w-md">
            It looks like there are no student records in the system yet. As an
            administrator, you have the ability to add new students or import
            existing data.
          </p>
          <div className="flex gap-4">
            <Button
              className="flex items-center gap-2"
              onClick={() => router.push("/login")}
            >
              <ShieldAlert className="h-4 w-4" />
              Sign In as Administrator
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl lg:text-3xl text-primary">
          Student Details
        </CardTitle>
        <CardDescription className="text-sm md:text-base text-gray-400">
          View and manage student information, print documents, and internship
          applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="w-full sm:w-1/3">
            <Label
              htmlFor="college-select"
              className="text-sm font-medium mb-1.5 block text-secondary"
            >
              Select College
            </Label>
            <Select onValueChange={(value) => setSelectedCollege(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a College" />
              </SelectTrigger>
              <SelectContent>
                {collegeList.map((college, index) => (
                  <SelectItem key={index} value={college}>
                    {college}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label
              htmlFor="search"
              className="text-sm font-medium mb-1.5 block text-secondary"
            >
              Search Students
            </Label>
            <div className="flex gap-2">
              <Input
                id="search"
                placeholder="Search by name, ID, or course"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="icon" className="shrink-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Registration ID
                </TableHead>
                <TableHead className="hidden md:table-cell">Course</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student: Student) => (
                <TableRow key={student._id}>
                  <TableCell className="font-medium">
                    <div>{student.username}</div>
                    <div className="text-sm text-muted-foreground sm:hidden">
                      {student.username}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {student._id}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {student.course}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedStudent(student)}
                            className="h-8 w-8"
                          >
                            <FileText className="h-4 w-4 text-secondary" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="text-lg">
                              Print Documents
                            </DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <h3 className="font-medium text-base mb-3">
                              Documents for {selectedStudent?.username}
                            </h3>
                            <ul className="space-y-2">
                              {selectedStudent?.printDocuments.map(
                                (doc, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    {doc}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedStudent(student)}
                            className="h-8 w-8"
                          >
                            <Briefcase className="h-4 w-4 text-primary" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="text-lg">
                              Internship Applications
                            </DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <h3 className="font-medium text-base mb-3">
                              Applications for {selectedStudent?.username}
                            </h3>
                            <ul className="space-y-2">
                              {selectedStudent?.internshipApplications.map(
                                (app, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    {app}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
