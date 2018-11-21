import React from 'react'

const TradeCount = ({offerCount, resourceCount}) => {
  return (
    <table className="trade-table" height="100%" width="100%">
      <tbody>
        <tr>
          <td halign="middle" valign="top">
            {offerCount}
          </td>
        </tr>
        <tr>
          <td halign="middle" valign="bottom">
            {resourceCount}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TradeCount
