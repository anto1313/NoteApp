import { Notecard } from "@/components/Notecard";
import { Noteinput } from "@/components/Noteinput";


 

async function getNotes(){
  const res = await fetch("https://devscale-mockapi.fly.dev/api/collections/notes/records?filter=(user='anthorouw@gmail.com')",{
  cache: "no-store",
});
  const data = await res.json();
  return data;
}


export default async function Page() {
  const { items } = await getNotes();

  return (
    <div>
      <header className="text-center p-3 space-y-5">
          <h1 className="text-6xl drop-shadow-md text-black-300 tracking-wide font-extrabold">Create ur own Note</h1>
      </header>
    <main>
        <div className="max-w-[500px] mx-auto my-[40px] p-5">
          <Noteinput />
          <div className="flex flex-col-reverse gap-2">
            <div>
          {items.map(({ id, content }) => { 
          return (
          <Notecard key={id} id={id} content={content} />
          );
        })}
        </div>
        </div>
        </div>
      
      </main>
      <footer className="text-center p-4 text-slate-100">Made with 🏋️‍♂️</footer>
    </div>
  )}