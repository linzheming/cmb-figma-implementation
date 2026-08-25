import { useEffect, useState } from "react";
import {
  Home, Globe, BarChart2, Gift, User,
  Search, Scan, Smile, MessageSquare,
  Eye, EyeOff, ChevronRight, X, MoreHorizontal,
  Settings, ArrowLeft, CreditCard, TrendingUp,
  Shield, Banknote, Flame, Plane, Utensils,
  Building2, Phone, ShoppingCart, ShoppingBag,
  Star, Wallet, FileText, Film, Zap,
  Coins, Heart, ArrowLeftRight, Users,
  Leaf, Clipboard, LayoutGrid, ArrowDown,
  PiggyBank
} from "lucide-react";

const RED = "#c8161d";
const BLUE_GRAD =
  "linear-gradient(175deg, #4aaee6 0%, #69c1f0 30%, #9dd6f7 60%, #daeefa 85%, #f0f8fd 100%)";

type AmountConfig = {
  totalAssets: string;
  yesterdayIncome: string;
  monthlyExpense: string;
  monthlyIncome: string;
  salary: string;
  creditCardBill: string;
  loanLimit: string;
};

const DEFAULT_AMOUNTS: AmountConfig = {
  totalAssets: "2,618,850.93",
  yesterdayIncome: "12.64",
  monthlyExpense: "608.45",
  monthlyIncome: "17,516.36",
  salary: "17,372.45",
  creditCardBill: "63.45",
  loanLimit: "30 万",
};

const AMOUNT_FIELDS: { key: keyof AmountConfig; label: string }[] = [
  { key: "totalAssets", label: "总资产" },
  { key: "yesterdayIncome", label: "昨日收益" },
  { key: "monthlyExpense", label: "本月支出" },
  { key: "monthlyIncome", label: "本月收入" },
  { key: "salary", label: "我的薪酬" },
  { key: "creditCardBill", label: "信用卡账单" },
  { key: "loanLimit", label: "最高可借" },
];

function splitAmount(value: string) {
  const normalized = value.trim().replace(/^¥\s*/, "");
  const [integer, decimal] = normalized.split(".");
  return {
    integer: integer || "0",
    decimal: decimal ? `.${decimal}` : "",
  };
}

function normalizeAmounts(value: Partial<AmountConfig>): AmountConfig {
  return {
    ...DEFAULT_AMOUNTS,
    ...value,
  };
}

// ─── StatusBar ──────────────────────────────────────────────────────────────

function StatusBar({ onDark }: { onDark?: boolean }) {
  const c = onDark ? "white" : "#222";
  return (
    <div
      className="flex items-center justify-between px-5"
      style={{ paddingTop: 50, paddingBottom: 8 }}
    >
      <div className="flex items-center gap-1.5">
        <span style={{ fontSize: 15, fontWeight: 600, color: c }}>20:17</span>
        <span style={{ fontSize: 11, color: c, opacity: 0.7 }}>支</span>
        <span style={{ fontSize: 11, color: c, opacity: 0.7 }}>···</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span style={{ fontSize: 11, color: c, fontWeight: 500 }}>5G</span>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c}>
          <rect x="0" y="5" width="3" height="7" rx="0.5" />
          <rect x="4.5" y="3" width="3" height="9" rx="0.5" />
          <rect x="9" y="1" width="3" height="11" rx="0.5" />
          <rect x="13.5" y="1" width="2.5" height="11" rx="0.5" fillOpacity="0.35" />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke={c} strokeOpacity="0.55" />
          <rect x="2" y="2" width="17" height="9" rx="1.5" fill={c} />
          <path d="M24 4.5v4a2 2 0 000-4z" fill={c} fillOpacity="0.45" />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 600, color: c }}>75</span>
      </div>
    </div>
  );
}

// ─── BottomNav ───────────────────────────────────────────────────────────────

const NAV = [
  { id: "home", label: "首页", Icon: Home },
  { id: "community", label: "社区", Icon: Globe },
  { id: "wealth", label: "财富", Icon: BarChart2 },
  { id: "life", label: "生活", Icon: Gift },
  { id: "mine", label: "我的", Icon: User },
] as const;

type TabId = (typeof NAV)[number]["id"];

