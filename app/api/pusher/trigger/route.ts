import { NextRequest, NextResponse } from 'next/server';
import { pusherServer, PUSHER_CHANNEL, PUSHER_EVENT } from '@/app/lib/pusher';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { count } = body;

    if (typeof count !== 'number') {
      return NextResponse.json(
        { error: 'valor de contagem inválido' },
        { status: 400 }
      );
    }

    await pusherServer.trigger(PUSHER_CHANNEL, PUSHER_EVENT, {
      count,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'falha para disparar o evento' },
      { status: 500 }
    );
  }
}

