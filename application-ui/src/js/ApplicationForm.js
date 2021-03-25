import React from 'react'

export const ApplicationForm = ({fund, handleSubmission}) => {
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
