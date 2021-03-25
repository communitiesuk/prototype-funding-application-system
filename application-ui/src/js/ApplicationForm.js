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
        <h3>Commitments</h3>
        {fund.countable_criteria.map((crit) => (
          <div key={crit.id}>
            <label>{crit.label}</label>: <input name={`countable_${crit.id}`} />
            <p class="guidance">
              {crit.guidance_notes}
            </p>
          </div>
        ))}
        {fund.summable_criteria.map((crit) => (
          <div key={crit.id}>
            <label>{crit.label}</label>: <input name={`summable_${crit.id}`} /><span>{crit.unit}</span>
            <p className="guidance">
              {crit.guidance_notes}
            </p>
          </div>
        ))}
      </form>
    </>
  )
}
