import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Time() {
  let [active, setActive] = useState(0);

  function submit() {}

  return (
    <div className="grid grid-rows-3 bg-zinc-800 mx-1 md:mx-24 xl:mx-60 my-2 p-4 pb-4 rounded-xl">
      <div className="relative grid grid-cols-12">
        <div className="col-span-11">
          <h2 className="font-bold text-xl">name</h2>
        </div>
        <div className="col-span-1 flex-auto w-4 absolute top-0.5 right-3"></div>
      </div>
      <div className="place-content-center">
        <div className="flex place-content-center ">
          <form
            className="flex flex-row bg-black rounded-xl p-2"
            onSubmit={submit}
          >
            {/* Ajouter un + et un input à chaque fois que celui d'avant est écrit + faire pour que l'input s'adapte au texte*/}

            <Input id={3} active={active} setActive={setActive} />
            <Input id={2} active={active} setActive={setActive} />
            <p className="text-center w-5">h</p>
            <Input id={1} active={active} setActive={setActive} />
            <Input id={0} active={active} setActive={setActive} />
            <p className="text-center w-5">m</p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Input({ id, active, setActive }: { id: number, active: number, setActive: (a: number) => void}) {
    let [val, setVal] = useState(0);

    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChar = Number.parseInt(
        (e.nativeEvent as InputEvent).data as string,
      );

      if (!Number.isNaN(newChar)) {
        setVal(() => newChar);
        console.log("nc:" + newChar);

        //TODO: Check for delete + if(!(id >= 3))
        setActive(id + 1);
      }

      //TODO: focus next
    };

    return (
        <motion.input
        initial={{ color: "#ff6900" }}
        animate={active === id ? {
          color: ["#ff6900", "#ffffff"],
          transition: {
            delay: 0.6,
            duration: 0.2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.6,
          }
        } : {
          color: "#ffffff",
          transition: {
            duration: 0
          }
        }}
        value={val}
        onChange={handleChange}
        className="text-center w-5 outline-none border-none focus:ring-0 focus:outline-none"
      />
    );
  }
