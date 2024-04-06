import { DataTableColumnHeader } from "@/components/DataTable";

// SemYear: 6,
// Term: 1,
// EMI: 1,
// Mode: "Online",
// Date: "01-01-2024 17:40:40",
// Amount: 44937,
// Details: "Pay Type : Gateway",
// Remarks: "SUCCESS IN",
// Print: "Print",
export const FeesColumns = [
  {
    accessorKey: "sem",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Semester" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[40px] truncate">{row.getValue("sem")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "emi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EMI" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[40px] truncate">{row.getValue("emi")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "mode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mode" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("mode")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const dueDate = new Date(row.getValue("date"));

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
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("amount")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "details",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("details")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "remarks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remarks" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("remarks")}</span>
        </div>
      );
    },
  },
];
