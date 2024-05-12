import { useEffect } from "react";

const useTitle=(title)=>{
    useEffect(()=>{
        const $title = document.getElementsByTagName("title")[0];
        $title.innerText="됵 일기 - "+title
    },[title])
};
export default useTitle;