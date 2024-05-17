// import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer, WsResponse,SubscribeMessage } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { UserService } from './user.service'; // Import your user service (explained later)
// import { Injectable } from '@nestjs/common';

// @WebSocketGateway({ cors: true }) // Enable CORS for cross-origin connections
// @Injectable()
// export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server: Server;
//   connectedUsers: Map<string, string> = new Map(); // Map username to socket ID

//   constructor(private readonly userService: UserService) {}

//   handleConnection(client: Socket, ...data: any[]) {
//     console.log(`Client connected: ${client.id}`);
//   }

//   handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//     // Remove user from connected users map
//     const username = this.connectedUsers.get(client.id);
//     if (username) {
//       this.connectedUsers.delete(username);
//     }
//   }

//   @SubscribeMessage('join')
//   async handleJoin(client: Socket, username: string): Promise<WsResponse> {
//     const user = await this.userService.findByUsername(username); // Validate or retrieve user information
//     if (!user) {
//       return { event: 'join_error', data: 'Invalid username' };
//     }

//     this.connectedUsers.set(username, client.id);
//     return { event: 'join_success', data: user }; // Send user data on successful join
//   }

// //   @SubscribeMessage('send_message')
//   async handleSendMessage(client: Socket, message: { sender: string; recipient: string; content: string }) {
//     const recipientSocketId = this.connectedUsers.get(message.recipient);
//     if (recipientSocketId) {
//       this.server.to(recipientSocketId).emit('receive_message', message);
//     } else {
//       // Handle case where recipient is not online (e.g., store message for later delivery)
//       console.warn(`Recipient "${message.recipient}" is not online.`);
//     }
//   }
// }
