## Bootstrap 是什麼？
Bootstrap 是一個針對網頁 UI 的 liberary，主打著現成、且有設計規範的網頁元件，在自認不具美感的工程師圈深受歡迎，因為不僅節省開發時間（ 寫CSS ），同時可以在沒有設計師合作下、也能產出個畫面有平衡感的網頁介面。


## 請簡介網格系統以及與 RWD 的關係
以往 RWD 的做法是，當螢幕有寬度變化時，對頁面元素下 media query 做調整。而網格系統的設計就是把網頁分割成一堆小格子，改成對格子下 media query。

而因為格子本身的寬度會隨著螢幕寬度有彈性變化，所以我們只要把網頁元素放在格子裡面，就不用為元素的寬度煩惱，直接讓元素撐滿格子內容就好了。



## 請找出任何一個與 Bootstrap 類似的 library
- [foundation](https://foundation.zurb.com/)
- [Semantic UI](https://semantic-ui.com/)
- [Pure](https://purecss.io/)
- [Uikit](https://getuikit.com/v2/docs)

參考資料：
- [The 5 Most Popular Front-end Frameworks Compared](https://www.sitepoint.com/most-popular-frontend-frameworks-compared/)

## jQuery 是什麼？
jQuery 是一個 JavaScript 的 liberary，目的是簡化所有 JS 對 DOM 元素的操作，以及早期瀏覽器各家爭鳴，要寫出支援各種瀏覽器的程式，要分別判斷且做很多調整，於是 jQuery 解決了網頁開發者一大頭痛之處，且由於簡單易上手的特性，前幾年備受歡迎。

但近代各種網頁框架崛起之後，造成 jQuery 逐漸式微，但目前還是佔有一大市場。

## jQuery 與 vanilla JS 的關係是什麼？

- vanilla JS：就是指原生的 JavaScript，不用下載任何套件，在瀏覽器上就可以直接使用 JavaScript
- jQuery： 基於原生 JavaScript 的 liberary，沒有 JS 就沒有 jQuery，沒有 jQuery 也可以寫 JS。