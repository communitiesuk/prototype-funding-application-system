import React, {useEffect, useState} from 'react'

import axios from 'axios'

const App = () => {
  const [applications, setApplications] = useState([])
  const [funds, setFunds] = useState([])

  const getFund = ({fund}) => funds.find((el) => el.url == fund) || {}

  const submitNewApplication = ({url}) => {
    axios.post(
      `${API_HOST}/applications_service/api/applications/`,
      {
        fund: url,
      })
      .then(({data}) => {
        appendApplication(data)
      })
  }
  const appendApplication = (newApplication) => {
    setApplications(applications.concat(newApplication))
  }

  useEffect(() => {
    axios.get(`${API_HOST}/funds_service/api/funds/`).then(({data}) => {
      setFunds(data)
    })

    axios.get(`${API_HOST}/applications_service/api/applications/`).then(({data}) => {
      setApplications(data)
    })
  }, [])

  return (
    <>
      <h1>Prototype Funding Application System</h1>

      <h2>List of Funds</h2>
      <ul>
        {funds.map((fund, idx) => (
          <li key={idx}>
            {fund.name}
            <button onClick={() => submitNewApplication(fund)}>Submit a new empty Application</button>
          </li>)
        )}
      </ul>

      <h2>List of Applications</h2>
      <ul>
        {applications.map((application, idx) => (
          <li key={idx}>{getFund(application).name}, submitted at {application.submitted_at}</li>)
        )}
      </ul>
    </>
  )
}

export default App
