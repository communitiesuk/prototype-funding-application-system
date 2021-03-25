import React from 'react'

export const FundsList = ({funds, onFundSelection}) => (
  <>
    <h3>Step One: Select appropriate Fund</h3>
    <table>
      <tbody>
      {funds.map((fund, idx) => (
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
    </table>
  </>
)