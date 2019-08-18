# 作業 hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
var a = 1
function fn(){
  console.log(a) // undefined
  var a = 5
  console.log(a) // 5
  a++
  var a
  fn2()
  console.log(a) // 20
  function fn2(){
    console.log(a) // 6
    a = 20
    b = 100
  }
}
fn()
console.log(a) // 1
a = 10
console.log(a) // 10
console.log(b) // 100
```

輸出結果：

```
undefined
5
6
20
1
10
100
```

## 逐步拆解 JS 運作：

一步一步拆解 JS 運作過程來回答這題：

1. 主程式 ( global EC ) : 編譯 
2. 主程式 ( global EC ) : 執行 
3. fn EC : 編譯
4. fn EC : 執行
5. fn2 EC : 編譯
6. fn2 EC : 執行
7. fn2 EC 執行結束，從 call stack 中 pop off 
    - => 回到 fn EC 未完的執行階段
8. fn EC 執行結束，從 call stack 中 pop off 
    - => 回到 global EC 未完的執行階段
9. global EC 執行結束 => 從 call stack 中 pop off
    - =>  Call Stack 清空，程式結束

---

接著是模擬 JS 引擎在 Call Stack 各階段：

#### 1. 主程式 ( globalEC ) : 編譯 

- 產生一個 `globalEC`
    - `globalEC` 產生一個 VO & scopeChain
        - `globalEC.VO` 其實就是指向 `global` 本身 ( `globalEC.VO === Global` )
        - `globalEC.scopeChain` 指向自己的 `VO`
- 發現 `a` 變數宣告，放進 VO 並設成 undefined
- 發現 `fn` 函式宣告，放進 VO 並指向一塊記憶體位置 (0x01)

```javascript
globalEC : {
    VO : {
        a: undefined,
        fn: function (0x01)
    }
    scopeChain: [globalEC.VO]
}
```

#### 2. 主程式 ( globalEC ) : 執行

- 發現 RHS 的 `a`，表示需要賦值，往 `globalEC.VO` 尋找有沒有 `a`
    - 找到了 => 把 `a` 的值設成 `1`
-  執行 `fn`，跳到下一階段

```javascript
globalEC : {
    VO : {
        a: 1,
        fn: function (0x01)
    }
    scopeChain: [globalEC.VO]
}
```


#### 3. fnEC : 編譯

- 產生一個新的 `fnEC`
    - `fnEC` 產生一個 AO & scopeChain
    - `fnEC` 多一個屬性為 `[[scope]]`，指向上一層的 `glbalEC.scopeChain` => `[globalEC.VO]`
        - 而 `fnEC` 的 `scopeChain` 為自己的 `AO + [[scope]]`
- 發現 `a` 變數宣告，放進 AO 並設成 undefined
- 發現 `fn2` 函式宣告，放進 AO 並指向一塊記憶體位置 (0x02)
- 發現又一個 `a` 變數宣告，但 AO 已經有 `a` 了所以忽略。

```javascript

fnEC.[[scope]] = glbalEC.scopeChain; // => globalEC.VO

fnEC : {
    AO : {
        a : undefined,
        fn2: function (0x02)
    }
    scopeChain: [fnEC.AO , globalEC.VO]
}

globalEC : {
    VO : {
        a: 1,
        fn: function (0x01)
    }
    scopeChain: [globalEC.VO]
}
```

#### 4. fnEC : 執行

- 執行 `console.log(a)`
    - LHS 的 `a` ，表示需要查詢值
    - 往 `fnEC.AO` 尋找有沒有 `a`
        - 找到了 => `a` 的值是 `undefined`，**輸出 `undefined`**
- 執行 `var a = 5`
    - RHS 的 `a` 表示需要賦值
    - 往 `fnEC.AO` 尋找有沒有 `a`
        - 找到了 => 把 `a` 的值設成 `5`
- 執行 `console.log(a)`
    - LHS 的 `a` ，表示需要查詢值
    - 往 `fnEC.AO` 尋找有沒有 `a`
        - 找到了 => 把 `a` 的值是 `5`，**輸出 `5`**
- 執行 `a++`
    - RHS 的 `a` 表示需要賦值
    - 往 `fnEC.AO` 尋找有沒有 `a`
        - 找到了 => `a` 從 `5` 變成 `6`
-  執行 `fn2`，跳到下一階段

```javascript
fnEC : {
    AO : {
        // a: 5,
        a: 6,
        fn2: function (0x02)
    }
    scopeChain: [fnEC.AO, globalEC.VO]
}

