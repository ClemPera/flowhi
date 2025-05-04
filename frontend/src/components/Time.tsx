import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { dataApi } from "./Api/dataApi";
import { useGeneral } from "./Store/general";
import AddIcon from '@mui/icons-material/Add';
import ArrowRight from '@mui/icons-material/ArrowForward';

export default function Time({elemId}: {elemId: number}) {
  let [total, setTotal] = useState(new Date(0,0,0,0,0,0))
  let [count, setCount] = useState(1);
  let [values, setValues] = useState<Array<Date>>([]);
  let [first, setFirst] = useState(true);
  const {date} = useGeneral()

  useEffect(() => {
    setFirst(true);
    setTotal(new Date(0,0,0,0,0,0));
    setCount(1);
    setValues([]);
  }, [date])

  useEffect(() => {
    if(!first){
      let hours = 0;
      let minutes = 0;
      
      values.forEach(value => {
        hours += value.getHours();
        minutes += value.getMinutes();
      });

      while (minutes >= 60){
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
      }

      setTotal(new Date(0,0,0,hours,minutes,0));
    }
  }, [values])

  useEffect(() => {
    if(!first){
      const decimalTime = total.getHours() + (total.getMinutes() / 60);
  
      dataApi.post(elemId, decimalTime, date)
    }
  }, [total])

  useEffect(() => {
    dataApi.get(elemId, date).then((d: any) => {
      let reconstructedDate;
      if(d==-1){
        reconstructedDate = new Date(0,0,0,0,0,0);
      }else{
        let hours = Math.floor(d["data"]);
        let minutes = Math.round((d["data"] - hours) * 60);
        reconstructedDate = new Date(0, 0, 0, hours, minutes, 0);
      }

      setTotal(reconstructedDate);
      setValues([reconstructedDate]);
    })
  }, [date])

  return (
    <>
      {(() => {
        const elements = [];
        for (let i = 0; i < count; i++) {
          elements.push(<Thing key={i} id={i} values={values} setValues={setValues} count={count} setCount={setCount} first={first} setFirst={setFirst}/>);
          if(i != count-1)
            elements.push(<AddIcon key={1000+i}></AddIcon>);
        }
        return elements;
      })()}
      <ArrowRight/><p className="text-2xl">{total.getHours()+"h"+total.getMinutes()+"m"}</p>
    </>
  );
}

function Thing({id, values, setValues, count, setCount, first, setFirst}: {id: number, values: Array<Date>, setValues: (v: Array<Date>) => void, count: number, setCount: (a: number) => void, first: boolean, setFirst: (b: boolean) => void}){
  let [active, setActive] = useState(-1);
  let [h1, setH1] = useState(0); //10h00
  let [h2, setH2] = useState(0); //01h00
  let [m1, setM1] = useState(0); //00h10
  let [m2, setM2] = useState(0); //00h01
  let [counted, setCounted] = useState(false);
  
  useEffect(() => {
    if(first){
      if(values[0] && (values[0].getHours() != 0 || values[0].getMinutes() != 0)){
        let hours = values[0].getHours().toString().split("");
        let minutes = values[0].getMinutes().toString().split("");

        let hours2 = hours.length>1 ? parseInt(hours[1]) : parseInt(hours[0]);
        let hours1 = hours.length>1 ? parseInt(hours[0]) : 0;
        let minutes1 = minutes.length>1 ? parseInt(minutes[0]) : 0
        let minutes2 = minutes.length>1 ? parseInt(minutes[1]) : parseInt(minutes[0]);

        //For some reason, 1 times on 10 it's NaN and breaks everything
        //696a3ed0a428dabf395adc2b6fb0852da6eaacce : TODO: Try, maybe this fix your bug and you don't need that part.
        if(Number.isNaN(hours2)){
          setH2(0);
        }else{
          setH2(hours2);
        }

        if(Number.isNaN(hours1)){
          setH1(0);
        }else{
          setH1(hours1);
        }

        if(Number.isNaN(minutes1)){
          setM1(0);
        }else{
          setM1(minutes1);
        }

        if(Number.isNaN(minutes2)){
          setM2(0);
        }else{
          setM2(minutes2);
        }
        
        setCount(count+1);
        setCounted(true);

        setFirst(false);
      }else{
        setH1(0);
        setH2(0);
        setM1(0);
        setM2(0);
      }

    }
  }, [values, first]);

  //TODO: Faire des check (pas dépasser 23h + pas dépasser 59 minutes)
  useEffect(() => {
    if(!counted && (h1 != 0 || h2 != 0 || m1 != 0 || m2 != 0)){
      setCount(count+1);
      setCounted(true);
    }

    let newValues = [...values];
    newValues[id] = new Date(0,0,0,parseInt(h1.toString()+h2.toString()),parseInt(m1.toString()+m2.toString()),0)
    setValues(newValues);
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
