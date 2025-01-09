import { create } from 'zustand'
import { fieldsApi } from "../fieldsApi";

type Scale = {
    id: number; 
    size: number;
};

type Elem = Scale

type Store = {
    elems: Array<Elem>
    
    addAll: () => void
    addLast: () => void
    add: (elem: Elem) => void
    clear: () => void
}

export const useElems = create<Store>()(
        (set) => ({
            elems: [],

            addAll: async () => {
                fieldsApi.getAll().then((getElem) => {
                    getElem.forEach(comp => {
                        switch (comp['kind']) {
                            case 'scale':
                                set((state) => ({ elems: [...state.elems, { size: comp['size'], id: comp['id'] }] }));
                        }
                    })
                })
            },

            addLast: () => {
                fieldsApi.getLast().then((getElem) => {
                    let comp = getElem[0];
                    switch (comp['kind']) {
                        case 'scale':
                            set((state) => ({ elems: [...state.elems, { size: comp['size'], id: comp['id'] }] }));
                    }
                })
            },

            add: (elem) => {
                set((state) => ({ elems: [...state.elems, elem] }));
            },

            clear: () => {
                set(() => ({ elems: [] }));
            }
        })
)