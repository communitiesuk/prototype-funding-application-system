import React from 'react'

export const ApplicationsList = ({applications, funds}) => {
  const getFundFromUrl = (fundUrl) => funds.find((el) => el.url == fundUrl) || {}

  return (
    <>
      <h2>List of Applications</h2>
      <ul>
        {applications.map((application, idx) => (
          <li key={idx}>{application.title} ({getFundFromUrl(application.fund).name}), submitted
            at {application.submitted_at}</li>)
        )}
      </ul>
    </>
  )
}