function BottomNav({
  active,
  setActive,
}: {
  active: TabId;
  setActive: (t: TabId) => void;
}) {
  return (
    <div
      style={{
        background: "white",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        paddingBottom: 26,
        flexShrink: 0,
      }}
    >
      <div className="flex">
        {NAV.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="flex-1 flex flex-col items-center pt-3 pb-1 gap-0.5"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <Icon
              size={22}
              color={active === id ? RED : "#bbb"}
              strokeWidth={active === id ? 2.4 : 1.6}
            />
            <span
              style={{
                fontSize: 10,
                color: active === id ? RED : "#bbb",
                fontWeight: active === id ? 700 : 400,
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────

function HomePage() {
  const [showPromo, setShowPromo] = useState(true);

  const topActions = [
    { Icon: Wallet, label: "朝朝宝" },
    { Icon: Banknote, label: "借钱" },
    { Icon: ArrowLeftRight, label: "转账" },
    { Icon: LayoutGrid, label: "账户总览" },
  ];

  const row1 = [
    { Icon: CreditCard, label: "信用卡", badge: "查账单" },
    { Icon: FileText, label: "收支明细" },
    { Icon: ArrowDown, label: "他行卡转入" },
    { Icon: Building2, label: "城市服务" },
    { Icon: Flame, label: "热门活动" },
  ];

  const row2 = [
    { Icon: Heart, label: "养老金融" },
    { Icon: Utensils, label: "饭票" },
    { Icon: TrendingUp, label: "理财" },
    { Icon: PiggyBank, label: "存款" },
    { Icon: MoreHorizontal, label: "全部" },
  ];

  return (
    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Blue gradient header */}
      <div style={{ background: BLUE_GRAD }}>
        <StatusBar />

        {/* Search row */}
        <div className="flex items-center gap-2 px-4 pb-3">
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Scan size={22} color="#444" />
          </button>
          <div
            className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.88)" }}
          >
            <Search size={13} color="#bbb" />
            <span style={{ fontSize: 13, color: "#aaa" }}>抽至高188元水电燃券</span>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Smile size={22} color="#444" />
          </button>
          <button
            className="relative"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <MessageSquare size={22} color="#444" />
            <span
              className="absolute flex items-center justify-center rounded-full text-white"
              style={{
                top: -6,
                right: -8,
                width: 17,
                height: 17,
                background: RED,
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              27
            </span>
          </button>
        </div>

        {/* 4 quick actions */}
        <div className="flex justify-around px-4 pb-5">
          {topActions.map(({ Icon, label }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-2"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.32)", backdropFilter: "blur(4px)" }}
              >
                <Icon size={26} color="#2a4a7a" strokeWidth={1.5} />
              </div>
              <span style={{ color: "#333", fontSize: 13 }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Banner */}
        <div
          className="mx-3 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #c8e4f8 0%, #a0ccf0 40%, #d8eefa 100%)",
            minHeight: 185,
          }}
        >
          <div className="flex">
            <div className="p-4 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: 12, color: "#666" }}>乐享礼遇节</span>
                <span
                  className="text-white rounded px-1.5 py-px"
                  style={{ background: "#e07820", fontSize: 10, fontWeight: 700 }}
                >
                  8月
                </span>
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#1a1a1a",
                  lineHeight: 1.35,
                }}
              >
                一卡在手，乐享不停
              </div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 5 }}>
                ——◇ 假日出行，旅途无忧 ◇——
              </div>
              <div style={{ fontSize: 10, color: "#999", marginTop: 4 }}>
                请理性消费，量入为出
              </div>
              <div style={{ fontSize: 10, color: "#bbb", marginTop: 2 }}>
                *画面部分内容由AI技术生成
              </div>
              <button
                className="mt-3 px-6 py-2 rounded-full text-white font-semibold"
                style={{ background: RED, border: "none", cursor: "pointer", fontSize: 15 }}
              >
                点击查看
              </button>
            </div>
            <div
              className="flex items-center justify-center pr-3"
              style={{ width: 120 }}
            >
              <div className="relative">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 88,
                    height: 88,
                    background: "rgba(255,255,255,0.35)",
                  }}
                >
                  <Plane size={36} color="#3a6aaa" strokeWidth={1.3} />
                </div>
                <div
                  className="absolute -bottom-2 -right-2 rounded-lg flex items-center justify-center"
                  style={{
                    width: 42,
                    height: 28,
                    background: "linear-gradient(135deg, #1a3a6a, #2d5fa8)",
                  }}
                >
                  <span style={{ color: "white", fontSize: 7, fontWeight: 700 }}>
                    招商银行
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-1.5 pb-3 pt-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? 18 : 6,
                  height: 3,
                  borderRadius: 2,
                  background: i === 0 ? RED : "rgba(0,0,0,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ height: 14 }} />
      </div>

      {/* White section - 10 icons */}
      <div style={{ background: "white" }}>
        <div className="px-5 pt-5 pb-4">
          <div className="flex justify-between mb-5">
            {row1.map(({ Icon, label, badge }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1.5"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  minWidth: 56,
                }}
              >
                <div className="relative">
                  <Icon size={28} color="#1a1a1a" strokeWidth={1.35} />
                  {badge && (
                    <span
                      className="absolute text-white rounded"
                      style={{
                        top: -10,
                        right: -22,
                        background: RED,
                        fontSize: 9,
                        padding: "1px 4px",
                        whiteSpace: "nowrap",
                        fontWeight: 600,
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 12, color: "#333", textAlign: "center" }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            {row2.map(({ Icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1.5"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  minWidth: 56,
                }}
              >
                <Icon size={28} color="#1a1a1a" strokeWidth={1.35} />
                <span style={{ fontSize: 12, color: "#333", textAlign: "center" }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customer manager */}
      <div
        style={{
          background: "white",
          borderTop: "8px solid #f3f3f5",
        }}
      >
        <div className="flex items-center gap-3 px-5 py-3">
          <div
            className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #c0a880 0%, #a88860 100%)" }}
          >
            <User size={18} color="white" />
          </div>
          <span style={{ fontSize: 14, color: "#444" }}>
            您的专属客户经理发来新消息。
          </span>
        </div>
      </div>

      {/* 优享基金 promo */}
      {showPromo && (
        <div
          className="mx-3 mt-2 rounded-2xl relative overflow-hidden"
          style={{ background: "#fdf5e6" }}
        >
          <button
            onClick={() => setShowPromo(false)}
            className="absolute right-3 top-3"
            style={{ background: "none", border: "none", cursor: "pointer", zIndex: 1 }}
          >
            <X size={16} color="#bbb" />
          </button>
          <div className="px-4 pt-4 pb-4 text-center">
            <div
              className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full mb-2"
              style={{
                background: "linear-gradient(90deg,#f5a623,#e08020)",
                fontSize: 12,
                color: "white",
                fontWeight: 600,
              }}
            >
              优享基金*
            </div>
            <div
              style={{
                fontSize: 23,
                fontWeight: 800,
                color: "#111",
                margin: "6px 0 4px",
              }}
            >
              稳中求进有"优"解
            </div>
            <div style={{ fontSize: 13, color: "#666" }}>严选固收+ 求稳又求盈</div>
            <button
              className="mt-3 px-8 py-2.5 rounded-full text-white font-semibold"
              style={{ background: RED, border: "none", cursor: "pointer", fontSize: 15 }}
            >
              点击查看
            </button>
            <div style={{ fontSize: 10, color: "#bbb", marginTop: 5 }}>
              基金有风险，投资须谨慎。
            </div>
          </div>
        </div>
      )}

      {/* 借钱服务 */}
      <div style={{ background: "white", marginTop: 8 }}>
        <div className="px-5 pt-5 pb-5">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 19, fontWeight: 800, color: "#111" }}>借钱服务</span>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#aaa",
                fontSize: 13,
              }}
            >
              更多
            </button>
          </div>
          <div
            className="rounded-2xl px-4 py-4"
            style={{ background: "#f7f7fa", border: "1px solid rgba(0,0,0,0.05)" }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>生意贷</div>
            <div style={{ fontSize: 13, color: "#666", marginTop: 5 }}>
              经营性贷款，随借随还
            </div>
            <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>
              年利率(单利)低至3.6%…
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Community Page ───────────────────────────────────────────────────────────

function CommunityPage() {
  const [activeTab, setActiveTab] = useState("找机会");
  const tabs = ["关注", "找机会", "招牌IP", "热榜", "资讯", "讨论", "直播"];

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ scrollbarWidth: "none", background: "#f0f1f7" }}
    >
      <div style={{ paddingTop: 50 }}>
        {/* Profile header */}
        <div className="flex items-center justify-between px-4 pb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #4a8fa8 0%, #2a6f8a 100%)",
              }}
            />
            <span style={{ fontSize: 16, fontWeight: 600, color: "#111" }}>
              linzheming
            </span>
          </div>
          <Search size={22} color="#555" />
        </div>

        {/* Tabs */}
        <div
          className="flex overflow-x-auto px-3 border-b"
          style={{ scrollbarWidth: "none", borderColor: "rgba(0,0,0,0.06)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-shrink-0 px-2.5 py-2.5 relative"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: activeTab === tab ? 700 : 400,
                  color: activeTab === tab ? RED : "#333",
                }}
              >
                {tab}
              </span>
              {tab === "关注" && (
                <span
                  className="absolute rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: RED,
                    top: 8,
                    right: 0,
                  }}
                />
              )}
              {activeTab === tab && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                  style={{ width: 22, height: 2.5, background: RED }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="px-3 pt-3 flex flex-col gap-3 pb-4">
          {/* Investment banner */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "#f5f0e6" }}
          >
            <div className="flex">
              <div className="flex-1 p-4">
                <div className="flex items-center gap-1 mb-1">
                  <span
                    className="rounded px-1.5 py-px"
                    style={{ background: "#e8d8b8", color: "#8a7a60", fontSize: 10 }}
                  >
                    投资会客厅
                  </span>
                  <span style={{ color: "#aaa", fontSize: 10 }}>图</span>
                </div>
                <div
                  style={{ fontSize: 20, fontWeight: 800, color: "#111", lineHeight: 1.35 }}
                >
                  一线城市房价企稳
                </div>
                <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                  现在是买房的好时机吗？
                </div>
                <div style={{ fontSize: 10, color: "#bbb", marginTop: 8 }}>
                  市场有风险，投资须谨慎
                </div>
              </div>
              <div
                className="flex items-center justify-center pr-3"
                style={{ width: 110 }}
              >
                <div
                  className="rounded-xl flex items-center justify-center"
                  style={{
                    width: 88,
                    height: 80,
                    background: "linear-gradient(135deg, #b8c8d8 0%, #8aacba 100%)",
                  }}
                >
                  <Users size={32} color="white" strokeWidth={1.2} />
                </div>
              </div>
            </div>
          </div>

          {/* 大事件 */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "white" }}>
            <div className="px-4 pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-baseline gap-2">
                  <span style={{ fontSize: 17, fontWeight: 800, color: "#111" }}>
                    大事件
                  </span>
                  <span style={{ fontSize: 13, color: "#888" }}>
                    探寻背后的投资机会
                  </span>
                </div>
                <button
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                  style={{
                    background: "#fff0f0",
                    color: RED,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  🎙 AI播客
                  <ChevronRight size={11} />
                </button>
              </div>

              {/* Bubble chart */}
              <div
                className="relative rounded-xl mb-3"
                style={{ height: 198, background: "#fafafa", overflow: "hidden" }}
              >
                <div
                  className="absolute rounded-full flex items-center justify-center text-center"
                  style={{
                    width: 82,
                    height: 82,
                    left: 18,
                    top: 14,
                    background: "#eeeaf8",
                    color: "#5a5888",
                    fontSize: 11,
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  自动驾驶
                  <br />
                  新催化
                </div>
                <div
                  className="absolute rounded-full flex items-center justify-center text-center"
                  style={{
                    width: 76,
                    height: 76,
                    right: 22,
                    top: 10,
                    background: "#eef5e8",
                    color: "#5a7830",
                    fontSize: 11,
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  AI服务器
                  <br />
                  涨价
                </div>
                <div
                  className="absolute rounded-full flex items-center justify-center text-center"
                  style={{
                    width: 86,
                    height: 86,
                    left: 8,
                    bottom: 12,
                    background: "#e8f0f8",
                    color: "#305090",
                    fontSize: 11,
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  长江存储
                  <br />
                  IPO
                </div>
                <div
                  className="absolute rounded-full flex items-center justify-center text-center"
                  style={{
                    width: 114,
                    height: 114,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    background: "#fce8e8",
                    color: RED,
                    fontSize: 15,
                    fontWeight: 700,
                    lineHeight: 1.4,
                  }}
                >
                  新股高
                  <br />
                  签率
                </div>
                <div
                  className="absolute rounded-full flex items-center justify-center text-center"
                  style={{
                    width: 76,
                    height: 76,
                    right: 16,
                    bottom: 14,
                    background: "#f8f0e8",
                    color: "#885028",
                    fontSize: 11,
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  社保持
                  <br />
                  仓曝光
                </div>
              </div>
            </div>

            {/* 基金 article */}
            <div
              className="mx-4 mb-4 rounded-xl overflow-hidden"
              style={{ background: "#f5f8ff", border: "1px solid rgba(50,80,200,0.07)" }}
            >
              <div className="flex items-center p-3 gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#e4edff" }}
                >
                  <TrendingUp size={22} color="#4466cc" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <span
                      className="rounded px-1.5 py-px"
                      style={{ background: "#e4edff", color: "#4466cc", fontSize: 11 }}
                    >
                      基金
                    </span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
                    创新药行情到哪了？
                  </div>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    解读修复行情下的投资机遇
                  </div>
                </div>
                <button
                  className="px-3 py-1.5 rounded-full"
                  style={{
                    background: "white",
                    color: "#111",
                    border: "1px solid #ddd",
                    fontSize: 13,
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  去看看
                </button>
              </div>
              <div className="flex justify-center gap-1.5 pb-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: i === 1 ? 14 : 5,
                      height: 3,
                      borderRadius: 2,
                      background: i === 1 ? "#4466cc" : "#e0e0e0",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 向好板块 */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span style={{ fontSize: 17, fontWeight: 800, color: "#111" }}>
                向好板块
              </span>
              <span style={{ fontSize: 13, color: "#888" }}>提前布局，把握先机</span>
            </div>
            <div
              className="rounded-2xl p-4"
              style={{ background: "#4a5e38", minHeight: 110 }}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <div
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.92)",
                      lineHeight: 1.65,
                    }}
                  >
                    医药生物板块创新药出海与CXO复苏…
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.62)",
                      lineHeight: 1.6,
                      marginTop: 4,
                    }}
                  >
                    2026年8月：新版国家基药目录发布，新增…
                    <br />
                    6种药品，创新药首次纳入并降低公立医院准
                  </div>
                </div>
                <div
                  className="px-2 py-0.5 rounded flex-shrink-0"
                  style={{ background: RED, color: "white", fontSize: 10, fontWeight: 600 }}
                >
                  医药生物
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI */}
      <div
        className="sticky bottom-0 px-3 pb-3 pointer-events-none"
        style={{ background: "linear-gradient(transparent, rgba(240,241,247,0.9))" }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-full pointer-events-auto"
          style={{
            background: "rgba(220,235,255,0.9)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(100,160,240,0.25)",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: "#3a90d0" }}>
            小招带你找
          </span>
          <span style={{ fontSize: 12, color: "#444", flex: 1 }}>
            今天有哪些值得布局的板块和机会？
          </span>
          <MoreHorizontal size={16} color="#aaa" />
        </div>
      </div>
    </div>
  );
}

// ─── Wealth Page ──────────────────────────────────────────────────────────────

function WealthPage({ amounts }: { amounts: AmountConfig }) {
  const [productTab, setProductTab] = useState("多宝理财");
  const productTabs = ["多宝理财", "稳健专区", "活钱+", "省税保"];
  const totalAssets = splitAmount(amounts.totalAssets);

  const icons1 = [
    { Icon: TrendingUp, label: "理财" },
    { Icon: BarChart2, label: "基金" },
    { Icon: Shield, label: "保险" },
    { Icon: PiggyBank, label: "存款" },
    { Icon: Coins, label: "黄金" },
  ];
  const icons2 = [
    { Icon: Globe, label: "跨境金融" },
    { Icon: Star, label: "私享投资" },
    { Icon: Wallet, label: "朝朝宝" },
    { Icon: Leaf, label: "TREE配置" },
    { Icon: MoreHorizontal, label: "全部" },
  ];

  return (
    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Red header */}
      <div style={{ background: RED }}>
        <StatusBar onDark />
        <div className="flex items-center gap-2 px-4 pb-4">
          <div
            className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            <Search size={14} color="rgba(255,255,255,0.65)" />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
              交银理财稳享灵动慧利日开67号90天
            </span>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <Smile size={18} color="white" />
          </div>
        </div>
      </div>

      {/* Asset card */}
      <div
        className="mx-3 -mt-1 rounded-2xl p-4 mb-2"
        style={{ background: "#fde6e6" }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-baseline gap-1">
            <span style={{ fontSize: 34, fontWeight: 700, color: "#111" }}>
              {totalAssets.integer}
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>{totalAssets.decimal}</span>
            <button
              style={{ background: "none", border: "none", cursor: "pointer", marginLeft: 4 }}
            >
              <Eye size={18} color="#888" />
            </button>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#111" }}>{amounts.yesterdayIncome}</div>
        </div>

        <div className="flex justify-between mt-0.5 mb-3">
          <span style={{ fontSize: 13, color: "#888" }}>总资产(元)</span>
          <button
            className="flex items-center gap-0.5"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span style={{ fontSize: 13, color: "#888" }}>昨日收益</span>
            <ChevronRight size={13} color="#bbb" />
          </button>
        </div>

        {/* Breakdown */}
        <div
          style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 10 }}
        >
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: 13, color: "#777" }}>活钱</span>
              <span style={{ fontSize: 13, color: "#111", fontWeight: 500 }}>
                135,467.94
              </span>
              <span style={{ fontSize: 12, color: RED }}>+5.14</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: 13, color: "#777" }}>理财</span>
              <span style={{ fontSize: 13, color: "#111", fontWeight: 500 }}>
                2,483,372.95
              </span>
              <span style={{ fontSize: 12, color: RED }}>+7.50</span>
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: 13, color: "#777" }}>基金</span>
              <span style={{ fontSize: 13, color: "#111" }}>0.00</span>
              <span style={{ fontSize: 12, color: "#bbb" }}>0.00</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: 13, color: "#777" }}>保险</span>
              <span style={{ fontSize: 13, color: "#4488cc" }}>上年收益3.3%&gt;</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <span style={{ fontSize: 13, color: "#777" }}>专项</span>
            <span style={{ fontSize: 13, color: "#111" }}>10.04</span>
            <span style={{ fontSize: 12, color: "#bbb" }}>0.00</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="rounded-full"
              style={{ width: 7, height: 7, background: RED, flexShrink: 0 }}
            />
            <span style={{ fontSize: 12, color: "#555" }}>上周收益:+667.78，</span>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#4488cc",
                fontSize: 12,
                padding: 0,
              }}
            >
              看赚钱产品
            </button>
          </div>
        </div>
      </div>

      {/* Icon grid */}
      <div style={{ background: "white" }}>
        <div className="px-5 pt-4 pb-3">
          <div className="flex justify-between mb-4">
            {icons1.map(({ Icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1.5"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  minWidth: 52,
                }}
              >
                <Icon size={28} color="#1a1a1a" strokeWidth={1.35} />
                <span style={{ fontSize: 12, color: "#333" }}>{label}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            {icons2.map(({ Icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1.5"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  minWidth: 52,
                }}
              >
                <Icon size={28} color="#1a1a1a" strokeWidth={1.35} />
                <span style={{ fontSize: 12, color: "#333" }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product tabs + grid */}
      <div style={{ background: "white", marginTop: 8 }}>
        {/* Tab bar */}
        <div
          className="flex px-4 pt-3"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          {productTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setProductTab(tab)}
              className="px-3 py-2 relative"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: productTab === tab ? 700 : 400,
                  color: productTab === tab ? "#111" : "#999",
                }}
              >
                {tab}
              </span>
              {productTab === tab && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                  style={{ width: "75%", height: 2, background: "#111" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Products 2×2 */}
        <div className="grid grid-cols-2 p-4 gap-x-6 gap-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>
                周周宝
              </span>
              <span
                className="rounded px-1.5 py-0.5"
                style={{
                  background: "#fff3e0",
                  color: "#e07020",
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                稳健低波
              </span>
            </div>
            <div>
              <span style={{ fontSize: 28, fontWeight: 700, color: RED }}>2.84</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: RED }}>%</span>
            </div>
            <div style={{ fontSize: 12, color: "#aaa" }}>成立以来年化</div>
          </div>

          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#111", marginBottom: 4 }}>
              月月宝
            </div>
            <div>
              <span style={{ fontSize: 28, fontWeight: 700, color: RED }}>3.15</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: RED }}>%</span>
            </div>
            <div style={{ fontSize: 12, color: "#aaa" }}>成立以来年化</div>
          </div>

          <div
            className="pt-3"
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>季季宝</div>
          </div>

          <div
            className="pt-3"
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>半年宝</div>
          </div>
        </div>
      </div>

      {/* Stock ticker */}
      <div
        className="flex justify-between px-5 py-3"
        style={{
          background: "white",
          borderTop: "1px solid rgba(0,0,0,0.05)",
          marginTop: 2,
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 12, color: "#666" }}>创业板指</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#00aa44" }}>3431.89</span>
          <span style={{ fontSize: 12, color: "#00aa44" }}>-3.21%</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 12, color: "#666" }}>恒生指数</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#00aa44" }}>25517.33</span>
          <span style={{ fontSize: 12, color: "#00aa44" }}>-1.89%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Life Page ────────────────────────────────────────────────────────────────

