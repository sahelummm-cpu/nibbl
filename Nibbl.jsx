import React, { useState, useRef } from "react";
import { Home, BarChart3, Settings, Plus, Flame, Dumbbell, Utensils, Droplet, Scale, ChevronLeft, ChevronRight, Check, Lock, Camera, ScanBarcode, ScanLine, Refrigerator, Search, GlassWater, Calendar, Sparkles, Pencil, Gift, Minus, X, Zap, Globe, Heart, User, TrendingUp, TrendingDown } from "lucide-react";

const C = {
  ink: "#1B2A2A", cream: "#FBF7F0", accent: "#FF7A4D", accentLight: "#FF8A5B", accentDark: "#E85F30",
  protein: "#F2545B", carbs: "#F2A03D", fat: "#4DA8F0", water: "#4DA8F0",
  flame: "#FF7A3D", grayBg: "#F4F0E8", sub: "#B7AE9E", border: "#F0EADF",
  pTrack: "#FDECEC", cTrack: "#FCF1E2", fTrack: "#E8F3FD",
  pInk: "#C23B42", cInk: "#C57A1E", fInk: "#2C7EC0", ringTrack: "#F0E8DA",
};
const BODY = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
const DISP = "Poppins, system-ui, sans-serif";

const LANGS = [
  { code: "EN", flag: "\u{1F1FA}\u{1F1F8}", name: "English" },
  { code: "ES", flag: "\u{1F1EA}\u{1F1F8}", name: "Espanol" },
  { code: "AR", flag: "\u{1F1F8}\u{1F1E6}", name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" },
  { code: "FR", flag: "\u{1F1EB}\u{1F1F7}", name: "Francais" },
  { code: "PT", flag: "\u{1F1E7}\u{1F1F7}", name: "Portugues" },
];
const T = {
  EN: { refer: "Refer & get 1 month free", referSub: "Invite a friend - you both get Pro free", tagline: "Snap it. Nibbl tracks it.", getStarted: "Get Started", haveAccount: "Already have an account?", signIn: "Sign In here", caloriesLeft: "Calories left", caloriesOver: "Calories over", protein: "Protein", carbs: "Carbs", fat: "Fat", left: "left", over: "over", water: "Water", glasses: "glasses", askCoach: "Ask your AI Coach", coachSub: "What should I eat to hit my macros?", todaysLog: "Today's Log", log: "Log", noMeals: "No meals logged yet. Tap + to add one.", today: "Today", yesterday: "Yesterday", addFood: "Add food", home: "Home", progress: "Progress", settings: "Settings", editGoals: "Edit goals", dailyTarget: "Daily target", goal: "Goal", sex: "Sex", activity: "Activity", pace: "Pace", language: "Language", save: "Save", scanMeal: "Scan a meal", scanBarcode: "Scan Barcode", scanLabel: "Scan Food Label", scanFridge: "Scan Fridge", alignBarcode: "Align the barcode in the frame to scan", food: "Food", barcode: "Barcode", foodLabel: "Food Label", fridge: "Fridge", upgrade: "Upgrade to Nibbl Pro", widgets: "Home & Lock Screen widgets", invite: "Invite friends - earn free month" },
  ES: { refer: "Refiere y gana 1 mes gratis", referSub: "Invita a un amigo - ambos obtienen Pro gratis", tagline: "Foto y listo. Nibbl lo registra.", getStarted: "Empezar", haveAccount: "Ya tienes cuenta?", signIn: "Inicia sesion", caloriesLeft: "Calorias restantes", caloriesOver: "Calorias de mas", protein: "Proteina", carbs: "Carbos", fat: "Grasa", left: "restante", over: "de mas", water: "Agua", glasses: "vasos", askCoach: "Pregunta a tu Coach IA", coachSub: "Que como para cumplir mis macros?", todaysLog: "Registro de hoy", log: "Registro", noMeals: "Sin comidas. Toca + para anadir.", today: "Hoy", yesterday: "Ayer", addFood: "Anadir comida", home: "Inicio", progress: "Progreso", settings: "Ajustes", editGoals: "Editar metas", dailyTarget: "Meta diaria", goal: "Meta", sex: "Sexo", activity: "Actividad", pace: "Ritmo", language: "Idioma", save: "Guardar", scanMeal: "Escanear comida", scanBarcode: "Escanear codigo", scanLabel: "Escanear etiqueta", scanFridge: "Escanear nevera", alignBarcode: "Alinea el codigo en el marco", food: "Comida", barcode: "Codigo", foodLabel: "Etiqueta", fridge: "Nevera", upgrade: "Mejora a Nibbl Pro", widgets: "Widgets de pantalla", invite: "Invita amigos - gana un mes gratis" },
  AR: { refer: "\u0627\u062F\u0639\u064F \u0635\u062F\u064A\u0642\u064B\u0627 \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0634\u0647\u0631 \u0645\u062C\u0627\u0646\u064A", referSub: "\u0627\u062F\u0639\u064F \u0635\u062F\u064A\u0642\u064B\u0627 - \u064A\u062D\u0635\u0644 \u0643\u0644\u0627\u0643\u0645\u0627 \u0639\u0644\u0649 Pro \u0645\u062C\u0627\u0646\u064B\u0627", tagline: "\u0635\u0648\u0651\u0631\u0647\u0627. \u0646\u0650\u0628\u0644 \u064A\u062D\u0633\u0628\u0647\u0627.", getStarted: "\u0627\u0628\u062F\u0623", haveAccount: "\u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F", signIn: "\u0633\u062C\u0651\u0644 \u0627\u0644\u062F\u062E\u0648\u0644", caloriesLeft: "\u0633\u0639\u0631\u0627\u062A \u0645\u062A\u0628\u0642\u064A\u0629", caloriesOver: "\u0633\u0639\u0631\u0627\u062A \u0632\u0627\u0626\u062F\u0629", protein: "\u0628\u0631\u0648\u062A\u064A\u0646", carbs: "\u0643\u0631\u0628\u0648\u0647\u064A\u062F\u0631\u0627\u062A", fat: "\u062F\u0647\u0648\u0646", left: "\u0645\u062A\u0628\u0642\u064A", over: "\u0632\u0627\u0626\u062F", water: "\u0645\u0627\u0621", glasses: "\u0623\u0643\u0648\u0627\u0628", askCoach: "\u0627\u0633\u0623\u0644 \u0645\u062F\u0631\u0651\u0628 \u0627\u0644\u0630\u0643\u0627\u0621", coachSub: "\u0645\u0627\u0630\u0627 \u0622\u0643\u0644 \u0644\u0623\u062D\u0642\u0642 \u0623\u0647\u062F\u0627\u0641\u064A\u061F", todaysLog: "\u0633\u062C\u0644 \u0627\u0644\u064A\u0648\u0645", log: "\u0627\u0644\u0633\u062C\u0644", noMeals: "\u0644\u0627 \u0648\u062C\u0628\u0627\u062A. \u0627\u0636\u063A\u0637 + \u0644\u0644\u0625\u0636\u0627\u0641\u0629.", today: "\u0627\u0644\u064A\u0648\u0645", yesterday: "\u0623\u0645\u0633", addFood: "\u0623\u0636\u0641 \u0637\u0639\u0627\u0645\u064B\u0627", home: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629", progress: "\u0627\u0644\u062A\u0642\u062F\u0651\u0645", settings: "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A", editGoals: "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0623\u0647\u062F\u0627\u0641", dailyTarget: "\u0627\u0644\u0647\u062F\u0641 \u0627\u0644\u064A\u0648\u0645\u064A", goal: "\u0627\u0644\u0647\u062F\u0641", sex: "\u0627\u0644\u062C\u0646\u0633", activity: "\u0627\u0644\u0646\u0634\u0627\u0637", pace: "\u0627\u0644\u0648\u062A\u064A\u0631\u0629", language: "\u0627\u0644\u0644\u063A\u0629", save: "\u062D\u0641\u0638", scanMeal: "\u0635\u0648\u0651\u0631 \u0648\u062C\u0628\u0629", scanBarcode: "\u0645\u0633\u062D \u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062F", scanLabel: "\u0645\u0633\u062D \u0627\u0644\u0645\u0644\u0635\u0642", scanFridge: "\u0645\u0633\u062D \u0627\u0644\u062B\u0644\u0627\u062C\u0629", alignBarcode: "\u062D\u0627\u0630\u0650 \u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062F \u062F\u0627\u062E\u0644 \u0627\u0644\u0625\u0637\u0627\u0631", food: "\u0637\u0639\u0627\u0645", barcode: "\u0628\u0627\u0631\u0643\u0648\u062F", foodLabel: "\u0645\u0644\u0635\u0642", fridge: "\u062B\u0644\u0627\u062C\u0629", upgrade: "\u0627\u0644\u062A\u0631\u0642\u064A\u0629 \u0625\u0644\u0649 Nibbl Pro", widgets: "\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0634\u0627\u0634\u0629", invite: "\u0627\u062F\u0639\u064F \u0623\u0635\u062F\u0642\u0627\u0621\u0643 - \u0627\u0643\u0633\u0628 \u0634\u0647\u0631\u064B\u0627 \u0645\u062C\u0627\u0646\u064A\u064B\u0627" },
  FR: { refer: "Parrainez et gagnez 1 mois gratuit", referSub: "Invitez un ami - vous gagnez tous les deux Pro", tagline: "Photographiez. Nibbl compte.", getStarted: "Commencer", haveAccount: "Vous avez un compte ?", signIn: "Se connecter", caloriesLeft: "Calories restantes", caloriesOver: "Calories en trop", protein: "Proteines", carbs: "Glucides", fat: "Lipides", left: "restant", over: "en trop", water: "Eau", glasses: "verres", askCoach: "Demandez au Coach IA", coachSub: "Que manger pour mes macros ?", todaysLog: "Journal du jour", log: "Journal", noMeals: "Aucun repas. Touchez + pour ajouter.", today: "Aujourd'hui", yesterday: "Hier", addFood: "Ajouter", home: "Accueil", progress: "Progres", settings: "Reglages", editGoals: "Modifier objectifs", dailyTarget: "Objectif quotidien", goal: "Objectif", sex: "Sexe", activity: "Activite", pace: "Rythme", language: "Langue", save: "Enregistrer", scanMeal: "Scanner un repas", scanBarcode: "Scanner code-barres", scanLabel: "Scanner etiquette", scanFridge: "Scanner frigo", alignBarcode: "Alignez le code dans le cadre", food: "Repas", barcode: "Code", foodLabel: "Etiquette", fridge: "Frigo", upgrade: "Passer a Nibbl Pro", widgets: "Widgets d'ecran", invite: "Invitez des amis - mois gratuit" },
  PT: { refer: "Indique e ganhe 1 mes gratis", referSub: "Convide um amigo - ambos ganham Pro gratis", tagline: "Foto e pronto. Nibbl registra.", getStarted: "Comecar", haveAccount: "Ja tem conta?", signIn: "Entrar", caloriesLeft: "Calorias restantes", caloriesOver: "Calorias a mais", protein: "Proteina", carbs: "Carbos", fat: "Gordura", left: "restante", over: "a mais", water: "Agua", glasses: "copos", askCoach: "Pergunte ao Coach IA", coachSub: "O que comer para bater minhas macros?", todaysLog: "Registro de hoje", log: "Registro", noMeals: "Sem refeicoes. Toque + para adicionar.", today: "Hoje", yesterday: "Ontem", addFood: "Adicionar", home: "Inicio", progress: "Progresso", settings: "Ajustes", editGoals: "Editar metas", dailyTarget: "Meta diaria", goal: "Meta", sex: "Sexo", activity: "Atividade", pace: "Ritmo", language: "Idioma", save: "Salvar", scanMeal: "Escanear refeicao", scanBarcode: "Escanear codigo", scanLabel: "Escanear rotulo", scanFridge: "Escanear geladeira", alignBarcode: "Alinhe o codigo no quadro", food: "Comida", barcode: "Codigo", foodLabel: "Rotulo", fridge: "Geladeira", upgrade: "Assine o Nibbl Pro", widgets: "Widgets de tela", invite: "Convide amigos - ganhe um mes gratis" },
};

// Detailed Nibbl fox (matches Nibbl.dc.html). Renders just the face, no tile.
function FoxFace({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: "block", filter: "drop-shadow(0 6px 10px rgba(120,30,0,.25))" }}>
      <path d="M30 44 L20 9 Q19 6 23 7 L56 28 Z" fill="#F4F0E8" /><path d="M90 44 L100 9 Q101 6 97 7 L64 28 Z" fill="#F4F0E8" />
      <path d="M33 42 L26 18 Q25.5 15.5 28.5 17 L50 30 Z" fill="#E85F30" /><path d="M87 42 L94 18 Q94.5 15.5 91.5 17 L70 30 Z" fill="#E85F30" />
      <path d="M24 42 C24 30 38 25 60 25 C82 25 96 30 96 42 C96 60 88 76 60 98 C32 76 24 60 24 42 Z" fill="#FBF7F0" />
      <path d="M25 41 C25 30 39 26 60 26 C81 26 95 30 95 41 C95 55 90 65 80 74 C72 65 66 60 60 60 C54 60 48 65 40 74 C30 65 25 55 25 41 Z" fill="#FF7A4D" />
      <ellipse cx="44" cy="48" rx="4.6" ry="5.6" fill="#1B2A2A" /><circle cx="45.6" cy="46" r="1.5" fill="#fff" />
      <ellipse cx="76" cy="48" rx="4.6" ry="5.6" fill="#1B2A2A" /><circle cx="77.6" cy="46" r="1.5" fill="#fff" />
      <path d="M60 70 L53.5 63 Q60 60.5 66.5 63 Z" fill="#1B2A2A" /><path d="M60 70 L60 78" stroke="#1B2A2A" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
// Flat coral monoline fox for dark surfaces (Ask Nibbl card, etc.)
function FoxFlat({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: "block" }}>
      <path d="M30 44 L21 12 L54 30 Z" fill="#E85F30" /><path d="M90 44 L99 12 L66 30 Z" fill="#E85F30" />
      <path d="M25 41 C25 30 39 26 60 26 C81 26 95 30 95 41 C95 60 87 76 60 96 C33 76 25 60 25 41 Z" fill="#FF7A4D" />
      <circle cx="45" cy="49" r="4" fill="#1B2A2A" /><circle cx="75" cy="49" r="4" fill="#1B2A2A" />
      <path d="M60 70 L54 64 Q60 62 66 64 Z" fill="#1B2A2A" />
    </svg>
  );
}
function NibblMark({ size = 40, radius = 11 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: radius, overflow: "hidden", display: "grid", placeItems: "center", position: "relative", background: "linear-gradient(150deg,#FF8A5B 0%,#FF7A4D 38%,#E85F30 100%)", boxShadow: "inset 0 1px 2px rgba(255,255,255,.4)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 30% 12%,rgba(255,255,255,.35),transparent 55%)" }} />
      <div style={{ position: "relative" }}><FoxFace size={size * 0.72} /></div>
    </div>
  );
}

const STEPS = [
  { key: "goal", q: "What's your goal?", opts: ["Lose weight", "Maintain", "Gain muscle"] },
  { key: "sex", q: "What's your sex?", opts: ["Female", "Male", "Other"] },
  { key: "activity", q: "How active are you?", opts: ["Sedentary", "Lightly active", "Very active"] },
  { key: "pace", q: "How fast do you want results?", opts: ["Steady", "Moderate", "Aggressive"] },
];
const TARGET = { "Lose weight": 1800, Maintain: 2200, "Gain muscle": 2700 };

function foodEmoji(name) {
  const n = (name || "").toLowerCase();
  const map = [["burger", "\u{1F354}"], ["cheese", "\u{1F9C0}"], ["chicken", "\u{1F357}"], ["pizza", "\u{1F355}"], ["salad", "\u{1F957}"], ["rice", "\u{1F35A}"], ["egg", "\u{1F95A}"], ["banana", "\u{1F34C}"], ["apple", "\u{1F34E}"], ["fish", "\u{1F41F}"], ["salmon", "\u{1F41F}"], ["yogurt", "\u{1F95B}"], ["shake", "\u{1F964}"], ["oat", "\u{1F963}"], ["almond", "\u{1F330}"], ["avocado", "\u{1F951}"], ["bread", "\u{1F35E}"], ["pasta", "\u{1F35D}"], ["taco", "\u{1F32E}"], ["coffee", "\u2615"], ["soup", "\u{1F372}"], ["steak", "\u{1F969}"], ["fries", "\u{1F35F}"], ["sandwich", "\u{1F96A}"]];
  for (const pair of map) if (n.includes(pair[0])) return pair[1];
  return "\u{1F37D}\uFE0F";
}

