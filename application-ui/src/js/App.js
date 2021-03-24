import React, {useEffect, useState} from 'react'

import axios from 'axios'

const App = () => {
  const [applications, setApplications] = useState([])
  const [funds, setFunds] = useState([])

  const getFundFromUrl = (fundUrl) => funds.find((el) => el.url == fundUrl) || {}

  const submitNewApplication = (fundUrl, title) => {
    axios.post(
      `${API_HOST}/applications_service/api/applications/`,
      {
        fund: fundUrl,
        title,
      })
      .then(({data}) => {
        appendApplication(data)
      })
  }
  // TODO New application should appear at top of list!
  const appendApplication = (newApplication) => {
    setApplications(applications.concat(newApplication))
  }

  const handleApplicationFormSubmission = (e) => {
    e.preventDefault()
    const form = e.target
    const fundUrl = form.fund.selectedOptions[0].value
    const title = form.title.value
    submitNewApplication(fundUrl, title)
  }

  useEffect(() => {
    axios.get(`${API_HOST}/funds_service/api/funds/`).then(({data}) => {
      setFunds(data)
    })

    axios.get(`${API_HOST}/applications_service/api/applications/`).then(({data}) => {
      setApplications(data)
    })
  }, [])

  // TODO Refactor this
  return (
    <>
      <h1>Prototype Funding Application System</h1>

      <h2>List of Funds</h2>
      <ul>
        {funds.map((fund, idx) => (
          <li key={idx}>
            {fund.name}
          </li>)
        )}
      </ul>

      <h2>Submit a new Application</h2>
      <form onSubmit={handleApplicationFormSubmission}>
        <label>Select the Fund:</label>
        <select name="fund">
          {funds.map((fund, idx) => (
            <option key={idx} value={fund.url}>{fund.name}</option>
          ))}
        </select>
        <label>Application Title</label>
        <input name="title" />
        <input type="submit" value="Submit Application" />
      </form>

      <h2>List of Applications</h2>
      <ul>
        {applications.map((application, idx) => (
          <li key={idx}>{application.title} ({getFundFromUrl(application.fund).name}), submitted at {application.submitted_at}</li>)
        )}
      </ul>
    </>
  )
}

export default App
