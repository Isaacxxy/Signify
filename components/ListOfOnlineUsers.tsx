'use client'
import { useSocket } from '@/context/SocketContext';
import { useUser } from "@clerk/nextjs";
import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useRouter } from "next/navigation";
import { Separator } from './ui/separator';

const ListOnlineUsers = () => {
  const { user } = useUser();
  const { onlineUsers, handleCall, testStream } = useSocket();
  const router = useRouter();
  return (
    <div className='flex flex-col w-full justify-between relative items- gap-10'>
      <div className='w-full py-4'>
        <h1 className='text-xl font-bold uppercase text-white text-center px-10'>Online Users</h1>
      </div >
      <div className='flex flex-col gap-5 w-fit h-full'>
        {onlineUsers && onlineUsers.map((onlineUser) => {
          if (onlineUser.userId === user?.id) return null
          return (
            <div key={onlineUser.userId} className='flex w-full items-center cursor-pointer gap-4' onClick={() => {
              testStream();
              handleCall(onlineUser);
            }} >
              <Avatar>
                <AvatarImage src={onlineUser.profile.imageUrl || ''} alt={onlineUser.profile.fullName || ''} />
                <AvatarFallback>{onlineUser.profile.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='text-base font-medium uppercase text-white w-fit'>{onlineUser.profile.fullName?.split(' ')[0]}</div>
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default ListOnlineUsers
