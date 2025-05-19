"use client"

import CallNotification from '@/components/CallNotification'
import VideoCall from '@/components/VideoCall'
import React from 'react'

function Page() {


  return (
    <div className='h-[80vh] rounded-xl bg-primary-foreground w-fit mx-auto justify-center items-center flex flex-col gap-10'>
      <CallNotification />
      <VideoCall />
    </div>
  )
}

export default Page
