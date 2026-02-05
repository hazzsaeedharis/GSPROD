import React from 'react'

export default function AwardBadges() {
  return (
    <div className="mod mod-Guetesiegel" id="guetesiegelContainer">
      <div className="mod-Guetesiegel__wrap">
        <div className="mod-Guetesiegel__wrap__container">
          <div className="mod-Guetesiegel__title">
            Mehrfach <span className="mod-Guetesiegel__title-bold">ausgezeichnet</span>
          </div>
          <div className="mod-Guetesiegel__award">
            <img 
              src="/assets/images/awards/germanCustomerAward_2023.png" 
              alt="Deutscher Kunden Award 2022/23" 
              width={38} 
              height={56} 
            />
          </div>
          <div className="mod-Guetesiegel__award">
            <img 
              src="/assets/images/besteOnlinePortale/besteOnlinePortale_2023.png" 
              alt="Best Online Portale" 
              width={38} 
              height={56} 
            />
          </div>
          <div className="mod-Guetesiegel__ntv">
            <img 
              src="/assets/images/ntv-preis/ntv_2023.png" 
              alt="ntv_2023" 
              width={56} 
              height={56} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}