const FOOD_DB = [
  { name: "Grilled chicken breast", calories: 165, protein: 31, carbs: 0, fat: 4 },
  { name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
  { name: "Greek yogurt", calories: 100, protein: 17, carbs: 6, fat: 0 },
  { name: "White rice (1 cup)", calories: 205, protein: 4, carbs: 45, fat: 0 },
  { name: "Avocado", calories: 240, protein: 3, carbs: 12, fat: 22 },
  { name: "Egg", calories: 78, protein: 6, carbs: 1, fat: 5 },
  { name: "Almonds (28g)", calories: 164, protein: 6, carbs: 6, fat: 14 },
  { name: "Salmon fillet", calories: 280, protein: 39, carbs: 0, fat: 13 },
  { name: "Oatmeal (1 cup)", calories: 150, protein: 5, carbs: 27, fat: 3 },
  { name: "Protein shake", calories: 160, protein: 30, carbs: 5, fat: 2 },
];

export default function Nibbl() {
  const [screen, setScreen] = useState("splash");
  const [obIndex, setObIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [tab, setTab] = useState("home");
  const [pro, setPro] = useState(false);
  const [sheet, setSheet] = useState(null);
  const [scanner, setScanner] = useState(false);
  const [dayOffset, setDayOffset] = useState(0);
  const [lang, setLang] = useState("EN");
  const t = T[lang];
  const rtl = lang === "AR";

  const goalCal = TARGET[answers.goal] || 2500;
  const [goals, setGoals] = useState(null);
  const target = goals ? goals.calories : goalCal;
  const macroTargets = goals ? { protein: goals.protein, carbs: goals.carbs, fat: goals.fat } : { protein: 263, carbs: 350, fat: 117 };
  const waterGoal = 8;

  const [logsByDay, setLogsByDay] = useState({ 0: [] });
  const [waterByDay, setWaterByDay] = useState({ 0: 0 });
  const log = logsByDay[dayOffset] || [];
  const water = waterByDay[dayOffset] || 0;
  const setLog = (fn) => setLogsByDay((m) => ({ ...m, [dayOffset]: fn(m[dayOffset] || []) }));
  const setWater = (n) => setWaterByDay((m) => ({ ...m, [dayOffset]: Math.max(0, n) }));

  const [weights, setWeights] = useState([{ date: "6/19", kg: 60.0 }, { date: "6/21", kg: 63.0 }]);
  const consumed = log.reduce((a, m) => ({ cal: a.cal + m.calories, p: a.p + m.protein, c: a.c + m.carbs, f: a.f + m.fat }), { cal: 0, p: 0, c: 0, f: 0 });
  const calLeft = target - consumed.cal;

  const FREE_LIMIT = 3;
  const addMeal = (m) => {
    const totalToday = (logsByDay[0] || []).length;
    if (!pro && totalToday >= FREE_LIMIT) { setScreen("paywall"); return false; }
    setLog((l) => [{ ...m, id: Date.now(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...l]);
    return true;
  };
  const updateMeal = (id, m) => setLog((l) => l.map((x) => (x.id === id ? { ...x, ...m } : x)));
  const removeMeal = (id) => setLog((l) => l.filter((x) => x.id !== id));

  const wrap = (children) => <div dir={rtl ? "rtl" : "ltr"} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>{children}</div>;

  if (screen === "splash") {
    return (
      <Phone>{wrap(
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 22px", position: "relative", background: "linear-gradient(165deg,#FF8A5B 0%,#FF7A4D 42%,#E85F30 100%)", fontFamily: BODY }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(100% 60% at 50% 8%,rgba(255,255,255,.28),transparent 55%)", pointerEvents: "none" }} />
          <button onClick={() => setSheet("lang")} style={{ position: "relative", alignSelf: rtl ? "flex-start" : "flex-end", marginTop: 16, fontSize: 15, fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,.35)", background: "rgba(255,255,255,.12)", borderRadius: 99, padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>{LANGS.find((l) => l.code === lang).flag} {lang} {"\u25BE"}</button>
          <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: 160, height: 160, borderRadius: 46, background: "rgba(255,255,255,.16)", backdropFilter: "blur(4px)", boxShadow: "inset 0 2px 10px rgba(255,255,255,.25),0 20px 40px -12px rgba(120,30,0,.4)", display: "flex", alignItems: "center", justifyContent: "center", animation: "nibblFloat 4s ease-in-out infinite" }}><FoxFace size={118} /></div>
            <div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 46, color: "#fff", letterSpacing: "-.02em", marginTop: 36 }}>Nibbl<span style={{ opacity: .7 }}>.</span></div>
            <div style={{ fontWeight: 600, fontSize: 19, color: "rgba(255,255,255,.92)", marginTop: 10, textAlign: "center", lineHeight: 1.4 }}>{t.tagline}</div>
            <div style={{ fontWeight: 500, fontSize: 14, color: "rgba(255,255,255,.72)", marginTop: 14, textAlign: "center", lineHeight: 1.55, maxWidth: 260 }}>Effortless calorie &amp; macro tracking. Just point your camera at the plate.</div>
          </div>
          <button onClick={() => setScreen("onboarding")} style={{ position: "relative", background: "#fff", color: C.accentDark, border: "none", borderRadius: 18, padding: "18px", fontSize: 17, fontWeight: 700, fontFamily: DISP, boxShadow: "0 14px 28px -8px rgba(120,30,0,.4)", cursor: "pointer", marginBottom: 14 }}>{t.getStarted}</button>
          <div style={{ position: "relative", textAlign: "center", fontSize: 14, color: "rgba(255,255,255,.9)", fontWeight: 600, marginBottom: 24 }}>{t.haveAccount} <span style={{ color: "#fff", textDecoration: "underline" }}>{t.signIn}</span></div>
        </div>
      )}
        {sheet === "lang" && <LangSheet onClose={() => setSheet(null)} lang={lang} setLang={(l) => { setLang(l); setSheet(null); }} title={t.language} />}
      </Phone>
    );
  }

  if (screen === "onboarding") {
    const step = STEPS[obIndex];
    const pct = (obIndex / STEPS.length) * 100;
    const pick = (opt) => { setAnswers({ ...answers, [step.key]: opt }); setTimeout(() => { if (obIndex < STEPS.length - 1) setObIndex(obIndex + 1); else setScreen("paywall"); }, 180); };
    return (
      <Phone><div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 22px", background: C.cream }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <button onClick={() => (obIndex > 0 ? setObIndex(obIndex - 1) : setScreen("splash"))} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4 }}><ChevronLeft size={26} color={C.ink} /></button>
          <div style={{ flex: 1, height: 8, background: "#EFE6D8", borderRadius: 99 }}><div style={{ width: pct + "%", height: "100%", background: C.accent, borderRadius: 99, transition: "width .3s" }} /></div>
        </div>
        <NibblMark size={34} />
        <h2 style={{ fontFamily: DISP, fontWeight: 800, fontSize: 28, color: C.ink, lineHeight: 1.15, margin: "14px 0 28px" }}>{step.q}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {step.opts.map((o) => { const sel = answers[step.key] === o; return <button key={o} onClick={() => pick(o)} style={{ textAlign: "left", padding: "20px 22px", borderRadius: 20, border: "2px solid " + (sel ? C.accent : "transparent"), background: "#fff", fontSize: 18, fontWeight: 600, color: C.ink, fontFamily: DISP, cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>{o}</button>; })}
        </div>
      </div></Phone>
    );
  }

  if (screen === "paywall") return <Paywall onSubscribe={() => { setPro(true); setScreen("app"); }} onClose={() => setScreen("app")} />;

  return (
    <Phone>{wrap(
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.cream, position: "relative", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {tab === "home" && <HomeTab target={target} calLeft={calLeft} consumed={consumed} macroTargets={macroTargets} log={log} water={water} waterGoal={waterGoal} pro={pro} dayOffset={dayOffset} setDayOffset={setDayOffset} setWater={setWater} t={t} onEdit={(m) => setSheet({ edit: m })} onCoach={() => (pro ? setSheet("coach") : setScreen("paywall"))} onUpsell={() => setScreen("paywall")} onReferral={() => setSheet("referral")} />}
          {tab === "progress" && <ProgressTab weights={weights} setWeights={setWeights} totalCal={consumed.cal} log={log} t={t} />}
          {tab === "settings" && <SettingsTab answers={answers} target={target} macroTargets={macroTargets} pro={pro} lang={lang} t={t} onUpsell={() => setScreen("paywall")} onWidgets={() => setSheet("widgets")} onReferral={() => setSheet("referral")} onEditGoals={() => setSheet("goals")} onLang={() => setSheet("lang")} />}
        </div>
        <TabBar tab={tab} setTab={setTab} t={t} onScan={() => setScanner(true)} onCoach={() => (pro ? setSheet("coach") : setScreen("paywall"))} />

        {scanner && <Scanner onClose={() => setScanner(false)} onAddMeal={addMeal} onSearch={() => { setScanner(false); setSheet("search"); }} t={t} />}
        {sheet === "search" && <SearchSheet onClose={() => setSheet(null)} onPick={(m) => { addMeal(m); setSheet(null); }} />}
        {sheet === "coach" && <CoachSheet onClose={() => setSheet(null)} consumed={consumed} target={target} macroTargets={macroTargets} />}
        {sheet === "referral" && <ReferralSheet onClose={() => setSheet(null)} />}
        {sheet === "widgets" && <WidgetSheet onClose={() => setSheet(null)} calLeft={calLeft} consumed={consumed} target={target} macroTargets={macroTargets} streak={log.length} t={t} />}
        {sheet === "goals" && <GoalsSheet onClose={() => setSheet(null)} current={{ calories: target, protein: macroTargets.protein, carbs: macroTargets.carbs, fat: macroTargets.fat }} onSave={(g) => { setGoals(g); setSheet(null); }} t={t} />}
        {sheet === "lang" && <LangSheet onClose={() => setSheet(null)} lang={lang} setLang={(l) => { setLang(l); setSheet(null); }} title={t.language} />}
        {sheet && sheet.edit && <EditSheet meal={sheet.edit} onClose={() => setSheet(null)} onSave={(m) => { updateMeal(sheet.edit.id, m); setSheet(null); }} onDelete={() => { removeMeal(sheet.edit.id); setSheet(null); }} />}
      </div>
    )}</Phone>
  );
}

const SCAN_MODES = [
  { key: "food", icon: Camera, labelKey: "food" },
  { key: "barcode", icon: ScanBarcode, labelKey: "barcode" },
  { key: "label", icon: ScanLine, labelKey: "foodLabel" },
  { key: "fridge", icon: Refrigerator, labelKey: "fridge" },
];
function Scanner({ onClose, onAddMeal, onSearch, t }) {
  const [mode, setMode] = useState("food");
  const [analyzer, setAnalyzer] = useState(null);
  const fileRef = useRef(null);
  const titles = { food: t.scanMeal, barcode: t.scanBarcode, label: t.scanLabel, fridge: t.scanFridge };
  const subs = { food: "Center your meal in the frame", barcode: t.alignBarcode, label: "Fit the nutrition label in the frame", fridge: "Capture your fridge - we'll suggest meals" };

  const onFile = async (e) => {
    const file = e.target.files && e.target.files[0]; if (!file) return;
    const b64 = await toB64(file); const dataUrl = await toDataUrl(file);
    setAnalyzer({ img: dataUrl, status: "analyzing", pct: 12 });
    analyze(b64, file.type, dataUrl, mode);
  };
  const analyze = async (b64, media, dataUrl, m) => {
    let p = 12; const tick = setInterval(() => { p = Math.min(p + 9, 92); setAnalyzer((a) => (a ? { ...a, pct: p } : a)); }, 350);
    const prompts = {
      food: 'Identify this food and estimate nutrition. Respond ONLY raw JSON: {"name": string (max 4 words), "calories": number, "protein": number, "carbs": number, "fat": number}',
      barcode: 'This is a product barcode/package. Identify the product and per-serving nutrition. Respond ONLY raw JSON: {"name": string, "calories": number, "protein": number, "carbs": number, "fat": number}',
      label: 'This is a nutrition facts label. Read the per-serving values. Respond ONLY raw JSON: {"name": string, "calories": number, "protein": number, "carbs": number, "fat": number}',
      fridge: 'This is a photo of fridge contents. Suggest ONE simple meal from what you see and give its nutrition. Respond ONLY raw JSON: {"name": string, "calories": number, "protein": number, "carbs": number, "fat": number}',
    };
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: media || "image/jpeg", data: b64 } }, { type: "text", text: prompts[m] }] }] }) });
      const data = await resp.json();
      const text = data.content.filter((i) => i.type === "text").map((i) => i.text).join("");
      const r = JSON.parse(text.replace(/```json|```/g, "").trim());
      clearInterval(tick); setAnalyzer({ img: dataUrl, status: "done", result: r });
    } catch (e) { clearInterval(tick); setAnalyzer({ img: dataUrl, status: "error" }); }
  };
  const confirm = () => { const r = analyzer.result; const ok = onAddMeal({ name: r.name, calories: Math.round(r.calories), protein: Math.round(r.protein), carbs: Math.round(r.carbs), fat: Math.round(r.fat), img: analyzer.img }); if (ok) onClose(); };

  return (
    <div style={{ position: "absolute", inset: 0, background: "#15110e", zIndex: 40, display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 50% 38%,#3a2c22,#15110e 75%)" }} />
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", zIndex: 2 }}>
        <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 14, background: "rgba(255,255,255,.14)", border: "none", display: "grid", placeItems: "center", cursor: "pointer" }}><X size={20} color="#fff" /></button>
        <span style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Scan your meal</span>
        <button style={{ width: 40, height: 40, borderRadius: 14, background: "rgba(255,123,77,.9)", border: "none", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 6px 14px -4px rgba(232,95,48,.7)" }}><Zap size={18} color="#fff" /></button>
      </div>
      <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
        {!analyzer && (
          <React.Fragment>
            <div style={{ position: "relative", width: 260, height: 260 }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 42, height: 42, borderTop: "4px solid #FF7A4D", borderLeft: "4px solid #FF7A4D", borderTopLeftRadius: 16 }} />
              <div style={{ position: "absolute", right: 0, top: 0, width: 42, height: 42, borderTop: "4px solid #FF7A4D", borderRight: "4px solid #FF7A4D", borderTopRightRadius: 16 }} />
              <div style={{ position: "absolute", left: 0, bottom: 0, width: 42, height: 42, borderBottom: "4px solid #FF7A4D", borderLeft: "4px solid #FF7A4D", borderBottomLeftRadius: 16 }} />
              <div style={{ position: "absolute", right: 0, bottom: 0, width: 42, height: 42, borderBottom: "4px solid #FF7A4D", borderRight: "4px solid #FF7A4D", borderBottomRightRadius: 16 }} />
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}><div style={{ width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%,rgba(255,255,255,.1),rgba(255,255,255,.03))", border: "1px dashed rgba(255,255,255,.25)" }} /></div>
              {mode === "barcode" && <div style={{ position: "absolute", top: "50%", left: 12, right: 12, height: 2, background: C.accent, boxShadow: "0 0 12px " + C.accent }} />}
            </div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 22, marginTop: 26, fontFamily: DISP }}>{titles[mode]}</div>
            <div style={{ color: "rgba(255,255,255,.7)", fontSize: 14, marginTop: 6 }}>{subs[mode]}</div>
            <button onClick={() => fileRef.current && fileRef.current.click()} style={{ marginTop: 24, width: 74, height: 74, borderRadius: 99, background: "rgba(255,255,255,.25)", border: "none", display: "grid", placeItems: "center", cursor: "pointer" }}><div style={{ width: 60, height: 60, borderRadius: 99, background: "#fff", border: "3px solid #15110e", boxShadow: "0 0 0 3px #fff" }} /></button>
          </React.Fragment>
        )}
        {analyzer && (
          <div style={{ width: "86%", background: "#fff", borderRadius: 22, padding: 16 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ position: "relative", width: 90, height: 90, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
                <img src={analyzer.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {analyzer.status === "analyzing" && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700 }}>{analyzer.pct}%</div>}
              </div>
              <div style={{ flex: 1 }}>
                {analyzer.status === "analyzing" && <div style={{ color: C.ink, fontWeight: 600 }}>Analyzing...</div>}
                {analyzer.status === "error" && <div style={{ color: C.protein, fontWeight: 600 }}>Couldn't read that. Try again.</div>}
                {analyzer.status === "done" && (
                  <div>
                    <div style={{ fontWeight: 700, color: C.ink, fontSize: 16 }}>{foodEmoji(analyzer.result.name)} {analyzer.result.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "4px 0", color: C.ink }}><Flame size={14} color={C.flame} fill={C.flame} /> {Math.round(analyzer.result.calories)} cal</div>
                    <div style={{ display: "flex", gap: 10, fontSize: 12, color: C.sub }}><span><b style={{ color: C.protein }}>{"\u25CF"}</b> {Math.round(analyzer.result.protein)}g</span><span><b style={{ color: C.carbs }}>{"\u25CF"}</b> {Math.round(analyzer.result.carbs)}g</span><span><b style={{ color: C.fat }}>{"\u25CF"}</b> {Math.round(analyzer.result.fat)}g</span></div>
                  </div>
                )}
              </div>
            </div>
            {analyzer.status === "done" && <div style={{ display: "flex", gap: 10, marginTop: 14 }}><button onClick={confirm} style={{ flex: 1, background: C.accent, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontWeight: 700, cursor: "pointer" }}>Add to log</button><button onClick={() => setAnalyzer(null)} style={{ background: C.grayBg, color: C.ink, border: "none", borderRadius: 12, padding: "13px 16px", fontWeight: 600, cursor: "pointer" }}>Retry</button></div>}
            {analyzer.status === "error" && <button onClick={() => setAnalyzer(null)} style={{ width: "100%", marginTop: 14, background: C.ink, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontWeight: 700, cursor: "pointer" }}>Back</button>}
          </div>
        )}
      </div>
      {!analyzer && (
        <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 6, padding: "14px 16px 30px", justifyContent: "center" }}>
          {SCAN_MODES.map((m) => { const sel = mode === m.key; return (
            <button key={m.key} onClick={() => setMode(m.key)} style={{ border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, padding: "8px 15px", borderRadius: 12, color: sel ? C.ink : "rgba(255,255,255,.65)", background: sel ? C.accent : "rgba(255,255,255,.08)" }}>{t[m.labelKey]}</button>
          ); })}
        </div>
      )}
      {!analyzer && <button onClick={onSearch} style={{ position: "absolute", bottom: 96, insetInlineStart: 18, zIndex: 3, background: "rgba(255,255,255,.15)", border: "none", borderRadius: 99, width: 40, height: 40, display: "grid", placeItems: "center", cursor: "pointer" }}><Search size={18} color="#fff" /></button>}
      <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onFile} style={{ display: "none" }} />
    </div>
  );
}

