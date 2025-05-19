"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CallsSession } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { PhoneOutgoing } from 'lucide-react';


export const columns: ColumnDef<CallsSession>[] = [
  {
    accessorKey: "caller",
    header: "Caller",
    cell: ({ row }: { row: any }) => {
      const caller = row.getValue("caller") as { fullName: string; imageUrl: string };

      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src={caller?.imageUrl || ""}
              alt={caller?.fullName}
            />
            <AvatarFallback>
              {caller?.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="ml-2">
            {caller?.fullName}
          </span>
        </div>
      )
    },

  },
  {
    accessorKey: "receiver",
    header: "Receiver",
    cell: ({ row }: { row: any }) => {
      const receiver = row.getValue("receiver") as { fullName: string; imageUrl: string };

      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src={receiver?.imageUrl || ""}
              alt={receiver?.fullName}
            />
            <AvatarFallback>
              {receiver?.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="ml-2">
            {receiver?.fullName}
          </span>
        </div>
      )
    },

  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: { row: any }) => {
      const date = new Date(row.getValue("date") as string)
      return (
        <span>
          {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
        </span>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Hour",
    cell: ({ row }: { row: any }) => {
      const date = new Date(row.getValue("date") as string)
      return (
        <span>
          {`${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`}
        </span>
      )
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }: { row: any }) => {
      const duration = row.getValue("duration") as number;
      return (
        <span>
          {duration >= 60
            ? `${Math.floor(duration / 60)} min ${duration % 60} s`
            : `${duration} s`}
        </span>
      );
    },
  }
]