import dbConnection from "@/lib/connection";
import Url from "@/lib/models/url";
import { NextRequest,NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";


export async function GET(req: NextRequest){

    try{

        await dbConnection();

        const {userId} = await auth();

        const urls = await Url.find({createdBy: userId});

        return NextResponse.json({urls});

    }
    catch(error){

    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });

    }

}