function GoalsSheet({ onClose, current, onSave, t }) {
  const [g, setG] = useState(current);
  const Row = ({ label, k, step, color }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderTop: "1px solid #F0EADF" }}>
      <span style={{ color: C.ink, fontWeight: 600 }}><b style={{ color }}>{"\u25CF"}</b> {label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setG({ ...g, [k]: Math.max(0, g[k] - step) })} style={{ width: 36, height: 36, borderRadius: 99, border: "none", background: C.grayBg, cursor: "pointer", display: "grid", placeItems: "center" }}><Minus size={18} color={C.ink} /></button>
        <span style={{ minWidth: 56, textAlign: "center", fontWeight: 800, fontSize: 18, color: C.ink }}>{g[k]}</span>
        <button onClick={() => setG({ ...g, [k]: g[k] + step })} style={{ width: 36, height: 36, borderRadius: 99, border: "none", background: C.accent, cursor: "pointer", display: "grid", placeItems: "center" }}><Plus size={18} color="#fff" /></button>
      </div>
    </div>
  );
  return (
    <Sheet onClose={onClose} title={t.editGoals}>
      <Row label={t.dailyTarget + " (cal)"} k="calories" step={50} color={C.flame} />
      <Row label={t.protein + " (g)"} k="protein" step={5} color={C.protein} />
      <Row label={t.carbs + " (g)"} k="carbs" step={5} color={C.carbs} />
      <Row label={t.fat + " (g)"} k="fat" step={5} color={C.fat} />
      <button onClick={() => onSave(g)} style={{ width: "100%", marginTop: 20, background: C.accent, color: "#fff", border: "none", borderRadius: 14, padding: 15, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>{t.save}</button>
    </Sheet>
  );
}

function LangSheet({ onClose, lang, setLang, title }) {
  return (
    <Sheet onClose={onClose} title={title}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {LANGS.map((l) => { const sel = lang === l.code; return (
          <button key={l.code} onClick={() => setLang(l.code)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, borderRadius: 14, border: "2px solid " + (sel ? C.accent : "#F0EADF"), background: "#fff", cursor: "pointer" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 600, color: C.ink }}><span style={{ fontSize: 24 }}>{l.flag}</span> {l.name}</span>
            {sel && <Check size={20} color={C.accent} />}
          </button>
        ); })}
      </div>
    </Sheet>
  );
}

function HomeTab({ target, calLeft, consumed, macroTargets, log, water, waterGoal, pro, dayOffset, setDayOffset, setWater, t, onEdit, onCoach, onUpsell, onReferral }) {
  const over = calLeft < 0;
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date();
  const todayIdx = (today.getDay() + 6) % 7;
  const monday = new Date(today); monday.setDate(today.getDate() - todayIdx);
  const dateNums = days.map((_, i) => { const d = new Date(monday); d.setDate(monday.getDate() + i); return d.getDate(); });
  const selIdx = Math.max(0, Math.min(6, todayIdx + dayOffset));
  const hr = today.getHours();
  const greeting = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
  const dayLabel = dayOffset === 0 ? t.today : dayOffset === -1 ? t.yesterday : Math.abs(dayOffset) + "d";

  return (
    <div style={{ padding: "18px 16px 90px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontWeight: 500, fontSize: 13, color: C.ink, opacity: .5 }}>{greeting}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontFamily: DISP, fontWeight: 700, fontSize: 22, color: C.ink }}>{dayLabel === t.today ? "Hey there" : dayLabel}</span>{pro && <span style={{ background: C.ink, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>PRO</span>}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid " + C.border, borderRadius: 999, padding: "7px 12px", boxShadow: "0 4px 12px -6px rgba(27,42,42,.15)" }}><Flame size={16} color={C.accent} fill={C.accent} /><span style={{ fontFamily: DISP, fontWeight: 700, fontSize: 14, color: C.ink }}>{log.length}</span></div>
      </div>
      <div style={{ display: "flex", gap: 7, marginBottom: 20 }}>
        {days.map((d, i) => { const active = i === selIdx; const future = i > todayIdx; return (
          <button key={i} disabled={future} onClick={() => setDayOffset(i - todayIdx)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "9px 0", borderRadius: 14, border: "none", cursor: future ? "default" : "pointer", opacity: future ? .4 : 1, background: active ? "linear-gradient(150deg,#FF7A4D,#E85F30)" : "transparent", boxShadow: active ? "0 8px 16px -6px rgba(232,95,48,.5)" : "none" }}>
            <span style={{ fontWeight: 600, fontSize: 11, color: active ? "rgba(255,255,255,.85)" : C.ink, opacity: active ? 1 : .45 }}>{d}</span>
            <span style={{ fontFamily: DISP, fontWeight: 700, fontSize: 14, color: active ? "#fff" : C.ink, opacity: active ? 1 : .55 }}>{dateNums[i]}</span>
          </button>); })}
      </div>
      <Card style={{ padding: 20, display: "flex", alignItems: "center", gap: 18, marginBottom: 14 }}>
        <GradientRing pct={Math.min(consumed.cal / target, 1)} value={Math.abs(calLeft)} label={over ? t.caloriesOver : t.caloriesLeft} over={over} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 13 }}>
          <MacroBar label={t.protein} have={consumed.p} goal={macroTargets.protein} color={C.protein} track="#FDECEC" />
          <MacroBar label={t.carbs} have={consumed.c} goal={macroTargets.carbs} color={C.carbs} track="#FCF1E2" />
          <MacroBar label={t.fat} have={consumed.f} goal={macroTargets.fat} color={C.fat} track="#E8F3FD" />
        </div>
      </Card>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Card style={{ flex: 1.1, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}><span style={{ fontWeight: 600, fontSize: 13, color: C.ink }}>{t.water}</span><span style={{ fontFamily: DISP, fontWeight: 700, fontSize: 13, color: C.water }}>{water}<span style={{ opacity: .6, fontSize: 11 }}>/{waterGoal}</span></span></div>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>{Array.from({ length: waterGoal }).map((_, i) => (<button key={i} onClick={() => setWater(i + 1 === water ? i : i + 1)} style={{ flex: 1, height: 34, border: "none", borderRadius: 8, cursor: "pointer", background: i < water ? C.water : C.fTrack }} />))}<button onClick={() => setWater(water + 1)} style={{ border: "none", background: C.water, color: "#fff", width: 26, height: 34, borderRadius: 8, display: "grid", placeItems: "center", cursor: "pointer", flex: "none" }}><Plus size={14} /></button></div>
        </Card>
        <button onClick={onCoach} style={{ flex: .9, textAlign: "left", border: "none", cursor: "pointer", background: "linear-gradient(150deg,#1B2A2A,#26403d)", borderRadius: 22, padding: 16, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 14px 28px -16px rgba(27,42,42,.5)" }}>
          <FoxFlat size={32} />
          <div><div style={{ fontFamily: DISP, fontWeight: 700, fontSize: 14 }}>Ask Nibbl {!pro && <Lock size={11} style={{ verticalAlign: "middle" }} />}</div><div style={{ fontWeight: 500, fontSize: 11, color: "rgba(255,255,255,.7)", marginTop: 2 }}>{t.askCoach}</div></div>
        </button>
      </div>
      <button onClick={onReferral} style={{ width: "100%", textAlign: "left", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 13, background: "linear-gradient(135deg,#FFF1E9,#FFE3D3)", borderRadius: 20, padding: 14, marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 13, background: "#fff", display: "grid", placeItems: "center", flex: "none", boxShadow: "0 4px 10px -4px rgba(232,95,48,.4)" }}><Gift size={22} color={C.accentDark} /></div>
        <div style={{ flex: 1 }}><div style={{ fontFamily: DISP, fontWeight: 700, fontSize: 14, color: C.ink }}>{t.refer}</div><div style={{ fontWeight: 500, fontSize: 12, color: C.ink, opacity: .55, marginTop: 2 }}>{t.referSub}</div></div>
        <ChevronRight size={20} color={C.accent} />
      </button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}><span style={{ fontFamily: DISP, fontWeight: 700, fontSize: 17, color: C.ink }}>{dayOffset === 0 ? t.todaysLog : t.log}</span><span style={{ fontWeight: 600, fontSize: 13, color: C.accent }}>See all</span></div>
      {!pro && dayOffset === 0 && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFF1E9", border: "1px solid " + C.accent + "33", borderRadius: 16, padding: "12px 14px", marginBottom: 10 }}><span style={{ fontSize: 13, color: C.ink }}>{Math.max(3 - log.length, 0)} free scans left</span><button onClick={onUpsell} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 99, padding: "6px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Pro</button></div>}
      {log.length === 0 && <Card style={{ padding: 24, textAlign: "center", color: C.sub }}>{t.noMeals}</Card>}
      {log.map((m) => (
        <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 13, background: "#fff", borderRadius: 20, padding: 12, marginBottom: 10, boxShadow: "0 1px 2px rgba(27,42,42,.04),0 12px 24px -22px rgba(27,42,42,.3)" }}>
          {m.img ? <img src={m.img} alt="" style={{ width: 50, height: 50, borderRadius: 14, objectFit: "cover", flex: "none" }} /> : <div style={{ width: 50, height: 50, borderRadius: 14, background: "linear-gradient(135deg,#FFE8D6,#FFD3B0)", display: "grid", placeItems: "center", fontSize: 26, flex: "none" }}>{foodEmoji(m.name)}</div>}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: C.ink }}>{m.name}</div>
            <div style={{ display: "flex", gap: 7, alignItems: "center", marginTop: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9, background: C.protein }} /><span style={{ width: 7, height: 7, borderRadius: 9, background: C.carbs }} /><span style={{ width: 7, height: 7, borderRadius: 9, background: C.fat }} />
              <button onClick={() => onEdit(m)} style={{ border: "none", background: "transparent", cursor: "pointer", color: C.ink, opacity: .45, fontSize: 11, display: "flex", alignItems: "center", gap: 4, padding: 0 }}><Pencil size={11} /> {m.time}</button>
            </div>
          </div>
          <div style={{ textAlign: "right" }}><div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 16, color: C.ink }}>{m.calories}</div></div>
        </div>
      ))}
    </div>
  );
}

function SearchSheet({ onClose, onPick }) {
  const [q, setQ] = useState("");
  const results = FOOD_DB.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Sheet onClose={onClose} title="Search food">
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.grayBg, borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}><Search size={18} color={C.sub} /><input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search foods..." style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontSize: 16, color: C.ink }} /></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 360, overflowY: "auto" }}>
        {results.map((f) => (<button key={f.name} onClick={() => onPick(f)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, borderRadius: 12, border: "1px solid #F0EADF", background: "#fff", cursor: "pointer", textAlign: "left" }}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 40, height: 40, borderRadius: 10, background: "#FFF1E9", display: "grid", placeItems: "center", fontSize: 22 }}>{foodEmoji(f.name)}</div><div><div style={{ fontWeight: 600, color: C.ink }}>{f.name}</div><div style={{ fontSize: 12, color: C.sub }}>{f.protein}p {f.carbs}c {f.fat}f</div></div></div><div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontWeight: 700, color: C.ink }}>{f.calories}</span><Plus size={18} color={C.accent} /></div></button>))}
        {results.length === 0 && <div style={{ textAlign: "center", color: C.sub, padding: 20 }}>No matches.</div>}
      </div>
    </Sheet>
  );
}

function EditSheet({ meal, onClose, onSave, onDelete }) {
  const [mult, setMult] = useState(1);
  const scaled = (v) => Math.round(v * mult);
  return (
    <Sheet onClose={onClose} title="Edit entry">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}><div style={{ width: 44, height: 44, borderRadius: 11, background: "#FFF1E9", display: "grid", placeItems: "center", fontSize: 24 }}>{foodEmoji(meal.name)}</div><div style={{ fontWeight: 700, fontSize: 18, color: C.ink }}>{meal.name}</div></div>
      <div style={{ color: C.sub, fontSize: 14, margin: "10px 0 18px" }}>Adjust portion size</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginBottom: 18 }}>
        <button onClick={() => setMult(Math.max(0.25, +(mult - 0.25).toFixed(2)))} style={{ width: 44, height: 44, borderRadius: 99, border: "none", background: C.grayBg, cursor: "pointer", display: "grid", placeItems: "center" }}><Minus size={20} color={C.ink} /></button>
        <div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 28, color: C.ink, minWidth: 70, textAlign: "center" }}>{mult}x</div>
        <button onClick={() => setMult(+(mult + 0.25).toFixed(2))} style={{ width: 44, height: 44, borderRadius: 99, border: "none", background: C.accent, cursor: "pointer", display: "grid", placeItems: "center" }}><Plus size={20} color="#fff" /></button>
      </div>
      <Card style={{ padding: 16, marginBottom: 18, display: "flex", justifyContent: "space-around", textAlign: "center" }}>{[["Cal", scaled(meal.calories), C.ink], ["P", scaled(meal.protein), C.protein], ["C", scaled(meal.carbs), C.carbs], ["F", scaled(meal.fat), C.fat]].map((row) => (<div key={row[0]}><div style={{ fontWeight: 800, color: row[2], fontSize: 18 }}>{row[1]}</div><div style={{ fontSize: 12, color: C.sub }}>{row[0]}</div></div>))}</Card>
      <div style={{ display: "flex", gap: 10 }}><button onClick={() => onSave({ calories: scaled(meal.calories), protein: scaled(meal.protein), carbs: scaled(meal.carbs), fat: scaled(meal.fat) })} style={{ flex: 1, background: C.accent, color: "#fff", border: "none", borderRadius: 14, padding: 14, fontWeight: 700, cursor: "pointer" }}>Save</button><button onClick={onDelete} style={{ background: "#FFEAEA", color: C.protein, border: "none", borderRadius: 14, padding: "14px 18px", fontWeight: 700, cursor: "pointer" }}>Delete</button></div>
    </Sheet>
  );
}

