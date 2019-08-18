# 作業 hw1 ： Event Loop

在解釋這題之前，先補充 Call Stack & Callback Queue 的觀念，有這樣的前提下才能了解什麼是 Event Loop。

### 什麼是事件迴圈 Event Loop

瀏覽器在跑 JavaScript 是 single thread （單執行緒），一次只能執行一個任務，所以要有一個機制來跑非同步的東西，而機制的其中一個環節就叫 Event Loop，等於是**決定執行任務的順序的主宰者**。

#### Call Stack

所有的程式語言都有 Call Stack 概念。

當有 `a` function call `b` function， 此時 call stack 就會把 `a` 先丟近來、再把 `b` 丟在 `a` 上方。

所以如果出現無窮迴圈 （ `a` 不停地 call `a` 本身 ），Call Stack 就會不斷得被填滿、出現錯誤，就是鼎鼎大名的 Stack Overflow

#### Callback Queue
而 Event Queue 則是當有非同步操作時，例如 setTimeout ，瀏覽器會先丟一個 timer 到 web API ，等到時間到了，就會把 timer 丟進 Event Queue 裡面，讓 Event Loop 去監測。


#### Event Loop 運作模式 : 不斷得去監測 Call Stack & Callback Queue
1. 看 Call Stack
2. 看 Callback Queue
    - 如果 Call Stack 為空，且 Callback Queue 有東西
    - 將 Callback Queue 的東西移到 Call Stack
3. 回到步驟 (1.)
    
> 第一優先順序永遠都是 Call Stack，所以有一個問題是，如果 Call Stack 一直有任務的話，那 Callback Queue 就不會被執行到。

---

## 開始解題


```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

### 輸出結果
```
1
3
5
2
4
```

---
#### line 1 : `console.log(1)`

最底下是主程式 `main()`，接著把 `console.log(1)` 丟進 Call Stack

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
| console.log(1) |  |  | |
| main() |  |  | |

執行 `console.log(1)`，Call Stack pop off

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
| main() |  |  | 1 |

---
#### line 2-4 : `setTimeout(() => { console.log(2) }, 0)`

`setTimeout` 丟進 Call Stack

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
| setTimout (( ) => {console.log(2)}, 0) |  |  | 1 |
| main() |  |  | |

而因為 setTimout 是非同步函式，所以會移進 Web API 裡等待時間到

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
| main() | Timer (( ) => {console.log(2)}, 0) |  | 1 |

因為 setTimout 時間只有 0 秒，所以立刻丟進 Event Queue

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
| main() |  | ( ) => console.log(2) | 1 |

### 本題重點：

- 此時的 Event Loop 查看 Call Stack => 還有東西 `main()`
- 所以 Event Queue 繼續等待，直到 Call Stack 清空

---
#### line 5 : `console.log(3)`

把 `console.log(3)` 丟進 Call Stack

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
| console.log(3) |  |  | 1 |
| main() |  | ( ) => console.log(2) | |

執行 `console.log(3)`，Call Stack pop off

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
|  |  |  | 1 |
| main() |  | ( ) => console.log(2) | 3 |

---
#### line 6-8 : `setTimeout(() => { console.log(4) }, 0)`

跟 line 2-4 基本流程一樣，所以結果如下

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
|  |  | ( ) => console.log(4) | 1 |
| main() |  | ( ) => console.log(2) | 3 |

---
#### line 9 : `console.log(5)`

把 `console.log(5)` 丟進 Call Stack

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
| console.log(5) |  | ( ) => console.log(4) | 1 |
| main() |  | ( ) => console.log(2) | 3 |

執行 `console.log(5)`，Call Stack pop off

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
|  |  |  | 1 |
|  |  | ( ) => console.log(4) | 3 |
| main() |  | ( ) => console.log(2) | 5 |

---

#### `main()` 結束、從 Call Stack 中 pop off

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
|  |  |  | 1 |
|  |  | ( ) => console.log(4) | 3 |
|  |  | ( ) => console.log(2) | 5 |


---

#### 本題重點：Event Loop 發現 Call Stack 清空了

把 Event Queue 先來的 `console.log(2)` 移到 Call Stack 中

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
|  |  |  | 1 |
|  |  |  | 3 |
| ( ) => console.log(2) |  | ( ) => console.log(4) | 5 |

執行 `console.log(2)`，Call Stack pop off

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
|  |  |  | 1 |
|  |  |  | 3 |
|  |  |  | 5 |
|  |  | ( ) => console.log(4) | 2 |

---

#### Event Loop 發現 Call Stack 再次清空

把 Event Queue 先來的 `console.log(2)` 移到 Call Stack 中

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
|  |  |  | 1 |
|  |  |  | 3 |
|  |  |  | 5 |
| ( ) => console.log(4) |  |  | 2 |


執行 `console.log(4)`，Call Stack pop off

| Call Stack | Web API | Event Queue | console 結果 |
| --- | --- | --- | --- |
|  |  |  | 1 |
|  |  |  | 3 |
|  |  |  | 5 |
|  |  |  | 2 |
|  |  |  | 4 |

### ☞ Call Stack 跟 Event Loop 都清空了，程式結束