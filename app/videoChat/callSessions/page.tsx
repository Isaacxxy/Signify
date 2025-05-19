'use client';
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { CallsSession } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

interface UserInfo {
  fullName: string;
  imageUrl: string | null;
}

export default function Page() {
  const [userInfos, setUserInfos] = useState<Record<string, UserInfo>>({});
  const [calls, setCalls] = useState<CallsSession[]>([]);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchCalls = async () => {
      const res = await fetch(`/api/callsSessions?idUser=${userId}`);
      const data = await res.json();
      setCalls(data);
    };

    fetchCalls();
  }, [userId]);

  useEffect(() => {
    if (calls.length === 0) return;

    const fetchUserInfos = async () => {
      const callerIds = calls.map((call) => call.callerId).filter(Boolean) as string[];
      const receiverIds = calls.map((call) => call.receiverId).filter(Boolean) as string[];

      const uniqueIds = Array.from(new Set([...callerIds, ...receiverIds])).filter(
        (id) => id !== null && id !== undefined
      );

      if (uniqueIds.length === 0) return;

      const infos = await Promise.all(
        uniqueIds.map(async (userId) => {
          const res = await fetch(`/api/clerk-users?id=${userId}`);
          return res.json();
        })
      );

      const userInfoMap = infos.reduce((acc, info) => {
        acc[info.id] = {
          fullName: info.fullName,
          imageUrl: info.imageUrl,
        };
        return acc;
      }, {} as Record<string, UserInfo>);

      setUserInfos(userInfoMap);
    };

    fetchUserInfos();
  }, [calls]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Call Sessions</h1>
      <DataTable
        columns={columns}
        data={calls.map((call) => ({
          ...call,
          caller: userInfos[call.callerId],
          receiver: userInfos[call.receiverId],
        }))}
      />
    </div>
  );
}