function CoachSheet({ onClose, consumed, target, macroTargets }) {
  const [msgs, setMsgs] = useState([{ role: "assistant", text: "Hi! I'm your Nibbl coach. Ask me anything about your nutrition today." }]);
  const [input, setInput] = useState(""); const [loading, setLoading] = useState(false);
  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim(); setInput(""); setMsgs((m) => [...m, { role: "user", text: userMsg }]); setLoading(true);
    const ctx = "Daily target: " + target + " cal. Consumed: " + consumed.cal + " cal, " + consumed.p + "g protein, " + consumed.c + "g carbs, " + consumed.f + "g fat. Targets: " + macroTargets.protein + "g P, " + macroTargets.carbs + "g C, " + macroTargets.fat + "g F.";
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: "You are a friendly, concise nutrition coach. " + ctx + "\n\nUser: " + userMsg + "\n\nShort practical answer (2-3 sentences). Not medical advice." }] }) });
      const data = await resp.json(); const text = data.content.filter((i) => i.type === "text").map((i) => i.text).join("");
      setMsgs((m) => [...m, { role: "assistant", text }]);
    } catch (e) { setMsgs((m) => [...m, { role: "assistant", text: "Couldn't reach the coach. Try again." }]); }
    setLoading(false);
  };
  return (
    <Sheet onClose={onClose} title="AI Coach">
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 300, overflowY: "auto", marginBottom: 12 }}>{msgs.map((m, i) => (<div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "82%", background: m.role === "user" ? C.accent : C.grayBg, color: m.role === "user" ? "#fff" : C.ink, padding: "10px 14px", borderRadius: 16, fontSize: 14, lineHeight: 1.4 }}>{m.text}</div>))}{loading && <div style={{ alignSelf: "flex-start", color: C.sub, fontSize: 14, padding: "4px 8px" }}>Coach is typing...</div>}</div>
      <div style={{ display: "flex", gap: 8 }}><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask your coach..." style={{ flex: 1, border: "1px solid #F0EADF", borderRadius: 14, padding: "12px 14px", outline: "none", fontSize: 15 }} /><button onClick={send} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 14, padding: "0 18px", fontWeight: 700, cursor: "pointer" }}>Send</button></div>
      <div style={{ fontSize: 11, color: C.sub, textAlign: "center", marginTop: 10 }}>Not medical advice.</div>
    </Sheet>
  );
}

function ReferralSheet({ onClose }) {
  const [copied, setCopied] = useState(false);
  return (
    <Sheet onClose={onClose} title="Invite friends">
      <div style={{ textAlign: "center", padding: "8px 0 18px" }}><div style={{ display: "inline-grid", placeItems: "center", width: 64, height: 64, borderRadius: 20, background: "#FFF1E9", marginBottom: 12 }}><Gift size={30} color={C.accent} /></div><div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 20, color: C.ink }}>Refer & get 1 month free</div><div style={{ color: C.sub, fontSize: 14, marginTop: 4 }}>Share your code. When a friend subscribes, you both get 1 month of Nibbl Pro free.</div></div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "2px dashed " + C.accent, borderRadius: 14, padding: "14px 18px", marginBottom: 14 }}><span style={{ fontFamily: DISP, fontWeight: 800, fontSize: 18, color: C.ink, letterSpacing: 1 }}>NIBBL-FOX42</span><button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontWeight: 700, cursor: "pointer" }}>{copied ? "Copied!" : "Copy"}</button></div>
      <button onClick={onClose} style={{ width: "100%", background: C.ink, color: "#fff", border: "none", borderRadius: 14, padding: 14, fontWeight: 700, cursor: "pointer" }}>Share invite</button>
    </Sheet>
  );
}

function Paywall({ onSubscribe, onClose }) {
  const [plan, setPlan] = useState("yearly");
  const features = ["Unlimited AI food scans", "Barcode, label & fridge modes", "AI Coach & advanced insights", "Home & Lock Screen widgets", "Editable goals & history"];
  return (
    <Phone>
      <div style={{ flex: 1, position: "relative", background: C.cream, fontFamily: BODY, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "relative", height: 262, background: "linear-gradient(160deg,#FF8A5B,#E85F30)", flex: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 60% at 50% 0%,rgba(255,255,255,.25),transparent 60%)" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 22, right: 22, width: 34, height: 34, borderRadius: 12, background: "rgba(255,255,255,.2)", border: "none", display: "grid", placeItems: "center", cursor: "pointer", zIndex: 2 }}><X size={18} color="#fff" /></button>
          <div style={{ position: "absolute", top: 40, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 84, height: 84, borderRadius: 26, background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", animation: "nibblFloat 4s ease-in-out infinite" }}><FoxFace size={60} /></div>
            <div style={{ fontFamily: DISP, fontWeight: 700, fontSize: 12, color: "#fff", letterSpacing: ".18em", marginTop: 16, opacity: .85 }}>NIBBL PRO</div>
            <div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 25, color: "#fff", marginTop: 6, textAlign: "center", lineHeight: 1.2 }}>Track smarter,<br />effortlessly</div>
          </div>
        </div>
        <div style={{ flex: 1, padding: "22px 22px 24px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 18 }}>
            {features.map((f) => (<div key={f} style={{ display: "flex", alignItems: "center", gap: 11 }}><div style={{ width: 24, height: 24, borderRadius: 8, background: "#FFEDE4", display: "grid", placeItems: "center", flex: "none" }}><Check size={13} color={C.accentDark} strokeWidth={3.4} /></div><span style={{ fontWeight: 500, fontSize: 14, color: C.ink }}>{f}</span></div>))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => setPlan("monthly")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "1.5px solid " + (plan === "monthly" ? C.accentDark : "#F0EADF"), borderRadius: 18, padding: "14px 16px", cursor: "pointer", textAlign: "left" }}><div><div style={{ fontWeight: 600, fontSize: 15, color: C.ink }}>Monthly</div><div style={{ fontWeight: 500, fontSize: 12, color: C.ink, opacity: .5 }}>Billed every month</div></div><div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 18, color: C.ink }}>$9.99</div></button>
            <button onClick={() => setPlan("yearly")} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "2px solid " + (plan === "yearly" ? C.accentDark : "#F0EADF"), borderRadius: 18, padding: "14px 16px", cursor: "pointer", textAlign: "left", boxShadow: plan === "yearly" ? "0 12px 24px -12px rgba(232,95,48,.4)" : "none" }}>
              <div style={{ position: "absolute", top: -11, left: 16, background: "linear-gradient(135deg,#FF7A4D,#E85F30)", color: "#fff", fontFamily: DISP, fontWeight: 700, fontSize: 10, letterSpacing: ".04em", padding: "4px 10px", borderRadius: 99 }}>BEST VALUE {"\u00b7"} SAVE 75%</div>
              <div><div style={{ fontWeight: 600, fontSize: 15, color: C.ink }}>Yearly</div><div style={{ fontWeight: 500, fontSize: 12, color: C.ink, opacity: .5 }}>$2.50 / month</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 18, color: C.accentDark }}>$29.99</div></div>
            </button>
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12, paddingTop: 18 }}>
            <button onClick={onSubscribe} style={{ height: 58, borderRadius: 18, background: "linear-gradient(135deg,#FF7A4D,#E85F30)", boxShadow: "0 14px 28px -8px rgba(232,95,48,.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: DISP, fontWeight: 700, fontSize: 17, border: "none", cursor: "pointer" }}>Start 7-day free trial</button>
            <div style={{ textAlign: "center", fontWeight: 500, fontSize: 12, color: C.ink, opacity: .45 }}>Cancel anytime {"\u00b7"} Restore purchase</div>
          </div>
        </div>
      </div>
    </Phone>
  );
}

function WidgetSheet({ onClose, calLeft, consumed, target, macroTargets, streak, t }) {
  return (
    <Sheet onClose={onClose} title={t.widgets} sub="Add Nibbl to your Home & Lock Screen.">
      <div style={{ fontSize: 13, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Home Screen</div>
      <div style={{ background: "linear-gradient(160deg,#FFD9A0,#FF9E7D)", borderRadius: 22, padding: 18, display: "flex", gap: 14, marginBottom: 24 }}>
        <div style={{ width: 130, height: 130, background: "#fff", borderRadius: 22, padding: 14, boxShadow: "0 6px 18px rgba(0,0,0,.15)" }}><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><NibblMark size={20} radius={6} /><span style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>Nibbl</span></div><div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 30, color: C.ink, lineHeight: 1 }}>{Math.abs(calLeft)}</div><div style={{ fontSize: 12, color: C.sub }}>{calLeft < 0 ? "cal over" : "cal left"}</div><div style={{ display: "flex", gap: 4, marginTop: 10 }}><Bar c={C.protein} /><Bar c={C.carbs} /><Bar c={C.fat} /></div></div>
        <div style={{ flex: 1, height: 130, background: "#fff", borderRadius: 22, padding: 14, boxShadow: "0 6px 18px rgba(0,0,0,.15)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>{t.today}</span><span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, color: C.ink }}><Flame size={12} color={C.flame} fill={C.flame} />{streak}</span></div><div style={{ display: "flex", gap: 8 }}>{[[t.protein, consumed.p, macroTargets.protein, C.protein], [t.carbs, consumed.c, macroTargets.carbs, C.carbs], [t.fat, consumed.f, macroTargets.fat, C.fat]].map((row) => (<div key={row[0]} style={{ flex: 1, textAlign: "center" }}><div style={{ fontWeight: 800, color: C.ink, fontSize: 15 }}>{Math.max(row[2] - row[1], 0)}</div><div style={{ fontSize: 10, color: C.sub }}>{row[0]}</div><div style={{ height: 4, borderRadius: 9, background: "#EEE", marginTop: 4 }}><div style={{ width: Math.min((row[1] / row[2]) * 100, 100) + "%", height: "100%", background: row[3], borderRadius: 9 }} /></div></div>))}</div></div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Lock Screen</div>
      <div style={{ background: "linear-gradient(160deg,#2A2A3A,#11111A)", borderRadius: 22, padding: "22px 18px", marginBottom: 8 }}><div style={{ color: "#fff", textAlign: "center", fontWeight: 300, fontSize: 13, opacity: .7, marginBottom: 4 }}>Monday, June 29</div><div style={{ color: "#fff", textAlign: "center", fontWeight: 200, fontSize: 56, lineHeight: 1, marginBottom: 18 }}>10:09</div><div style={{ display: "flex", gap: 14, justifyContent: "center" }}><div style={{ width: 64, textAlign: "center" }}><div style={{ width: 56, height: 56, margin: "0 auto", borderRadius: 99, border: "4px solid rgba(255,255,255,.25)", borderTopColor: C.accent, display: "grid", placeItems: "center" }}><Flame size={18} color="#fff" fill="#fff" /></div><div style={{ color: "#fff", fontSize: 11, marginTop: 4, opacity: .85 }}>{Math.abs(calLeft)} left</div></div><div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", borderRadius: 14, padding: "8px 14px" }}><NibblMark size={22} radius={7} /><div><div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{Math.abs(calLeft)} cal {calLeft < 0 ? "over" : "left"}</div><div style={{ color: "rgba(255,255,255,.7)", fontSize: 11 }}>P {consumed.p} C {consumed.c} F {consumed.f}</div></div></div></div></div>
    </Sheet>
  );
}
const Bar = ({ c }) => <div style={{ flex: 1, height: 6, borderRadius: 9, background: c, opacity: .85 }} />;

function ProgressTab({ weights, setWeights, totalCal, log, t }) {
  const last = weights[weights.length - 1] ? weights[weights.length - 1].kg : 0;
  const first = weights[0] ? weights[0].kg : last;
  const delta = +(last - first).toFixed(1);
  const down = delta <= 0;
  const min = Math.min.apply(null, weights.map((w) => w.kg)); const max = Math.max.apply(null, weights.map((w) => w.kg)); const range = max - min || 1;
  const logWeight = () => { const v = prompt("Log weight (kg)"); const n = parseFloat(v); if (!isNaN(n)) { const d = new Date(); setWeights((w) => [...w, { date: (d.getMonth() + 1) + "/" + d.getDate(), kg: n }]); } };
  const days = Math.min(log.length, 30);
  const dlc = 2 * Math.PI * 30;
  const pts = weights.map((w, i) => ({ x: +((i / (weights.length - 1 || 1)) * 300).toFixed(1), y: +(100 - ((w.kg - min) / range) * 80).toFixed(1) }));
  const line = pts.map((p, i) => (i ? "L" : "M") + p.x + " " + p.y).join(" ");
  const area = line + " L300 120 L0 120 Z";
  const end = pts[pts.length - 1] || { x: 300, y: 60 };
  return (
    <div style={{ padding: "18px 22px 110px" }}>
      <div style={{ fontFamily: DISP, fontWeight: 700, fontSize: 24, color: C.ink, marginBottom: 4 }}>{t.progress}</div>
      <div style={{ fontWeight: 500, fontSize: 13, color: C.ink, opacity: .5, marginBottom: 20 }}>Last 30 days</div>

      <Card style={{ padding: 20, borderRadius: 26, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div><div style={{ fontWeight: 500, fontSize: 12, color: C.ink, opacity: .5 }}>Current weight</div><div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 2 }}><span style={{ fontFamily: DISP, fontWeight: 800, fontSize: 34, color: C.ink, letterSpacing: "-.02em" }}>{last}</span><span style={{ fontFamily: DISP, fontWeight: 600, fontSize: 14, color: C.ink, opacity: .5 }}>kg</span></div></div>
          <button onClick={logWeight} title="Log weight" style={{ display: "flex", alignItems: "center", gap: 5, background: down ? "#E9F6EC" : "#FFEDE4", padding: "6px 11px", borderRadius: 99, border: "none", cursor: "pointer" }}>{down ? <TrendingDown size={13} color="#3E9B57" /> : <TrendingUp size={13} color={C.accentDark} />}<span style={{ fontFamily: DISP, fontWeight: 700, fontSize: 12, color: down ? "#3E9B57" : C.accentDark }}>{Math.abs(delta)} kg</span></button>
        </div>
        <svg width="100%" height="120" viewBox="0 0 300 120" preserveAspectRatio="none">
          <defs><linearGradient id="wfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF7A4D" stopOpacity=".28" /><stop offset="1" stopColor="#FF7A4D" stopOpacity="0" /></linearGradient></defs>
          <path d={area} fill="url(#wfill)" />
          <path d={line} fill="none" stroke="#E85F30" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={end.x} cy={end.y} r="5" fill="#E85F30" stroke="#fff" strokeWidth="2.5" />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontWeight: 500, fontSize: 11, color: C.ink, opacity: .4 }}><span>{weights[0] && weights[0].date}</span><span>{weights[weights.length - 1] && weights[weights.length - 1].date}</span></div>
      </Card>

      <Card style={{ padding: 18, borderRadius: 24, marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ position: "relative", width: 74, height: 74, flex: "none" }}>
          <svg width="74" height="74" viewBox="0 0 74 74"><circle cx="37" cy="37" r="30" fill="none" stroke={C.ringTrack} strokeWidth="8" /><circle cx="37" cy="37" r="30" fill="none" stroke="url(#dlc)" strokeWidth="8" strokeLinecap="round" strokeDasharray={dlc} strokeDashoffset={dlc * (1 - days / 30)} transform="rotate(-90 37 37)" /><defs><linearGradient id="dlc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF8A5B" /><stop offset="1" stopColor="#E85F30" /></linearGradient></defs></svg>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}><span style={{ fontFamily: DISP, fontWeight: 800, fontSize: 19, color: C.ink }}>{days}</span></div>
        </div>
        <div><div style={{ fontFamily: DISP, fontWeight: 700, fontSize: 14, color: C.ink }}>Days logged</div><div style={{ fontWeight: 500, fontSize: 12, color: C.ink, opacity: .5, marginTop: 2 }}>of 30 days</div></div>
      </Card>

      <div style={{ display: "flex", gap: 12 }}>
        <Card style={{ flex: 1, padding: 16, borderRadius: 22 }}><div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 24, color: C.ink }}>{totalCal.toLocaleString()}</div><div style={{ fontWeight: 500, fontSize: 12, color: C.ink, opacity: .5, marginTop: 3 }}>Avg daily kcal</div></Card>
        <Card style={{ flex: 1, padding: 16, borderRadius: 22 }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><Flame size={18} color={C.accent} fill={C.accent} /><div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 24, color: C.ink }}>{log.length}</div></div><div style={{ fontWeight: 500, fontSize: 12, color: C.ink, opacity: .5, marginTop: 3 }}>Day streak</div></Card>
      </div>
    </div>
  );
}

