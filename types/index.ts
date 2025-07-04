import { User } from "@clerk/nextjs/server";
import Peer from "simple-peer";
import * as tf from "@tensorflow/tfjs";

export type SocketUser = {
  userId: string;
  socketId: string;
  profile: User;
};

export type OnGoingCall = {
  participants: Participants;
  isRinging: boolean;
};

export type Participants = {
  caller: SocketUser;
  receiver: SocketUser;
};

export type PeerData = {
  peerConnection: Peer.Instance;
  stream: MediaStream | undefined;
  participantUser: SocketUser;
};

export type SocketMessage = {
  senderId: string;
  text: string;
};
