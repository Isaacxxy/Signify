import CallNotification from '@/components/CallNotification'
import ListOnlineUsers from '@/components/ListOfOnlineUsers'
import VideoCall from '@/components/VideoCall'
import React from 'react'

function page() {
  return (
    <div>
      <ListOnlineUsers />
      <CallNotification />
      <VideoCall />
    </div>
  )
}

export default page