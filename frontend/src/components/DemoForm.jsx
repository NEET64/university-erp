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
import { Cards } from "./Cards";

const formSchema = z.object({
  course: z.string(),
  class: z.string(),
  date: z.date(),
  lecture: z.string().transform((v) => Number(v) || 0),
  students: z.array(z.string()),
});

export const DemoForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      class: "",
      date: new Date(),
      lecture: "",
      students: [],
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const [courses, setCourses] = useState([]);
  const [classes, setClass] = useState([]);
  const [students, setStudents] = useState([]);
  const [classId, setClassId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/course").then((response) => {
      setCourses(response.data.courses);
    });
    axios.get("http://localhost:8000/class").then((response) => {
      setClass(response.data.classes);
    });
  }, []);

  useEffect(() => {
    console.log("here" + classId);
    axios
      .get("http://localhost:8000/student?id=" + classId)
      .then((response) => {
        setStudents(response.data.students);
      });
  }, [classId]);
  return (
    <div className="py-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-lg p-3 w-56 shadow-lg">
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
                  onValueChange={(value) => {
                    setClassId(value);
                    field.onChange;
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
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
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

          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </form>
      </Form>

      <Cards students={students} />
    </div>
  );
};