import React from 'react'

export default function Account({title, amount, amountText}) {
  return (
    <section className="account">
        <div className='account-content-wrapper'>
            <h3 class="account-title">{title}</h3>
            <p class="account-amount">{amount}</p>
            <p class="account-amount-description">{amountText}</p>
        </div>
        
        <div class="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
    </section>
  )
}
