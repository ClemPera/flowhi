import { create } from 'zustand';

export type DeleteInfos = {
    id: number
    name: String
}

type Store = {
    createPopUp: boolean
    deletePopUp: boolean
    goalsPopup: boolean
    deleteInfos: DeleteInfos
    date: Date
    
    setCreatePopup: (s: boolean) => void
    setDeletePopup: (s: boolean) => void
    setGoalsPopup: (s: boolean) => void
    setDeleteInfos: (infos: DeleteInfos) => void
    setDate: (newDate: Date) => void 
}

export const useGeneral = create<Store>()(
    (set) => ({
        createPopUp: false,
        deletePopUp: false,
        goalsPopup: false,
        deleteInfos: {id:-1, name: ''},
        date: new Date(),

        setCreatePopup: (s) => {
            set(() => ({ createPopUp: s }));
        },

        setDeletePopup: (s) => {
            set(() => ({ deletePopUp: s }));
        },

        setGoalsPopup: (s) => {
            set(() => ({ goalsPopup: s }));
        },

        setDeleteInfos: (infos) => {
            set(() => ({ deleteInfos: infos }));
        },

        setDate: (newDate) => {
            set(() => ({ date: newDate }))
        }
    })
)