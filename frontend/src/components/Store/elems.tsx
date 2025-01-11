import { create } from 'zustand'
import { fieldsApi } from "../fieldsApi";

type Scale = {
    id: number; 
    size: number;
};

export type Elem = Scale &{ kind: String };

type Store = {
    elems: Array<Elem>
    
    addAll: () => void
    addLast: () => void
    add: (elem: Elem) => void
    remove: (elem: Elem) => void
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
                                set((state) => ({ elems: [...state.elems, { size: comp['size'], id: comp['id'], kind: comp['kind'] }] }));
                        }
                    })
                })
            },

            addLast: () => {
                fieldsApi.getLast().then((getElem) => {
                    let comp = getElem[0];
                    switch (comp['kind']) {
                        case 'scale':
                            set((state) => ({ elems: [...state.elems, { size: comp['size'], id: comp['id'], kind: comp['kind'] }] }));
                            break;
                    }
                })
            },

            add: (elem) => {
                set((state) => ({ elems: [...state.elems, elem] }));
            },

            remove: (elem) => {
                set((state) => ({ elems: state.elems.filter((e) => e.id!==elem.id)}));
            },

            clear: () => {
                set(() => ({ elems: [] }));
            }
        })
)