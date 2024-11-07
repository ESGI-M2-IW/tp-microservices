import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const apiKey = req.headers.get('x-api-key');
    const validApiKey = process.env.API_KEY;

    if (apiKey !== validApiKey) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};