import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './message.service';

@WebSocketGateway({
  cors: { origin: 'http://localhost:4200' },
})
export class MessagesGateway {
  @WebSocketServer() server: Server;
  private onlineUsers = new Map<number, string>();

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('register')
  handleRegister(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    this.onlineUsers.set(userId, client.id);
    console.log(`User ${userId} online (socketId=${client.id})`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody()
    payload: {
      senderId: number;
      receiverId: number;
      text: string;
    },
  ) {
    const msg = await this.messagesService.sendMessage(payload.senderId, {
      receiverId: payload.receiverId,
      text: payload.text,
    });

    const receiverSocketId = this.onlineUsers.get(payload.receiverId);
    if (receiverSocketId)
      this.server.to(receiverSocketId).emit('receiveMessage', msg);

    const senderSocketId = this.onlineUsers.get(payload.senderId);
    if (senderSocketId)
      this.server.to(senderSocketId).emit('receiveMessage', msg);
  }
}
