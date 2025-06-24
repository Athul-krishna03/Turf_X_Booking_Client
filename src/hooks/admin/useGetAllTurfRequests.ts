import { useQuery } from "@tanstack/react-query"
import { FetchCustomerParams } from "../../types/AdminTypes"
import { turfReponse } from "./useGetAllTurfs"

export const useGetAllTurfRequestsQuery=(
    queryFunc:(params:FetchCustomerParams)=>Promise<turfReponse>,
    page:number,
    limit:number,
    search:string,
)=>{
    return useQuery({
        queryKey:["turfs",page,limit,search],
        queryFn:()=>queryFunc({page,limit,search}),
        placeholderData:(prev)=>prev?{...prev}:undefined,
    })
}