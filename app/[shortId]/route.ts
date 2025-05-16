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

        const urlEntry = await Url.findOne({ shortId });

        if (!urlEntry) {
            return NextResponse.redirect(new URL('/', req.url)); // Redirect to home if not found
        }

        // Validate and redirect to the original URL
        try {
            const redirectUrl = new URL(urlEntry.originalUrl);
            return NextResponse.redirect(redirectUrl);
        } catch {
            console.error('Invalid original URL:', urlEntry.originalUrl);
            return NextResponse.redirect(new URL('/', req.url)); // Redirect to home if invalid
        }
    } catch (error) {
        console.error('Error fetching URL:', error);
        return NextResponse.redirect(new URL('/', req.url)); // Redirect to home on error
    }
}