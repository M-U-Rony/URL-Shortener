import { NextRequest, NextResponse } from 'next/server';
import dbConnection from '@/lib/connection';
import Url from '@/lib/models/url';

export async function GET(
  req: NextRequest,
  context: { params: Record<string, string> }  // ✅ use Record instead of custom type
) {
  try {
    await dbConnection();

    const shortId = context.params.shortId;

    const urlEntry = await Url.findOne({ shortId });

    if (!urlEntry) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    try {
      const redirectUrl = new URL(urlEntry.originalUrl);
      return NextResponse.redirect(redirectUrl);
    } catch {
      console.error('Invalid original URL:', urlEntry.originalUrl);
      return NextResponse.redirect(new URL('/', req.url));
    }

  } catch (error) {
    console.error('Error fetching URL:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}
