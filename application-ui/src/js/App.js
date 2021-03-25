import React, {useEffect, useState} from 'react'

import axios from 'axios'

import {ApplicationForm} from "./ApplicationForm";
import {ApplicationsList} from "./ApplicationsList";

const App = () => {
  const [applications, setApplications] = useState([])
  const [fundApplyingFor, setFundApplyingFor] = useState(null)
  const [funds, setFunds] = useState([])
  const submitNewApplication = (fundUrl, title, countableCommitments, summableCommitments) => {
    // TODO side effect: refactor
    axios.post(
      `${API_HOST}/applications_service/api/applications/`,
      {
        fund: fundUrl,
        countable_commitments: countableCommitments,
        summable_commitments: summableCommitments,
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
    const summableCommitments = []
    for (let elementName in form.elements) {
      // TODO Refactor this
      const matchCountable = elementName.match(/countable_(\d+)/)
      if (matchCountable) {
        const value = form.elements[elementName].value
        countableCommitments.push({
          criterion: matchCountable[1],
          committed_quantity: value
        })
        continue
      }
      const matchSummable = elementName.match(/summable_(\d+)/)
      if (matchSummable) {
        const value = form.elements[elementName].value
        summableCommitments.push({
          criterion: matchSummable[1],
          committed_quantity: value
        })
      }
    }
    submitNewApplication(fund.url, title, countableCommitments, summableCommitments)
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
