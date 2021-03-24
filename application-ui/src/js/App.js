import React, {useEffect, useState} from 'react'

import axios from 'axios'

const App = () => {
  const [funds, setFunds] = useState([])

  useEffect(() => {
    axios.get(`${API_HOST}/funds_service/api/funds/`).then(({data}) => {
      setFunds(data)
    })
  }, [])

  return (
    <>
      <h1>Prototype Funding Application System</h1>

      <h2>List of Funds</h2>
      <ul>
        {funds.map((fund, idx) => <li key={idx}>{fund.name}</li>)}
      </ul>
    </>
  )
}

export default App
