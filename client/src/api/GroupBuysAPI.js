import { useState, useEffect } from 'react'
import axios from 'axios'

function GroupBuysAPI() {
    const [allGroupBuys, setAllGroupBuys] = useState([])
    const [gbCallback, setGbCallback] = useState(false)
    const [result, setResult] = useState(0)
    const [id, setId] = useState('')
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [results, setResults] = useState(0)
    const [sort, setSort] = useState('')
    
 

    useEffect(() => {
       const getAllGroupBuys = async () => {
           const res = await axios.get(`/api/groupbuys?`)
          //  console.log(res.data.groupBuys)
           setAllGroupBuys(res.data.groupBuys)
           setResult(res.data.result)
       }
       getAllGroupBuys()
    }, [gbCallback, sort, search, page])


    
  // useEffect(() => {
  //     const getProductGroupBuys = async () => {
  //       const res = await axios.get(`/api/groupbuys?limit=${page*9}&title[regex]=${search}`)

  //       setProductGroupBuys(res.data.groupBuys)
  //       // console.log(res.data.groupBuys)
  //       setResults(res.data.result)
  //     }
  //     getProductGroupBuys()
  // }, [gbCallback, page, search])

    return {
        allGroupBuys: [allGroupBuys, setAllGroupBuys],
        gbCallback: [gbCallback, setGbCallback],
        result: [result, setResult],
        id: [id, setId],
        page: [page, setPage],
        results: [results, setResults],
        search: [search, setSearch],
        sort: [sort, setSort]
    }

}

export default GroupBuysAPI;