function LifePage() {
  const row1 = [
    { Icon: Utensils, label: "饭票", color: "#4a9de0", bg: "#e8f3fd" },
    { Icon: Film, label: "影票", color: "#ff8c42", bg: "#fff0e8" },
    { Icon: ShoppingBag, label: "出行", color: "#47b5b5", bg: "#e6f7f7" },
    { Icon: Heart, label: "便民服务", color: "#44bb88", bg: "#e6f8f0" },
    { Icon: Zap, label: "生活缴费", color: "#f0b020", bg: "#fdf5e0" },
  ];
  const row2 = [
    { Icon: Phone, label: "话费流量", color: "#888", bg: "#f5f5f5" },
    { Icon: ShoppingCart, label: "商超便利", color: "#888", bg: "#f5f5f5" },
    { Icon: ShoppingBag, label: "掌上商城", color: "#888", bg: "#f5f5f5" },
    { Icon: Star, label: "积分", color: "#888", bg: "#f5f5f5" },
    { Icon: MoreHorizontal, label: "全部", color: "#888", bg: "#f5f5f5" },
  ];

  const restaurants = [
    { name: "大鱼寿司(…", badge: "买单 300减20元", badgeColor: "#ff8c42", logo: "大鱼\n寿司" },
    { name: "小岛韩食(…", badge: "券 1.9抵6.8元", badgeColor: "#44bb66", logo: "小岛\n韩食" },
    { name: "朱富贵(上…", badge: "券 85抵100元", badgeColor: "#8855cc", logo: "朱\n富贵" },
  ];

  return (
    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Blue gradient header */}
      <div style={{ background: BLUE_GRAD }}>
        <StatusBar />

        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 pb-4">
          <button
            className="flex items-center gap-0.5"
            style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>福州</span>
            <ChevronRight
              size={14}
              color="#555"
              style={{ transform: "rotate(90deg)" }}
            />
          </button>
          <div
            className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.85)" }}
          >
            <Search size={13} color="#bbb" />
            <span style={{ fontSize: 13, color: "#aaa" }}>星巴克笔笔立减2元起</span>
          </div>
          <Smile size={22} color="#555" />
          <Clipboard size={22} color="#555" />
        </div>

        {/* Hero banner */}
        <div
          className="mx-3 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #3a90d8 0%, #5ab4ed 50%, #7ecaee 100%)",
            minHeight: 172,
          }}
        >
          <div className="flex">
            <div className="flex-1 p-4">
              <div
                className="inline-flex items-center px-2 py-0.5 rounded mb-2"
                style={{
                  background: "rgba(255,255,255,0.22)",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                生活主理节
              </div>
              <div
                style={{ fontSize: 26, fontWeight: 800, color: "white", lineHeight: 1.3 }}
              >
                好生活 自有招
              </div>
              <div
                style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginTop: 5 }}
              >
                缤纷仲夏日，招招有福利
              </div>
              <button
                className="mt-3 px-4 py-1.5 rounded-full font-semibold"
                style={{ background: RED, color: "white", border: "none", cursor: "pointer", fontSize: 13 }}
              >
                点击参与
              </button>
              <div
                style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 4 }}
              >
                *本部分内容由AI技术生成
              </div>
            </div>
            <div
              className="flex items-center justify-center pr-4"
              style={{ width: 130 }}
            >
              <div
                className="rounded-2xl flex items-center justify-center"
                style={{
                  width: 100,
                  height: 100,
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <Plane size={36} color="white" strokeWidth={1.2} />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-1.5 pb-3 pt-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? 16 : 6,
                  height: 3,
                  borderRadius: 2,
                  background: i === 0 ? "white" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ height: 12 }} />
      </div>

      {/* White icon card */}
      <div style={{ background: "white" }}>
        <div className="px-5 pt-5 pb-4">
          <div className="flex justify-between mb-5">
            {row1.map(({ Icon, label, color, bg }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1.5"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Icon size={24} color={color} strokeWidth={1.5} />
                </div>
                <span style={{ fontSize: 12, color: "#333", textAlign: "center" }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            {row2.map(({ Icon, label, color, bg }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1.5"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Icon size={24} color={color} strokeWidth={1.5} />
                </div>
                <span style={{ fontSize: 12, color: "#333", textAlign: "center" }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 精选美食 */}
      <div style={{ background: "white", marginTop: 8 }}>
        <div className="px-4 pt-4 pb-5">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>
              精选美食
            </span>
            <button
              className="flex items-center gap-0.5"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span style={{ fontSize: 13, color: "#aaa" }}>更多</span>
              <ChevronRight size={14} color="#ccc" />
            </button>
          </div>

          <div className="flex gap-3">
            {/* Left big card */}
            <div
              className="rounded-2xl overflow-hidden flex-shrink-0 flex flex-col"
              style={{ width: 158 }}
            >
              <div
                className="flex-1 p-3"
                style={{
                  background: "linear-gradient(160deg, #1a3a5a 0%, #2a6090 100%)",
                }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <span
                    className="rounded px-1 py-px"
                    style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 9 }}
                  >
                    饭票
                  </span>
                </div>
                <div
                  style={{ fontSize: 14, fontWeight: 700, color: "white", lineHeight: 1.4 }}
                >
                  夏日寻味 舌尖尝鲜
                </div>
                <div
                  style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 2 }}
                >
                  品牌美食5折起
                </div>
                <div
                  className="mt-3 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <Utensils size={20} color="white" strokeWidth={1.3} />
                </div>
              </div>
              <div
                className="px-3 py-2.5"
                style={{ background: "#f8f8f8" }}
              >
                <button
                  className="w-full py-2 rounded-full font-semibold text-white"
                  style={{ background: RED, border: "none", cursor: "pointer", fontSize: 13 }}
                >
                  点击参与
                </button>
                <div className="flex justify-center gap-1 mt-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: i === 0 ? 12 : 5,
                        height: 3,
                        borderRadius: 2,
                        background: i === 0 ? RED : "#ddd",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right list */}
            <div className="flex-1 flex flex-col justify-between gap-3">
              {restaurants.map((r) => (
                <div key={r.name} className="flex items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-center"
                    style={{
                      background: "#f0f0f0",
                      fontSize: 9,
                      fontWeight: 600,
                      color: "#555",
                      lineHeight: 1.4,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {r.logo}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>
                      {r.name}
                    </div>
                    <span
                      className="inline-flex rounded mt-0.5 px-1.5 py-0.5"
                      style={{
                        background: r.badgeColor + "20",
                        color: r.badgeColor,
                        fontSize: 11,
                        fontWeight: 500,
                      }}
                    >
                      {r.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 掌上商城 */}
      <div
        className="flex items-center justify-between px-4 py-4"
        style={{ background: "white", marginTop: 8 }}
      >
        <span style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>掌上商城</span>
        <button
          className="flex items-center gap-0.5"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontSize: 13, color: "#aaa" }}>更多</span>
          <ChevronRight size={14} color="#ccc" />
        </button>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── Mine Page ────────────────────────────────────────────────────────────────

function MinePage({ amounts }: { amounts: AmountConfig }) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ scrollbarWidth: "none", background: "#f0f0f8" }}
    >
      <div style={{ paddingTop: 52 }}>
        {/* Top nav */}
        <div className="flex items-center justify-between px-4 pb-4">
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={22} color="#444" />
          </button>
          <div className="flex items-center gap-5">
            <Search size={22} color="#444" />
            <Settings size={22} color="#444" />
            <div className="relative">
              <MessageSquare size={22} color="#444" />
              <span
                className="absolute flex items-center justify-center rounded-full text-white"
                style={{
                  top: -7,
                  right: -9,
                  width: 17,
                  height: 17,
                  background: RED,
                  fontSize: 9,
                  fontWeight: 700,
                }}
              >
                27
              </span>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center px-4 pb-5">
          <div
            className="w-16 h-16 rounded-full overflow-hidden mr-3 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #4a8fa8 0%, #2a6f8a 100%)",
            }}
          />
          <div className="flex-1">
            <div style={{ fontSize: 21, fontWeight: 700, color: "#111" }}>**明</div>
            <button
              className="flex items-center gap-0.5 mt-1"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <span style={{ fontSize: 13, color: "#777" }}>个人主页</span>
              <ChevronRight size={13} color="#ccc" />
            </button>
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            <button
              className="flex items-center gap-0.5 px-3 py-1 rounded-full"
              style={{
                background: "white",
                border: "1px solid #e0d4b8",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 11, color: "#8a7050" }}>◇ 白金卡体验</span>
              <ChevronRight size={10} color="#ccc" />
            </button>
            <div className="px-3 py-1 rounded" style={{ background: "#111" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#dfc060" }}>金葵花</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "white", marginLeft: 2 }}>M2</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="flex bg-white mx-3 rounded-2xl py-4 mb-3"
          style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
        >
          {[
            { value: "4", label: "银行卡" },
            { value: "1", label: "待办" },
            { value: "4", label: "卡券" },
            { value: "1007", label: "积分" },
          ].map((item, i) => (
            <button
              key={i}
              className="flex-1 flex flex-col items-center gap-0.5"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <div style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>
                {item.value}
              </div>
              <div style={{ fontSize: 12, color: "#999" }}>{item.label}</div>
            </button>
          ))}
        </div>

        {/* Account overview */}
        <div
          className="bg-white mx-3 rounded-2xl p-4 mb-3"
          style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>账户总览</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {showBalance ? <Eye size={16} color="#999" /> : <EyeOff size={16} color="#999" />}
            </button>
          </div>
          <div className="flex justify-between items-end mb-1">
            <span style={{ fontSize: 13, color: "#999" }}>总资产</span>
            <span style={{ fontSize: 13, color: "#999" }}>昨日收益</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span style={{ fontSize: 24, fontWeight: 700, color: "#111" }}>
              {showBalance ? `¥ ${amounts.totalAssets}` : "¥ ••••••"}
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#00aa55" }}>
              +{amounts.yesterdayIncome}
            </span>
          </div>
        </div>

        {/* Customer manager */}
        <div
          className="bg-white mx-3 rounded-2xl p-4 mb-3 flex items-center gap-3"
          style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
        >
          <div
            className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #c0a880 0%, #a08860 100%)",
            }}
          />
          <div className="flex-1">
            <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
              金葵花客户经理-马文韬
            </div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 2 }}>
              您的专属客户经理发来新消息。
            </div>
          </div>
          <MoreHorizontal size={18} color="#ccc" />
        </div>

        {/* 本月收支 */}
        <div
          className="bg-white mx-3 rounded-2xl p-4 mb-3"
          style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 12 }}>
            本月收支
          </div>
          <div className="flex justify-between mb-1">
            <span style={{ fontSize: 13, color: "#999" }}>支出</span>
            <span style={{ fontSize: 13, color: "#999" }}>收入</span>
          </div>
          <div className="flex justify-between items-baseline mb-3">
            <span style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>¥ {amounts.monthlyExpense}</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>¥ {amounts.monthlyIncome}</span>
          </div>
          {/* Bar */}
          <div
            className="relative h-1.5 rounded-full overflow-hidden mb-3"
            style={{ background: "#eee" }}
          >
            <div
              className="absolute left-0 top-0 h-full"
              style={{ width: "3.5%", background: "#f0a020", borderRadius: 3 }}
            />
            <div
              className="absolute top-0 h-full"
              style={{ left: "3.5%", width: "96.5%", background: "#7060e0", borderRadius: 3 }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 13, color: "#555" }}>我的薪酬 ¥{amounts.salary}</span>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#4488cc",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              查看
            </button>
          </div>
        </div>

        {/* Credit card + Loan */}
        <div className="flex gap-3 mx-3 mb-5">
          <div
            className="flex-1 bg-white rounded-2xl p-4"
            style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 6 }}>
              信用卡
            </div>
            <div style={{ fontSize: 12, color: "#999" }}>账单日 09-05</div>
            <div
              style={{ fontSize: 22, fontWeight: 700, color: "#111", marginTop: 10 }}
            >
              ¥ {amounts.creditCardBill}
            </div>
          </div>
          <div
            className="flex-1 bg-white rounded-2xl p-4"
            style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-center gap-1.5 mb-6">
              <span style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>贷款</span>
              <span
                className="rounded px-1.5 py-0.5"
                style={{ background: "#fff0e0", color: "#e07030", fontSize: 10, fontWeight: 600 }}
              >
                抽好礼
              </span>
            </div>
            <div style={{ fontSize: 12, color: "#999" }}>最高可借 {amounts.loanLimit}</div>
            <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
              年利率(单利)低至
              <span style={{ color: RED, fontWeight: 700, fontSize: 15 }}>3.0</span>…
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function AmountEditor({
  amounts,
  onSaved,
}: {
  amounts: AmountConfig;
  onSaved: (amounts: AmountConfig) => void;
}) {
  const [draft, setDraft] = useState(amounts);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    setDraft(amounts);
  }, [amounts]);

  async function saveAmounts() {
    setStatus("saving");

    try {
      const response = await fetch("/api/amounts", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(draft),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      const saved = normalizeAmounts(await response.json());
      onSaved(saved);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <aside className="amount-editor">
      <div className="amount-editor__header">
        <div>
          <div className="amount-editor__title">金额编辑</div>
          <div className="amount-editor__hint">保存后，手机刷新即可同步。</div>
        </div>
      </div>

      <div className="amount-editor__fields">
        {AMOUNT_FIELDS.map((field) => (
          <label className="amount-editor__field" key={field.key}>
            <span>{field.label}</span>
            <input
              value={draft[field.key]}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  [field.key]: event.target.value,
                }))
              }
            />
          </label>
        ))}
      </div>

      <button
        className="amount-editor__save"
        disabled={status === "saving"}
        onClick={saveAmounts}
      >
        {status === "saving" ? "保存中..." : "保存金额"}
      </button>

      <div className="amount-editor__status">
        {status === "saved" && "已保存到 Cloudflare KV。"}
        {status === "error" && "保存失败，请用 Pages 预览或线上地址打开。"}
      </div>
    </aside>
  );
}

export default function App() {
  const [tab, setTab] = useState<TabId>("home");
  const [amounts, setAmounts] = useState<AmountConfig>(DEFAULT_AMOUNTS);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/amounts", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load amounts");
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setAmounts(normalizeAmounts(data));
        }
      })
      .catch(() => {
        if (isMounted) {
          setAmounts(DEFAULT_AMOUNTS);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className="app-stage flex items-center justify-center gap-6"
    >
      <div
        className="app-phone relative flex flex-col overflow-hidden"
      >
        {/* Notch */}
        <div
          className="app-notch absolute top-0 left-1/2 -translate-x-1/2 z-50"
          style={{
            width: 128,
            height: 37,
            background: "#000",
            borderBottomLeftRadius: 22,
            borderBottomRightRadius: 22,
          }}
        />

        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {tab === "home" && <HomePage />}
          {tab === "community" && <CommunityPage />}
          {tab === "wealth" && <WealthPage amounts={amounts} />}
          {tab === "life" && <LifePage />}
          {tab === "mine" && <MinePage amounts={amounts} />}
        </div>

        <BottomNav active={tab} setActive={setTab} />
      </div>

      <AmountEditor amounts={amounts} onSaved={setAmounts} />
    </div>
  );
}
