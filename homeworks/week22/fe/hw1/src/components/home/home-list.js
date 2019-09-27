import pic_01 from './../../img/img_01.jpg';
import pic_02 from './../../img/img_02.jpg';
import pic_03 from './../../img/img_03.jpg';
import pic_04 from './../../img/img_04.jpg';
import pic_05 from './../../img/img_05.jpg';

export default function getHomeData() {
  return ({
    lists: [
      {
        isLoaded: false,
        pic: pic_01,
        date: '2019/09/03',
        title: 'React 基礎：Component、JSX 語法、事件機制',
        description: 'React 基本元素就是 Component，一整個網頁就是由不同的 Component 組成。像之前的範例，`App` 就是一個 Component，會渲染到 `#root` 這個 DOM 物件裡面。`<Component />` 這樣是一個 Component 的既定寫法，有點像 HTML 的 tag 寫法。s',
      },
      {
        isLoaded: false,
        pic: pic_02,
        date: '2019/09/03',
        title: 'React 基礎：狀態 state、setState、props',
        description: '在 React 裡面最重要的觀念就是**它的 state 會對應到一個 UI，當 state 一有變動、就會自動 call render()**。',
      },
      {
        isLoaded: false,
        pic: pic_03,
        date: '2019/09/03',
        title: 'React 基礎：父子 Component 之間的溝通',
        description: '之前用的 Component 都是用 class 的形式來寫 ( `Class Component` )，而其實有另外一種方式寫 Component，叫做 `functional Component`。',
      },
      {
        isLoaded: false,
        pic: pic_04,
        date: '2019/09/03',
        title: 'React 基礎：如何寫 CSS',
        description: '在 React 中有很多種方式可以寫 CSS，各門派可說是各有自己的看法，建議是可以多嘗試再來決定自己喜歡哪一套寫法。',
      },
      {
        isLoaded: false,
        pic: pic_05,
        date: '2019/09/03',
        title: 'React 生命週期： constructor',
        description: '在 React 開發裡面有一個很重要的觀念就是 Lifecycle，可以想像成 Component 的生命週期，包括什麼時候產生、更新、結束等等的階段。',
      },
    ]
  })
}