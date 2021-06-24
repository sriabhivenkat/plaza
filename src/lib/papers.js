import { useDocument } from "@nandorojo/swr-firestore";




export const usePaper = (uid) => {
    const {data} = useDocument(`Papers/${uid}`)
    console.log(data);
    return{
        paper: data
    }
}