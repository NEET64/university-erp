import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Plus, PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";

const classSchema = z.object({
  name: z.string(),
  branch: z.string(),
  semester: z.string().transform((v) => Number(v) || 0),
  courseTeaching: z.array(
    z.object({
      courseId: z.string(),
      facultyId: z.string(),
    })
  ),
  coordinatorId: z.string(),
});

export const ClassForm = () => {
  const form = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      branch: "",
      semester: "",
      courseTeaching: [],
      coordinatorId: "",
    },
  });

  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/course")
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
    axios
      .get("http://localhost:8000/faculty")
      .then((response) => {
        setFaculties(response.data.faculties);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
    axios
      .get("http://localhost:8000/branch")
      .then((response) => {
        setBranches(response.data.branches);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  }, []);

  const onSubmit = (values) => {
    values.courseTeaching = selectedCourses.map((courseFacultyPair) => {
      return {
        courseId: courseFacultyPair[0],
        facultyId: courseFacultyPair[1],
      };
    });

    axios
      .post("http://localhost:8000/class", values)
      .then((response) => {
        console.log(response.data);
        toast({
          title: response.data.message,
        });

        window.location.reload();
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex p-2">
            Create Class
            <Plus className="block p-1 rounded-md ml-2 -mb-0.5 bg-slate-200" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[450px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle className="text-2xl">Create Class</DialogTitle>
              </DialogHeader>
              <DialogDescription className="mb-4">
                Please provide the following information.
              </DialogDescription>
              <div className="grid w-full items-center gap-4 my-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel className="text-left">Class Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Class Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>Branch</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Branch" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="h-64">
                          {branches.map((branch, index) => (
                            <SelectItem key={index} value={branch}>
                              {branch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel className="text-left">Semester</FormLabel>
                      <FormControl>
                        <Input placeholder="Semester" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coordinatorId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>Class Coordinator</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {faculties.map((faculty, index) => (
                            <SelectItem key={index} value={faculty._id}>
                              {faculty.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-left">Courses</Label>
                  <FacultyCourseInput
                    courses={courses}
                    faculties={faculties}
                    title="Courses"
                    setSelectedCourses={setSelectedCourses}
                  />
                </div>
              </div>
              <DialogFooter className="mt-4 flex items-center justify-center">
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export function FacultyCourseInput({
  title,
  courses,
  faculties,
  setSelectedCourses,
}) {
  const [selectedValues, setSelectedValuesState] = useState(new Map());

  const handleCourseSelect = (courseId, isSelected) => {
    setSelectedValuesState((prevSelectedValues) => {
      const newSelectedValues = new Map(prevSelectedValues);
      if (isSelected) {
        return newSelectedValues.set(courseId, ""); // Set initial faculty to empty string
      } else {
        newSelectedValues.delete(courseId);
        return newSelectedValues;
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="flex justify-start">
        <Button variant="outline" className="bordered col-span-3 px-2">
          <PlusCircleIcon className="p-1" />
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="space-x-1 flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  courses
                    .filter((course) => selectedValues.has(course._id))
                    .map((course) => (
                      <Badge
                        variant="secondary"
                        key={course._id}
                        className="rounded-sm px-1 font-normal">
                        {course.name}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {courses.map((course) => {
                let isSelected = selectedValues.has(course._id);
                const selectedFacultyId = selectedValues.get(course._id) || ""; // Get existing faculty ID

                return (
                  <CommandItem
                    key={course._id}
                    onSelect={() =>
                      handleCourseSelect(course._id, !isSelected)
                    }>
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}>
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <span>{course.name}</span>
                      {isSelected && (
                        <Select
                          value={selectedFacultyId} // Pre-select existing faculty
                          onValueChange={(facultyId) => {
                            const newSelectedValues = new Map(selectedValues);
                            newSelectedValues.set(course._id, facultyId);
                            setSelectedValuesState(newSelectedValues);
                            setSelectedCourses(
                              Array.from(newSelectedValues.entries())
                            );
                            console.log(
                              Array.from(newSelectedValues.entries())
                            );
                          }}>
                          <SelectTrigger className="w-[150px] h-8 -my-1 text-left ">
                            <SelectValue placeholder="Select Faculty" />
                          </SelectTrigger>
                          <SelectContent>
                            {faculties.map((faculty, index) => (
                              <SelectItem key={index} value={faculty._id}>
                                {faculty.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedValuesState(new Map())}
                    className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
