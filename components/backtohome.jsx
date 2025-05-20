 import Link from "next/link"
 
 export default function BacktoHome(){

    return(
        <Link href={"/"}>
        <button className="cursor-pointer m-4 bg-blue-600 h-10 w-32 rounded text-white">
          Back to home
        </button>
      </Link>
    )
    
 }