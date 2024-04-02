import { DataTableColumnHeader } from "./AssignmentDataTable";
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
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const deleteCourse = (AssignmentId) => {
  axios
    .delete(`http://localhost:8000/assignment/${AssignmentId}`)
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting assignment:", error);
    });
};

// title , faculty , course , due date
export const AssignmentColumns = [
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
      return (
        <>
          <AlertDialog>
            <AlertDialogTrigger className="hover:bg-red-300 bg-red-200 cursor-pointer flex justify-startselect-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteCourse(row.original._id)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
