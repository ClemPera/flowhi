import { create } from 'zustand'

type Store = {
    elems: Array<JSX.Element>
    
    add: (elem: JSX.Element) => void
    clear: () => void
}
  
export const useStore = create<Store>()((set) => ({
    elems: [],
    add: (elem) => {
        set((state) => ({ elems: [...state.elems, elem] }));
        // console.log(elem);
    },
    clear: () => {
        set(() => ({ elems: [] }));
    }
}))