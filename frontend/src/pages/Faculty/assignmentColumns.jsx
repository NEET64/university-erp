import { DataTableColumnHeader } from "./AssignmentDataTable";

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
    accessorKey: "faculty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="faculty" />
    ),
    cell: ({ row }) => {
      const facultyName = row.getValue("faculty")?.name;
      return (
        <div className="flex space-x-2">
          <span className="truncate ">{facultyName}</span>
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
];
