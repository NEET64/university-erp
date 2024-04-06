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
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PopoverArrow } from "@radix-ui/react-popover";

const deleteCourse = (courseId) => {
  axios
    .delete(`http://localhost:8000/course/${courseId}`)
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

export const CourseColumns = [
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
    id: "faculties",
    header: "Faculties",
    cell: ({ row }) => {
      const data = row.original.faculties;
      return (
        <Popover>
          <PopoverTrigger>
            <div className="flex -space-x-4 rtl:space-x-reverse">
              {data?.map((faculty, index) => (
                <img
                  key={index}
                  src={`https://api.multiavatar.com/${faculty.name}.svg`}
                  alt="student_avatar"
                  className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                  style={{ zIndex: data?.length + index }}
                />
              ))}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 rounded-md border">
            <ScrollArea>
              <div>
                <h4 className="mb-2 text-sm font-medium leading-none">
                  Faculties
                </h4>
                {data?.map((tag, index) => (
                  <div key={index}>
                    <Separator className="my-1" />
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.multiavatar.com/${tag.name}.svg`}
                        alt="student_avatar"
                        className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                      />
                      <span className=" w-[100px] truncate">{tag.name}</span>
                    </div>
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
    cell: ({ row }) => {
      const isMedium = useMediaQuery({ maxWidth: 768 });
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
                        onClick={() => deleteCourse(row.original._id)}>
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
                      onClick={() => deleteCourse(row.original._id)}>
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
