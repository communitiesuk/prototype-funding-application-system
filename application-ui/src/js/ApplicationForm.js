import React from 'react'

import {OutputsFormSection} from "./OutputsFormSection";

export const ApplicationForm = ({fund, handleSubmission}) => {
  return (
    <>
      <h3>Step Two: Complete application form</h3>
      <form onSubmit={handleSubmission}>
        <input type={"hidden"} name={"fundUrl"} value={fund.url}/>
        <div>
          <p>
          Fund: {fund.name}
          </p>
        </div>
        <div>
          <label>Application Title</label>: <input name="title"/>
        </div>
        <h3>Outputs</h3>
        <OutputsFormSection
          countableFundCriteria={fund.countable_criteria}
          summableFundCriteria={fund.summable_criteria}
        />
        <div>
          <input type="submit" value="Submit Application"/>
        </div>
      </form>
    </>
  )
}
