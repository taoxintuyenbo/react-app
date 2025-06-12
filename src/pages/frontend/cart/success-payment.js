import React from "react";

const PaymentSuccess = ({ transactionId = "123456789" }) => {
  return (
    <>
      <style>{`
        body {
          background: #dcf0fa;
        }
        .container {
          max-width: 380px;
          margin: 50px auto;
          overflow: hidden;
        }
        .printer-top {
          z-index: 1;
          border: 6px solid #666666;
          height: 6px;
          border-bottom: 0;
          border-radius: 6px 6px 0 0;
          background: #333333;
        }
        .printer-bottom {
          z-index: 0;
          border: 6px solid #666666;
          height: 6px;
          border-top: 0;
          border-radius: 0 0 6px 6px;
          background: #333333;
        }
        .paper-container {
          position: relative;
          overflow: hidden;
          height: 467px;
        }
        .paper {
          background: #ffffff;
          font-family: 'Poppins', sans-serif;
          height: 447px;
          position: absolute;
          z-index: 2;
          margin: 0 12px;
          margin-top: -12px;
          animation: print 5000ms cubic-bezier(0.68, -0.55, 0.265, 0.9) infinite;
          -moz-animation: print 5000ms cubic-bezier(0.68, -0.55, 0.265, 0.9) infinite;
        }
        .main-contents {
          margin: 0 12px;
          padding: 24px;
          text-align: center;
        }
        .jagged-edge {
          position: relative;
          height: 20px;
          width: 100%;
          margin-top: -1px;
        }
        .jagged-edge:after {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(45deg,
              transparent 33.333%,
              #ffffff 33.333%,
              #ffffff 66.667%,
              transparent 66.667%),
            linear-gradient(-45deg,
              transparent 33.333%,
              #ffffff 33.333%,
              #ffffff 66.667%,
              transparent 66.667%);
          background-size: 16px 40px;
          background-position: 0 -20px;
        }
        .success-icon {
          font-size: 48px;
          height: 72px;
          background: #359d00;
          border-radius: 50%;
          width: 72px;
          margin: 16px auto;
          color: #fff;
          line-height: 72px;
        }
        .success-title {
          font-size: 22px;
          font-weight: bold;
          color: #666;
          margin-bottom: 16px;
          font-family: 'Poppins', sans-serif;
        }
        .success-description {
          font-size: 15px;
          line-height: 21px;
          color: #999;
          margin-bottom: 24px;
          font-family: 'Poppins', sans-serif;
        }
        .order-details {
          color: #333;
          font-weight: bold;
          font-family: 'Poppins', sans-serif;
        }
        .order-number-label {
          font-size: 18px;
          margin-bottom: 8px;
        }
        .order-number {
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          line-height: 48px;
          font-size: 48px;
          padding: 8px 0;
          margin-bottom: 24px;
        }
        .complement {
          font-size: 18px;
          margin-bottom: 8px;
          color: #32a852;
        }
        @keyframes print {
          0% {
            transform: translateY(-90%);
          }
          100% {
            transform: translateY(0%);
          }
        }
      `}</style>

      <div className="container">
        <div className="printer-top"></div>

        <div className="paper-container">
          <div className="printer-bottom"></div>

          <div className="paper">
            <div className="main-contents">
              <div className="success-icon">&#10004;</div>
              <div className="success-title">Payment Complete</div>
              <div className="success-description">
                Thank you for completing the payment! You will shortly receive
                an email of your payment.
              </div>
              <div className="order-details">
                <div className="complement">Thank You!</div>
              </div>
            </div>
            <div className="jagged-edge"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
