## 為什麼我們需要 React？可以不用嗎？
如果專案的規模很小、且沒有 SPA 的要求、更沒有複雜的操作時，我是覺得可以不用啦！

## React 的思考模式跟以前的思考模式有什麼不一樣？

傳統的 Web 思考都是直接去操作 DOM 模型，而 jQuery 的出現也大大降低了 JavaScript 操作 DOM 的複雜度，所以曾經紅極ㄧ時，但當網頁工程發展越來越複雜時，以往 jQuery 的那種方法會讓畫面跟資料很難確保是同步的，因為開發者在更改 state 的同時，也要去修改 UI，以確保兩者是同步的。

而 React 的思考模式則是讓開發者的控制更單純一些，React 會自動將 state 渲染到 UI 上，所以我們只要專注在修改 state 就好了，不鼓勵直接去操作 DOM。

## state 跟 props 的差別在哪裡？

#### ☞ state: Component 自有的狀態，只有自己能改變
假如 `<A />` 如果想要改變 `<B />` 的 state，唯一的辦法就是呼叫 `<B />` 提供改變 `state` 的 `method`

#### ☞ props: Parent Component 傳進來的屬性，無法直接更改
Component 可以接收 parent Component 的值當作屬性 `props`。

如果想要更改的話，因為 `props` 代表的是 parent Component 的 `state`，無法直接更改 `props`，所以要修改的話，也是需要去 call parent Component 傳下來的 method。

## 請列出 React 的 lifecycle 以及其代表的意義

Lifecycle 其實很簡單理解，就是「 一個 Component 從 "建立" 到 "更新" 到 "銷毀" 所會經歷的各個階段 」，而如果我們足夠理解各階段的觸發時間點，在操作 Component 的同時也會更游刃有餘。

![螢幕快照 2019-09-12 下午4.15.20](media/15682725390293/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202019-09-12%20%E4%B8%8B%E5%8D%884.15.20.jpg)

( image from [react-lifecycle-methods-diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) )

#### Component 的 Lifecycle 大致來說可以分成三個大方向：
- Mounting : 建立初期
- Updating : 更新時期
- Unmounting: 銷毀時期

---

#### ☞ Mounting： 當 Component 被建立時

1. `constructer()`
2. `render()`
3. React 處理畫面到 DOM
4. `componentDidMount()`

#### ☞ Updating： 當 Component 更新時

當使用了 `setState`、或者 `props` 更新時

1. `shouldComponentUpdate()` => 如果 `return false`，就不會繼續往下跑
2. `render()`
3. React 處理畫面到 DOM
4. `componentDidUpdate()`

#### ☞ Unmounting： 當 Component 銷毀時

1. `componentWillUnmount()`
2. `render()`
3. React 處理畫面到 DOM