# 黃仁勳行程預測站

他飛到哪 → 哪支供應鏈標的可能被市場點火。靈感來自「上次訪韓，韓國記憶體供應鏈小型股 STI 暴衝 433%」。

## 怎麼看

雙擊 `index.html` 即可開（純靜態，零安裝）。
或本機開伺服器：`python3 -m http.server 8911 --directory 黃仁勳預測站`，瀏覽 http://localhost:8911

## 架構

```
跑一次「更新預測」 ──► 在 data/data.js 陣列「最前面」插入一筆當日 entry
                            │
                            ▼
                     index.html 讀 window.PREDICTIONS ──► 渲染預測板
```

- 跑一次 = 多一天資料，網站自動累積成歷史。
- 之後要回測命中率，直接用歷史 entry 的 targets ＋ 事後股價算。

## 怎麼「跑一次」（手動模式）

跟 Claude 說：**「更新黃仁勳預測」**。Claude 會：

1. 搜尋黃仁勳最新／未來公開行程（官宣行程最有預測價值；傳聞標風險旗標）。
2. 結構化成 `日期 / 國家 / 城市 / 拜訪對象 / 題材`。
3. 題材 ＋ 國家 → 對應美 / 台 / 日 / 韓 上市供應鏈標的。
4. 評分：純度 × 市值 × 題材新鮮度 × 風險 → 強 / 中 / 觀察。
5. 在 `data/data.js` 陣列最前面插入新 entry。

> 評分邏輯：供應鏈純度越高、市值越小、題材越新 → 越容易被當概念股炒 → 信心越高；
> 已大漲 / 僅傳聞 / 超大型權值股 → 標風險、降信心。

## 資料格式（data/data.js）

每筆 entry：

```js
{
  date: "YYYY-MM-DD",
  updatedAt: "YYYY-MM-DD HH:MM",
  headline: "一句話焦點",
  summary: "段落摘要",
  itinerary: [ { date, country, city, target, theme, status } ],  // status: 已發生/官宣/傳聞
  targets:   [ { name, ticker, market, segment, confidence, reason, risk } ], // market: 美股/台股/日股/韓股, confidence: 強/中/觀察
  notes: "備註"
}
```

## 未來可加

- **事後驗證欄**：行程結束後補上 targets 實際漲跌 %，算命中率。
- **自動排程**：把「更新預測」掛上每日 cron，網站不用改。
- **發社群**：把當日預測板轉成圖卡發 Threads / IG。

## 免責

純行程推演的趣味實驗，非投資建議，不保證準確。投資自負盈虧。
