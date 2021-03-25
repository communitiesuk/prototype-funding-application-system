import React, {useEffect, useState} from 'react'

import axios from 'axios'

const ApplicationForm = ({fund, handleSubmission}) => {
  return (
    <>
      <h3>Step Two: Complete application form</h3>
      <form onSubmit={(e) => handleSubmission(e, fund)}>
        <h3>Fund:</h3>
        {fund.name}
        <label>Application Title</label>
        <input name="title"/>
        <input type="submit" value="Submit Application"/>
      </form>
    </>
  )
}

const App = () => {
  const [applications, setApplications] = useState([])
  const [fundApplyingFor, setFundApplyingFor] = useState(null)
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
    submitNewApplication(fund.url, title)
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
      <h3>Step One: Select appropriate Fund</h3>
      <table>
        <tbody>
        {funds.map((fund, idx) => (
          <tr key={idx}>
            <td>{fund.name}</td>
            <td>
              <button onClick={() => setFundApplyingFor(fund)}>Start</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {fundApplyingFor ? <ApplicationForm fund={fundApplyingFor} handleSubmission={handleApplicationFormSubmission}/> : ""}

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
