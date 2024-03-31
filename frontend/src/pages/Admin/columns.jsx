import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ChevronsUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { DataTableColumnHeader } from "./data-table";

const deleteCourse = (classId) => {
  console.log(classId);
  axios
    .delete(`http://localhost:8000/course/${classId}`)
    .then((response) => {
      console.log(response.data);

      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting class:", error);
    });
};

export const columns = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate ">{row.getValue("code")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "credit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Credit" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate">{row.getValue("credit")}</span>
        </div>
      );
    },
  },
  {
    id: "button",
    cell: ({ row }) => {
      return (
        <div className="md:flex hidden gap-2">
          <AlertDialog>
            <AlertDialogTrigger className="hover:bg-red-300 bg-red-200 cursor-pointer flex justify-startselect-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors">
              <Pencil className="mr-2 h-4 w-4" />
              Delete Course
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
                  onClick={() => deleteCourse(row.original._id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger className="hover:bg-amber-300 bg-amber-200 cursor-pointer flex justify-startselect-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors ">
              <Trash2 className="mr-2 h-4 w-4" />
              Edit Course
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
                  onClick={() => deleteCourse(row.original._id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      return (
        <div className="flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex md:hidden">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(course._id)}>
                Copy Course Id
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  console.log(row.original);
                }}>
                View Course
              </DropdownMenuItem>

              <div className="hover:bg-slate-300 cursor-pointer flex justify-start w-full select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Course
              </div>

              <DropdownMenuSeparator />

              <AlertDialog>
                <AlertDialogTrigger className="hover:bg-red-100 cursor-pointer flex justify-start w-full select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Course
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteCourse(row.original._id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
