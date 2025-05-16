import { NextRequest, NextResponse } from "next/server";
import dbConnection from '@/lib/connection';
import Url from '@/lib/models/url';


export async function POST(req: NextRequest) {
    try {

        await dbConnection();
        
        const body = await req.formData();
        const originalUrl = body.get('input') as string;

        if (!originalUrl) {
            return NextResponse.json({ error: "Original URL is required" }, { status: 400 });
        }

        const ishaveAlready = await Url.findOne({originalUrl});

        if(ishaveAlready){
            return NextResponse.json({ shortUrl: `https://url-shortener-iota-drab.vercel.app/${ishaveAlready.shortId}` });

        }

        const shortId =Math.random().toString(36).substring(2, 10);

        await Url.create({
            originalUrl,
            shortId,
        });

        return NextResponse.json({ shortUrl: `https://url-shortener-iota-drab.vercel.app/${shortId}` });

    } 
    catch (error) {
        console.error("Error saving URL:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}