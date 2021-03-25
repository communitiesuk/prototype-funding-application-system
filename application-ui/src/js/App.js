import React, {useEffect, useState} from 'react'

import axios from 'axios'

import {ApplicationForm} from "./ApplicationForm";
import {ApplicationsList} from "./ApplicationsList";

const App = () => {
  const [applications, setApplications] = useState([])
  const [fundApplyingFor, setFundApplyingFor] = useState(null)
  const [funds, setFunds] = useState([])
  const submitNewApplication = (fundUrl, title, countableCommitments) => {
    axios.post(
      `${API_HOST}/applications_service/api/applications/`,
      {
        fund: fundUrl,
        countable_commitments: countableCommitments,
        title,
      })
      .then(({data}) => {
        addApplication(data)
      })
  }
  const addApplication = (newApplication) => {
    setApplications([newApplication].concat(applications))
  }

  const handleApplicationFormSubmission = (e, fund) => {
    e.preventDefault()
    const form = e.target
    const title = form.title.value

    const countableCommitments = []
    for (let elementName in form.elements) {
      const match = elementName.match(/countable_(\d+)/)
      if (match) {
        const value = form.elements[elementName].value
        countableCommitments.push({
          criterion: match[1],
          committed_quantity: value
        })
        console.log('countableCommitments', countableCommitments)
      }
    }
    submitNewApplication(fund.url, title, countableCommitments)
    setFundApplyingFor(null)
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

      <h2>Submit a new Application</h2>
      <h3>Step One: Select appropriate Fund</h3>
      <table>
        <tbody>
        {funds.map((fund, idx) => (
          <tr key={idx}>
            <td>{fund.name}</td>
            <td>{fund.short_description}</td>
            <td>
              <button onClick={() => setFundApplyingFor(fund)}>Start</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {fundApplyingFor ?
        <ApplicationForm fund={fundApplyingFor} handleSubmission={handleApplicationFormSubmission}/> : ""}

      <ApplicationsList applications={applications} funds={funds}/>
    </>
  )
}

export default App
