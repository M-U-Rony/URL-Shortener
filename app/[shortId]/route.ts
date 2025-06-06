import { NextRequest, NextResponse } from 'next/server';
import dbConnection from '@/lib/connection';
import Url from '@/lib/models/url';

export async function GET(req: NextRequest, {
  params,
}: {
  params: Promise<{ shortId: string }>
}) {
    try {
        await dbConnection();

        const { shortId } = await params;

        const urlEntry = await Url.findOne({shortId });

        if (!urlEntry) {
            return new NextResponse('Not Found', { status: 404 });
        }

        try {
            const redirectUrl = new URL(urlEntry.originalUrl);
             urlEntry.clicks += 1;
            await urlEntry.save(); 
            return NextResponse.redirect(redirectUrl);
        } catch {
            console.error('Invalid original URL:', urlEntry.originalUrl);
            return new NextResponse('Not Found', { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching URL:', error);
        return NextResponse.redirect(new URL('/', req.url));
    }
}