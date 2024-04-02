import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().max(30),
  aim: z.string().max(100),
  class: z.string(),
  course: z.string(),
  faculty: z.string(),
});

export const AssignmentForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      aim: "",
      class: "",
      course: "",
      faculty: "660c6c7cb74446ead4053ecc",
    },
  });

  const [course, setCourse] = useState([]);
  const [classes, setClasses] = useState([]);
  const [faculty, setFaculty] = useState("660c6c7cb74446ead4053ecc");
  const { toast } = useToast();

  const onSubmit = (values) => {
    axios
      .post("http://localhost:8000/assignment", values)
      .then((response) => {
        toast({
          title: response.data.message,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/class/faculty/" + faculty)
      .then((response) => {
        setClasses(response.data);
        // console.log("class", response.data);
      });
  }, []);

  useEffect(() => {
    // get courses for curr faculty
    axios.get("http://localhost:8000/faculty/" + faculty).then((response) => {
      //   console.log("coursees", response.data);
      setCourse(response.data);
    });
  }, []);

  return (
    <div className="my-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            Create Assignment
            <Plus className="block p-1 rounded-md ml-2 -mb-0.5 bg-slate-200" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>
                  To create a new assignment , please provide following
                  information.
                </DialogDescription>
              </DialogHeader>

              {/* title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left">Title</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="create website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* aim */}
              <FormField
                control={form.control}
                name="aim"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left">Aim</FormLabel>
                    <FormControl className="col-span-3">
                      <Textarea
                        placeholder="Create linked in with react and mongo with see and create posts functionality "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* classes */}
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left">Class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="col-span-3">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classes.map((c) => {
                          return (
                            <SelectItem key={c.name} value={c._id}>
                              {c.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* course */}
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left">Course</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="col-span-3">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {course.map((c) => {
                          return (
                            <SelectItem key={c.name} value={c._id}>
                              {c.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
