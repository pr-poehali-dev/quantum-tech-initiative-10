import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "О нас", href: "#about" },
  { label: "Правила", href: "#rules" },
  { label: "Категории", href: "#categories" },
  { label: "Календарь", href: "#calendar" },
  { label: "Результаты", href: "#results" },
  { label: "Судьи", href: "#judges" },
  { label: "Фото/Видео", href: "#media" },
  { label: "Спонсоры", href: "#sponsors" },
];

const CATEGORIES = [
  {
    icon: "Volume2",
    title: "Street",
    desc: "Серийные автомобили с минимальными изменениями. Идеально для начинающих участников.",
    level: "Начальный",
  },
  {
    icon: "Zap",
    title: "Sport",
    desc: "Модифицированные системы звука. Баланс между качеством и мощностью.",
    level: "Средний",
  },
  {
    icon: "Trophy",
    title: "Expert",
    desc: "Профессиональные инсталляции высшего уровня. Борьба за чемпионский титул.",
    level: "Профи",
  },
  {
    icon: "Crown",
    title: "Extreme",
    desc: "Максимальное давление SPL. Только для самых смелых и подготовленных систем.",
    level: "Экстрим",
  },
  {
    icon: "Music",
    title: "SQ (Sound Quality)",
    desc: "Оценка качества звучания, сцены и детальности. Для истинных аудиофилов.",
    level: "Качество",
  },
  {
    icon: "Gauge",
    title: "SPL",
    desc: "Максимальный уровень звукового давления. Громче всех — победитель.",
    level: "Давление",
  },
];

const CALENDAR = [
  { date: "15 МАР", city: "Москва", venue: "ТРЦ «Авто Плаза»", status: "upcoming" },
  { date: "12 АПР", city: "Санкт-Петербург", venue: "Автодром «Северный»", status: "upcoming" },
  { date: "24 МАЙ", city: "Екатеринбург", venue: "ТЦ «АвтоМир»", status: "upcoming" },
  { date: "14 ИЮН", city: "Новосибирск", venue: "Парковка ТРЦ «Мега»", status: "upcoming" },
  { date: "19 ЮЛ", city: "Краснодар", venue: "Автодром «Южный»", status: "upcoming" },
  { date: "06 СЕН", city: "Финал России", venue: "Москва — Гранд Финал", status: "final" },
];

const RESULTS = [
  { place: "1", name: "Алексей Громов", city: "Москва", category: "Expert", score: "148.7 дБ" },
  { place: "2", name: "Дмитрий Волков", city: "СПб", category: "SPL", score: "147.2 дБ" },
  { place: "3", name: "Сергей Басов", city: "Екб", category: "Street", score: "145.9 дБ" },
  { place: "4", name: "Иван Ударников", city: "НСК", category: "Sport", score: "144.1 дБ" },
];

const JUDGES = [
  { name: "Максим Соколов", role: "Главный судья", exp: "12 лет в автозвуке", city: "Москва" },
  { name: "Андрей Петров", role: "Технический судья", exp: "8 лет в соревнованиях", city: "СПб" },
  { name: "Олег Кириллов", role: "Судья SQ", exp: "10 лет, эксперт Hi-Fi", city: "Краснодар" },
  { name: "Виталий Громов", role: "Судья SPL", exp: "9 лет, рекорды РФ", city: "Екатеринбург" },
];

