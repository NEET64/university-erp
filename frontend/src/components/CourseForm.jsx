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
            Create Course
            <Plus className="block p-1 rounded-md ml-2 -mb-0.5 bg-slate-200" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle className="text-2xl">Create Course</DialogTitle>
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
                      <FormLabel className="text-left">Course Name</FormLabel>
                      <FormControl>
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
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel className="text-left">Course Code</FormLabel>
                      <FormControl>
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
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel className="text-left">Credit</FormLabel>
                      <FormControl>
                        <Input placeholder="Course Credits" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
