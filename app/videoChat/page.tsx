import CallNotification from '@/components/CallNotification'
import Chat from '@/components/Chat'
import ListOnlineUsers from '@/components/ListOfOnlineUsers'
import VideoCall from '@/components/VideoCall'
import React from 'react'

function page() {
  return (
    <div>
      <ListOnlineUsers />
      <CallNotification />
      <VideoCall />
      {/* <Chat /> */}
    </div>
  )
}

export default page