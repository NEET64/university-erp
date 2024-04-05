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
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const deleteFaculty = (facultyId) => {
  axios
    .delete(`http://localhost:8000/faculty/${facultyId}`)
    .then((response) => {
      console.log(response.data);

      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting Faculty:", error);
    });
};

export const FacultyColumns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("name");
      return (
        <div className="flex gap-2 items-center">
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
    id: "courses",
    header: "Courses",
    cell: ({ row }) => {
      const data = row.original.courses;
      return (
        <Popover>
          <PopoverTrigger>
            <MoreHorizontal className="h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent className="w-48 rounded-md border">
            <ScrollArea>
              <div>
                <h4 className="mb-2 text-sm font-medium leading-none">
                  Courses
                </h4>
                {data?.map((course, index) => (
                  <div key={index}>
                    <Separator className="my-1 -mx-3" />
                    <span className=" w-[100px] truncate">{course.name}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <PopoverArrow style={{ fill: "grey" }} />
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const isMedium = useMediaQuery({ maxWidth: 680 });
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
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteFaculty(row.original._id)}>
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
                      onClick={() => deleteFaculty(row.original._id)}>
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
                      the course.
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
                  console.log(row.original);
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
