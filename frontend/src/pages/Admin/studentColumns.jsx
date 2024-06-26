import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { DataTableColumnHeader } from "../../components/DataTable";
import { useMediaQuery } from "react-responsive";
import { toast } from "@/components/ui/use-toast";

const deleteStudent = (studentId) => {
  axios
    .delete(`http://localhost:8000/student/${studentId}`)
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => {
      toast({
        variant: "destructive",
        title: err.message,
      });
    });
};

export const StudentColumns = [
  {
    accessorKey: "enrollmentNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Enrollment No." />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[40px] truncate">
            {row.getValue("enrollmentNumber")}
          </span>
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
      const name = row.getValue("name");
      return (
        <div className="flex w-[130px] gap-2 items-center">
          <img
            src={`https://api.multiavatar.com/${name}.svg`}
            alt="student_avatar"
            className="w-8 h-8 rounded-md"
          />
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "class.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Class" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate">{row.original.class.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "class.branch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="md:w-full w-[100px] truncate md:text-wrap">
            {row.original.class.branch}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const isMedium = useMediaQuery({ maxWidth: 1200 });
      return (
        <>
          {isMedium ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    toast({
                      title: row.original.name,
                      discription: JSON.stringify(row.original),
                    });
                    console.log(row.original);
                  }}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Student
                </DropdownMenuItem>

                <div className="hover:bg-slate-300 cursor-pointer flex justify-start w-full select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Student
                </div>

                <DropdownMenuSeparator />

                <AlertDialog>
                  <AlertDialogTrigger className="hover:bg-red-100 cursor-pointer flex justify-start w-full select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Student
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteStudent(row.original._id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex  gap-2">
              <AlertDialog>
                <AlertDialogTrigger className=" text-black text-xs hover:bg-red-300 bg-red-200 cursor-pointer flex justify-startselect-none items-center rounded-md px-3 py-1.5 outline-none transition-colors">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
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
                      className="bg-red-400 hover:bg-red-500"
                      onClick={() => deleteStudent(row.original._id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger className=" text-black text-xs hover:bg-amber-300 bg-amber-200 cursor-pointer flex justify-startselect-none items-center rounded-md px-3 py-1.5 outline-none transition-colors">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently change
                      the student.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                className=" text-black text-xs font-normal hover:bg-emerald-300 bg-emerald-200 cursor-pointer flex justify-startselect-none items-center rounded-md px-3 py-1.5 outline-none transition-colors"
                onClick={() => {
                  toast({
                    title: row.original.name,
                    description: JSON.stringify(row.original),
                  });
                }}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
            </div>
          )}
        </>
      );
    },
  },
];
