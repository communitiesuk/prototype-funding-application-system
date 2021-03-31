import React, {useEffect, useState} from 'react'

import axios from 'axios'

import {ApplicationForm} from "./ApplicationForm";
import {ApplicationsList} from "./ApplicationsList";
import {FundChooser} from "./FundChooser";

const App = () => {
  const [applications, setApplications] = useState([])
  const [applicationSubmission, setApplicationSubmission] = useState({})
  const [fundApplyingFor, setFundApplyingFor] = useState(null)
  const [funds, setFunds] = useState([])

  useEffect(() => {
    const {fundUrl, title, countableOutputs, summableOutputs} = applicationSubmission

    if (! fundUrl) {  // initial state, return
      return
    }

    axios.post(
      `${API_HOST}/applications_service/api/applications/`,
      {
        fund: fundUrl,
        countable_outputs: countableOutputs,
        summable_outputs: summableOutputs,
        title,
      })
      .then(({data}) => {
        addApplication(data)
        // Clear the Application form
        setFundApplyingFor(null)
      })
  }, [applicationSubmission])

  const addApplication = (newApplication) => {
    setApplications([newApplication].concat(applications))
  }

  const handleApplicationFormSubmission = (e) => {
    e.preventDefault()
    const form = e.target
    const title = form.title.value

    const countableOutputs = []
    const summableOutputs = []
    for (let elementName in form.elements) {
      const match = elementName.match(/(count|summ)able_(\d+)/)
      if (match) {
        const value = form.elements[elementName].value
        const outputArray = match[1] === "count" ? countableOutputs : summableOutputs
        outputArray.push({
          criterion: match[2],
          committed_quantity: value
        })
      }
    }
    setApplicationSubmission({
      fundUrl: form.elements['fundUrl'].value,
      title,
      countableOutputs,
      summableOutputs,
    })
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
          <FundChooser funds={funds} onFundSelection={setFundApplyingFor}/>
          <ApplicationsList applications={applications} funds={funds}/>
        </>}
    </>
  )
}

export default App
