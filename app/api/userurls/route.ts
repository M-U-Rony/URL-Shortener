import dbConnection from "@/lib/connection";
import Url from "@/lib/models/url";
import { NextRequest,NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";


export async function GET(req: NextRequest){

    try{

        await dbConnection();

        const {userId} = await auth();

        const sortby = req.nextUrl.searchParams.get('sortby');

        let urls;

        if(sortby === 'date'){

            urls = await Url.find({createdBy: userId});

        }else{

            urls = await Url.find({createdBy: userId}).sort({ clicks: -1 });
        }


        return NextResponse.json({urls});

    }
    catch(error){

    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });

    }

}