const SPONSORS = [
  { name: "Alpine", type: "Генеральный спонсор" },
  { name: "JL Audio", type: "Официальный партнёр" },
  { name: "Hertz", type: "Технический партнёр" },
  { name: "DD Audio", type: "Партнёр SPL" },
  { name: "DLS", type: "Партнёр SQ" },
  { name: "Ural", type: "Российский партнёр" },
];

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ["hero", "about", "categories", "calendar", "results", "judges", "sponsors"];
    const observers: Record<string, IntersectionObserver> = {};

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.1 }
      );
      observers[id].observe(element);
    });

    return () => Object.values(observers).forEach((o) => o.disconnect());
  }, []);

  const vis = (id: string) =>
    visibleSections[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/90 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.poehali.dev/projects/2b3966df-1a32-42a7-aca8-ac27ee35d2a1/bucket/e25e2cad-47ea-4e7a-a4f3-8b5f5f159eda.jpeg"
              alt="RSQ-CLUB"
              className="h-10 w-10 object-contain rounded-lg bg-white p-0.5"
            />
            <div className="font-display font-black text-xl tracking-tight bg-gradient-to-r from-white via-accent to-accent/70 bg-clip-text text-transparent">
              RSQ-CLUB
            </div>
          </div>

          <nav className="hidden lg:flex gap-7 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3 items-center">
            <button className="hidden sm:block px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all">
              Участвовать
            </button>
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-accent/10 bg-background/95 px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-white transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="relative pt-28 pb-24 px-6 min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-black to-black" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
          <div className="w-full h-full rounded-full border-2 border-accent animate-pulse" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-15">
          <div className="w-full h-full rounded-full border border-accent/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div
            className={`transition-all duration-1000 ${vis("hero")}`}
          >
            <div className="mb-6 inline-block">
              <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase px-4 py-2 border border-accent/30 rounded-full bg-accent/10">
                Официальный чемпионат России по автозвуку
              </span>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <img
                src="https://cdn.poehali.dev/projects/2b3966df-1a32-42a7-aca8-ac27ee35d2a1/bucket/e25e2cad-47ea-4e7a-a4f3-8b5f5f159eda.jpeg"
                alt="RSQ-CLUB Logo"
                className="w-24 h-24 object-contain rounded-2xl bg-white p-1 shadow-2xl shadow-accent/20"
              />
              <h1 className="text-6xl lg:text-8xl font-display font-black leading-none tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent">
                  RSQ
                </span>
                <span className="text-accent">—CLUB</span>
              </h1>
            </div>
            <p className="text-2xl lg:text-3xl font-display font-bold text-white/80 mb-4">
              Соревнования по автозвуку
            </p>
            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-2xl">
              Испытай свою систему на пределе возможностей. Честная борьба, профессиональное судейство
              и незабываемая атмосфера звукового экстрима по всей России.
            </p>

            <div className="flex gap-4 mb-16 flex-col sm:flex-row">
              <a
                href="#calendar"
                className="group px-8 py-4 bg-gradient-to-r from-accent to-orange-600 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-bold text-lg flex items-center gap-3 justify-center"
              >
                <Icon name="Calendar" size={20} />
                Ближайший этап
              </a>
              <a
                href="#rules"
                className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white text-center"
              >
                Правила участия
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-3xl font-black text-accent mb-1">6</div>
                <p className="text-sm text-white/50">Этапов в 2025</p>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">500+</div>
                <p className="text-sm text-white/50">Участников</p>
              </div>
              <div>
                <div className="text-3xl font-black text-accent mb-1">12</div>
                <p className="text-sm text-white/50">Лет истории</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${vis("about")}`}>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest text-accent/70 uppercase">О нас</span>
                <h2 className="text-5xl font-display font-black tracking-tighter mt-4 mb-6">
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Сердце российского автозвука
                  </span>
                </h2>
                <p className="text-white/70 leading-relaxed mb-6 text-lg">
                  RSQ-CLUB — крупнейшая федерация соревнований по автозвуку в России. С 2013 года мы
                  организуем честные и технически выверенные соревнования для любителей и профессионалов.
                </p>
                <p className="text-white/60 leading-relaxed mb-8">
                  Наши мероприятия проходят по строгим международным стандартам: профессиональное
                  измерительное оборудование, сертифицированные судьи и прозрачная система подсчёта очков.
                </p>
                <div className="flex gap-4">
                  <div className="p-4 border border-accent/20 rounded-xl bg-card/50 flex-1 text-center">
                    <Icon name="MapPin" size={24} className="text-accent mx-auto mb-2" />
                    <div className="font-bold text-white">15 городов</div>
                    <div className="text-xs text-muted-foreground">по всей России</div>
                  </div>
                  <div className="p-4 border border-accent/20 rounded-xl bg-card/50 flex-1 text-center">
                    <Icon name="Award" size={24} className="text-accent mx-auto mb-2" />
                    <div className="font-bold text-white">Гранд Финал</div>
                    <div className="text-xs text-muted-foreground">ежегодно в Москве</div>
                  </div>
                  <div className="p-4 border border-accent/20 rounded-xl bg-card/50 flex-1 text-center">
                    <Icon name="Users" size={24} className="text-accent mx-auto mb-2" />
                    <div className="font-bold text-white">Сообщество</div>
                    <div className="text-xs text-muted-foreground">5000+ участников</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-3xl blur-3xl animate-pulse" />
                <div className="relative grid grid-cols-2 gap-4">
                  {[
                    { icon: "Volume2", label: "SPL замеры", desc: "Профессиональное оборудование" },
                    { icon: "Headphones", label: "SQ оценка", desc: "Экспертные судьи" },
                    { icon: "Shield", label: "Честный зачёт", desc: "Прозрачные правила" },
                    { icon: "Star", label: "Призовой фонд", desc: "Кубки и награды" },
                  ].map((item, i) => (
                    <div key={i} className="p-6 border border-accent/15 rounded-2xl bg-card/60 hover:border-accent/40 transition-all">
                      <Icon name={item.icon} size={28} className="text-accent mb-3" fallback="CircleAlert" />
                      <div className="font-bold text-white mb-1">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section id="rules" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("about")}`}>
            <span className="text-xs font-bold tracking-widest text-accent/70 uppercase">Правила</span>
            <h2 className="text-5xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Как принять участие
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", icon: "ClipboardList", title: "Регистрация", desc: "Заполни форму на сайте, выбери класс и ближайший этап. Взнос участника оплачивается онлайн." },
              { num: "02", icon: "Car", title: "Техосмотр", desc: "Проходишь технический контроль перед соревнованием. Судья проверяет соответствие классу." },
              { num: "03", icon: "Gauge", title: "Замер / Прослушка", desc: "SPL-классы — замер децибел. SQ-классы — прослушивание экспертной комиссией." },
              { num: "04", icon: "Trophy", title: "Награждение", desc: "Результаты публикуются сразу. Победители получают кубки и квалификацию на Гранд Финал." },
            ].map((step, i) => (
              <div
                key={i}
                className="relative group bg-accent/8 hover:bg-accent/15 border border-accent/20 hover:border-accent/50 rounded-2xl p-7 transition-all"
              >
                <div className="text-5xl font-display font-black text-accent/30 mb-3">{step.num}</div>
                <Icon name={step.icon} size={24} className="text-accent mb-3" fallback="CircleAlert" />
                <h3 className="font-display font-bold text-lg mb-2 text-white">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-28 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("categories")}`}>
            <span className="text-xs font-bold tracking-widest text-accent/70 uppercase">Категории</span>
            <h2 className="text-5xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Найди свой класс
              </span>
            </h2>
          </div>
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${vis("categories")}`}>
            {CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="group p-8 border border-accent/10 hover:border-accent/50 rounded-2xl bg-card/50 hover:bg-card/80 transition-all cursor-pointer"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/15 group-hover:bg-accent/25 flex items-center justify-center transition-all">
                    <Icon name={cat.icon} size={22} className="text-accent" fallback="Volume2" />
                  </div>
                  <span className="text-xs font-bold text-accent/70 bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                    {cat.level}
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl text-white mb-2">{cat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section id="calendar" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("calendar")}`}>
            <span className="text-xs font-bold tracking-widest text-accent/70 uppercase">Календарь</span>
            <h2 className="text-5xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Этапы 2025
              </span>
            </h2>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {CALENDAR.map((event, i) => (
              <div
                key={i}
                className={`flex items-center gap-6 p-6 border rounded-2xl transition-all hover:bg-card/60 ${
                  event.status === "final"
                    ? "border-accent/60 bg-accent/10"
                    : "border-accent/15 bg-card/30 hover:border-accent/35"
                }`}
              >
                <div className={`text-center min-w-[64px] font-display font-black ${event.status === "final" ? "text-accent" : "text-white/70"}`}>
                  <div className="text-lg leading-tight">{event.date.split(" ")[0]}</div>
                  <div className="text-sm font-medium text-muted-foreground">{event.date.split(" ")[1]}</div>
                </div>
                <div className="w-px h-12 bg-accent/20" />
                <div className="flex-1">
                  <div className="font-bold text-white text-lg">{event.city}</div>
                  <div className="text-sm text-muted-foreground">{event.venue}</div>
                </div>
                {event.status === "final" && (
                  <span className="text-xs font-bold text-black bg-accent px-3 py-1 rounded-full">
                    ФИНАЛ
                  </span>
                )}
                <button className="px-4 py-2 text-sm border border-accent/30 text-accent rounded-xl hover:bg-accent/10 transition-all font-medium">
                  Подробнее
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-28 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("results")}`}>
            <span className="text-xs font-bold tracking-widest text-accent/70 uppercase">Результаты</span>
            <h2 className="text-5xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Таблица лидеров
              </span>
            </h2>
            <p className="text-muted-foreground mt-3">Последний этап — Москва, февраль 2025</p>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {RESULTS.map((r, i) => (
              <div
                key={i}
                className={`flex items-center gap-5 p-5 border rounded-2xl transition-all ${
                  i === 0
                    ? "border-accent/60 bg-accent/10"
                    : "border-accent/15 bg-card/40 hover:border-accent/30"
                }`}
              >
                <div className={`font-display font-black text-2xl min-w-[36px] text-center ${i === 0 ? "text-accent" : "text-white/40"}`}>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : r.place}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.city} · {r.category}</div>
                </div>
                <div className={`font-display font-black text-lg ${i === 0 ? "text-accent" : "text-white/70"}`}>
                  {r.score}
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <button className="px-6 py-3 border border-accent/30 text-accent rounded-xl hover:bg-accent/10 transition-all font-medium text-sm">
                Все результаты
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Judges */}
      <section id="judges" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("judges")}`}>
            <span className="text-xs font-bold tracking-widest text-accent/70 uppercase">Судейский корпус</span>
            <h2 className="text-5xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Эксперты RSQ
              </span>
            </h2>
          </div>
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${vis("judges")}`}>
            {JUDGES.map((judge, i) => (
              <div
                key={i}
                className="group p-7 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/15 group-hover:bg-accent/25 flex items-center justify-center mx-auto mb-4 transition-all">
                  <Icon name="UserCheck" size={28} className="text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1">{judge.name}</h3>
                <div className="text-accent text-sm font-semibold mb-2">{judge.role}</div>
                <div className="text-xs text-muted-foreground mb-1">{judge.exp}</div>
                <div className="text-xs text-white/40">{judge.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media */}
      <section id="media" className="py-28 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-accent/70 uppercase">Фото / Видео</span>
            <h2 className="text-5xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Атмосфера соревнований
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded-2xl bg-gradient-to-br from-accent/20 via-card to-card border border-accent/10 hover:border-accent/40 flex items-center justify-center group cursor-pointer transition-all overflow-hidden"
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20 group-hover:bg-accent/40 flex items-center justify-center mx-auto mb-2 transition-all">
                    <Icon name={i % 3 === 0 ? "Play" : "Image"} size={20} className="text-accent" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {i % 3 === 0 ? `Видео этапа ${i + 1}` : `Фото этапа ${i + 1}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="px-8 py-3 border border-accent/30 text-accent rounded-xl hover:bg-accent/10 transition-all font-medium">
              Смотреть всю галерею
            </button>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section id="sponsors" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("sponsors")}`}>
            <span className="text-xs font-bold tracking-widest text-accent/70 uppercase">Спонсоры</span>
            <h2 className="text-5xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Наши партнёры
              </span>
            </h2>
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 transition-all duration-1000 ${vis("sponsors")}`}>
            {SPONSORS.map((s, i) => (
              <div
                key={i}
                className="group p-6 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/40 hover:bg-card/70 transition-all text-center cursor-pointer"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mx-auto mb-3 transition-all">
                  <Icon name="Zap" size={20} className="text-accent" />
                </div>
                <div className="font-display font-black text-white text-lg mb-1">{s.name}</div>
                <div className="text-xs text-muted-foreground leading-tight">{s.type}</div>
              </div>
            ))}
          </div>
          <div className="mt-16 p-8 border border-accent/20 rounded-2xl bg-accent/5 text-center max-w-2xl mx-auto">
            <Icon name="Handshake" size={32} className="text-accent mx-auto mb-4" fallback="Users" />
            <h3 className="font-display font-bold text-xl text-white mb-2">Стать партнёром RSQ-CLUB</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Разместите свой бренд рядом с лучшими участниками автозвука России
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-accent to-orange-600 text-black rounded-full font-bold hover:shadow-xl hover:shadow-accent/30 transition-all">
              Обсудить партнёрство
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-28 px-6 bg-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Готов проверить свой звук?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            Присоединяйся к тысячам участников RSQ-CLUB. Зарегистрируйся на ближайший этап и стань частью
            самого громкого сообщества России.
          </p>
          <a
            href="#calendar"
            className="group px-10 py-5 bg-gradient-to-r from-accent to-orange-600 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-black text-lg inline-flex items-center gap-3"
          >
            <Icon name="Calendar" size={22} />
            Выбрать этап
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://cdn.poehali.dev/projects/2b3966df-1a32-42a7-aca8-ac27ee35d2a1/bucket/e25e2cad-47ea-4e7a-a4f3-8b5f5f159eda.jpeg"
                  alt="RSQ-CLUB"
                  className="h-9 w-9 object-contain rounded-lg bg-white p-0.5"
                />
                <div className="font-display font-black text-xl bg-gradient-to-r from-white to-accent/70 bg-clip-text text-transparent">
                  RSQ-CLUB
                </div>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs">
                Официальная федерация соревнований по автозвуку России
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              {[
                { title: "Соревнования", links: ["Правила", "Категории", "Календарь", "Результаты"] },
                { title: "Участникам", links: ["Регистрация", "Техосмотр", "Взносы", "FAQ"] },
                { title: "Клуб", links: ["О нас", "Судьи", "Спонсоры", "Контакты"] },
                { title: "Медиа", links: ["Фотогалерея", "Видео", "Новости", "Пресс-кит"] },
              ].map((col) => (
                <div key={col.title}>
                  <div className="font-bold text-white mb-3">{col.title}</div>
                  {col.links.map((link) => (
                    <a key={link} href="#" className="block text-muted-foreground hover:text-white transition-colors mb-2">
                      {link}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-accent/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 RSQ-CLUB — Чемпионат России по автозвуку</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Конфиденциальность</a>
              <a href="#" className="hover:text-white transition-colors">Правила</a>
              <a href="#" className="hover:text-white transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;