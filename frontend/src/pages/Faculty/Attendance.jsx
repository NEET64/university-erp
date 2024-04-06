import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export const Attendance = () => {
  const [courses, setCourses] = useState([]);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    console.log(values);
  }
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
  }, []);

  return (
    <div className="flex-1 pb-2">
      <Header title="Attendance" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage className="hover:bg-indigo-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="rounded-md flex gap-3">
        <select name="demo" id="demo" className="p-2 hover:bg-red-200">
          <option value="choice1">choice1</option>
          <option value="choice2">choice2</option>
          <option value="choice3">choice3</option>
          <option value="choice4">choice4</option>
        </select>
      </div>
      <div className="gap-2 rounded-md my-2 h-60 flex flex-wrap">
        {courses.map((course, index) => (
          <Card key={index} className="w-60">
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>Code: {course.code}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Credit: {course.credit}</p>
            </CardContent>
            <CardFooter>
              <p>ID: {course._id}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
