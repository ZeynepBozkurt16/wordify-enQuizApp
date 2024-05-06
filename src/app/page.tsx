import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user= await currentUser();

  return (
       <div className="absolute top-1/3 left-1/2  -translate-x-1/2 -translate-y-1/2" >
        <div className="flex flex-col items-center text-center" >Homepage</div>
       </div>
  );
}