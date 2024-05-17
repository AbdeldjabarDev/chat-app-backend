import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect
  } from '@nestjs/websockets';
import { IncomingMessage } from 'http';
import {Server,WebSocket} from 'ws'
export interface Event{
    type : string,
    data : any
}
  
  
  @WebSocketGateway(8080)
  export class EventsGateway implements OnGatewayConnection,OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;
    constructor(){
        this.connectedUsers = new Map();
    
    }

    connectedUsers : Map<string,WebSocket>

    handleConnection(client: WebSocket, request : IncomingMessage) {
        
            console.log("client connected ");
            
            client.onmessage = (event) => {
            // console.log("got message from client : ",event);
            console.log("raw data : ",event.data);
            
            const jsonData = JSON.parse(event.data.toString());
            if(jsonData.type === 'join')
            {
                const userId = jsonData.userId;
                this.connectedUsers.set(userId, client);
            
            }
          
            

            }
           
       
    }
    handleDisconnect(client: WebSocket) {
      console.log("client disconnected");
      
      
    }
    notifyUser(userId: string,ev : Event) {
        const client = this.connectedUsers.get(userId);
        console.log("notifiying user with id : ",userId);
        
        if(client)
        {
            console.log("user with id : ",userId,"notified");
            
            client.send(JSON.stringify(ev));

        }
        else
        {
            console.log("user not connected");
        }
        
    

    }
    
   
  
  }