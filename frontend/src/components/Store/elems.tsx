import { create } from 'zustand';
import { fieldsApi } from "../Api/fieldsApi";

type Scale = {
    size: number;
};

type Time = { };

export type Elem = (Scale|Time)
& { kind: String; 
    id: number; 
    name: String; };

type Store = {
    elems: Array<Elem>
    
    addAll: () => void
    addLast: () => void
    add: (elem: Elem) => void
    remove: (id: number) => void
    clear: () => void
}

export const useElems = create<Store>()(
    (set) => ({
        elems: [],

        addAll: () => {
            fieldsApi.getAll().then((getElem) => {
                getElem.forEach(comp => {
                    switch (comp['kind']) {
                        case 'scale':
                            set((state) => ({ elems: [...state.elems, { size: comp['size'], id: comp['id'], kind: comp['kind'], name: comp['name'] }] }));
                            break;                    
                        case 'time':
                            set((state) => ({ elems: [...state.elems, { id: comp['id'], kind: comp['kind'], name: comp['name'] }] }));
                            break;
                    }
                })
            })
        },

        addLast: () => {
            fieldsApi.getLast().then((getElem) => {
                let comp = getElem[0];
                switch (comp['kind']) {
                    case 'scale':
                        set((state) => ({ elems: [...state.elems, { size: comp['size'], id: comp['id'], kind: comp['kind'], name: comp['name'] }] }));
                        break;
                    case 'time':
                        set((state) => ({ elems: [...state.elems, { id: comp['id'], kind: comp['kind'], name: comp['name'] }] }));
                        break;
                }
            })
        },

        add: (elem) => {
            set((state) => ({ elems: [...state.elems, elem] }));
        },

        remove: (id) => {
            set((state) => ({ elems: state.elems.filter((e) => e.id!==id)}));
        },

        clear: () => {
            set(() => ({ elems: [] }));
        }
    })
)