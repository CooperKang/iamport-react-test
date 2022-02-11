import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const getDateNo = () => {
    let today = new Date();
    let dateNo = "";
    dateNo += today.getFullYear();
    dateNo += today.getMonth() + 1;
    dateNo += today.getDate();
    dateNo += today.getHours();
    dateNo += today.getMinutes();
    dateNo += today.getSeconds();
    dateNo += today.getMilliseconds();
    return dateNo;
  };
  const testPay = () => {
    // IMP.request_pay(param, callback) 결제창 호출
    const { IMP } = window;
    console.log(getDateNo());
    IMP.init("imp64079710"); // Example: imp00000000
    IMP.request_pay(
      {
        // param
        pg: "kcp",
        pay_method: "card",
        merchant_uid: getDateNo(),
        name: "5월의신고 세무서비스",
        amount: 101,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01500",
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // axios로 HTTP 요청
          console.log("결제 요청 성공, 검증시작");
          let date = new Date();
          console.log(rsp);
          axios({
            url: "paymentApi/verifyPayment", // 예: https://www.myservice.com/payments/complete
            method: "post",
            headers: { "Content-Type": "application/json" },
            params: {
              imp_uid: rsp.imp_uid,
              paid_amount: rsp.paid_amount,
            },
            data: {
              imp_uid: rsp.imp_uid,
              paid_amount: rsp.paid_amount,
            },
          }).then((data) => {
            console.log(data.data);
            if (rsp.paid_amount == data.data.response.amount) {
              console.log("결제 및 결제 검증 완료");
              alert("결제가 완료되었습니다.");
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
      <button onClick={testPay}>결제하기</button>
    </div>
  );
}

export default App;
