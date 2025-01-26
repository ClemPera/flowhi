import { create } from 'zustand';

export type DeleteInfos = {
    id: number
    name: String
}

type Store = {
    createPopUp: boolean
    deletePopUp: boolean
    deleteInfos: DeleteInfos

    setCreatePopup: (s: boolean) => void
    setDeletePopup: (s: boolean) => void
    setDeleteInfos: (infos: DeleteInfos) => void
}

export const useGeneral = create<Store>()(
    (set) => ({
        createPopUp: false,
        deletePopUp: false,
        deleteInfos: {id:-1, name: ''},

        setCreatePopup: (s) => {
            set(() => ({ createPopUp: s }));
        },

        setDeletePopup: (s) => {
            set(() => ({ deletePopUp: s }));
        },

        setDeleteInfos: (infos) => {
            set(() => ({ deleteInfos: infos }));
        }
    })
)