# 更新 Playbook —「黃仁勳行程預測站」每小時自動更新流程

> 排程 agent 每次執行就讀這份檔案並照做。這份檔案本身也可以被優化：若你發現更好的流程、更準的對應邏輯，直接改進這份 playbook（在最下方「優化紀錄」附一行）。

工作目錄：`/Users/lunch/知識筆記/黃仁勳預測站`
資料檔：`data/data.js`（全域 `window.PREDICTIONS` 陣列，最新在 [0]）、`data/sources.json`（來源登記表）

## 步驟

### 1. 讀現況
- 讀 `data/sources.json`：取得來源清單（依 weight 由高到低）與 `watchlist_hints`。
- 讀 `data/data.js`：看 `[0]` 是哪一天、目前的 itinerary 與 targets。

### 2. 抓最新資訊（依 weight 高的來源優先）
用 WebSearch / WebFetch 查「黃仁勳 / Jensen Huang」最新與**未來**公開行程，重點抓：
- **已確認行程**（已發生）、**官宣未來行程**（最有預測價值）、**傳聞行程**（標風險旗標）。
- 行程結構化：`日期 / 國家 / 城市 / 拜訪對象 / 題材 / status(已發生|官宣|傳聞)`。
- 同步留意：當地媒體是否點名某些「概念股 / 供應鏈標的」（這是最強訊號，例如上次訪韓的 STI 暴衝）。
查詢語言：韓國行程優先用英文＋韓媒；台股用中文財經；美股用英文。至少交叉 2 個來源再採信官宣，傳聞一律標風險。

### 3. 供應鏈對應 + 評分
題材 × 國家 → 候選標的（先參考 `sources.json.watchlist_hints`，但**不要被它限制**，發現更純的標的就用）。
每檔標的評分 → `confidence`：
- **強**：供應鏈純度高 ＋ 催化劑時點明確（已官宣的會面/行程）＋ 中小市值（漲幅想像大）。
- **中**：直接受惠但大市值、波動有限，或催化劑較弱。
- **觀察**：跟風、議程未明、或僅傳聞。
風險旗標（寫進 `risk`）：已大漲、僅傳聞、超大型權值股驅動力弱、題材未落地。
市場只用：`美股 / 台股 / 日股 / 韓股`。

**ticker 一定要給可查的代碼**（網站會用它畫即時 K 線，不可用「—」或概念名）：
- 韓股 KOSPI → `000660.KS`、KOSDAQ → `277810.KQ`
- 台股 上市 → `3017.TW`、上櫃 → `xxxx.TWO`
- 日股 → `7203.T`
- 美股 → 裸代號 `NVDA`
若是「概念/籃子」型，挑一檔最具代表性、流動性好的個股當代碼，其他同概念股寫進 `reason`。

### 4. 寫回 data/data.js（避免歷史爆量）
- 算出今天日期（用系統時間）。
- 若 `PREDICTIONS[0].date === 今天`：**就地更新**該筆（刷新 itinerary 狀態、targets、summary、headline、`updatedAt` 設為現在時間）。同一天內小時更新只改這筆，不新增。
- 若 `[0]` 不是今天：在陣列**最前面 prepend** 一筆新的當日 entry。
- 保持檔案格式：開頭註解保留，`window.PREDICTIONS = [ ... ];`。entry 欄位嚴格照既有 schema（date, updatedAt, headline, summary, itinerary[], targets[], notes）。
- 改完後快速自查：JS 能被 parse（無語法錯）、targets 至少 1 筆、confidence/market/status 值合法。

### 5. 自我優化來源（資訊來源不斷自行優化）
更新 `data/sources.json`：
- 這次**有給出有用資訊**的來源：`weight` +1（上限 10）、`lastGoodHit` 設今天。
- 這次**查不到 / 失效 / 過期**的來源：`weight` -1（下限 1），`notes` 註明。
- 發現**新的高訊號來源**（例如某個專門追蹤黃仁勳行程的網站、某韓媒、某爆料帳號）：append 進 `sources`，給合理初始 weight，填 `covers`/`notes`。
- 若某題材冒出新的代表性標的，更新 `watchlist_hints`。
- 更新 `sources.json` 的 `updatedAt`。

### 6. 部署到線上（GitHub Pages）
這個資料夾本身是 git repo，遠端 origin = https://github.com/lunch7776-eng/huang-itinerary-predict （GitHub Pages：https://lunch7776-eng.github.io/huang-itinerary-predict/ ）。
資料有更動才推（沒更動就跳過）：
```
git -C /Users/lunch/知識筆記/黃仁勳預測站 add data/data.js data/sources.json UPDATE_PLAYBOOK.md
git -C /Users/lunch/知識筆記/黃仁勳預測站 diff --cached --quiet || \
git -C /Users/lunch/知識筆記/黃仁勳預測站 -c user.name="lunch7776-eng" -c user.email="lunch7776@gmail.com" commit -q -m "auto-update 預測 $(date '+%Y-%m-%d %H:%M')"
git -C /Users/lunch/知識筆記/黃仁勳預測站 push -q origin main
```
推完約 1 分鐘後線上網站就會更新。

### 7. 回報
簡短回報：今天更新了什麼（新行程？新標的？信心變動？）、來源登記表怎麼調整的、有沒有 push 到線上。

## 注意
- 這是趣味預測實驗，產出非投資建議。資料以公開資訊為準，傳聞必標風險。
- 不要捏造行程或股價；查不到就維持原狀並在回報說明。
- 只動 `黃仁勳預測站/` 內的 `data/data.js` 與 `data/sources.json`（必要時改本 playbook）。不要動 `index.html`。

## 優化紀錄
- 2026-06-05 初版。
