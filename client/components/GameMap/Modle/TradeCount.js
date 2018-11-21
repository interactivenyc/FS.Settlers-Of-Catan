import React from 'react'

const TradeCount = props => {
  return (
    // <div>0</div>
    <table className="trade-table" height="100%" width="100%">
      <tbody>
        <tr>
          <td id={`plus ${props.type}`} halign="middle" valign="top">
            {props.offerCount}
          </td>
        </tr>
        <tr>
          <td id={`minus ${props.type}`} halign="middle" valign="bottom">
            {props.resourceCount}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TradeCount
