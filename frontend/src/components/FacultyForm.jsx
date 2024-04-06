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

const facultySchema = z.object({
  name: z.string(),
  courses: z.array(z.string()),
});

export const FacultyForm = () => {
  const form = useForm({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      name: "",
      courses: [],
    },
  });

  const [courses, setCourses] = useState([]);
  const { toast } = useToast();
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
  }, []);

  const onSubmit = (values) => {
    values.courses = selectedCourses;
    axios
      .post("http://localhost:8000/faculty", values)
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
            Add Faculty
            <Plus className="block p-1 rounded-md ml-2 -mb-0.5 bg-slate-200" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle className="text-2xl">Add Faculty</DialogTitle>
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
                      <FormLabel className="text-left">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Faculty Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-left">Courses</Label>
                  <SelectedCoursesCombobox
                    options={courses}
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

export function SelectedCoursesCombobox({
  title,
  options,
  setSelectedCourses,
}) {
  const [selectedValues, setSelectedValuesState] = useState(new Set());

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
                {selectedValues.size > 3 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option._id))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option._id}
                        className="rounded-sm px-1 font-normal">
                        {option.name}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option._id);
                return (
                  <CommandItem
                    key={option._id}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option._id);
                      } else {
                        selectedValues.add(option._id);
                      }
                      const filterValues = new Set(selectedValues);
                      setSelectedValuesState(filterValues);
                      setSelectedCourses(Array.from(filterValues));
                    }}>
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}>
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    <span>{option.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedValuesState(new Set())}
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
