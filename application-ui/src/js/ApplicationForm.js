import React from 'react'

export const ApplicationForm = ({fund, handleSubmission}) => {
  return (
    <>
      <h3>Step Two: Complete application form</h3>
      <form onSubmit={(e) => handleSubmission(e, fund)}>
        <div>
          <p>
          Fund: {fund.name}
          </p>
        </div>
        <div>
          <label>Application Title</label>: <input name="title"/>
        </div>
        <h3>Commitments</h3>
        {fund.countable_criteria.map((crit) => (
          <div key={crit.id}>
            <label>{crit.label}</label>: <input name={`countable_${crit.id}`}/>
            <p className="guidance">
              {crit.guidance_notes}
            </p>
          </div>
        ))}
        {fund.summable_criteria.map((crit) => (
          <div key={crit.id}>
            <label>{crit.label}</label>: <input name={`summable_${crit.id}`}/><span>{crit.unit}</span>
            <p className="guidance">
              {crit.guidance_notes}
            </p>
          </div>
        ))}
        <div>
          <input type="submit" value="Submit Application"/>
        </div>
      </form>
    </>
  )
}
