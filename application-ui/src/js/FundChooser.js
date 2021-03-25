import React, {useEffect, useState} from 'react'

export const FundChooser = ({funds, onFundSelection}) => {
  const [searchInput, setSearchInput] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    if (searchInput.length < 2) {
      setSearchResults([])
      return
    }
    setSearchResults(funds.filter(fund => fund.long_description.includes(searchInput)))
  }, [searchInput])

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
          <tbody>
          {searchResults.map((fund, idx) => (
            <tr key={idx}>
              <td>{fund.name}</td>
              <td>{fund.short_description}</td>
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