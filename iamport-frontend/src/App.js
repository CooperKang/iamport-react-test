import React from "react";
import axios from "axios";

function App() {
  const getRfCode = () => {
    axios({
      url: "join/getRfCode",
      method: "get",
    }).then((data) => {
      console.log(data.data);
    });
  };

  const getOrderNo = () => {
    let today = new Date();
    let orderNo = "";
    orderNo += today.getFullYear();
    orderNo += today.getMonth() + 1;
    orderNo += today.getDate();
    orderNo += today.getHours();
    orderNo += today.getMinutes();
    orderNo += today.getSeconds();
    orderNo += today.getMilliseconds();
    return orderNo;
  };
  const paymentApi = (e) => {
    const merchant_uid = getOrderNo();
    const amount = 110;
    const promotion = 10;
    const total_amount = 100;
    orderList(merchant_uid, promotion, amount, total_amount);
    const name = "5월의신고 세무서비스";
    const pay_method = e.target.getAttribute("pay-method");
    const buyer_email = "owole@gmail.com";
    const buyer_name = "오워리";
    const buyer_tel = "010-1234-5678";
    const buyer_addr = "서울특별시 강남구 신사동";
    const buyer_postcode = "01500";
    testPay(
      name,
      pay_method,
      merchant_uid,
      total_amount,
      buyer_email,
      buyer_name,
      buyer_tel,
      buyer_addr,
      buyer_postcode
    );
  };
  const orderList = (merchant_uid, promotion, amount, totalAmount) => {
    console.log("주문내역 저장");
    axios({
      url: "paymentApi/insertOrder",
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      params: {
        code: parseInt(merchant_uid),
        promotion: parseInt(promotion),
        amount: parseInt(amount),
        paid_amount: parseInt(totalAmount),
      },
    })
      .then((result) => {
        if (result.data === 1) {
          return result.data;
        }
      })
      .catch((res) => console.log("error", res));
  };

  const testPay = (
    serviceName,
    payMethod,
    merchantUid,
    totalAmount,
    buyerEmail,
    buyerName,
    buyerTel,
    buyerAddr,
    buyerPostcode
  ) => {
    // IMP.request_pay(param, callback) 결제창 호출
    const { IMP } = window;
    console.log(merchantUid);
    IMP.init("imp64079710"); // Example: imp00000000
    IMP.request_pay(
      {
        // param
        pg: "kcp",
        escrow: true,
        kcpProducts: [
          {
            orderNumber: merchantUid,
            name: serviceName,
            quantity: 1,
            amount: totalAmount,
          },
        ],
        pay_method: payMethod,
        merchant_uid: merchantUid,
        name: serviceName,
        amount: totalAmount,
        buyer_email: buyerEmail,
        buyer_name: buyerName,
        buyer_tel: buyerTel,
        buyer_addr: buyerAddr,
        buyer_postcode: buyerPostcode,
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // axios로 HTTP 요청
          console.log("결제 요청 성공, 검증시작");
          console.log(rsp);
          axios({
            url: "paymentApi/verifyPayment", // 예: https://www.myservice.com/payments/complete
            method: "post",
            headers: { "Content-Type": "application/json" },
            params: {
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
              paid_amount: rsp.paid_amount,
              pay_method: rsp.pay_method,
            },
          }).then((data) => {
            console.log(data.data);
            if (rsp.paid_amount === data.data.response.amount) {
              console.log("결제 및 결제 검증 완료");
              alert("결제가 완료되었습니다.");
              //redirect, route연결
            } else {
              console.log("결제 검증 실패");
              alert("잘못된 접근 방식입니다.(" + data.data.message + ")");
            }
          });
        } else {
          alert("결제에 실패하였습니다. 에러 내용: +" + rsp.error_msg);
        }
      }
    );
  };
  return (
    <div className="App">
      5월의신고 서비스 이용 금액 안내 <br />
      수수료 : 110원
      <br />
      프로모션가 : -10%
      <br />
      최종 결제가 : 100 원<br />
      <button onClick={paymentApi} pay-method={"card"}>
        신용카드 결제하기
      </button>
      <br />
      <button onClick={getRfCode}>추천코드 받기</button>
    </div>
  );
}

export default App;
