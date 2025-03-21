'use client'
import { useSocket } from '@/context/SocketContext';
import { useUser } from "@clerk/nextjs";
import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const ListOnlineUsers = () => {
  const { user } = useUser();
  const { onlineUsers, handleCall, testStream } = useSocket();
  return (
    <div className='flex flex-col gap-4 w-full rounded-md md:items-center md:justify-center bg-black antialiased bg-grid-white/[0.02] relative mt-[100px]'>
      <h1 className='text-lg font-bold text-white'>Online Users</h1>
      <div className='flex gap-4'>
        {onlineUsers && onlineUsers.map((onlineUser) => {
          if (onlineUser.userId === user?.id) return null
          return (
            <div key={onlineUser.userId} className='flex flex-col items-center gap-1 cursor-pointer' onClick={() => {
              testStream();
              handleCall(onlineUser);
            }} >
              <Avatar>
                <AvatarImage src={onlineUser.profile.imageUrl || ''} alt={onlineUser.profile.fullName || ''} className='h-[40px] w-[40px]' />
                <AvatarFallback>{onlineUser.profile.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='text-xs'>{onlineUser.profile.fullName?.split(' ')[0]}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListOnlineUsers
