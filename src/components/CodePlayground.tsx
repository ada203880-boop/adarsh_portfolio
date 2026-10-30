import { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, Terminal, Database, Sparkles, Server } from 'lucide-react';
import { sound } from '../lib/sound';

interface PlaygroundDemo {
  id: string;
  title: string;
  category: 'Full-Stack Flow' | 'REST & Auth' | 'Database Schema';
  icon: typeof Terminal;
  description: string;
  codeSnippet: string;
  initialParams: Record<string, string | number | boolean>;
  execute: (params: Record<string, string | number | boolean>) => {
    status: number;
    latencyMs: number;
    response: Record<string, unknown>;
    logs: string[];
  };
}

const DEMOS: PlaygroundDemo[] = [
  {
    id: 'rx-checkout',
    title: 'E-Pharmacy Rx Validation & WhatsApp Alert',
    category: 'Full-Stack Flow',
    icon: Server,
    description: 'Simulates the live production checkout pipeline from Rabindra Medical Hall, including Schedule-H prescription integrity checks and automated WhatsApp dispatch.',
    codeSnippet: `// WooCommerce Checkout Pipeline (PHP + REST)
function process_rx_checkout($order_data, $prescription_file) {
  if (!$prescription_file || !validate_rx_integrity($prescription_file)) {
    return new WP_Error('rx_required', 'Valid prescription required for Schedule-H items.');
  }
  $order_id = create_woocommerce_order($order_data);
  dispatch_whatsapp_alert($order_id, $order_data['phone']);
  return ['order_id' => $order_id, 'status' => 'pharmacist_hold'];
}`,
    initialParams: {
      hasPrescription: true,
      fileSizeKb: 450,
      customerPhone: '+919861054025',
      medicationType: 'Schedule-H (Prescription Required)',
    },
    execute: (params) => {
      const hasRx = Boolean(params.hasPrescription);
      const size = Number(params.fileSizeKb);
      const phone = String(params.customerPhone);

      const logs: string[] = [];
      logs.push('[CLIENT] Initiating checkout payload submission...');

      if (!hasRx) {
        logs.push('[VALIDATOR] ❌ Missing prescription file for Schedule-H cart item.');
        logs.push('[RESPONSE] 422 Unprocessable Entity: Prescription verification mandatory.');
        return {
          status: 422,
          latencyMs: 18,
          response: {
            error: 'RX_VERIFICATION_REQUIRED',
            message: 'Schedule-H medicines mandate pharmacist approval. Please attach a valid doctor prescription.',
            complianceFlag: 'BLOCKED_AT_GATEWAY',
          },
          logs,
        };
      }

      if (size > 5000) {
        logs.push(`[VALIDATOR] ❌ File size exceeds max allowable limit (${size} KB > 5000 KB).`);
        return {
          status: 413,
          latencyMs: 24,
          response: { error: 'PAYLOAD_TOO_LARGE', maxKb: 5000 },
          logs,
        };
      }

      logs.push(`[VALIDATOR] ✓ File integrity verified (${size} KB PDF/JPEG).`);
      logs.push('[MYSQL] Inserting order row into wp_posts & wp_woocommerce_order_items...');
      logs.push(`[WEBHOOK] Dispatching automated WhatsApp notification to ${phone}...`);
      logs.push('[RESPONSE] 201 Created: Order placed on verified pharmacist hold state.');

      return {
        status: 201,
        latencyMs: 42,
        response: {
          orderId: `RMH-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'PHARMACIST_HOLD',
          customerAlert: `WhatsApp dispatched to ${phone}`,
          compliance: 'SCHEDULE_H_VALIDATED',
          fulfillmentLatency: '42ms',
        },
        logs,
      };
    },
  },

  {
    id: 'jwt-auth',
    title: 'Stateless JWT Auth & Rate Limiter Pipeline',
    category: 'REST & Auth',
    icon: Terminal,
    description: 'Demonstrates token decoding, role claim verification, and token bucket rate limiting on Node.js / Express endpoints.',
    codeSnippet: `// Express.js Auth Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (rateLimiter.isExceeded(decoded.userId)) {
    return res.status(429).json({ error: 'Too Many Requests' });
  }
  req.user = decoded;
  next();
};`,
    initialParams: {
      tokenType: 'Valid Bearer JWT',
      userRole: 'FullStackEngineer',
      requestCount: 4,
    },
    execute: (params) => {
      const type = String(params.tokenType);
      const count = Number(params.requestCount);
      const role = String(params.userRole);

      const logs: string[] = [];
      logs.push('[GATEWAY] Incoming HTTP request received at /api/v1/workstation...');

      if (type !== 'Valid Bearer JWT') {
        logs.push('[AUTH] ❌ Token signature verification failed or token missing.');
        return {
          status: 401,
          latencyMs: 12,
          response: { error: 'UNAUTHORIZED', code: 'INVALID_SIGNATURE' },
          logs,
        };
      }

      if (count > 10) {
        logs.push(`[RATE_LIMITER] ❌ Rate limit exceeded: ${count} requests in window (limit 10).`);
        return {
          status: 429,
          latencyMs: 8,
          response: { error: 'TOO_MANY_REQUESTS', retryAfterSec: 30 },
          logs,
        };
      }

      logs.push(`[AUTH] ✓ JWT valid. Subject ID: usr_adarsh_${role.toLowerCase()}.`);
      logs.push(`[RATE_LIMITER] Token bucket consumed: ${count}/10 requests.`);
      logs.push('[CONTROLLER] Serving protected resource with secure headers.');

      return {
        status: 200,
        latencyMs: 19,
        response: {
          authenticated: true,
          role,
          scope: ['repo:read', 'telemetry:stream', 'projects:inspect'],
          rateLimitRemaining: Math.max(0, 10 - count),
        },
        logs,
      };
    },
  },

  {
    id: 'db-relational',
    title: 'Relational Schema Join & Index Querying',
    category: 'Database Schema',
    icon: Database,
    description: 'Visualizes normalized relational table relations across Users, Workouts, and Nutrition Logs in FORGE Fitness.',
    codeSnippet: `SELECT 
  u.id AS user_id, u.full_name,
  w.split_name, w.duration_min,
  n.daily_calories, n.protein_grams
FROM users u
INNER JOIN workout_sessions w ON u.id = w.user_id
LEFT JOIN nutrition_logs n ON u.id = n.user_id AND n.log_date = CURRENT_DATE()
WHERE u.id = ?;`,
    initialParams: {
      userId: 104,
      workoutSplit: 'Hypertrophy Upper Body',
      calorieTarget: 2400,
    },
    execute: (params) => {
      const userId = Number(params.userId);
      const split = String(params.workoutSplit);
      const calories = Number(params.calorieTarget);

      const logs: string[] = [];
      logs.push(`[MYSQL] Parsing query with user_id = ${userId}...`);
      logs.push('[INDEX_SCAN] Utilizing primary key index PRIMARY(u.id) -> Cost: 0.15');
      logs.push('[JOIN] Inner joining workout_sessions on FK idx_user_id (ref: const)');
      logs.push('[JOIN] Left joining nutrition_logs matching date constraint');
      logs.push('[RESULT] 1 row returned in 0.8ms');

      return {
        status: 200,
        latencyMs: 28,
        response: {
          queryExecutionTime: '0.8ms',
          recordsReturned: 1,
          dataset: {
            userId,
            fullName: 'Adarsh Panda',
            program: split,
            nutritionPlan: {
              targetCalories: calories,
              proteinGrams: Math.round(calories * 0.25 / 4),
              carbsGrams: Math.round(calories * 0.50 / 4),
              fatGrams: Math.round(calories * 0.25 / 9),
            },
            storageEngine: 'InnoDB',
          },
        },
        logs,
      };
    },
  },
];

export function CodePlayground() {
  const [selectedDemo, setSelectedDemo] = useState<PlaygroundDemo>(DEMOS[0]);
  const [params, setParams] = useState<Record<string, string | number | boolean>>(DEMOS[0].initialParams);
  const [result, setResult] = useState<ReturnType<PlaygroundDemo['execute']> | null>(null);

  const handleSelectDemo = (demo: PlaygroundDemo) => {
    sound.playClick();
    setSelectedDemo(demo);
    setParams(demo.initialParams);
    setResult(null);
  };

  const handleRun = () => {
    sound.playClick();
    const out = selectedDemo.execute(params);
    setResult(out);
  };

  const handleReset = () => {
    sound.playHover();
    setParams(selectedDemo.initialParams);
    setResult(null);
  };

  return (
    <section id="playground" className="relative w-full max-w-full overflow-hidden bg-[#050811] py-20 sm:py-28 text-white">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-cyan-600/[0.04] blur-[180px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
              <Sparkles size={13} />
              <span>05 // LIVE ARCHITECTURE PLAYGROUND</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white">
              Safe Engineering &amp;{' '}
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-violet-300">
                Data Simulators.
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Explore authentic full-stack runtime flows, prescription validation pipelines, rate limiters, and relational queries in a safe, zero-eval interactive demonstration environment.
            </p>
          </div>

          {/* Preset Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
            {DEMOS.map((demo) => {
              const isSelected = selectedDemo.id === demo.id;
              const Icon = demo.icon;
              return (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => handleSelectDemo(demo)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 font-mono text-[11px] sm:text-xs transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon size={13} />
                  <span>{demo.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Playground Stage Grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Code View + Parameter Control */}
          <div className="flex flex-col rounded-3xl border border-white/10 bg-[#0a0d18] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider block">
                  {selectedDemo.category}
                </span>
                <h3 className="text-lg sm:text-xl font-light text-white mt-0.5">
                  {selectedDemo.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[11px] text-zinc-400 hover:text-white transition-colors"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  onClick={handleRun}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-1.5 font-mono text-[11px] font-bold text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all"
                >
                  <Play size={12} fill="currentColor" />
                  <span>Execute</span>
                </button>
              </div>
            </div>

            {/* Code Box */}
            <div className="relative rounded-xl border border-white/10 bg-black/80 p-4 font-mono text-xs overflow-x-auto text-zinc-300">
              <pre className="text-[11px] leading-relaxed">
                <code>{selectedDemo.codeSnippet}</code>
              </pre>
            </div>

            {/* Parameter Tuning Inputs */}
            <div className="mt-6 border-t border-white/10 pt-5">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-3">
                INTERACTIVE PARAMETERS
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(params).map(([key, val]) => (
                  <div key={key} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
                    <label className="font-mono text-[10px] text-zinc-400 block mb-1">
                      {key}
                    </label>
                    {typeof val === 'boolean' ? (
                      <button
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setParams((p) => ({ ...p, [key]: !p[key] }));
                        }}
                        className={`w-full rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                          val
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {val ? 'TRUE (Prescription Provided)' : 'FALSE (Missing)'}
                      </button>
                    ) : typeof val === 'number' ? (
                      <input
                        type="number"
                        value={val}
                        onChange={(e) => setParams((p) => ({ ...p, [key]: Number(e.target.value) }))}
                        className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(val)}
                        onChange={(e) => setParams((p) => ({ ...p, [key]: e.target.value }))}
                        className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Execution Output Feed & Response Envelopes */}
          <div className="flex flex-col rounded-3xl border border-cyan-500/25 bg-[#090c16] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.7)] font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-cyan-300 font-semibold text-[11px]">OUTPUT_CONSOLE_TELEMETRY</span>
              </div>
              {result && (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    result.status < 300
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  HTTP {result.status} · {result.latencyMs}ms
                </span>
              )}
            </div>

            {/* Trace Logs Window */}
            <div className="flex-1 min-h-[160px] rounded-xl border border-white/10 bg-black/90 p-4 space-y-1.5 overflow-y-auto max-h-[220px]">
              {result ? (
                result.logs.map((log, i) => (
                  <div
                    key={i}
                    className={`text-[11px] ${
                      log.includes('❌')
                        ? 'text-rose-400'
                        : log.includes('✓')
                        ? 'text-emerald-400'
                        : log.includes('[MYSQL]')
                        ? 'text-cyan-300'
                        : 'text-zinc-400'
                    }`}
                  >
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-zinc-600 text-[11px] italic">
                  Press &apos;Execute&apos; to run the pipeline simulation with active parameters...
                </div>
              )}
            </div>

            {/* Structured JSON Response Envelope */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-2">
                RESPONSE ENVELOPE (JSON)
              </span>
              <div className="rounded-xl border border-white/10 bg-black/60 p-4 overflow-x-auto text-[11px] text-zinc-300">
                <pre>
                  <code>
                    {result
                      ? JSON.stringify(result.response, null, 2)
                      : '// Response payload will appear here after execution'}
                  </code>
                </pre>
              </div>
            </div>

            {/* Feature Note */}
            <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-500">
              <CheckCircle2 size={12} className="text-emerald-400" />
              <span>Safe sandbox environment — 100% deterministic, zero arbitrary eval execution</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