globalEC : {
    VO : {
        a: 1,
        fn: function (0x01)
    }
    scopeChain: [globalEC.VO]
}
```


#### 5. fn2EC : 編譯

- 產生一個新的 `fn2EC`
    - `fn2EC` 產生一個 AO & scopeChain
    - `fn2EC` 多一個屬性為 `[[scope]]`，指向上一層的 `fnEC.scopeChain` => `[fnEC.AO, globalEC.VO]`
        - 而 `fn2EC` 的 `scopeChain` 為自己的 `AO + [[scope]]`
- 因為裡面沒有任何 參數 & 變數宣告 & 函式宣告，跳下一階段

```javascript

fn2EC.[[scope]] = fnEC.scopeChain; // => [fnEC.AO, globalEC.VO]

fn2EC : {
    AO : {
        
    }
    scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fnEC : {
    AO : {
        a : 6,
        fn2: function (0x02)
    }
    scopeChain: [fnEC.AO, globalEC.VO]
}

globalEC : {
    VO : {
        a: 1,
        fn: function (0x01)
    }
    scopeChain: [globalEC.VO]
}
```


#### 6. fn2EC : 執行

- 執行 `console.log(a)`
    - LHS 的 `a` ，表示需要查詢值
    - 往 `fn2EC.AO` 尋找有沒有 `a`
        - 沒有 => 看 scopeChain 的上一層是 `fnEC.AO`
    - 往 `fnEC.AO` 尋找有沒有 `a`
        - 找到了 => `a` 的值是 `6`，**輸出 `6`**
- 執行 `a = 20`
    - RHS 的 `a` ，表示需要賦值
    - 往 `fn2EC.AO` 尋找有沒有 `a`
        - 沒有 => 看 scopeChain 的上一層是 `fnEC.AO`
    - 往 `fnEC.AO` 尋找有沒有 `a`
        - 找到了 =>  `a` 從 `6` 變成 `20`
- 執行 `b = 100`
    - RHS 的 `b` ，表示需要賦值
    - 往 `fn2EC.AO` 尋找有沒有 `b`
        - 沒有 => 看 scopeChain 的上一層是 `fnEC.AO`
    - 往 `fnEC.AO` 尋找有沒有 `b`
        - 沒有 => 看 scopeChain 的上一層是 `globalEC.VO`
    - 往 `globalEC.VO` 尋找有沒有 `b`
        - 沒有 =>  但已經是最上層了，所以就把 `b` 放上去，並設成 `100`
- `fn2EC` 執行結束 => 從 Call Stack 中 pop off

```javascript
fn2EC : {
    AO : {
        
    }
    scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fnEC : {
    AO : {
        a : 20,
        fn2: function (0x02)
    }
    scopeChain: [fnEC.AO, globalEC.VO]
}

globalEC : {
    VO : {
        a: 1,
        fn: function (0x01),
        b: 100
    }
    scopeChain: [globalEC.VO]
}
```

#### 7. fn2EC 執行結束 => 回到 fnEC 未完的執行階段

- 執行 `console.log(a)`
    - LHS 的 `a` ，表示需要查詢值
    - 往 `fnEC.AO` 尋找有沒有 `a`
        - 找到了 => `a` 的值是 `20`，**輸出 `20`**
 - `fnEC` 執行結束 => 從 Call Stack 中 pop off       

```javascript
fnEC : {
    AO : {
        a : 20,
        fn2: function (0x02)
    }
    scopeChain: [fnEC.AO, globalEC.VO]
}

globalEC : {
    VO : {
        a: 1,
        fn: function (0x01),
        b: 100
    }
    scopeChain: [globalEC.VO]
}
```

#### 8. fnEC 執行結束 => 回到 globalEC 未完的執行階段

- 執行 `console.log(a)`
    - LHS 的 `a` ，表示需要查詢值
    - 往 `globalEC.VO` 尋找有沒有 `a`
        - 找到了 => `a` 的值是 `1`，**輸出 `1`**
- 執行 `a = 10` 
    - RHS 的 `a`，表示需要賦值
    - 往 `globalEC.VO` 尋找有沒有 `a`
        - 找到了 =>  `a` 從 `1` 變成 `10`
- 執行 `console.log(a)`
    - LHS 的 `a` ，表示需要查詢值
    - 往 `globalEC.VO` 尋找有沒有 `a`
    - 找到了 => `a` 的值是 `10`，**輸出 `10`**
- 執行 `console.log(b)`
    - LHS 的 `a` ，表示需要查詢值
    - 往 `globalEC.VO` 尋找有沒有 `b`
        - 找到了 => `b` 的值是 `100`，**輸出 `100`**         
- `global` 執行結束 => 從 Call Stack 中 pop off


```javascript
globalEC : {
    VO : {
        // a: 1,
        a: 10,
        fn: function (0x01),
        b: 100
    }
    scopeChain: [globalEC.VO]
}
```

#### 9. globalEC 執行結束 => Call Stack 清空，程式執行完畢

```javascript
( Call Stack 清空了，程式結束 )
```


