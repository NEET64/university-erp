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

const CourseSchema = z.object({
  code: z.string(),
  name: z.string(),
  credit: z.string().transform((v) => Number(v) || 0),
});

export const CourseForm = () => {
  const form = useForm({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      name: "",
      code: "",
      credit: "",
    },
  });
  const { toast } = useToast();

  const onSubmit = (values) => {
    axios
      .post("http://localhost:8000/course", values)
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
    <div className="my-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex p-2">
            Create Course
            <Plus className="block p-1 rounded-md ml-2 -mb-0.5 bg-slate-200" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Create Course</DialogTitle>
              </DialogHeader>
              <DialogDescription className="mb-4 mt-2">
                This will add a new course to the system. Please provide the
                following information.
              </DialogDescription>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left">Course Name</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="Course Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left">Course Code</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="Course Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="credit"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left">Credit</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="0" {...field} />
                    </FormControl>
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
