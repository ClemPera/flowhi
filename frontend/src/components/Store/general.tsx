import { create } from 'zustand';

type Store = {
    date: Date
    
    setDate: (newDate: Date) => void 
}

export const useGeneral = create<Store>()(
    (set) => ({
        date: new Date(),

        setDate: (newDate) => {
            set(() => ({ date: newDate }))
        }
    })
)