import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Time() {
  let [total, setTotal] = useState(new Date(0,0,0,0,0,0))
  let [count, setCount] = useState(1);
  let [values, setValues] = useState<Array<Date>>([]);

  useEffect(() => {
    //TODO: Calculer le total and push to DB

    //This is bad bc it count the value times:
    // values.forEach(value => {
    //   let hours = total.getHours() + value.getHours();
    //   let minutes = total.getMinutes() + value.getMinutes();

    //   console.log(hours+"h " + minutes + "m");

    //   if (minutes >= 60) {
    //     hours += Math.floor(minutes / 60);
    //     minutes = minutes % 60;
    //   }

    //   setTotal(new Date(0,0,0,hours,minutes,0));
    // });
  }, [values])

  return (
    <div className="grid grid-rows-3 bg-zinc-800 mx-1 md:mx-24 xl:mx-60 my-2 p-4 pb-4 rounded-xl">
      <div className="relative grid grid-cols-12">
        <div className="col-span-11">
          <h2 className="font-bold text-xl">name</h2>
        </div>
        <div className="col-span-1 flex-auto w-4 absolute top-0.5 right-3"></div>
      </div>
      <div className="place-content-center">
        <div className="flex place-content-center">
          {/* TODO:Ajouter un + et un input à chaque fois que celui d'avant est écrit + faire pour que l'input s'adapte au texte*/}
          {(() => {
            const elements = [];
            for (let i = 0; i < count; i++) {
              elements.push(<Thing key={i} id={i} values={values} setValues={setValues} count={count} setCount={setCount}/>);
            }
            return elements;
          })()}
          <p>total:{total.toTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

function Thing({id, values, setValues, count, setCount}: {id: number, values: Array<Date>, setValues: (v: Array<Date>) => void, count: number, setCount: (a: number) => void}){
  let [active, setActive] = useState(-1);
  let [h1, setH1] = useState(0)
  let [h2, setH2] = useState(0)
  let [m1, setM1] = useState(0)
  let [m2, setM2] = useState(0)
  let [counted, setCounted] = useState(false);

  //TODO: Faire des check (pas dépasser 23h + pas dépasser 59 minutes)?
  useEffect(() => {
    if(!counted && (h1 != 0 || h2 != 0 || m1 != 0 || m2 != 0)){
      setCount(count+1);
      setCounted(true);
    }

    let newValues = [...values];
    newValues[id] = new Date(0,0,0,parseInt(h1.toString()+h2.toString()),parseInt(m1.toString()+m2.toString()),0)
    setValues(newValues);
    console.log("write val w/:" + newValues);
    
  }, [h1,h2,m1,m2])
  
  return(
    <form className="flex flex-row bg-black rounded-xl p-2">
      <Input id={0} active={active} setActive={setActive} val={h1} setVal={setH1} />
      <Input id={1} active={active} setActive={setActive} val={h2} setVal={setH2} />
      <p className="text-center w-5">h</p>
      <Input id={2} active={active} setActive={setActive} val={m1} setVal={setM1} />
      <Input id={3} active={active} setActive={setActive} val={m2} setVal={setM2} />
      <p className="text-center w-5">m</p>
    </form>
  )
}

function Input({ id, active, setActive, val, setVal }: { id: number, active: number, setActive: (a: number) => void, val: number, setVal: (a: number) => void}) {
    const inputRef = useRef<HTMLInputElement>(null);
    
    //Focus next
    useEffect(() => {
      if(active == id){
        inputRef.current!.focus()
      }
    }, [active])

    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const data = (e.nativeEvent as InputEvent).data
      const newChar = Number.parseInt(data as string);

      if(data != null){
        if (!Number.isNaN(newChar)) {
          setVal(newChar);
  
          if(id<3){
            setActive(id + 1);
          }
        }
      }
      else{ //backspace key pressed
        if(val == 0 && id > 0){
          setActive(id - 1);
        }
        else{
          setVal(0);
        }

      }

    };

    return (
        <motion.input
        // initial={{ color: "#ff6900" }}
        // animate={active === id ? {
        //   color: ["#ff6900", "#ffffff"],
        //   transition: {
        //     delay: 0.6,
        //     duration: 0.2,
        //     repeat: Infinity,
        //     repeatType: "reverse",
        //     repeatDelay: 0.6,
        //   }
        // } : {
        //   color: "#ffffff",
        //   transition: {
        //     duration: 0
        //   }
        // }}
        value={val}
        ref={inputRef}
        onChange={handleChange}
        className="text-center w-5 outline-none border-none focus:ring-0 focus:outline-none"
      />
    );
  }
