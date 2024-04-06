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
import { useToast } from "./ui/use-toast";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";

const StudentSchema = z.object({
  name: z.string(),
  enrollmentNumber: z.string(),
  class: z.string(),
});

export const StudentForm = () => {
  const form = useForm({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      name: "",
      enrollmentNumber: "",
      class: "",
    },
  });

  const [classes, setClass] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
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

  const onSubmit = (values) => {
    axios
      .post("http://localhost:8000/student", values)
      .then((response) => {
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
            Add Student
            <Plus className="block p-1 rounded-md ml-2 -mb-0.5 bg-slate-200" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <Form {...form}>
            <form>
              <DialogHeader>
                <DialogTitle className="text-2xl">Add Student</DialogTitle>
              </DialogHeader>
              <div className="grid w-full items-center gap-4 my-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>Name</FormLabel>
                      <FormControl className="col-span-3">
                        <Input placeholder="Student Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enrollmentNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>Enrollment Number</FormLabel>
                      <FormControl className="col-span-3">
                        <Input placeholder="Enrollment Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>Class</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="col-span-3">
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
              </div>

              <DialogFooter className="mt-2 flex items-center justify-between">
                <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