function SettingsTab({ answers, target, macroTargets, pro, lang, t, onUpsell, onWidgets, onReferral, onEditGoals, onLang }) {
  const cur = LANGS.find((l) => l.code === lang);
  return (
    <div style={{ padding: "18px 16px 90px" }}>
      <div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 24, color: C.ink, marginBottom: 16 }}>{t.settings}</div>
      {!pro ? (<button onClick={onUpsell} style={{ width: "100%", textAlign: "left", border: "none", cursor: "pointer", background: "linear-gradient(135deg, " + C.accent + ", " + C.accentDark + ")", borderRadius: 20, padding: 18, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}><div><div style={{ color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: DISP }}>{t.upgrade}</div><div style={{ color: "rgba(255,255,255,.85)", fontSize: 13 }}>Unlimited scans - coach - widgets</div></div><Lock size={22} color="#fff" /></button>) : (<Card style={{ padding: 18, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}><NibblMark size={36} /><div><div style={{ fontWeight: 800, color: C.ink, fontSize: 16 }}>Nibbl Pro active</div><div style={{ fontSize: 13, color: C.sub }}>Thanks for supporting Nibbl.</div></div></Card>)}
      <Card style={{ overflow: "hidden", marginBottom: 14 }}>
        <button onClick={onEditGoals} style={{ width: "100%", border: "none", background: "transparent", cursor: "pointer", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ color: C.ink, fontWeight: 700 }}>{t.editGoals}</span><span style={{ color: C.accent, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}><Pencil size={14} /> {t.dailyTarget}</span></button>
        <div style={{ display: "flex", justifyContent: "space-around", padding: "0 18px 16px", textAlign: "center" }}>{[[target + "", "cal", C.flame], [macroTargets.protein + "g", t.protein, C.protein], [macroTargets.carbs + "g", t.carbs, C.carbs], [macroTargets.fat + "g", t.fat, C.fat]].map((row) => (<div key={row[1]}><div style={{ fontWeight: 800, fontSize: 17, color: C.ink }}><b style={{ color: row[2], fontSize: 11 }}>{"\u25CF"}</b> {row[0]}</div><div style={{ fontSize: 11, color: C.sub }}>{row[1]}</div></div>))}</div>
      </Card>
      <Card style={{ overflow: "hidden", marginBottom: 14 }}>
        <SettingRow label={t.language} action={cur.flag + " " + cur.name} onClick={onLang} icon={<Globe size={18} color={C.sub} />} />
        <SettingRow label={t.widgets} action={"\u203A"} onClick={onWidgets} top />
        <SettingRow label={t.invite} action={"\u203A"} onClick={onReferral} top />
      </Card>
      <Card style={{ overflow: "hidden" }}>
        {[[t.goal, answers.goal || "-"], [t.sex, answers.sex || "-"], [t.activity, answers.activity || "-"], [t.pace, answers.pace || "-"]].map((row, i) => (<div key={row[0]} style={{ display: "flex", justifyContent: "space-between", padding: "16px 18px", borderTop: i ? "1px solid #F0EADF" : "none" }}><span style={{ color: C.sub }}>{row[0]}</span><span style={{ color: C.ink, fontWeight: 600 }}>{row[1]}</span></div>))}
      </Card>
      <div style={{ fontSize: 12, color: C.sub, textAlign: "center", padding: "14px 20px" }}>Nibbl does not provide medical advice and is not a substitute for consulting a physician.</div>
    </div>
  );
}
function SettingRow({ label, action, onClick, top, icon }) {
  return <button onClick={onClick} style={{ width: "100%", textAlign: "left", border: "none", background: "transparent", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderTop: top ? "1px solid #F0EADF" : "none" }}><span style={{ color: C.ink, fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>{icon}{label}</span><span style={{ color: C.accent, fontWeight: 700 }}>{action}</span></button>;
}

function Phone({ children }) {
  React.useEffect(() => {
    if (document.getElementById("nibbl-fonts")) return;
    const l = document.createElement("link");
    l.id = "nibbl-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap";
    document.head.appendChild(l);
    const s = document.createElement("style");
    s.textContent = "@keyframes nibblFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}";
    document.head.appendChild(s);
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "#111", display: "grid", placeItems: "center", padding: 12, fontFamily: BODY }}>
      <div style={{ width: 390, height: 844, background: "#000", borderRadius: 46, padding: 8, boxShadow: "0 40px 80px -28px rgba(27,42,42,.45), 0 14px 30px rgba(27,42,42,.16)" }}>
        <div style={{ width: "100%", height: "100%", background: "#fff", borderRadius: 40, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative", fontFamily: BODY }}>{children}</div>
      </div>
    </div>
  );
}
function Sheet({ children, onClose, title, sub }) {
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.45)", display: "flex", alignItems: "flex-end", zIndex: 30 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", width: "100%", borderRadius: "26px 26px 0 0", padding: "16px 18px 28px", maxHeight: "85%", overflowY: "auto" }}>
        <div style={{ width: 40, height: 5, background: "#D8D8DE", borderRadius: 99, margin: "0 auto 16px" }} />
        {title && <div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 20, color: C.ink, marginBottom: sub ? 4 : 16 }}>{title}</div>}
        {sub && <div style={{ color: C.sub, fontSize: 14, marginBottom: 18 }}>{sub}</div>}
        {children}
      </div>
    </div>
  );
}
function Card({ children, style }) { return <div style={{ background: "#fff", borderRadius: 22, border: "1px solid " + C.border, boxShadow: "0 4px 18px -6px rgba(27,42,42,.08)", ...style }}>{children}</div>; }
function MacroCard({ value, color, icon, label, t }) {
  const over = value < 0;
  return <Card style={{ padding: 14, textAlign: "center" }}><div style={{ fontWeight: 700, fontSize: 17, color: C.ink, marginBottom: 8 }}>{Math.abs(value)}g</div><div style={{ width: 52, height: 52, margin: "0 auto", borderRadius: 99, border: "3px solid " + color, display: "grid", placeItems: "center" }}>{icon}</div><div style={{ fontSize: 12, color: C.sub, marginTop: 8 }}>{label} {over ? t.over : t.left}</div></Card>;
}
function Ring({ pct, children, size, over }) {
  size = size || 80;
  const r = size / 2 - 6; const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EDEDED" strokeWidth="6" /><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.ink} strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(pct, 1))} /></svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: over ? C.ink : "transparent", borderRadius: 99, margin: 12 }}>{children}</div>
    </div>
  );
}
function GradientRing({ pct, value, label, over }) {
  const size = 148, sw = 14, r = size / 2 - sw / 2 - 4, c = 2 * Math.PI * r;
  const fmt = (n) => n.toLocaleString();
  return (
    <div style={{ position: "relative", width: size, height: size, flex: "none" }}>
      <svg width={size} height={size} viewBox={"0 0 " + size + " " + size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F0E8DA" strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={over ? C.protein : "url(#nibblCoral)"} strokeWidth={sw} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(pct, 1))} transform={"rotate(-90 " + size / 2 + " " + size / 2 + ")"} />
        <defs><linearGradient id="nibblCoral" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={C.accentLight} /><stop offset="1" stopColor={C.accentDark} /></linearGradient></defs>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 38, color: C.ink, lineHeight: 1, letterSpacing: "-.02em" }}>{fmt(value)}</div>
        <div style={{ fontWeight: 600, fontSize: 11, color: C.ink, opacity: .5, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}
function MacroBar({ label, have, goal, color, track }) {
  const pct = goal > 0 ? Math.min((have / goal) * 100, 100) : 0;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontWeight: 600, fontSize: 12, color: C.ink }}>{label}</span>
        <span style={{ fontFamily: DISP, fontWeight: 700, fontSize: 12, color: C.ink, opacity: .6 }}>{have}<span style={{ opacity: .6 }}>/{goal}g</span></span>
      </div>
      <div style={{ height: 7, borderRadius: 9, background: track, overflow: "hidden" }}><div style={{ width: pct + "%", height: "100%", borderRadius: 9, background: color }} /></div>
    </div>
  );
}
function TabBar({ tab, setTab, t, onScan, onCoach }) {
  const Item = ({ k, Icon, onClick }) => (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", display: "grid", placeItems: "center", padding: 4 }}><Icon size={24} color={tab === k ? C.accent : "#B7AE9E"} strokeWidth={2.2} /></button>
  );
  return (
    <div style={{ position: "absolute", bottom: 18, left: 18, right: 18, background: "#fff", border: "1px solid " + C.border, borderRadius: 26, boxShadow: "0 10px 30px -8px rgba(27,42,42,.22)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
      <Item k="home" Icon={Home} onClick={() => setTab("home")} />
      <Item k="progress" Icon={BarChart3} onClick={() => setTab("progress")} />
      <button onClick={onScan} style={{ width: 52, height: 52, borderRadius: 18, background: "linear-gradient(135deg,#FF7A4D,#E85F30)", border: "none", boxShadow: "0 8px 16px -4px rgba(232,95,48,.55)", display: "grid", placeItems: "center", cursor: "pointer", marginTop: -22 }}><Camera size={24} color="#fff" strokeWidth={2.2} /></button>
      <Item k="coach" Icon={Heart} onClick={onCoach} />
      <Item k="settings" Icon={User} onClick={() => setTab("settings")} />
    </div>
  );
}
function MiniHomePreview({ target, t }) {
  return (
    <div style={{ width: 240, background: "rgba(255,255,255,.16)", borderRadius: 30, padding: 10, boxShadow: "0 20px 40px -16px rgba(120,30,0,.35)" }}>
    <div style={{ width: "100%", borderRadius: 22, overflow: "hidden", background: "#fff", padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><NibblMark size={24} radius={7} /><span style={{ fontWeight: 700, fontSize: 13, color: C.ink, fontFamily: BODY }}>Nibbl</span></div>
      <Card style={{ padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><div><div style={{ fontWeight: 800, fontSize: 26, color: C.ink, fontFamily: DISP }}>{target}</div><div style={{ fontSize: 11, color: C.sub, fontFamily: BODY }}>{t.caloriesLeft}</div></div><Ring pct={0} size={46}><Flame size={16} color={C.ink} /></Ring></Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>{[["263g", C.protein], ["350g", C.carbs], ["117g", C.fat]].map((row) => (<Card key={row[0]} style={{ padding: 8, textAlign: "center" }}><div style={{ fontWeight: 700, fontSize: 12, color: C.ink, fontFamily: DISP }}>{row[0]}</div><div style={{ width: 26, height: 26, margin: "4px auto 0", borderRadius: 99, border: "3px solid " + row[1] }} /></Card>))}</div>
    </div>
    </div>
  );
}
const toB64 = (file) => new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result.split(",")[1]); r.readAsDataURL(file); });
const toDataUrl = (file) => new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(file); });

// ── Nibbl handoff design canvas (claude.ai/design export, embedded verbatim) ──
// Renders the original design exactly as authored. Self-contained; does not affect the app above.
const NIBBL_DESIGN_HTML = `<!-- ============ MASCOT / LOGO FRAME ============ -->
<div style="position:absolute;left:80px;top:80px;width:600px">
  <div data-drags-parent="1" style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-bottom:16px;letter-spacing:.04em;text-transform:uppercase">Mascot · Logo</div>
  <div style="background:#fff;border-radius:28px;box-shadow:0 1px 3px rgba(27,42,42,.06),0 18px 40px -24px rgba(27,42,42,.25);padding:40px">

    <div style="display:flex;gap:32px;align-items:flex-end">
      <!-- App icon on coral gradient -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:14px">
        <div style="width:188px;height:188px;border-radius:44px;background:linear-gradient(150deg,#FF8A5B 0%,#FF7A4D 38%,#E85F30 100%);box-shadow:0 18px 36px -10px rgba(232,95,48,.55),inset 0 2px 4px rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">
          <div style="position:absolute;inset:0;background:radial-gradient(120% 80% at 30% 12%,rgba(255,255,255,.35),transparent 55%)"></div>
          <svg width="128" height="128" viewBox="0 0 120 120" style="position:relative;filter:drop-shadow(0 6px 10px rgba(120,30,0,.25))">
            <!-- ears back -->
            <path d="M30 44 L20 9 Q19 6 23 7 L56 28 Z" fill="#F4F0E8"/>
            <path d="M90 44 L100 9 Q101 6 97 7 L64 28 Z" fill="#F4F0E8"/>
            <path d="M33 42 L26 18 Q25.5 15.5 28.5 17 L50 30 Z" fill="#E85F30"/>
            <path d="M87 42 L94 18 Q94.5 15.5 91.5 17 L70 30 Z" fill="#E85F30"/>
            <!-- head -->
            <path d="M24 42 C24 30 38 25 60 25 C82 25 96 30 96 42 C96 60 88 76 60 98 C32 76 24 60 24 42 Z" fill="#FBF7F0"/>
            <path d="M24 42 C24 30 38 25 60 25 C82 25 96 30 96 42 C96 58 90 70 78 80 C70 70 66 64 60 64 C54 64 50 70 42 80 C30 70 24 58 24 42 Z" fill="#FDFAF4"/>
            <!-- upper face mask coral -->
            <path d="M24 42 C24 30 38 25 60 25 C82 25 96 30 96 42 C96 56 91 67 81 76 C73 66 67 61 60 61 C53 61 47 66 39 76 C29 67 24 56 24 42 Z" fill="#FFFFFF" opacity="0"/>
            <path d="M25 41 C25 30 39 26 60 26 C81 26 95 30 95 41 C95 55 90 65 80 74 C72 65 66 60 60 60 C54 60 48 65 40 74 C30 65 25 55 25 41 Z" fill="url(#foxCoral)"/>
            <defs>
              <linearGradient id="foxCoral" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF8A5B"/><stop offset="1" stop-color="#F26a3a"/></linearGradient>
            </defs>
            <!-- eyes -->
            <ellipse cx="44" cy="48" rx="4.6" ry="5.6" fill="#1B2A2A"/>
            <circle cx="45.6" cy="46" r="1.5" fill="#fff"/>
            <ellipse cx="76" cy="48" rx="4.6" ry="5.6" fill="#1B2A2A"/>
            <circle cx="77.6" cy="46" r="1.5" fill="#fff"/>
            <!-- nose -->
            <path d="M60 70 L53.5 63 Q60 60.5 66.5 63 Z" fill="#1B2A2A"/>
            <path d="M60 70 L60 78" stroke="#1B2A2A" stroke-width="2.4" stroke-linecap="round"/>
          </svg>
        </div>
        <div style="font:600 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.55">App Icon</div>
      </div>

      <!-- Monoline small mark + wordmark -->
      <div style="display:flex;flex-direction:column;gap:20px">
        <div style="display:flex;gap:18px;align-items:center">
          <div style="width:64px;height:64px;border-radius:18px;background:#FBF7F0;display:flex;align-items:center;justify-content:center;border:1px solid #EFE6D8">
            <svg width="40" height="40" viewBox="0 0 120 120" fill="none" stroke="#E85F30" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
              <path d="M30 44 L21 12 L54 30"/><path d="M90 44 L99 12 L66 30"/>
              <path d="M25 41 C25 30 39 26 60 26 C81 26 95 30 95 41 C95 60 87 76 60 96 C33 76 25 60 25 41 Z"/>
              <circle cx="45" cy="49" r="2.6" fill="#E85F30" stroke="none"/>
              <circle cx="75" cy="49" r="2.6" fill="#E85F30" stroke="none"/>
              <path d="M60 70 L54 64 M60 70 L66 64 M60 70 L60 78" stroke-width="5"/>
            </svg>
          </div>
          <div style="width:64px;height:64px;border-radius:18px;background:#1B2A2A;display:flex;align-items:center;justify-content:center">
            <svg width="40" height="40" viewBox="0 0 120 120" fill="none" stroke="#FBF7F0" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
              <path d="M30 44 L21 12 L54 30"/><path d="M90 44 L99 12 L66 30"/>
              <path d="M25 41 C25 30 39 26 60 26 C81 26 95 30 95 41 C95 60 87 76 60 96 C33 76 25 60 25 41 Z"/>
              <circle cx="45" cy="49" r="2.6" fill="#FBF7F0" stroke="none"/>
              <circle cx="75" cy="49" r="2.6" fill="#FBF7F0" stroke="none"/>
              <path d="M60 70 L54 64 M60 70 L66 64 M60 70 L60 78" stroke-width="5"/>
            </svg>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <svg width="40" height="40" viewBox="0 0 120 120" style="flex:none">
            <path d="M30 44 L21 12 L54 30 Z" fill="#E85F30"/><path d="M90 44 L99 12 L66 30 Z" fill="#E85F30"/>
            <path d="M25 41 C25 30 39 26 60 26 C81 26 95 30 95 41 C95 60 87 76 60 96 C33 76 25 60 25 41 Z" fill="#FF7A4D"/>
            <circle cx="45" cy="49" r="3.4" fill="#1B2A2A"/><circle cx="75" cy="49" r="3.4" fill="#1B2A2A"/>
            <path d="M60 70 L54 64 Q60 62 66 64 Z" fill="#1B2A2A"/>
          </svg>
          <div style="font:800 38px 'Poppins';color:#1B2A2A;letter-spacing:-.02em">Nibbl<span style="color:#E85F30">.</span></div>
        </div>
        <div style="font:500 13px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.55;line-height:1.5">Monoline marks for small UI &amp; dark surfaces.<br>Wordmark in Poppins ExtraBold.</div>
      </div>
    </div>
  </div>
</div>

<!-- ============ TOKENS FRAME ============ -->
<div style="position:absolute;left:740px;top:80px;width:560px">
  <div data-drags-parent="1" style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-bottom:16px;letter-spacing:.04em;text-transform:uppercase">Color · Type Tokens</div>
  <div style="background:#fff;border-radius:28px;box-shadow:0 1px 3px rgba(27,42,42,.06),0 18px 40px -24px rgba(27,42,42,.25);padding:36px">
    <div style="font:700 13px 'Poppins';color:#1B2A2A;opacity:.5;letter-spacing:.08em;margin-bottom:16px">CORE</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px">
      <div style="display:flex;align-items:center;gap:12px"><div style="width:48px;height:48px;border-radius:14px;background:#FBF7F0;border:1px solid #EFE6D8"></div><div><div style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A">Base</div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">#FBF7F0</div></div></div>
      <div style="display:flex;align-items:center;gap:12px"><div style="width:48px;height:48px;border-radius:14px;background:#1B2A2A"></div><div><div style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A">Ink</div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">#1B2A2A</div></div></div>
      <div style="display:flex;align-items:center;gap:12px;grid-column:1/3"><div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#FF7A4D,#E85F30)"></div><div><div style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A">Coral / Primary</div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">#FF7A4D → #E85F30</div></div></div>
    </div>
    <div style="font:700 13px 'Poppins';color:#1B2A2A;opacity:.5;letter-spacing:.08em;margin-bottom:16px">MACROS</div>
    <div style="display:flex;gap:14px;margin-bottom:30px">
      <div style="flex:1;display:flex;flex-direction:column;gap:8px"><div style="height:44px;border-radius:14px;background:#F2545B"></div><div style="font:600 12px 'Plus Jakarta Sans';color:#1B2A2A">Protein</div><div style="font:500 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">#F2545B</div></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:8px"><div style="height:44px;border-radius:14px;background:#F2A03D"></div><div style="font:600 12px 'Plus Jakarta Sans';color:#1B2A2A">Carbs</div><div style="font:500 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">#F2A03D</div></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:8px"><div style="height:44px;border-radius:14px;background:#4DA8F0"></div><div style="font:600 12px 'Plus Jakarta Sans';color:#1B2A2A">Fat</div><div style="font:500 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">#4DA8F0</div></div>
    </div>
    <div style="font:700 13px 'Poppins';color:#1B2A2A;opacity:.5;letter-spacing:.08em;margin-bottom:16px">TYPE</div>
    <div style="display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;align-items:baseline;justify-content:space-between;border-bottom:1px solid #F0EAdF;padding-bottom:14px"><div style="font:800 44px 'Poppins';color:#1B2A2A;letter-spacing:-.03em">1,847</div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;text-align:right">Poppins ExtraBold<br>Display / Numerals</div></div>
      <div style="display:flex;align-items:baseline;justify-content:space-between;border-bottom:1px solid #F0EAdF;padding-bottom:14px"><div style="font:700 24px 'Poppins';color:#1B2A2A">Today's Log</div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">Poppins Bold · Headings</div></div>
      <div style="display:flex;align-items:baseline;justify-content:space-between"><div style="font:500 15px 'Plus Jakarta Sans';color:#1B2A2A">Grilled chicken bowl</div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">Jakarta Sans · Body</div></div>
    </div>
  </div>
</div>

<!-- ============ COMPONENTS FRAME ============ -->
<div style="position:absolute;left:1360px;top:80px;width:600px">
  <div data-drags-parent="1" style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-bottom:16px;letter-spacing:.04em;text-transform:uppercase">Components</div>
  <div style="background:#fff;border-radius:28px;box-shadow:0 1px 3px rgba(27,42,42,.06),0 18px 40px -24px rgba(27,42,42,.25);padding:36px;display:flex;flex-direction:column;gap:28px">

    <!-- buttons -->
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font:700 12px 'Poppins';color:#1B2A2A;opacity:.5;letter-spacing:.08em">BUTTONS</div>
      <div style="display:flex;gap:12px;align-items:center">
        <div style="flex:1;height:56px;border-radius:18px;background:linear-gradient(135deg,#FF7A4D,#E85F30);box-shadow:0 10px 20px -6px rgba(232,95,48,.5);display:flex;align-items:center;justify-content:center;color:#fff;font:700 16px 'Poppins'">Continue</div>
        <div style="flex:1;height:56px;border-radius:18px;background:#fff;border:1.5px solid #E7DFD2;display:flex;align-items:center;justify-content:center;color:#1B2A2A;font:700 16px 'Poppins'">Skip</div>
      </div>
    </div>

    <!-- macro chips -->
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font:700 12px 'Poppins';color:#1B2A2A;opacity:.5;letter-spacing:.08em">MACRO CHIPS</div>
      <div style="display:flex;gap:10px">
        <div style="display:flex;align-items:center;gap:7px;background:#FDECEC;padding:9px 14px;border-radius:999px"><span style="width:9px;height:9px;border-radius:99px;background:#F2545B"></span><span style="font:600 13px 'Plus Jakarta Sans';color:#C23B42">P 124g</span></div>
        <div style="display:flex;align-items:center;gap:7px;background:#FCF1E2;padding:9px 14px;border-radius:999px"><span style="width:9px;height:9px;border-radius:99px;background:#F2A03D"></span><span style="font:600 13px 'Plus Jakarta Sans';color:#C57A1E">C 180g</span></div>
        <div style="display:flex;align-items:center;gap:7px;background:#E8F3FD;padding:9px 14px;border-radius:999px"><span style="width:9px;height:9px;border-radius:99px;background:#4DA8F0"></span><span style="font:600 13px 'Plus Jakarta Sans';color:#2C7EC0">F 56g</span></div>
      </div>
    </div>

    <!-- rings -->
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font:700 12px 'Poppins';color:#1B2A2A;opacity:.5;letter-spacing:.08em">RINGS</div>
      <div style="display:flex;gap:24px;align-items:center">
        <div style="position:relative;width:96px;height:96px">
          <svg width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="40" fill="none" stroke="#EFE6D8" stroke-width="9"/><circle cx="48" cy="48" r="40" fill="none" stroke="url(#cg1)" stroke-width="9" stroke-linecap="round" stroke-dasharray="251.3" stroke-dashoffset="80" transform="rotate(-90 48 48)"/><defs><linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF7A4D"/><stop offset="1" stop-color="#E85F30"/></linearGradient></defs></svg>
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font:800 22px 'Poppins';color:#1B2A2A;line-height:1">68%</div></div>
        </div>
        <div style="display:flex;gap:14px">
          <div style="position:relative;width:54px;height:54px"><svg width="54" height="54" viewBox="0 0 54 54"><circle cx="27" cy="27" r="22" fill="none" stroke="#FDECEC" stroke-width="6"/><circle cx="27" cy="27" r="22" fill="none" stroke="#F2545B" stroke-width="6" stroke-linecap="round" stroke-dasharray="138.2" stroke-dashoffset="34" transform="rotate(-90 27 27)"/></svg></div>
          <div style="position:relative;width:54px;height:54px"><svg width="54" height="54" viewBox="0 0 54 54"><circle cx="27" cy="27" r="22" fill="none" stroke="#FCF1E2" stroke-width="6"/><circle cx="27" cy="27" r="22" fill="none" stroke="#F2A03D" stroke-width="6" stroke-linecap="round" stroke-dasharray="138.2" stroke-dashoffset="62" transform="rotate(-90 27 27)"/></svg></div>
          <div style="position:relative;width:54px;height:54px"><svg width="54" height="54" viewBox="0 0 54 54"><circle cx="27" cy="27" r="22" fill="none" stroke="#E8F3FD" stroke-width="6"/><circle cx="27" cy="27" r="22" fill="none" stroke="#4DA8F0" stroke-width="6" stroke-linecap="round" stroke-dasharray="138.2" stroke-dashoffset="83" transform="rotate(-90 27 27)"/></svg></div>
        </div>
      </div>
    </div>

    <!-- food card -->
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font:700 12px 'Poppins';color:#1B2A2A;opacity:.5;letter-spacing:.08em">FOOD CARD</div>
      <div style="display:flex;align-items:center;gap:14px;background:#FBF8F2;border:1px solid #F0EADF;border-radius:20px;padding:14px">
        <div style="width:54px;height:54px;border-radius:15px;background:linear-gradient(135deg,#FFE8D6,#FFD3B0);display:flex;align-items:center;justify-content:center;flex:none">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="#E85F30" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 14h22a11 11 0 0 1-11 11A11 11 0 0 1 5 14Z"/><path d="M9 14a7 7 0 0 1 14 0"/></svg>
        </div>
        <div style="flex:1"><div style="font:600 15px 'Plus Jakarta Sans';color:#1B2A2A">Grilled chicken bowl</div><div style="display:flex;gap:8px;margin-top:6px"><span style="width:8px;height:8px;border-radius:9px;background:#F2545B"></span><span style="width:8px;height:8px;border-radius:9px;background:#F2A03D"></span><span style="width:8px;height:8px;border-radius:9px;background:#4DA8F0"></span><span style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-left:2px">12:40 PM</span></div></div>
        <div style="text-align:right"><div style="font:800 18px 'Poppins';color:#1B2A2A">520</div><div style="font:500 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.45">kcal</div></div>
      </div>
    </div>

    <!-- bottom nav + mode bar -->
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font:700 12px 'Poppins';color:#1B2A2A;opacity:.5;letter-spacing:.08em">BOTTOM NAV · MODE BAR</div>
      <div style="background:#fff;border:1px solid #F0EADF;border-radius:24px;box-shadow:0 8px 20px -10px rgba(27,42,42,.18);padding:12px 22px;display:flex;align-items:center;justify-content:space-between">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85F30" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 4l9 6.5"/><path d="M5 9.5V20h14V9.5"/></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B7AE9E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 14 3-4 3 2 4-6"/></svg>
        <div style="width:52px;height:52px;border-radius:18px;background:linear-gradient(135deg,#FF7A4D,#E85F30);box-shadow:0 8px 16px -4px rgba(232,95,48,.55);display:flex;align-items:center;justify-content:center"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L18 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="13" r="3.5"/></svg></div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B7AE9E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z"/></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B7AE9E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>
      </div>
      <div style="display:flex;gap:8px;justify-content:center;background:rgba(27,42,42,.92);border-radius:18px;padding:8px">
        <div style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A;background:#FF7A4D;padding:8px 16px;border-radius:12px">Food</div>
        <div style="font:600 13px 'Plus Jakarta Sans';color:rgba(255,255,255,.7);padding:8px 16px;border-radius:12px">Barcode</div>
        <div style="font:600 13px 'Plus Jakarta Sans';color:rgba(255,255,255,.7);padding:8px 16px;border-radius:12px">Label</div>
        <div style="font:600 13px 'Plus Jakarta Sans';color:rgba(255,255,255,.7);padding:8px 16px;border-radius:12px">Fridge</div>
      </div>
    </div>
  </div>
</div>

<!-- ============ SCREEN 1: SPLASH ============ -->
<div style="position:absolute;left:80px;top:1320px;width:390px">
  <div data-drags-parent="1" style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-bottom:16px;letter-spacing:.04em;text-transform:uppercase">01 · Splash</div>
  <div style="width:390px;height:844px;background:linear-gradient(150deg,#2a2a2a,#0a0a0a);border-radius:56px;padding:13px;box-shadow:0 40px 80px -28px rgba(27,42,42,.45),0 14px 30px rgba(27,42,42,.16)">
    <div style="width:100%;height:100%;border-radius:44px;overflow:hidden;position:relative;background:linear-gradient(165deg,#FF8A5B 0%,#FF7A4D 42%,#E85F30 100%);font-family:'Plus Jakarta Sans'">
      <div style="position:absolute;inset:0;background:radial-gradient(100% 60% at 50% 8%,rgba(255,255,255,.28),transparent 55%)"></div>
      <div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);width:112px;height:32px;background:#000;border-radius:18px;z-index:50"></div>
      <div style="position:absolute;top:0;left:0;right:0;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 30px;color:#fff;font:600 15px 'Plus Jakarta Sans';z-index:40"><span>9:41</span><span style="display:flex;gap:6px;align-items:center;font-size:13px">●●● ▮</span></div>

      <div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 36px;position:relative">
        <div style="width:160px;height:160px;border-radius:46px;background:rgba(255,255,255,.16);backdrop-filter:blur(4px);box-shadow:inset 0 2px 10px rgba(255,255,255,.25),0 20px 40px -12px rgba(120,30,0,.4);display:flex;align-items:center;justify-content:center;animation:nibblFloat 4s ease-in-out infinite">
          <svg width="118" height="118" viewBox="0 0 120 120" style="filter:drop-shadow(0 6px 10px rgba(120,30,0,.3))">
            <path d="M30 44 L20 9 Q19 6 23 7 L56 28 Z" fill="#F4F0E8"/><path d="M90 44 L100 9 Q101 6 97 7 L64 28 Z" fill="#F4F0E8"/>
            <path d="M33 42 L26 18 Q25.5 15.5 28.5 17 L50 30 Z" fill="#E85F30"/><path d="M87 42 L94 18 Q94.5 15.5 91.5 17 L70 30 Z" fill="#E85F30"/>
            <path d="M24 42 C24 30 38 25 60 25 C82 25 96 30 96 42 C96 60 88 76 60 98 C32 76 24 60 24 42 Z" fill="#FBF7F0"/>
            <path d="M25 41 C25 30 39 26 60 26 C81 26 95 30 95 41 C95 55 90 65 80 74 C72 65 66 60 60 60 C54 60 48 65 40 74 C30 65 25 55 25 41 Z" fill="#FF7A4D"/>
            <ellipse cx="44" cy="48" rx="4.6" ry="5.6" fill="#1B2A2A"/><circle cx="45.6" cy="46" r="1.5" fill="#fff"/>
            <ellipse cx="76" cy="48" rx="4.6" ry="5.6" fill="#1B2A2A"/><circle cx="77.6" cy="46" r="1.5" fill="#fff"/>
            <path d="M60 70 L53.5 63 Q60 60.5 66.5 63 Z" fill="#1B2A2A"/><path d="M60 70 L60 78" stroke="#1B2A2A" stroke-width="2.4" stroke-linecap="round"/>
          </svg>
        </div>
        <div style="font:800 46px 'Poppins';color:#fff;letter-spacing:-.02em;margin-top:36px">Nibbl<span style="opacity:.7">.</span></div>
        <div style="font:600 19px 'Plus Jakarta Sans';color:rgba(255,255,255,.92);margin-top:10px;text-align:center;line-height:1.4">Snap it. Nibbl tracks it.</div>
        <div style="font:500 14px 'Plus Jakarta Sans';color:rgba(255,255,255,.72);margin-top:14px;text-align:center;line-height:1.55;max-width:260px">Effortless calorie &amp; macro tracking. Just point your camera at the plate.</div>

        <div style="position:absolute;bottom:48px;left:36px;right:36px;display:flex;flex-direction:column;gap:14px">
          <div style="height:58px;border-radius:18px;background:#fff;display:flex;align-items:center;justify-content:center;color:#E85F30;font:700 17px 'Poppins';box-shadow:0 14px 28px -8px rgba(120,30,0,.4)">Get Started</div>
          <div style="text-align:center;font:600 14px 'Plus Jakarta Sans';color:rgba(255,255,255,.85)">I already have an account</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ============ SCREEN 2: HOME ============ -->
<div style="position:absolute;left:570px;top:1320px;width:390px">
  <div data-drags-parent="1" style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-bottom:16px;letter-spacing:.04em;text-transform:uppercase">02 · Home</div>
  <div style="width:390px;height:844px;background:linear-gradient(150deg,#2a2a2a,#0a0a0a);border-radius:56px;padding:13px;box-shadow:0 40px 80px -28px rgba(27,42,42,.45),0 14px 30px rgba(27,42,42,.16)">
    <div data-screen-label="Home" style="width:100%;height:100%;border-radius:44px;overflow:hidden;position:relative;background:#FBF7F0;font-family:'Plus Jakarta Sans'">
      <div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);width:112px;height:32px;background:#000;border-radius:18px;z-index:50"></div>
      <div style="position:absolute;top:0;left:0;right:0;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 30px;color:#1B2A2A;font:600 15px 'Plus Jakarta Sans';z-index:40"><span>9:41</span><span style="font-size:13px">●●● ▮</span></div>

      <div style="position:absolute;inset:54px 0 0 0;overflow:hidden">
        <div style="padding:8px 22px 120px;height:100%;overflow:hidden">
          <!-- header -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
            <div><div style="font:500 13px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">Good morning</div><div style="font:700 22px 'Poppins';color:#1B2A2A">Hey, Maya</div></div>
            <div style="display:flex;align-items:center;gap:6px;background:#fff;border:1px solid #F0EADF;border-radius:999px;padding:7px 12px;box-shadow:0 4px 12px -6px rgba(27,42,42,.15)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF7A4D"><path d="M12 2c1 4 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3-1 5 3 5 3 2 0-3-1-5 0-8Z"/></svg>
              <span style="font:700 14px 'Poppins';color:#1B2A2A">12</span>
            </div>
          </div>

          <!-- day strip -->
          <div style="display:flex;gap:7px;margin-bottom:20px">
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:9px 0;border-radius:14px"><span style="font:600 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.45">M</span><span style="font:700 14px 'Poppins';color:#1B2A2A;opacity:.55">8</span></div>
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:9px 0;border-radius:14px"><span style="font:600 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.45">T</span><span style="font:700 14px 'Poppins';color:#1B2A2A;opacity:.55">9</span></div>
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:9px 0;border-radius:14px"><span style="font:600 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.45">W</span><span style="font:700 14px 'Poppins';color:#1B2A2A;opacity:.55">10</span></div>
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:9px 0;border-radius:14px;background:linear-gradient(150deg,#FF7A4D,#E85F30);box-shadow:0 8px 16px -6px rgba(232,95,48,.5)"><span style="font:600 11px 'Plus Jakarta Sans';color:rgba(255,255,255,.85)">T</span><span style="font:700 14px 'Poppins';color:#fff">11</span></div>
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:9px 0;border-radius:14px"><span style="font:600 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.45">F</span><span style="font:700 14px 'Poppins';color:#1B2A2A;opacity:.55">12</span></div>
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:9px 0;border-radius:14px"><span style="font:600 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.45">S</span><span style="font:700 14px 'Poppins';color:#1B2A2A;opacity:.55">13</span></div>
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:9px 0;border-radius:14px"><span style="font:600 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.45">S</span><span style="font:700 14px 'Poppins';color:#1B2A2A;opacity:.55">14</span></div>
          </div>

          <!-- hero ring card -->
          <div style="background:#fff;border-radius:28px;padding:24px;box-shadow:0 1px 3px rgba(27,42,42,.05),0 16px 32px -20px rgba(27,42,42,.28);margin-bottom:16px">
            <div style="display:flex;align-items:center;gap:20px">
              <div style="position:relative;width:148px;height:148px;flex:none">
                <svg width="148" height="148" viewBox="0 0 148 148">
                  <circle cx="74" cy="74" r="63" fill="none" stroke="#F0E8DA" stroke-width="14"/>
                  <circle cx="74" cy="74" r="63" fill="none" stroke="url(#homeCoral)" stroke-width="14" stroke-linecap="round" stroke-dasharray="395.8" stroke-dashoffset="127" transform="rotate(-90 74 74)"/>
                  <defs><linearGradient id="homeCoral" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8A5B"/><stop offset="1" stop-color="#E85F30"/></linearGradient></defs>
                </svg>
                <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
                  <div style="font:800 38px 'Poppins';color:#1B2A2A;line-height:1;letter-spacing:-.02em">1,240</div>
                  <div style="font:600 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-top:2px">kcal left</div>
                </div>
              </div>
              <div style="flex:1;display:flex;flex-direction:column;gap:14px">
                <!-- protein -->
                <div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font:600 12px 'Plus Jakarta Sans';color:#1B2A2A">Protein</span><span style="font:700 12px 'Poppins';color:#1B2A2A;opacity:.55">98<span style="opacity:.6">/124g</span></span></div><div style="height:7px;border-radius:9px;background:#FDECEC;overflow:hidden"><div style="width:79%;height:100%;border-radius:9px;background:#F2545B"></div></div></div>
                <div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font:600 12px 'Plus Jakarta Sans';color:#1B2A2A">Carbs</span><span style="font:700 12px 'Poppins';color:#1B2A2A;opacity:.55">142<span style="opacity:.6">/180g</span></span></div><div style="height:7px;border-radius:9px;background:#FCF1E2;overflow:hidden"><div style="width:79%;height:100%;border-radius:9px;background:#F2A03D"></div></div></div>
                <div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font:600 12px 'Plus Jakarta Sans';color:#1B2A2A">Fat</span><span style="font:700 12px 'Poppins';color:#1B2A2A;opacity:.55">34<span style="opacity:.6">/56g</span></span></div><div style="height:7px;border-radius:9px;background:#E8F3FD;overflow:hidden"><div style="width:60%;height:100%;border-radius:9px;background:#4DA8F0"></div></div></div>
              </div>
            </div>
          </div>

          <!-- water + coach row -->
          <div style="display:flex;gap:12px;margin-bottom:16px">
            <div style="flex:1.1;background:#fff;border-radius:22px;padding:16px;box-shadow:0 1px 3px rgba(27,42,42,.05),0 14px 28px -22px rgba(27,42,42,.28)">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><span style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A">Water</span><span style="font:700 13px 'Poppins';color:#4DA8F0">1.5<span style="opacity:.6;font-size:11px">/2.5L</span></span></div>
              <div style="display:flex;gap:5px">
                <div style="flex:1;height:34px;border-radius:8px;background:#4DA8F0"></div><div style="flex:1;height:34px;border-radius:8px;background:#4DA8F0"></div><div style="flex:1;height:34px;border-radius:8px;background:#4DA8F0"></div><div style="flex:1;height:34px;border-radius:8px;background:#E8F3FD"></div><div style="flex:1;height:34px;border-radius:8px;background:#E8F3FD"></div>
              </div>
            </div>
            <div style="flex:.9;background:linear-gradient(150deg,#1B2A2A,#26403d);border-radius:22px;padding:16px;color:#fff;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 14px 28px -16px rgba(27,42,42,.5)">
              <svg width="32" height="32" viewBox="0 0 120 120"><path d="M30 44 L21 12 L54 30 Z" fill="#E85F30"/><path d="M90 44 L99 12 L66 30 Z" fill="#E85F30"/><path d="M25 41 C25 30 39 26 60 26 C81 26 95 30 95 41 C95 60 87 76 60 96 C33 76 25 60 25 41 Z" fill="#FF7A4D"/><circle cx="45" cy="49" r="4" fill="#1B2A2A"/><circle cx="75" cy="49" r="4" fill="#1B2A2A"/><path d="M60 70 L54 64 Q60 62 66 64 Z" fill="#1B2A2A"/></svg>
              <div><div style="font:700 14px 'Poppins'">Ask Nibbl</div><div style="font:500 11px 'Plus Jakarta Sans';color:rgba(255,255,255,.7);margin-top:2px">Your AI coach</div></div>
            </div>
          </div>

          <!-- today's log -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><span style="font:700 17px 'Poppins';color:#1B2A2A">Today's Log</span><span style="font:600 13px 'Plus Jakarta Sans';color:#E85F30">See all</span></div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;align-items:center;gap:13px;background:#fff;border-radius:20px;padding:12px;box-shadow:0 1px 2px rgba(27,42,42,.04),0 12px 24px -22px rgba(27,42,42,.3)">
              <div style="width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,#FFE8D6,#FFD3B0);display:flex;align-items:center;justify-content:center;flex:none"><svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#E85F30" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 14h22a11 11 0 0 1-11 11A11 11 0 0 1 5 14Z"/><path d="M9 14a7 7 0 0 1 14 0"/></svg></div>
              <div style="flex:1"><div style="font:600 14px 'Plus Jakarta Sans';color:#1B2A2A">Greek yogurt bowl</div><div style="display:flex;gap:7px;align-items:center;margin-top:5px"><span style="width:7px;height:7px;border-radius:9px;background:#F2545B"></span><span style="width:7px;height:7px;border-radius:9px;background:#F2A03D"></span><span style="width:7px;height:7px;border-radius:9px;background:#4DA8F0"></span><span style="font:500 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.45">8:20 AM</span></div></div>
              <div style="text-align:right"><div style="font:800 16px 'Poppins';color:#1B2A2A">320</div></div>
            </div>
            <div style="display:flex;align-items:center;gap:13px;background:#fff;border-radius:20px;padding:12px;box-shadow:0 1px 2px rgba(27,42,42,.04),0 12px 24px -22px rgba(27,42,42,.3)">
              <div style="width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,#E5F3E0,#CDE9C4);display:flex;align-items:center;justify-content:center;flex:none"><svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#4f9f3a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 6c5 0 9 3 9 9s-4 11-9 11S7 21 7 15s4-9 9-9Z"/><path d="M16 6V3"/></svg></div>
              <div style="flex:1"><div style="font:600 14px 'Plus Jakarta Sans';color:#1B2A2A">Grilled chicken bowl</div><div style="display:flex;gap:7px;align-items:center;margin-top:5px"><span style="width:7px;height:7px;border-radius:9px;background:#F2545B"></span><span style="width:7px;height:7px;border-radius:9px;background:#F2A03D"></span><span style="width:7px;height:7px;border-radius:9px;background:#4DA8F0"></span><span style="font:500 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.45">12:40 PM</span></div></div>
              <div style="text-align:right"><div style="font:800 16px 'Poppins';color:#1B2A2A">520</div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- bottom nav -->
      <div style="position:absolute;bottom:18px;left:18px;right:18px;background:#fff;border:1px solid #F0EADF;border-radius:26px;box-shadow:0 10px 30px -8px rgba(27,42,42,.22);padding:12px 24px;display:flex;align-items:center;justify-content:space-between">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85F30" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 4l9 6.5"/><path d="M5 9.5V20h14V9.5"/></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B7AE9E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 14 3-4 3 2 4-6"/></svg>
        <div style="width:52px;height:52px;border-radius:18px;background:linear-gradient(135deg,#FF7A4D,#E85F30);box-shadow:0 8px 16px -4px rgba(232,95,48,.55);display:flex;align-items:center;justify-content:center;margin-top:-22px"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L18 6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="13" r="3.5"/></svg></div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B7AE9E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z"/></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B7AE9E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>
      </div>
    </div>
  </div>
</div>

<!-- ============ SCREEN 3: CAMERA ============ -->
<div style="position:absolute;left:1060px;top:1320px;width:390px">
  <div data-drags-parent="1" style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-bottom:16px;letter-spacing:.04em;text-transform:uppercase">03 · Scanner</div>
  <div style="width:390px;height:844px;background:linear-gradient(150deg,#2a2a2a,#0a0a0a);border-radius:56px;padding:13px;box-shadow:0 40px 80px -28px rgba(27,42,42,.45),0 14px 30px rgba(27,42,42,.16)">
    <div data-screen-label="Scanner" style="width:100%;height:100%;border-radius:44px;overflow:hidden;position:relative;background:#15110e;font-family:'Plus Jakarta Sans'">
      <!-- viewfinder bg -->
      <div style="position:absolute;inset:0;background:radial-gradient(120% 80% at 50% 38%,#3a2c22,#15110e 75%)"></div>
      <div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);width:112px;height:32px;background:#000;border-radius:18px;z-index:50"></div>
      <div style="position:absolute;top:0;left:0;right:0;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 30px;color:#fff;font:600 15px 'Plus Jakarta Sans';z-index:40"><span>9:41</span><span style="font-size:13px">●●● ▮</span></div>

      <!-- top controls -->
      <div style="position:absolute;top:64px;left:20px;right:20px;display:flex;align-items:center;justify-content:space-between;z-index:30">
        <div style="width:40px;height:40px;border-radius:14px;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg></div>
        <div style="font:600 14px 'Plus Jakarta Sans';color:#fff">Scan your meal</div>
        <div style="width:40px;height:40px;border-radius:14px;background:rgba(255,123,77,.9);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 14px -4px rgba(232,95,48,.7)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg></div>
      </div>

      <!-- corner brackets -->
      <div style="position:absolute;top:150px;left:48px;right:48px;height:294px;z-index:20">
        <div style="position:absolute;top:0;left:0;width:42px;height:42px;border-top:4px solid #FF7A4D;border-left:4px solid #FF7A4D;border-top-left-radius:16px"></div>
        <div style="position:absolute;top:0;right:0;width:42px;height:42px;border-top:4px solid #FF7A4D;border-right:4px solid #FF7A4D;border-top-right-radius:16px"></div>
        <div style="position:absolute;bottom:0;left:0;width:42px;height:42px;border-bottom:4px solid #FF7A4D;border-left:4px solid #FF7A4D;border-bottom-left-radius:16px"></div>
        <div style="position:absolute;bottom:0;right:0;width:42px;height:42px;border-bottom:4px solid #FF7A4D;border-right:4px solid #FF7A4D;border-bottom-right-radius:16px"></div>
        <!-- plate hint -->
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><div style="width:150px;height:150px;border-radius:50%;background:radial-gradient(circle at 40% 35%,rgba(255,255,255,.1),rgba(255,255,255,.03));border:1px dashed rgba(255,255,255,.25)"></div></div>
        <div style="position:absolute;bottom:-34px;left:0;right:0;text-align:center;font:500 12px 'Plus Jakarta Sans';color:rgba(255,255,255,.6)">Center your plate in the frame</div>
      </div>

      <!-- result card -->
      <div style="position:absolute;left:18px;right:18px;bottom:188px;background:#fff;border-radius:24px;padding:16px;box-shadow:0 20px 40px -12px rgba(0,0,0,.5);z-index:30">
        <div style="display:flex;align-items:center;gap:13px">
          <div style="width:52px;height:52px;border-radius:15px;background:linear-gradient(135deg,#FFE8D6,#FFD3B0);display:flex;align-items:center;justify-content:center;flex:none"><svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#E85F30" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 14h22a11 11 0 0 1-11 11A11 11 0 0 1 5 14Z"/><path d="M9 14a7 7 0 0 1 14 0"/></svg></div>
          <div style="flex:1"><div style="display:flex;align-items:center;gap:6px"><span style="font:600 15px 'Plus Jakarta Sans';color:#1B2A2A">Grilled chicken bowl</span><span style="font:600 10px 'Plus Jakarta Sans';color:#E85F30;background:#FFEDE4;padding:2px 7px;border-radius:99px">98% match</span></div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-top:3px">Detected by Nibbl AI</div></div>
          <div style="text-align:right"><div style="font:800 22px 'Poppins';color:#1B2A2A">520</div><div style="font:500 10px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.45">kcal</div></div>
        </div>
        <div style="display:flex;gap:8px;margin-top:14px">
          <div style="flex:1;display:flex;align-items:center;gap:6px;background:#FDECEC;padding:8px 10px;border-radius:12px"><span style="width:8px;height:8px;border-radius:9px;background:#F2545B"></span><span style="font:600 12px 'Plus Jakarta Sans';color:#C23B42">42g</span></div>
          <div style="flex:1;display:flex;align-items:center;gap:6px;background:#FCF1E2;padding:8px 10px;border-radius:12px"><span style="width:8px;height:8px;border-radius:9px;background:#F2A03D"></span><span style="font:600 12px 'Plus Jakarta Sans';color:#C57A1E">38g</span></div>
          <div style="flex:1;display:flex;align-items:center;gap:6px;background:#E8F3FD;padding:8px 10px;border-radius:12px"><span style="width:8px;height:8px;border-radius:9px;background:#4DA8F0"></span><span style="font:600 12px 'Plus Jakarta Sans';color:#2C7EC0">18g</span></div>
        </div>
        <div style="height:48px;border-radius:15px;background:linear-gradient(135deg,#FF7A4D,#E85F30);box-shadow:0 10px 20px -6px rgba(232,95,48,.5);display:flex;align-items:center;justify-content:center;color:#fff;font:700 15px 'Poppins';margin-top:12px">Add to Log</div>
      </div>

      <!-- mode bar + shutter -->
      <div style="position:absolute;left:0;right:0;bottom:0;padding:0 20px 30px;z-index:30">
        <div style="display:flex;gap:6px;justify-content:center;margin-bottom:18px">
          <div style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A;background:#FF7A4D;padding:8px 15px;border-radius:12px">Food</div>
          <div style="font:600 13px 'Plus Jakarta Sans';color:rgba(255,255,255,.65);padding:8px 15px;border-radius:12px;background:rgba(255,255,255,.08)">Barcode</div>
          <div style="font:600 13px 'Plus Jakarta Sans';color:rgba(255,255,255,.65);padding:8px 15px;border-radius:12px;background:rgba(255,255,255,.08)">Label</div>
          <div style="font:600 13px 'Plus Jakarta Sans';color:rgba(255,255,255,.65);padding:8px 15px;border-radius:12px;background:rgba(255,255,255,.08)">Fridge</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 24px">
          <div style="width:46px;height:46px;border-radius:14px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="12" cy="12" r="3.5"/></svg></div>
          <div style="width:74px;height:74px;border-radius:50%;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center"><div style="width:60px;height:60px;border-radius:50%;background:#fff;border:3px solid #15110e;box-shadow:0 0 0 3px #fff"></div></div>
          <div style="width:46px;height:46px;border-radius:14px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ============ SCREEN 4: PROGRESS ============ -->
<div style="position:absolute;left:1550px;top:1320px;width:390px">
  <div data-drags-parent="1" style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-bottom:16px;letter-spacing:.04em;text-transform:uppercase">04 · Progress</div>
  <div style="width:390px;height:844px;background:linear-gradient(150deg,#2a2a2a,#0a0a0a);border-radius:56px;padding:13px;box-shadow:0 40px 80px -28px rgba(27,42,42,.45),0 14px 30px rgba(27,42,42,.16)">
    <div data-screen-label="Progress" style="width:100%;height:100%;border-radius:44px;overflow:hidden;position:relative;background:#FBF7F0;font-family:'Plus Jakarta Sans'">
      <div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);width:112px;height:32px;background:#000;border-radius:18px;z-index:50"></div>
      <div style="position:absolute;top:0;left:0;right:0;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 30px;color:#1B2A2A;font:600 15px 'Plus Jakarta Sans';z-index:40"><span>9:41</span><span style="font-size:13px">●●● ▮</span></div>

      <div style="position:absolute;inset:54px 0 0 0;padding:8px 22px 120px;overflow:hidden">
        <div style="font:700 24px 'Poppins';color:#1B2A2A;margin-bottom:4px">Progress</div>
        <div style="font:500 13px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-bottom:20px">Last 30 days</div>

        <!-- weight chart card -->
        <div style="background:#fff;border-radius:26px;padding:20px;box-shadow:0 1px 3px rgba(27,42,42,.05),0 16px 32px -22px rgba(27,42,42,.28);margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px">
            <div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">Current weight</div><div style="display:flex;align-items:baseline;gap:8px;margin-top:2px"><span style="font:800 34px 'Poppins';color:#1B2A2A;letter-spacing:-.02em">68.4</span><span style="font:600 14px 'Poppins';color:#1B2A2A;opacity:.5">kg</span></div></div>
            <div style="display:flex;align-items:center;gap:5px;background:#E9F6EC;padding:6px 11px;border-radius:99px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3E9B57" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15 6-6 6 6"/></svg><span style="font:700 12px 'Poppins';color:#3E9B57">2.1 kg</span></div>
          </div>
          <svg width="100%" height="120" viewBox="0 0 300 120" preserveAspectRatio="none">
            <defs><linearGradient id="wfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF7A4D" stop-opacity=".28"/><stop offset="1" stop-color="#FF7A4D" stop-opacity="0"/></linearGradient></defs>
            <path d="M0 30 C40 28 60 50 100 58 C140 66 160 60 200 78 C240 96 270 86 300 92 L300 120 L0 120 Z" fill="url(#wfill)"/>
            <path d="M0 30 C40 28 60 50 100 58 C140 66 160 60 200 78 C240 96 270 86 300 92" fill="none" stroke="#E85F30" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="300" cy="92" r="5" fill="#E85F30" stroke="#fff" stroke-width="2.5"/>
          </svg>
          <div style="display:flex;justify-content:space-between;margin-top:8px;font:500 11px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.4"><span>May 12</span><span>May 26</span><span>Jun 9</span></div>
        </div>

        <!-- days logged ring + stat -->
        <div style="display:flex;gap:12px;margin-bottom:16px">
          <div style="flex:1;background:#fff;border-radius:24px;padding:18px;box-shadow:0 1px 3px rgba(27,42,42,.05),0 14px 28px -22px rgba(27,42,42,.28);display:flex;align-items:center;gap:14px">
            <div style="position:relative;width:74px;height:74px;flex:none">
              <svg width="74" height="74" viewBox="0 0 74 74"><circle cx="37" cy="37" r="30" fill="none" stroke="#F0E8DA" stroke-width="8"/><circle cx="37" cy="37" r="30" fill="none" stroke="url(#dlc)" stroke-width="8" stroke-linecap="round" stroke-dasharray="188.5" stroke-dashoffset="38" transform="rotate(-90 37 37)"/><defs><linearGradient id="dlc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8A5B"/><stop offset="1" stop-color="#E85F30"/></linearGradient></defs></svg>
              <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font:800 19px 'Poppins';color:#1B2A2A;line-height:1">24</div></div>
            </div>
            <div><div style="font:700 14px 'Poppins';color:#1B2A2A">Days logged</div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-top:2px">of 30 days</div></div>
          </div>
        </div>

        <!-- totals -->
        <div style="display:flex;gap:12px">
          <div style="flex:1;background:#fff;border-radius:22px;padding:16px;box-shadow:0 1px 3px rgba(27,42,42,.05),0 14px 28px -22px rgba(27,42,42,.28)"><div style="font:800 24px 'Poppins';color:#1B2A2A">1,820</div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-top:3px">Avg daily kcal</div></div>
          <div style="flex:1;background:#fff;border-radius:22px;padding:16px;box-shadow:0 1px 3px rgba(27,42,42,.05),0 14px 28px -22px rgba(27,42,42,.28)"><div style="display:flex;align-items:center;gap:6px"><svg width="18" height="18" viewBox="0 0 24 24" fill="#FF7A4D"><path d="M12 2c1 4 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3-1 5 3 5 3 2 0-3-1-5 0-8Z"/></svg><div style="font:800 24px 'Poppins';color:#1B2A2A">12</div></div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-top:3px">Day streak</div></div>
        </div>
      </div>

      <!-- bottom nav -->
      <div style="position:absolute;bottom:18px;left:18px;right:18px;background:#fff;border:1px solid #F0EADF;border-radius:26px;box-shadow:0 10px 30px -8px rgba(27,42,42,.22);padding:12px 24px;display:flex;align-items:center;justify-content:space-between">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B7AE9E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 4l9 6.5"/><path d="M5 9.5V20h14V9.5"/></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85F30" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 14 3-4 3 2 4-6"/></svg>
        <div style="width:52px;height:52px;border-radius:18px;background:linear-gradient(135deg,#FF7A4D,#E85F30);box-shadow:0 8px 16px -4px rgba(232,95,48,.55);display:flex;align-items:center;justify-content:center;margin-top:-22px"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L18 6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="13" r="3.5"/></svg></div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B7AE9E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z"/></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B7AE9E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>
      </div>
    </div>
  </div>
</div>

<!-- ============ SCREEN 5: PAYWALL ============ -->
<div style="position:absolute;left:2040px;top:1320px;width:390px">
  <div data-drags-parent="1" style="font:600 13px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5;margin-bottom:16px;letter-spacing:.04em;text-transform:uppercase">05 · Paywall</div>
  <div style="width:390px;height:844px;background:linear-gradient(150deg,#2a2a2a,#0a0a0a);border-radius:56px;padding:13px;box-shadow:0 40px 80px -28px rgba(27,42,42,.45),0 14px 30px rgba(27,42,42,.16)">
    <div data-screen-label="Paywall" style="width:100%;height:100%;border-radius:44px;overflow:hidden;position:relative;background:#FBF7F0;font-family:'Plus Jakarta Sans'">
      <div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);width:112px;height:32px;background:#000;border-radius:18px;z-index:50"></div>
      <div style="position:absolute;top:0;left:0;right:0;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 30px;color:#1B2A2A;font:600 15px 'Plus Jakarta Sans';z-index:40"><span>9:41</span><span style="font-size:13px">●●● ▮</span></div>

      <!-- coral hero top -->
      <div style="position:absolute;top:0;left:0;right:0;height:262px;background:linear-gradient(160deg,#FF8A5B,#E85F30);overflow:hidden">
        <div style="position:absolute;inset:0;background:radial-gradient(90% 60% at 50% 0%,rgba(255,255,255,.25),transparent 60%)"></div>
        <div style="position:absolute;top:74px;right:22px;width:34px;height:34px;border-radius:12px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></div>
        <div style="position:absolute;top:86px;left:0;right:0;display:flex;flex-direction:column;align-items:center">
          <div style="width:84px;height:84px;border-radius:26px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;animation:nibblFloat 4s ease-in-out infinite">
            <svg width="60" height="60" viewBox="0 0 120 120"><path d="M30 44 L20 9 Q19 6 23 7 L56 28 Z" fill="#F4F0E8"/><path d="M90 44 L100 9 Q101 6 97 7 L64 28 Z" fill="#F4F0E8"/><path d="M33 42 L26 18 Q25.5 15.5 28.5 17 L50 30 Z" fill="#E85F30"/><path d="M87 42 L94 18 Q94.5 15.5 91.5 17 L70 30 Z" fill="#E85F30"/><path d="M24 42 C24 30 38 25 60 25 C82 25 96 30 96 42 C96 60 88 76 60 98 C32 76 24 60 24 42 Z" fill="#FBF7F0"/><path d="M25 41 C25 30 39 26 60 26 C81 26 95 30 95 41 C95 55 90 65 80 74 C72 65 66 60 60 60 C54 60 48 65 40 74 C30 65 25 55 25 41 Z" fill="#FF7A4D"/><ellipse cx="44" cy="48" rx="4.6" ry="5.6" fill="#1B2A2A"/><ellipse cx="76" cy="48" rx="4.6" ry="5.6" fill="#1B2A2A"/><path d="M60 70 L53.5 63 Q60 60.5 66.5 63 Z" fill="#1B2A2A"/></svg>
          </div>
          <div style="font:700 12px 'Poppins';color:#fff;letter-spacing:.18em;margin-top:16px;opacity:.85">NIBBL PRO</div>
          <div style="font:800 25px 'Poppins';color:#fff;margin-top:6px;text-align:center;line-height:1.2;padding:0 30px">Track smarter,<br>effortlessly</div>
        </div>
      </div>

      <div style="position:absolute;inset:262px 0 0 0;padding:22px 22px 24px;display:flex;flex-direction:column">
        <!-- benefits -->
        <div style="display:flex;flex-direction:column;gap:11px;margin-bottom:18px">
          <div style="display:flex;align-items:center;gap:11px"><div style="width:24px;height:24px;border-radius:8px;background:#FFEDE4;display:flex;align-items:center;justify-content:center"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E85F30" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-11"/></svg></div><span style="font:500 14px 'Plus Jakarta Sans';color:#1B2A2A">Unlimited AI food scans</span></div>
          <div style="display:flex;align-items:center;gap:11px"><div style="width:24px;height:24px;border-radius:8px;background:#FFEDE4;display:flex;align-items:center;justify-content:center"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E85F30" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-11"/></svg></div><span style="font:500 14px 'Plus Jakarta Sans';color:#1B2A2A">Barcode, label &amp; fridge modes</span></div>
          <div style="display:flex;align-items:center;gap:11px"><div style="width:24px;height:24px;border-radius:8px;background:#FFEDE4;display:flex;align-items:center;justify-content:center"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E85F30" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-11"/></svg></div><span style="font:500 14px 'Plus Jakarta Sans';color:#1B2A2A">AI Coach &amp; advanced insights</span></div>
        </div>

        <!-- plans -->
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border:1.5px solid #F0EADF;border-radius:18px;padding:14px 16px"><div><div style="font:600 15px 'Plus Jakarta Sans';color:#1B2A2A">Monthly</div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">Billed every month</div></div><div style="font:800 18px 'Poppins';color:#1B2A2A">$9.99</div></div>

          <div style="position:relative;display:flex;align-items:center;justify-content:space-between;background:#fff;border:2px solid #E85F30;border-radius:18px;padding:14px 16px;box-shadow:0 12px 24px -12px rgba(232,95,48,.4)">
            <div style="position:absolute;top:-11px;left:16px;background:linear-gradient(135deg,#FF7A4D,#E85F30);color:#fff;font:700 10px 'Poppins';letter-spacing:.04em;padding:4px 10px;border-radius:99px">BEST VALUE · SAVE 75%</div>
            <div><div style="font:600 15px 'Plus Jakarta Sans';color:#1B2A2A">Yearly</div><div style="font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.5">$2.50 / month</div></div>
            <div style="text-align:right"><div style="font:800 18px 'Poppins';color:#E85F30">$29.99</div></div>
          </div>

        </div>

        <div style="margin-top:auto;display:flex;flex-direction:column;gap:12px">
          <div style="height:58px;border-radius:18px;background:linear-gradient(135deg,#FF7A4D,#E85F30);box-shadow:0 14px 28px -8px rgba(232,95,48,.5);display:flex;align-items:center;justify-content:center;color:#fff;font:700 17px 'Poppins'">Start 7-day free trial</div>
          <div style="text-align:center;font:500 12px 'Plus Jakarta Sans';color:#1B2A2A;opacity:.45">Cancel anytime · Restore purchase</div>
        </div>
      </div>
    </div>
  </div>
</div>`;

export function NibblDesignCanvas() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`@keyframes nibblFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}} .nibbl-design-canvas *{box-sizing:border-box}`}</style>
      <div
        className="nibbl-design-canvas"
        style={{ position: "relative", width: 2480, height: 2210, background: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        dangerouslySetInnerHTML={{ __html: NIBBL_DESIGN_HTML }}
      />
    </>
  );
}
