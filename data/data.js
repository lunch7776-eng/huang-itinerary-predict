// 黃仁勳行程預測站 — 資料檔
// 每跑一次「更新預測」，就在陣列「最前面」插入一筆當日 entry。
// 不需任何伺服器，index.html 直接讀 window.PREDICTIONS（雙擊即可開）。
//
// confidence 分級：強 / 中 / 觀察
// market：美股 / 台股 / 日股 / 韓股
// status（行程）：已發生 / 官宣 / 傳聞

window.PREDICTIONS = [
  {
    date: "2026-06-05",
    updatedAt: "2026-06-05 11:52",
    headline: "黃仁勳明日（6/6）抵首爾，4 天行程鎖定記憶體、機器人、遊戲三大題材",
    summary:
      "結束台灣 Computex / GTC Taipei（6/1–5）後，黃仁勳 6/6 下午搭私人專機抵首爾金浦機場，展開 4 天行程。當晚與 SK 崔泰源、現代鄭義宣、LG 具光謨、Naver 李海珍聚餐（第二次「Kkanbu 高峰會」），後續 6/8 談遊戲 AI、6/9 拜訪機器人新創與首爾大學 AI／機器人研究中心。市場焦點延續上次訪韓『供應鏈小型純概念股暴衝』的劇本。",
    itinerary: [
      { date: "6/1–6/5", country: "台灣", city: "台北", target: "Computex / GTC Taipei 主題演講、供應鏈兆元宴", theme: "AI 五層架構、CoWoS、散熱", status: "已發生" },
      { date: "6/6 (五) 下午", country: "韓國", city: "首爾 金浦機場", target: "抵韓", theme: "—", status: "官宣" },
      { date: "6/6 (五) 晚", country: "韓國", city: "首爾 城水洞", target: "SK 崔泰源、現代 鄭義宣、LG 具光謨、Naver 李海珍 聚餐", theme: "記憶體 / HBM、車用、AI 雲", status: "官宣" },
      { date: "6/8 (日)", country: "韓國", city: "首爾", target: "NC Corp 金澤辰、Krafton 張炳圭", theme: "遊戲 × AI（RTX、Physical AI）", status: "官宣" },
      { date: "6/9 (一)", country: "韓國", city: "首爾", target: "AI / 機器人新創閉門會、首爾大學 AI 研究所與機器人中心", theme: "人形機器人 / Physical AI", status: "官宣" }
    ],
    targets: [
      {
        name: "한미반도체 Hanmi Semiconductor", ticker: "042700.KS", market: "韓股",
        segment: "HBM TC Bonder 設備（熱壓接合）", confidence: "強",
        reason: "HBM 設備純度最高的韓國標的，SK海力士 HBM 擴產直接受惠。黃仁勳訪韓＝HBM 題材重新點火，過往訪韓此類純概念股漲幅最猛。",
        risk: "已是市場熟知標的、近期漲多，追高風險；非微型股，漲幅不會像 STI 那麼誇張。"
      },
      {
        name: "Rainbow Robotics 레인보우로보틱스", ticker: "277810.KQ", market: "韓股",
        segment: "人形機器人（三星入股）", confidence: "強",
        reason: "6/9 機器人行程是本次最新鮮的題材。三星已入股、NVIDIA Physical AI 敘事正熱，純機器人概念＋中小市值＝最符合『暴衝劇本』。",
        risk: "行程僅官宣未落地，若黃仁勳未公開提及合作，題材可能熄火。"
      },
      {
        name: "SK Hynix 海力士", ticker: "000660.KS", market: "韓股",
        segment: "HBM / 記憶體龍頭", confidence: "中",
        reason: "晚宴主角崔泰源＝SK 會長，HBM 對 NVIDIA 供貨核心。題材最直接但大市值，漲幅有限、屬『穩』不屬『爆』。",
        risk: "大型權值股，行程帶動的短線漲幅通常個位數。"
      },
      {
        name: "Krafton 크래프톤", ticker: "259960.KS", market: "韓股",
        segment: "遊戲 × AI（RTX、Physical AI）", confidence: "中",
        reason: "6/8 明確會面對象，討論 RTX Spark 與 Physical AI 遊戲合作，催化劑時點明確。",
        risk: "遊戲 AI 合作偏長線敘事，短線想像空間不如機器人/HBM。"
      },
      {
        name: "NCsoft 엔씨소프트", ticker: "036570.KS", market: "韓股",
        segment: "遊戲 × AI", confidence: "觀察",
        reason: "NC Corp 金澤辰 6/8 會面對象，遊戲 AI 概念跟漲標的。",
        risk: "議程未公開，合作具體性低，純跟風成分高。"
      },
      {
        name: "現代汽車 Hyundai Motor", ticker: "005380.KS", market: "韓股",
        segment: "車用 AI + 機器人（Boston Dynamics）", confidence: "觀察",
        reason: "鄭義宣出席晚宴，現代握有 Boston Dynamics，可同時沾機器人＋自駕車兩條敘事。",
        risk: "超大型權值股，行程消息對股價驅動力弱。"
      },
      {
        name: "NVIDIA", ticker: "NVDA", market: "美股",
        segment: "AI 晶片本尊", confidence: "中",
        reason: "所有行程的源頭，亞洲供應鏈擴張＝NVDA 需求敘事延續，作為基準錨點。",
        risk: "已是巨型股，單一行程難造成大波動，僅供對照。"
      },
      {
        name: "散熱 / CoWoS 概念（台股）", ticker: "—", market: "台股",
        segment: "Computex 外溢", confidence: "觀察",
        reason: "Computex 主題演講主打散熱與 CoWoS，台廠散熱（如 AVC 3017、奇鋐 3017）為延續性題材。",
        risk: "行程已轉往韓國，台股題材熱度遞減，僅為外溢觀察。"
      }
    ],
    notes: "日本本次不在行程上，暫不列預測標的。下一個值得追蹤的潛在行程：訪韓結束後是否赴日談 Rapidus／半導體材料。"
  }
];
