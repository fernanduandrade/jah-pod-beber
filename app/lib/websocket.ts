import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";

// Singleton instance do WebSocket server
let wss: WebSocketServer | null = null;
let clients: Set<WebSocket> = new Set();

/**
 * Inicializa o servidor WebSocket
 * @param server - O servidor HTTP do Next.js
 */
export function initWebSocketServer(server: Server) {
  if (wss) {
    return wss; // Já inicializado
  }

  wss = new WebSocketServer({ 
    server,
    path: '/api/ws'
  });

  wss.on('connection', (ws: WebSocket) => {
    clients.add(ws);
    console.log(`WebSocket client connected. Total clients: ${clients.size}`);

    ws.on('close', () => {
      clients.delete(ws);
      console.log(`WebSocket client disconnected. Total clients: ${clients.size}`);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });
  });

  return wss;
}

/**
 * Broadcast uma mensagem para todos os clientes conectados
 */
export function broadcast(message: { type: string; count: number }) {
  if (clients.size === 0) {
    return; // Nenhum cliente conectado
  }

  const data = JSON.stringify(message);
  let disconnectedClients: WebSocket[] = [];

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(data);
      } catch (error) {
        console.error('Error sending message to client:', error);
        disconnectedClients.push(client);
      }
    } else {
      disconnectedClients.push(client);
    }
  });

  // Remove clientes desconectados
  disconnectedClients.forEach((client) => {
    clients.delete(client);
  });
}

/**
 * Obtém o número de clientes conectados
 */
export function getConnectedClientsCount(): number {
  return clients.size;
}

