"use client"

import CallNotification from '@/components/CallNotification'
import VideoCall from '@/components/VideoCall'
import React from 'react'

function Page() {


  return (
    <div className='h-full m-8 rounded-xl bg-primary-foreground w-fit mx-auto'>
      <CallNotification />
      <VideoCall />
    </div>
  )
}

export default Page
