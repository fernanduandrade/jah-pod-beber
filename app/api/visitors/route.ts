let visitorsCount = 0;

export async function GET() {
    return Response.json({ counte: visitorsCount });
}

export async function POST() {
    visitorsCount++;
    return Response.json({ count: visitorsCount });
}