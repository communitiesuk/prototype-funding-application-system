import React, {useEffect, useState} from 'react'

import {FundOutputCategorySummary} from "./FundOutputCategorySummary";

export const FundChooser = ({funds, onFundSelection}) => {
  const [searchInput, setSearchInput] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearchInputChange = (e) => {
    const searchInput = e.target.value
    if (searchInput.length < 2) {
      setSearchResults([])
      return
    }
    setSearchResults(funds.filter(fund => fund.long_description.includes(searchInput)))
  }

  return (
    <>
      <h3>Step One: Determine appropriate Fund</h3>
      <p>
        Find the fund for which you ought to apply.
      </p>
      <input name="fundSearch"
             placeholder="Start typing a search..."
             onChange={handleSearchInputChange}
             autoFocus/>
      {searchResults.length ?
        <table>
          <thead>
          <tr>
            <th colSpan={2}>Fund</th>
            <th>Outputs</th>
            <th colSpan={2}>Apply</th>
          </tr>
          </thead>
          <tbody>
          {searchResults.map((fund, idx) => (
            <tr key={idx}>
              <td>{fund.name}</td>
              <td>{fund.short_description}</td>
              <td>
                <FundOutputCategorySummary
                  countableCriteria={fund.countable_criteria}
                  summableCriteria={fund.summable_criteria}/>
              </td>
              <td>
                <button onClick={() => onFundSelection(fund)}>Start</button>
              </td>
              <td>{fund.long_description}</td>
            </tr>
          ))}
          </tbody>
        </table> : searchInput.length >= 2 ? <p>No Funds match your search....</p> : ""}
    </>
  )
}