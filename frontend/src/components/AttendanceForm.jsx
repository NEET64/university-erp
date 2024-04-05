import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

import axios from "axios";
import { useEffect, useState } from "react";

import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ToastDescription } from "./ui/toast";

const formSchema = z.object({
  course: z.string(),
  class: z.string(),
  date: z.date(),
  lecture: z.string().transform((v) => Number(v) || 0),
  students: z.array(z.string()),
});

export const AttendanceForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      class: "",
      date: new Date(),
      lecture: "1",
      students: [],
    },
  });

  const onSubmit = (values) => {
    values.faculty = "65c5e6db85c4191c88d6e2ce";
    axios
      .post("http://localhost:8000/attendance", values)
      .then((response) => {
        console.log(response.data.data);
        const formattedValues = convertDataToHTML(response.data.data);
        toast({
          title: response.data.message,
          description: (
            <ToastDescription
              dangerouslySetInnerHTML={{
                __html: formattedValues,
              }}></ToastDescription>
          ),
        });
        navigate("/faculty/attendance/view", { replace: true });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  };

  function convertDataToHTML(data) {
    return `
      <div>
        <p><strong>Branch:</strong> ${data.class.branch}</p>
        <p><strong>Course Name:</strong> ${data.course.name}</p>
        <p><strong>Course Code:</strong> ${data.course.code}</p>
        <p><strong>Date:</strong> ${new Date(data.date)
          .toISOString()
          .slice(0, 10)}</p>
        <p><strong>Lecture:</strong> ${data.lecture}</p>
      </div>
    `;
  }
  const [courses, setCourses] = useState([]);
  const [classes, setClass] = useState([]);
  const [students, setStudents] = useState([]);
  const [classId, setClassId] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/course")
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
    axios
      .get("http://localhost:8000/class")
      .then((response) => {
        setClass(response.data.classes);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  }, []);

  useEffect(() => {
    if (classId !== "") {
      axios
        .get("http://localhost:8000/student?id=" + classId)
        .then((response) => {
          setStudents(response.data.students);
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: err.message,
          });
        });
    }
  }, [classId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg p-3 my-2 shadow-lg flex justify-start gap-3">
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses.map((course, index) => (
                      <SelectItem key={index} value={course._id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <Select
                  // onValueChange={field.onChange}
                  onValueChange={(event) => {
                    // Update state or call an action here
                    setClassId(event); // Assuming setClassId updates state
                    field.onChange(event); // Call field.onChange if necessary
                  }}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classes.map((_class, index) => (
                      <SelectItem key={index} value={_class._id}>
                        {_class.name}
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
            name="lecture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lectures</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Lecture" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem key="1" value="1">
                      1
                    </SelectItem>
                    <SelectItem key="2" value="2">
                      2
                    </SelectItem>
                    <SelectItem key="3" value="3">
                      3
                    </SelectItem>
                    <SelectItem key="4" value="4">
                      4
                    </SelectItem>
                    <SelectItem key="5" value="5">
                      5
                    </SelectItem>
                    <SelectItem key="6" value="6">
                      6
                    </SelectItem>
                    <SelectItem key="7" value="7">
                      7
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-56 justify-between">
                <FormLabel className="py-1">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        {students.length > 0 && (
          <div className="bg-white p-2 rounded-lg mb-2">
            <FormField
              control={form.control}
              name="students"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Students</FormLabel>
                  </div>
                  {students.map((student) => (
                    <FormField
                      key={student._id}
                      control={form.control}
                      name="students"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={student._id}
                            className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(student._id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        student._id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== student._id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-lg font-normal">
                              {student.name.toUpperCase()}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Submit</Button>
          </AlertDialogTrigger>
          <AlertDialogContent side="top">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Attendance Submission</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to submit the attendance?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const values = form.getValues();
                  onSubmit(values);
                }}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};
