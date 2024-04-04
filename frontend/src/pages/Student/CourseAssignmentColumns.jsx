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
import axios from "axios";
import {
  ArrowDown,
  ArrowDownNarrowWide,
  ArrowUp,
  ArrowUpWideNarrow,
  ChevronsUpDown,
  Eye,
  EyeOff,
  Upload,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ToastAction } from "@/components/ui/toast";

// title , faculty , course , due date
export const CourseAssignmentColumns = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate ">{row.getValue("title")}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="course" />
    ),
    cell: ({ row }) => {
      const courseName = row.getValue("course")?.name;
      return (
        <div className="flex space-x-2">
          <span className="truncate ">{courseName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "class",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="class" />
    ),
    cell: ({ row }) => {
      const className = row.getValue("class")?.name;
      return (
        <div className="flex space-x-2">
          <span className="truncate ">{className}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dueOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="due date" />
    ),
    cell: ({ row }) => {
      // Get the date value from the row
      const dueDate = new Date(row.getValue("dueOn"));

      // Check if the dueDate is valid and then format it
      const formattedDueDate = dueDate ? dueDate.toLocaleDateString() : "";

      return (
        <div className="flex space-x-2">
          {/* Render the formatted dueDate */}
          <span className="truncate">{formattedDueDate}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { toast } = useToast();
      console.log(row.original.aim);
      console.log(row.original.title);
      console.log(row.original.course.name);
      console.log(row.original.course.code);

      const dueDate = new Date(row.original.dueOn).toLocaleDateString();
      const postDate = new Date(row.original.postedOn).toLocaleDateString();

      return (
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger className="hover:bg-sky-300 bg-sky-200 cursor-pointer flex justify-startselect-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors">
              <Eye className="mr-2 h-4 w-4" />
              view
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {row.original.faculty.name} has posted new Assignment
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {row.original.title}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <p className="mt-3 ">Aim : {row.original.aim}</p>
              <p className="mt-1 ">Course : {row.original.course.name}</p>
              <p className="mt-1 ">Course code : {row.original.course.code}</p>

              <div className="flex justify-between mb-2 mt-1">
                <p className="my-1">Post : {postDate} </p>
                <p className="my-1">Due : {dueDate}</p>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger className="hover:bg-green-300 bg-green-200 cursor-pointer flex justify-startselect-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors">
              <Upload className="mr-2 h-4 w-4" />
              submit
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  submit the assignment here
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    console.log("submit here");
                  }}
                >
                  Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

const DataTableColumnHeader = ({ column, title, className }) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowDownNarrowWide className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowUpWideNarrow className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
