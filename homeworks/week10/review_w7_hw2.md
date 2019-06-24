# Code Review for week7 hw2

## 第二題 - 仿 Google 表單

#### 語法
[by ishin](https://github.com/Lidemy/mentor-program-3rd-ishin4554/blob/e7e9733edcd66da3c477ff77f3b16858d18bfb1a/homeworks/week7/hw2/js/main.js) 
- 可以自定義 `event` 監聽事件
    - 參考資料
        - [自定义事件的触发 dispatchEvent](https://www.jianshu.com/p/5f9027722204)

```javascript
const event = new Event('custom-event'); // => 自定義事件
element.addEventListener(event, function (e) { ... }, false); // => 監聽事件
element.dispatchEvent(event); // dispatchEvent =>  觸發事件
```

[ 重構版 ](https://github.com/Lidemy/mentor-program-3rd-ishin4554/blob/84df3feccb5e334f92fbaee1eedc29ef0783c14f/homeworks/week7/hw2/js/main.js)
- 邏輯切分的超級清楚，佩服佩服
- 判斷 radio 是否已被選取的方式，看有沒有「 選取到 checked 元素 」就知道了，很聰明的方式
- 原來 function 參數可以傳 condition！

```javascript
if (input.type === 'text') {
    input.toggleText(node.value, ' 請輸入文字');
  }
  if (input.type === 'email') {
    input.toggleText(node.value.match(/\w+@\w+.\w+/), ' 請輸入正確的 email');
  }
  if (input.type === 'radio') {
    input.toggleText(dq('[name="class"]:checked'), ' 此為必填問題');
  }
```
    
---
[by julypenguin](https://github.com/Lidemy/mentor-program-3rd-julypenguin/blob/c1a3d71aa4559f41b508713f40fa21e031646a53/homeworks/week7/hw2/script.js)
- `blur` & `foucs` 事件，兩事件都不支持冒泡傳遞。
    - `focus` : 當元素聚焦時 ( 可以想像成 CSS 的 `:focus` )
    - `blur` : 當元素離開焦點時
    - 實際應用上 :
        - 觸發 `blur` => 進行表單欄位驗證，顯示錯誤提示
        - 觸發 `focus` => 隱藏錯誤提示

---

[by lagom0327](https://github.com/Lidemy/mentor-program-3rd-lagom0327/pull/9/files)
- [ 邏輯 ] 相較於大部分的人都是用「 必填 」來取值，這裡是用「 如果是非必填就忽略 」，就不需要取一個大集合來跑迴圈，好像不錯欸

```javascript
const ifValue = (input) => {
  if (input.id && input.id === 'other');
  else if (!input.value) changeStyle(input);
  else if (input.value) cancelStyle(input);
};
```

---

[by tsenLin](https://github.com/Lidemy/mentor-program-3rd-tsenLin/blob/a2ab5fecc60f3bd2e40dd7ee0c870a73a4042732/homeworks/week7/hw2/index.html)
- [ 邏輯 ] 覺得邏輯分工切的很清楚，功能完善、每個函式不相互依賴，值得學習：

```javascript
switch (item) {
      case 'required':
        valid = validateRequired(value);
        errMsg = ' 這是必填問題';
        break;
      case 'email':
        valid = validateEmail(value);
        errMsg = ' 請輸入有效的電子郵件地址';
        break;
      case 'requiredRadio':
        valid = (getRadioValue(element.name)) ? true : false;
        errMsg = ' 這是必填問題';
        break;
      default:
        break;
    }
```
---

### 變數命名
validate => 驗證

## Code Review
### 心境上的收穫
不只是語法上看到一些新鮮的東西，在程式邏輯上也有發現很多自己可以加強的部分。

在判斷 `radio` 是否選取的部分，之前覺得很難處理，當時想到的方式是跑全部的選項，一但找到 `checked` 才回傳該選項。且還跟處理 `input:text` 的邏輯混在一起，其實非常混亂。

看到某些同學是用「 選取 `checked` 元素 」的方式，如果選得到元素、就代表已 `checked`。

review 時心頭一驚：「 天啊為什麼我沒想到！ 」

其實應該是個挺直覺的用法，但當時腦袋沒打通，所以只能繞很多彎路、才走得到其實近在眼前的目的地。

同一個結果可以用很多方法實現，而我腦中有出現多少路可以走，是建立在「 我曾經走過那些路 」的前提下，之後才能漸漸培養是彎是直的判斷力，又或許在某些情境下、彎路反而是個好選擇，感謝有這麼多份作業讓我長見識。

### 反思
邏輯上可以加強的地方有很多，對於拆 function 的方式，應該要從一開始就要謹慎思考「 如何使用 」，而不是先寫一個小部分，跟著感覺走一步算一步，到最後再來想要怎麼區分程式碼，或許小專案可能還擋得住，但這壞習慣應該要從現在開始改掉，動手寫 code 之前先徹底想 code。

### 語法新世界
- 原來 `event` 事件是可以自定義的
    - 參考資料： [自定义事件的触发 dispatchEvent](https://www.jianshu.com/p/5f9027722204)
    
```javascript
const event = new Event('custom-event'); // => 自定義事件
element.addEventListener(event, function (e) { ... }, false); // => 監聽事件
element.dispatchEvent(event); // dispatchEvent =>  觸發事件
```
- 看 minw 同學的重構系列才知道 parameter 可以傳 condition，好實用欸！且今天看這份作業真的獲益良多，大感謝
- `blur` & `foucs` 事件，兩事件都不支持冒泡傳遞。
- 延伸閱讀：
    - 如何把非 `focusable` 的元素（ 例如:`div` ）改成 `focusable` => `tabindex` 属性，有兩個作用：
        - 變成可聚焦元素（也可觸發 `focus` & `blur`）
        - 可指定用按鍵 `tab` 聚焦的順序
- 參考資料：
    - [说说 focus /focusin/focusout/blur 事件](https://segmentfault.com/a/1190000003942014) 
    - [聚焦：focus/blur](https://zh.javascript.info/focus-blur#yun-xu-zai-ren-he-yuan-su-shang-ju-jiao-tabindex)
