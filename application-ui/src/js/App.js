import React, {useEffect, useState} from 'react'

import axios from 'axios'

import {ApplicationForm} from "./ApplicationForm";
import {ApplicationsList} from "./ApplicationsList";
import {FundsList} from "./FundList";

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
      const match = elementName.match(/(count|summ)able_(\d+)/)
      if (match) {
        const value = form.elements[elementName].value
        const commitmentArray = match[1] === "count" ? countableCommitments : summableCommitments
        commitmentArray.push({
          criterion: match[2],
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

      {fundApplyingFor ?
        <ApplicationForm fund={fundApplyingFor} handleSubmission={handleApplicationFormSubmission}/> :
        <>
          <FundsList funds={funds} onFundSelection={setFundApplyingFor}/>
          <ApplicationsList applications={applications} funds={funds}/>
        </>}
    </>
  )
}

export default App
