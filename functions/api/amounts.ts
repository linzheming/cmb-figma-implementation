type AmountConfig = {
  totalAssets: string;
  yesterdayIncome: string;
  monthlyExpense: string;
  monthlyIncome: string;
  salary: string;
  creditCardBill: string;
  loanLimit: string;
};

type Env = {
  CMB_AMOUNT_CONFIG: KVNamespace;
};

const CONFIG_KEY = "current";

const DEFAULT_AMOUNTS: AmountConfig = {
  totalAssets: "2,618,850.93",
  yesterdayIncome: "12.64",
  monthlyExpense: "608.45",
  monthlyIncome: "17,516.36",
  salary: "17,372.45",
  creditCardBill: "63.45",
  loanLimit: "30 万",
};

const json = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...init?.headers,
    },
  });

const normalizeAmounts = (value: unknown): AmountConfig => {
  const input = value && typeof value === "object" ? value : {};
  return {
    ...DEFAULT_AMOUNTS,
    ...(input as Partial<Record<keyof AmountConfig, unknown>>),
  } as AmountConfig;
};

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const stored = await env.CMB_AMOUNT_CONFIG.get(CONFIG_KEY, "json");
  return json(normalizeAmounts(stored));
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const amounts = normalizeAmounts(payload);
  await env.CMB_AMOUNT_CONFIG.put(CONFIG_KEY, JSON.stringify(amounts));
  return json(amounts);
};

export const onRequestOptions: PagesFunction = () =>
  new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-methods": "GET, PUT, OPTIONS",
      "access-control-allow-headers": "content-type",
      "cache-control": "no-store",
    },
  });
