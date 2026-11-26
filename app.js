'use strict';
const byId = id => document.getElementById(id);
const windowMarker = '    \x3c!-- Здесь будут окна -->';
const starter = {
  html: [
    "\x3cmain",
    "  class=\"scene\">",
    "  \x3cdiv",
    "    class=\"moon\">\x3c/div>",
    "  \x3ch1>Колледж\x3c/h1>",
    "  \x3cdiv",
    "    class=\"building\">",
    windowMarker,
    "  \x3c/div>",
    "\x3c/main>"
  ].join('\n'),
  css: [
    "/* Небо и луна */",
    "body {",
    "  margin: 0;",
    "  font-family: system-ui, sans-serif;",
    "  color: #fff1df;",
    "}",
    "",
    ".scene {",
    "  position: relative;",
    "  min-height: 100vh;",
    "  box-sizing: border-box;",
    "  padding: 22px 16px;",
    "  overflow: hidden;",
    "  text-align: center;",
    "  background:",
    "    radial-gradient(circle at 15% 19%, #fff 1px, transparent 2px),",
    "    radial-gradient(circle at 27% 10%, #ffdb9b 1px, transparent 2px),",
    "    radial-gradient(circle at 70% 24%, #ffce89 1px, transparent 2px),",
    "    linear-gradient(#131a34, #293f60 63%, #854a3c);",
    "}",
    "",
    ".moon {",
    "  position: absolute;",
    "  top: 15px;",
    "  right: 22px;",
    "  width: 31px;",
    "  height: 31px;",
    "  border-radius: 50%;",
    "  box-shadow: inset 8px -5px #ffe4a8, 0 0 17px #ffe4a84d;",
    "}",
    "",
    "h1 {",
    "  margin: 26px 0 24px;",
    "  font-size: 22px;",
    "  letter-spacing: 0.04em;",
    "}",
    "",
    "/* Фасад и окна */",
    ".building {",
    "  position: relative;",
    "  display: grid;",
    "  grid-template-columns: repeat(3, minmax(0, 37px));",
    "  justify-content: center;",
    "  gap: 12px;",
    "  box-sizing: border-box;",
    "  width: min(100%, 220px);",
    "  min-height: 72px;",
    "  margin: 0 auto;",
    "  padding: 17px 14px;",
    "  border: 2px solid #ad754e;",
    "  border-radius: 3px 3px 9px 9px;",
    "  background: linear-gradient(#754935, #432e33);",
    "  box-shadow: 0 9px 0 #241f2b, 0 12px 24px #1515228a;",
    "}",
    "",
    ".building::before {",
    "  position: absolute;",
    "  bottom: 100%;",
    "  inset-inline: -8px;",
    "  height: 16px;",
    "  content: \"\";",
    "  background: linear-gradient(#dd9b56, #915139);",
    "  clip-path: polygon(11% 0, 89% 0, 100% 100%, 0 100%);",
    "}",
    "",
    ".window {",
    "  aspect-ratio: 1;",
    "  padding: 0;",
    "  border: 2px solid #2d2630;",
    "  border-radius: 4px;",
    "  background: #344c71;",
    "  box-shadow: inset 0 0 8px #131b30;",
    "  cursor: pointer;",
    "}",
    "",
    ".window:focus-visible {",
    "  outline: 2px solid #fff1df;",
    "  outline-offset: 3px;",
    "}",
    "",
    "/* Добавь стиль для .window.lit */"
  ].join('\n'),
  js: '// Добавь обработчик клика каждому окну.\n'
};
const lightStyle = '.window.lit {\n  background: #ffc85a;\n  box-shadow: 0 0 15px #ffc85a80;\n}';
const windowButtons = [1, 2, 3].map(n => [
  '\x3cbutton',
  '  type="button"',
  '  class="window lit"',
  '  aria-label="Окно ' + n + '">\x3c/button>'
].join('\n')).join('\n');
const findWindows = 'const windows = document.querySelectorAll(".building .window");';
const clickLoop = [
  'windows.forEach((win) => {',
  '  win.addEventListener("click", () => {',
  '    win.classList.remove("lit");',
  '  });',
  '});'
].join('\n');
const example = {
  html: starter.html.replace(windowMarker, windowButtons.split('\n').map(line => '    ' + line).join('\n')),
  css: starter.css + '\n\n' + lightStyle,
  js: findWindows + '\n\n' + clickLoop
};
const lessons = [
  {lang:'html', title:'Окна на фасаде', text:'Внутри <code>.building</code> добавь столько окон-кнопок, сколько хочешь, начиная с одного. У каждого окна нужны классы <code>window lit</code>. Класс <code>lit</code> обозначает свет в окне.', fail:'Добавь в .building хотя бы одну кнопку с классами window и lit. Проверь, что у каждого окна есть оба класса.', pass:'Окна готовы. Теперь им нужен стиль для включённого света.'},
  {lang:'css', title:'Свет в окнах', text:'Добавь правило <code>.window.lit</code> с жёлтым фоном и свечением. При запуске все окна должны светиться.', fail:'Проверь правило .window.lit. Фон включённого окна должен отличаться от обычного.', pass:'Окна светятся. Теперь напиши код, который гасит их по одному.'},
  {lang:'js', title:'Погаси окна по одному', text:'Добавь обработчик клика каждому окну. При клике убирай класс <code>lit</code> только у нажатого окна.', fail:'Каждый клик должен гасить только нажатое окно. Повторный клик оставляет его погашенным.', pass:'Получилось! Каждое окно гаснет отдельно и остаётся погашенным.'}
];
const storageKey = 'college-night-workshop-v2';
const guideSteps = [
  [
    {title:'Найди место для окон', instruction:'Открой HTML. Найди блок ниже. Замени только строку с комментарием «Здесь будут окна», оставив теги здания на месте.', code:'\x3cdiv\n  class="building">\n  \x3c!-- Здесь будут окна -->\n\x3c/div>'},
    {title:'Добавь столько окон, сколько хочешь', instruction:'Вставь этот пример на место комментария. Можно оставить одно окно, повторить блок хоть десять раз или выбрать другое количество. Для новых окон меняй номер в aria-label, а классы window и lit оставляй.', code:windowButtons},
    {title:'Проверь фасад', instruction:'Нажми «Запустить». Все добавленные окна должны появиться справа. Затем нажми «Проверить». Жёлтый свет добавим на вкладке CSS.', code:''}
  ],
  [
    {title:'Перейди в конец CSS', instruction:'Открой CSS и прокрути редактор вниз. Новое правило нужно написать после комментария ниже, за пределами предыдущих фигурных скобок.', code:'/* Добавь стиль для .window.lit */'},
    {title:'Напиши правило для горящего окна', instruction:'Вставь этот блок в конец CSS. Между .window и .lit пробел не нужен. background отвечает за цвет, а box-shadow добавляет свечение.', code:lightStyle},
    {title:'Убедись, что все окна горят', instruction:'Нажми «Запустить». Все добавленные окна должны стать жёлтыми. Затем нажми «Проверить» и переходи к JavaScript.', code:''}
  ],
  [
    {title:'Найди все окна', instruction:'Открой JS. Замени стартовый комментарий строкой ниже. Она сохраняет список окон фасада в переменную windows.', code:findWindows},
    {title:'Добавь обработчик каждому окну', instruction:'Под предыдущей строкой вставь этот блок. forEach проходит по окнам по очереди, а addEventListener назначает каждому свою реакцию на клик.', code:clickLoop.replace('    win.classList.remove("lit");','    // Здесь погасим нажатое окно.')},
    {title:'Погаси нажатое окно', instruction:'Замени только комментарий внутри блока строкой ниже. win — то окно, которому назначен обработчик. remove убирает у него класс lit.', code:'    win.classList.remove("lit");'},
    {title:'Сверь код и проверь по одному окну', instruction:'Весь JS должен выглядеть так. Нажми «Запустить», затем кликни по любому жёлтому окну. Оно должно погаснуть, а соседние — продолжить светиться. Проверь остальные окна и нажми «Проверить».', code:example.js}
  ]
];
const draft = {...starter};
let completed = [];
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  for (const kind of Object.keys(starter)) {
    const previous = saved?.draft?.[kind];
    if (typeof previous === 'string') draft[kind] = previous;
  }
  if (Array.isArray(saved?.completed)) completed = [...new Set(saved.completed.filter(i => [0,1,2].includes(i)))];
} catch {}
function save() {
  try { localStorage.setItem(storageKey, JSON.stringify({draft, completed})); } catch {}
}
const editor = byId('code');
const gutter = byId('gutter');
const tabs = [...document.querySelectorAll('.tab')];
const steps = [...document.querySelectorAll('.step')];
let lesson = 0;
let guideStep = 0;
let guideMotion = [];
let lang = 'html';
let frame;
let runId = 0;
let runTimer;
let checkFor = null;
let logLines = [];

const syntaxReference = {
  html: {
    main:'Основная область страницы.', div:'Контейнер для группировки элементов.', h1:'Главный заголовок страницы.',
    button:'Кнопка, на которую можно нажать.', span:'Строчный контейнер для части текста.',
    p:'Абзац текста.', a:'Ссылка. Адрес задаётся атрибутом href.', img:'Изображение. Путь задаётся в src, описание — в alt.',
    class:'Классы элемента. В CSS они выбираются через точку.', id:'Уникальное имя элемента. В CSS оно выбирается через #.',
    'aria-label':'Имя элемента для программ чтения с экрана. Пригодится, когда на кнопке нет видимого текста.',
    type:'Уточняет тип элемента. Например, у обычной кнопки можно указать type="button".',
    style:'Стили, заданные прямо на элементе.', title:'Краткое описание или название.', href:'Адрес, по которому ведёт ссылка.'
  },
  css: {
    background:'Задаёт фон. Можно использовать цвет, градиент или изображение.', color:'Задаёт цвет текста.',
    display:'Определяет, как элемент и его содержимое участвуют в раскладке.',
    flex:'Включает гибкое размещение дочерних элементов.', grid:'Включает раскладку по строкам и столбцам.',
    'linear-gradient':'Создаёт плавный переход между цветами по прямой.',
    margin:'Задаёт внешний отступ вокруг элемента.', padding:'Задаёт внутренний отступ между содержимым и границей.',
    'border-radius':'Скругляет углы элемента.', 'box-shadow':'Добавляет тень или свечение вокруг элемента.',
    width:'Задаёт ширину элемента.', height:'Задаёт высоту элемента.', 'min-height':'Задаёт минимальную высоту элемента.',
    'font-family':'Задаёт шрифт и запасные варианты.', 'font-size':'Задаёт размер текста.',
    'justify-content':'Распределяет свободное место вдоль главной оси.', gap:'Задаёт промежутки между элементами.',
    border:'Задаёт толщину, тип и цвет рамки.', cursor:'Меняет вид указателя над элементом.',
    '.window.lit':'Выбирает элементы, у которых одновременно есть классы window и lit.'
  },
  js: {
    const:'Объявляет переменную, которой нельзя присвоить другое значение.', let:'Объявляет переменную, значение которой можно изменить.',
    if:'Выполняет блок, если условие истинно.', else:'Выполняет блок, если предыдущее условие ложно.',
    function:'Объявляет функцию — блок кода, который можно вызвать.', return:'Завершает функцию и может вернуть значение.',
    for:'Повторяет действия в цикле.', while:'Повторяет блок, пока условие истинно.',
    '=>':'Создаёт стрелочную функцию.', document:'Даёт доступ к элементам текущей страницы.',
    querySelector:'Возвращает первый элемент, подходящий под CSS-селектор, или null.',
    querySelectorAll:'Возвращает все элементы, подходящие под CSS-селектор.',
    addEventListener:'Связывает событие, например click, с функцией-обработчиком.',
    onclick:'Свойство, которому можно присвоить функцию для обработки клика.',
    classList:'Даёт доступ к списку CSS-классов элемента.', remove:'Убирает указанный класс из classList. Если класса уже нет, ничего не меняется.', toggle:'Добавляет класс, если его нет, или убирает, если он уже есть.',
    forEach:'Вызывает функцию для каждого элемента коллекции.', console:'Объект для вывода сообщений при отладке.',
    log:'Выводит сообщение или значение в консоль.', 'true':'Логическое значение «истина».',
    'false':'Логическое значение «ложь».', 'null':'Явное отсутствие значения.', 'undefined':'Значение ещё не задано.'
  }
};
const jsKeywords = new Set('async await break case catch class const continue debugger default delete do else export extends finally for function if import in instanceof let new of return static super switch this throw try typeof var void while yield true false null undefined'.split(' '));
const mirror = byId('highlight');
const tokenHelp = byId('token-help');
const tokenName = byId('token-name');
const tokenDescription = byId('token-description');
let highlightedTokens = [];
const tokenKinds = {
  html: {
    tag:'HTML-тег обозначает тип и границы элемента.',
    attribute:'Атрибут задаёт параметр HTML-элемента.',
    string:'Значение атрибута. Кавычки позволяют записать несколько слов или классов.',
    comment:'Комментарий для автора кода. Браузер не показывает его на странице.',
    text:'Обычный текст HTML. Внутри элемента он становится его содержимым.'
  },
  css: {
    property:'CSS-свойство определяет, какую часть оформления изменить.',
    selector:'CSS-селектор определяет, к каким элементам применить правило.',
    keyword:'Директива CSS. Она начинается с @ и задаёт особое правило.',
    method:'Функция CSS вычисляет значение из параметров в скобках.',
    literal:'Значение CSS-свойства, например способ отображения, цвет или имя шрифта.',
    number:'Число в CSS. У размера может быть единица измерения, например px или %.',
    string:'Текстовое значение CSS в кавычках.',
    comment:'Комментарий к стилям. Браузер игнорирует его при оформлении.'
  },
  js: {
    keyword:'Слово со специальным значением в JavaScript.',
    method:'Имя вызываемой функции или метода. Аргументы идут в круглых скобках.',
    identifier:'Имя переменной, параметра или другого значения в программе.',
    property:'Имя свойства объекта. После точки оно обращается к части объекта.',
    number:'Числовое значение.',
    string:'Строка — текстовое значение, заключённое в кавычки.',
    comment:'Пояснение к коду. JavaScript пропускает комментарии при выполнении.'
  }
};
const punctuationHelp = {
  html: {
    '<':'Начинает открывающий тег.', '</':'Начинает закрывающий тег.',
    '>':'Завершает запись тега.', '/>':'Завершает тег элемента без содержимого.',
    '=':'Связывает имя атрибута и его значение.',
    '"':'Кавычки ограничивают значение атрибута.', "'":'Кавычки ограничивают значение атрибута.'
  },
  css: {
    '{':'Начинает блок CSS-правила.', '}':'Заканчивает блок CSS-правила.',
    ':':'Отделяет свойство от значения или обозначает часть селектора, например :hover.',
    ';':'Завершает CSS-объявление.', ',':'Разделяет пункты списка, параметры функции или селекторы.',
    '(':'Открывает список аргументов функции или условие.', ')':'Закрывает список аргументов функции или условие.',
    '>':'Выбирает непосредственных потомков.', '+':'Выбирает следующего соседа или складывает значения в calc().',
    '~':'В селекторе выбирает следующих соседей.', '*':'Универсальный селектор или оператор умножения в calc().',
    '[':'Начинает условие по атрибуту.', ']':'Заканчивает условие по атрибуту.',
    '=':'Помогает сравнить значение атрибута в селекторе.'
  },
  js: {
    '{':'Открывает блок команд или литерал объекта.', '}':'Закрывает блок команд или литерал объекта.',
    '(':'Открывает список параметров, аргументов или выражение.', ')':'Закрывает список параметров, аргументов или выражение.',
    '[':'Начинает массив, распаковку или обращение по индексу.', ']':'Заканчивает массив, распаковку или обращение по индексу.',
    '.':'Обращается к свойству или методу объекта.', ',':'Разделяет аргументы, элементы или объявления.',
    ';':'Завершает команду JavaScript.', ':':'Разделяет имя и значение в объекте или части условного выражения.',
    '=':'Присваивает значение.', '==':'Сравнивает значения с возможным приведением типов.',
    '===':'Проверяет строгое равенство.', '!=':'Сравнивает значения на неравенство с возможным приведением типов.',
    '!==':'Проверяет строгое неравенство.', '!':'Отрицание логического значения.',
    '&&':'Логическое И. Правый операнд вычисляется, если левый истинный.',
    '||':'Логическое ИЛИ. Правый операнд вычисляется, если левый ложный.',
    '??':'Берёт значение справа, если слева null или undefined.',
    '?.':'Обращается к свойству, только если значение слева существует.',
    '?':'Начинает выбор значения по условию в выражении ? :.',
    '+':'Складывает числа или соединяет строки.', '-':'Вычитает или меняет знак числа.',
    '*':'Умножает числа.', '/':'Делит число на другое число.', '%':'Возвращает остаток от деления.',
    '**':'Возводит число в степень.', '++':'Увеличивает значение на единицу.', '--':'Уменьшает значение на единицу.',
    '+=':'Прибавляет или присоединяет значение и записывает результат обратно.',
    '-=':'Вычитает значение и записывает результат обратно.',
    '>':'Проверяет, больше ли левое значение.', '<':'Проверяет, меньше ли левое значение.',
    '>=':'Проверяет, больше или равно ли левое значение.', '<=':'Проверяет, меньше или равно ли левое значение.',
    '...':'Разворачивает элементы или собирает оставшиеся аргументы.'
  }
};
const sceneClasses = {
  scene:'Контейнер всей ночной сцены. Его фон рисует звёзды и небо, внутри находятся луна и колледж.',
  moon:'Луна в правом верхнем углу сцены. CSS скругляет её и рисует светящийся серп тенью.',
  building:'Фасад колледжа. CSS размещает окна внутри него по рядам.',
  window:'Одно окно колледжа. Оно сделано кнопкой, поэтому реагирует на клик и на клавиатуру.',
  lit:'Свет в окне включён. Когда JavaScript убирает этот класс, окно теряет жёлтое свечение.'
};
const lessonCss = {
  body:'Оформляет всю страницу предпросмотра. Здесь убирается стандартный отступ и задаются шрифт и цвет текста.',
  h1:'Выбирает заголовок «Колледж» над фасадом.',
  '.building::before':'Добавляет декоративный элемент перед содержимым фасада. В этом примере он рисует крышу.',
  '.window:focus-visible':'Выделяет контуром окно, выбранное с клавиатуры, чтобы было видно, какое окно погаснет.',
  '.window.lit':'Выбирает освещённые окна. После удаления lit правило перестаёт действовать на нажатое окно.',
  position:'Определяет систему координат элемента. Здесь луна привязана к сцене, а крыша — к фасаду.',
  relative:'Оставляет сцену или фасад на обычном месте и позволяет привязать к ним луну или крышу.',
  absolute:'Размещает луну или крышу по координатам относительно их контейнера.',
  'box-sizing':'Определяет, входят ли рамка и внутренние отступы в объявленные размеры.',
  'border-box':'Включает отступы и рамку в заданную ширину и высоту сцены или фасада.',
  overflow:'Управляет тем, что произойдёт с рисунком, вышедшим за границы сцены.',
  hidden:'Обрезает часть декоративных элементов, которая выходит за края сцены.',
  'text-align':'Управляет выравниванием текста. Заголовок колледжа расположен по центру.',
  center:'Центрирует заголовок в text-align или группу окон в justify-content.',
  'radial-gradient':'Рисует звезду: в указанной точке цветной круг быстро переходит в прозрачный фон.',
  'linear-gradient':'Создаёт плавный переход цветов сверху вниз. Так нарисованы закатное небо, фасад и крыша.',
  'circle at':'Задаёт круглую звезду и её центр. Первое число отмеряется слева, второе — сверху.',
  circle:'Задаёт круглую форму звезды в радиальном градиенте.',
  at:'Начинает координаты центра звезды, отсчитываемые от левого верхнего угла.',
  transparent:'Полностью прозрачный цвет. Так звезда растворяется и видно небо под ней.',
  top:'Отступ луны от верхнего края сцены.',
  right:'Отступ луны от правого края сцены.',
  bottom:'Положение крыши относительно нижнего края фасада. Значение 100% поднимает крышу над стеной.',
  inset:'Рисует тень внутри фигуры. У луны такая тень образует серп.',
  'letter-spacing':'Расстояние между буквами слова «Колледж».',
  'grid-template-columns':'Задаёт колонки фасада. Если окон больше, новые окна переходят на следующий ряд.',
  repeat:'Повторяет описание колонки. В примере repeat(3, …) делает по три окна в ряду.',
  minmax:'Задаёт диапазон ширины колонки. Здесь колонка может сжиматься на узком экране.',
  min:'Выбирает меньшее из двух значений. Так фасад остаётся не шире 220px и не выходит за края сцены.',
  auto:'Автоматический отступ. Одинаковый margin слева и справа центрирует фасад.',
  solid:'Сплошная линия рамки, в отличие от штриховой или пунктирной.',
  'inset-inline':'Выставляет боковые края крыши. Отрицательный отступ делает крышу шире фасада.',
  content:'Создаёт содержимое декоративного элемента. Пустая строка позволяет нарисовать крышу без текста.',
  'clip-path':'Обрезает прямоугольник крыши до заданного контура.',
  polygon:'Описывает точки контура крыши: две верхние точки ближе друг к другу, чем нижние.',
  'aspect-ratio':'Отношение ширины окна к высоте. Значение 1 делает окно квадратным.',
  pointer:'Курсор в виде руки подсказывает, что на окно можно нажать.',
  outline:'Контур окна, выбранного клавиатурой. Он не меняет размеры окна.',
  'outline-offset':'Расстояние между краем окна и контуром фокуса.',
  'system-ui':'Шрифт интерфейса операционной системы.',
  'sans-serif':'Запасная категория шрифтов без засечек.'
};
const sceneColors = {
  '#fff1df':'Тёплый белый для текста заголовка и контура фокуса.',
  '#fff':'Белый центр одной из звёзд.',
  '#ffdb9b':'Кремово-жёлтая звезда в верхней части неба.',
  '#ffce89':'Янтарная звезда ближе к правой стороне сцены.',
  '#131a34':'Тёмно-синий верх ночного неба.',
  '#293f60':'Синяя средняя часть неба, между ночью и заревом.',
  '#854a3c':'Тёплое закатное зарево внизу сцены.',
  '#ffe4a8':'Кремовый цвет лунного серпа.',
  '#ffe4a84d':'Полупрозрачный цвет ореола вокруг луны. Последние две цифры задают прозрачность.',
  '#ad754e':'Медный цвет рамки фасада.',
  '#754935':'Тёплый коричневый верх стены.',
  '#432e33':'Тёмный низ стены.',
  '#241f2b':'Тёмное основание под фасадом.',
  '#1515228a':'Полупрозрачная тень под фасадом.',
  '#dd9b56':'Освещённая верхняя часть крыши.',
  '#915139':'Тёмная нижняя часть крыши.',
  '#2d2630':'Тёмный цвет оконной рамы.',
  '#344c71':'Синее стекло погашенного окна.',
  '#131b30':'Тень внутри погашенного окна.',
  '#ffc85a':'Жёлтое стекло горящего окна. После удаления lit откроется синий фон обычного окна.',
  '#ffc85a80':'Полупрозрачное янтарное свечение вокруг горящего окна.'
};
const sceneJs = {
  const:'Объявляет переменную windows. Ссылка на список остаётся прежней, а классы отдельных окон можно менять.',
  windows:'Список всех окон, найденных внутри фасада. Работает при любом количестве окон.',
  win:'Одно окно из списка windows. Для него устанавливается свой обработчик, чтобы не погасить соседние окна.',
  document:'Документ предпросмотра. В нём JavaScript ищет окна фасада.',
  querySelectorAll:'Находит все окна по указанному CSS-селектору и возвращает их списком.',
  forEach:'Берёт окна из списка по одному и назначает каждому отдельный обработчик.',
  addEventListener:'Прикрепляет к текущему окну функцию, которая выполнится при клике.',
  classList:'Список CSS-классов текущего окна. В нём есть window и, пока свет горит, lit.',
  remove:'Удаляет lit у нажатого окна. Второй клик не включает свет обратно.'
};
const lessonComments = {
  'Здесь будут окна':'Замени эту строку кнопками окон. Они должны остаться внутри блока building.',
  'Небо и луна':'После этого комментария идут стили звёздного неба, луны и заголовка.',
  'Фасад и окна':'После этого комментария идут стили стен, крыши и окон колледжа.',
  'Добавь стиль для .window.lit':'Допиши после этого комментария правило .window.lit с цветом горящего стекла и свечением.',
  'Добавь обработчик клика каждому окну.':'Замени комментарий кодом: найди все окна, затем назначь обработчик каждому.',
  'Здесь погасим нажатое окно.':'Вставь на эту строку win.classList.remove("lit"); — она погасит только выбранное окно.'
};
function explainLessonToken(value, kind, language, before, attribute) {
  const word = value.toLowerCase();
  const unquoted = value.replace(/^["'\x60]|["'\x60]$/g, '');
  if (kind === 'comment') {
    const caption = value.replace(/^(?:\x3c!--|\/[/*])\s*|\s*(?:-->|\*\/)$/g, '').trim();
    return Object.hasOwn(lessonComments, caption) ? lessonComments[caption] : '';
  }
  if (language === 'html') {
    if (kind === 'text' && word === 'колледж') return 'Видимая надпись над фасадом. Её можно заменить своим названием.';
    if (kind === 'string' && attribute === 'class' && Object.hasOwn(sceneClasses, unquoted)) return sceneClasses[unquoted];
    if (kind === 'string' && attribute === 'type' && unquoted === 'button') return 'Обычная кнопка. В мастер-классе она представляет окно и ждёт нажатия.';
    if (kind === 'string' && attribute === 'aria-label' && /^окно\s+\d+$/i.test(unquoted)) return 'Доступное имя «' + unquoted + '». Номер отличает это окно от соседних для программ чтения с экрана.';
  }
  if (language === 'css') {
    if (kind === 'selector' && word.startsWith('.') && Object.hasOwn(sceneClasses, word.slice(1))) return sceneClasses[word.slice(1)];
    if (kind === 'number' && Object.hasOwn(sceneColors, word)) return sceneColors[word];
    if (kind === 'string' && !unquoted && /\bcontent\s*:\s*$/.test(before)) return 'Пустая строка. Создаёт место для декоративной крыши без текста.';
    if (kind === 'number') return describeSceneNumber(value, before);
    if (kind !== 'string' && Object.hasOwn(lessonCss, word)) return lessonCss[word];
  }
  if (language === 'js') {
    if (kind === 'string') {
      if (unquoted === '.building .window') return 'CSS-селектор: находит все элементы window внутри фасада building.';
      if (unquoted === 'click') return 'Название события, которое срабатывает при нажатии на окно.';
      if (unquoted === 'lit') return 'Имя класса, который убирается у выбранного окна. Без него жёлтое свечение исчезает.';
    } else if (Object.hasOwn(sceneJs, value)) return sceneJs[value];
  }
  return '';
}
function describeSceneNumber(value, before) {
  const line = before.slice(before.lastIndexOf('\n') + 1);
  const property = line.match(/^\s*([\w-]+)\s*:/)?.[1];
  if (property === 'grid-template-columns' && /^\s*grid-template-columns\s*:\s*repeat\(\s*$/.test(line)) return value + ' — количество колонок, а не ограничение на общее число окон.';
  if (/radial-gradient\(\s*circle at\b/i.test(line)) {
    return /circle at\s*$/.test(line) ? value + ' — горизонтальное положение звезды от левого края сцены.'
      : /circle at\s+\S+\s+$/.test(line) ? value + ' — вертикальное положение звезды от верхнего края сцены.'
      : value + ' — расстояние от центра звезды, на котором действует указанный цвет.';
  }
  if (/\bpolygon\(/.test(line)) return value + ' — координата одной из вершин крыши относительно её прямоугольной области.';
  if (property === 'aspect-ratio') return value + ' — отношение ширины окна к высоте. Единица делает окно квадратным.';
  if (property === 'min-height' && value.endsWith('vh')) return value + ' — минимальная высота сцены, равная высоте области предпросмотра.';
  if (property === 'bottom' && value === '100%') return 'Поднимает нижний край крыши на полную высоту фасада, чтобы крыша оказалась над ним.';
  const dimensions = {
    margin:'внешний отступ', padding:'внутренний отступ', top:'отступ сверху', right:'отступ справа',
    width:'ширина', height:'высота', 'min-height':'минимальная высота', gap:'промежуток между окнами',
    'grid-template-columns':'граница ширины колонки', 'inset-inline':'боковой отступ крыши',
    'border-radius':'радиус скругления', border:'толщина рамки', outline:'толщина контура фокуса',
    'outline-offset':'расстояние от окна до контура фокуса', 'font-size':'размер букв заголовка',
    'letter-spacing':'дополнительное расстояние между буквами', 'box-shadow':'смещение или размытие тени'
  };
  if (property && Object.hasOwn(dimensions, property)) return value + ' — ' + dimensions[property] + ' в этом правиле.';
  if (/linear-gradient\(/.test(line) && value.endsWith('%')) return value + ' — точка перехода цвета по высоте градиента.';
  return '';
}
function explainToken(value, kind, language, before, attribute) {
  const lessonHelp = explainLessonToken(value, kind, language, before, attribute);
  if (lessonHelp) return lessonHelp;
  const word = language === 'js' ? value : value.toLowerCase();
  const reference = syntaxReference[language];
  if (!['comment','string','text','unknown'].includes(kind) && Object.hasOwn(reference, word)) return reference[word];

  const punctuation = punctuationHelp[language];
  if (kind === 'punctuation' && Object.hasOwn(punctuation, word)) return punctuation[word];
  if (language === 'html' && value.startsWith('&')) return 'HTML-сущность. Браузер подставляет вместо неё нужный символ.';
  if (language === 'html' && /^<!doctype/i.test(value)) return 'Объявляет тип документа. Для HTML5 используется <!doctype html>.';
  if (language === 'css' && kind === 'number' && value.startsWith('#')) return 'Цвет в шестнадцатеричной записи. Дополнительные цифры могут задавать прозрачность.';
  if (language === 'js' && kind === 'identifier' && /\b(?:const|let|var)\s+$/.test(before)) return 'Имя переменной, которую объявляют в этой строке.';
  if (language === 'js' && kind === 'string' && value.startsWith('\x60')) return 'Шаблонная строка. Выражения внутри ${…} подставляются в текст.';
  return tokenKinds[language][kind] ?? 'Символ или фрагмент кода. Его смысл зависит от окружающей конструкции.';
}
function syntaxTokens(source, language) {
  const tokens = [];
  let covered = 0;
  function push(index, value, kind, attribute) {
    const help = explainToken(value, kind, language, source.slice(Math.max(0,index - 200),index), attribute);
    tokens.push({start:index, end:index + value.length, value, kind, help});
  }
  function fillGap(end, kind) {
    for (const piece of source.slice(covered,end).matchAll(/[\p{L}\p{M}\p{N}_-]+|[^\s]/gu)) {
      push(covered + piece.index, piece[0], kind);
    }
    covered = end;
  }
  function add(index, value, kind, attribute) {
    if (index > covered) fillGap(index, 'unknown');
    push(index, value, kind, attribute);
    covered = index + value.length;
  }
  if (language === 'html') {
    const markup = /\x3c!--[\s\S]*?(?:-->|$)|<!doctype[^>]*>|<\/?[a-z][\w:-]*(?:[^"'<>]|"[^"]*"|'[^']*')*>?|&(?:#x?[\da-f]+|[a-z]\w*);/gi;
    for (const match of source.matchAll(markup)) {
      const value = match[0];
      fillGap(match.index, 'text');
      if (value.startsWith('\x3c!--')) { add(match.index, value, 'comment'); continue; }
      if (value.startsWith('&') || /^<!doctype/i.test(value)) { add(match.index, value, 'punctuation'); continue; }
      const parts = [...value.matchAll(/<\/?|\/?>|"[^"]*"|'[^']*'|[\w:-]+|=/g)];
      parts.forEach((part, index) => {
        const piece = part[0];
        const attribute = parts[index-1]?.[0] === '=' ? parts[index-2]?.[0].toLowerCase() : undefined;
        const kind = index === 1 ? 'tag' : /^['"]/.test(piece) ? 'string' : /^[\w:-]+$/.test(piece) ? (attribute ? 'string' : 'attribute') : 'punctuation';
        const position = match.index + part.index;
        if (attribute === 'class' && /\s/.test(piece)) {
          for (const member of piece.matchAll(/["']|[^\s"']+/g)) {
            const memberKind = /^["']$/.test(member[0]) ? 'punctuation' : 'string';
            add(position + member.index, member[0], memberKind, attribute);
          }
        } else {
          add(position, piece, kind, attribute);
        }
      });
      fillGap(match.index + value.length, 'unknown');
    }
    fillGap(source.length, 'text');
    return tokens;
  }
  const pattern = language === 'css'
    ? /\/\*[\s\S]*?(?:\*\/|$)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[-\p{L}\p{N}_]+|(?:\.[-\p{L}_][-\p{L}\p{N}_]*)+(?:::{0,1}[-\p{L}_][-\p{L}\p{N}_]*)?|@[-\p{L}\p{N}_]+|-?(?:\d*\.)?\d+(?:[a-z]+|%)?|[-\p{L}_][-\p{L}\p{N}_]*|[{}:;()[\],>+~*=]/giu
    : /\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[\x60](?:\\.|[^\x60\\])*[\x60]|\b(?:0[xob][\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)n?\b|[$_\p{ID_Start}][$_\p{ID_Continue}]*|=>|===?|!==?|<=|>=|\?\?|\?\.|&&|\|\||\.\.\.|\+\+|--|\+=|-=|\*\*|[{}()[\].,;:+\-*/%=!?<>]/giu;
  for (const match of source.matchAll(pattern)) {
    const value = match[0];
    const end = match.index + value.length;
    let kind = 'punctuation';
    if (/^\/[/*]/.test(value)) kind = 'comment';
    else if (/^['"\x60]/.test(value)) kind = 'string';
    else if (/^-?(?:\d|\.\d)/.test(value)) kind = 'number';
    else if (language === 'css') {
      const next = source.slice(end, end + 300);
      if (value.startsWith('@')) kind = 'keyword';
      else if (/^[.#_\p{L}-]/u.test(value) && /^[^;{}]*\{/.test(next)) kind = 'selector';
      else if (/^#[0-9a-f]{3,8}$/i.test(value)) kind = 'number';
      else if (/^[-_\p{L}]/u.test(value)) kind = /^\s*:/.test(next) ? 'property' : /^\s*\(/.test(next) ? 'method' : 'literal';
    } else if (jsKeywords.has(value) || value === '=>') kind = 'keyword';
    else if (/^[$_\p{ID_Start}]/u.test(value)) {
      const callable = /^\s*\(/.test(source.slice(end, end + 100));
      const member = /\.\s*$/.test(source.slice(Math.max(0,match.index - 24),match.index));
      kind = callable ? 'method' : member ? 'property' : 'identifier';
    }
    add(match.index, value, kind);
  }
  fillGap(source.length, 'unknown');
  return tokens;
}
function hideTokenHelp() {
  tokenHelp.hidden = true;
}
function syncHighlightScroll() {
  mirror.style.width = editor.clientWidth + 'px';
  mirror.style.height = editor.clientHeight + 'px';
  gutter.scrollTop = editor.scrollTop;
  mirror.scrollTop = editor.scrollTop;
  mirror.scrollLeft = editor.scrollLeft;
  hideTokenHelp();
}
function renderHighlight() {
  const source = editor.value;
  const fragment = document.createDocumentFragment();
  highlightedTokens = syntaxTokens(source, lang);
  let offset = 0;
  for (const token of highlightedTokens) {
    fragment.append(source.slice(offset, token.start));
    const span = document.createElement('span');
    span.className = 'syntax-' + token.kind;
    span.textContent = token.value;
    fragment.append(span);
    token.element = span;
    offset = token.end;
  }
  fragment.append(source.slice(offset) + '\n');
  mirror.replaceChildren(fragment);
  syncHighlightScroll();
}
function showTokenHelp(token, x, y) {
  const label = token.value.replace(/\s+/g, ' ').trim();
  tokenName.textContent = label.length > 60 ? label.slice(0, 59) + '…' : label;
  tokenDescription.textContent = token.help;
  tokenHelp.hidden = false;
  const left = Math.max(8, Math.min(x + 12, window.innerWidth - tokenHelp.offsetWidth - 8));
  const top = y + tokenHelp.offsetHeight + 16 <= window.innerHeight ? y + 16 : Math.max(8, y - tokenHelp.offsetHeight - 8);
  Object.assign(tokenHelp.style, {left:left + 'px', top:top + 'px'});
}
editor.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch' || event.buttons) { hideTokenHelp(); return; }
  const x = event.clientX;
  const y = event.clientY;
  const bounds = editor.getBoundingClientRect();
  if (x >= bounds.left + editor.clientWidth || y >= bounds.top + editor.clientHeight) { hideTokenHelp(); return; }
  const token = highlightedTokens.find(item => item.element && [...item.element.getClientRects()].some(rect =>
    x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom));
  if (token) showTokenHelp(token, x, y);
  else hideTokenHelp();
});
editor.addEventListener('pointerleave', hideTokenHelp);
editor.addEventListener('blur', hideTokenHelp);
window.addEventListener('scroll', hideTokenHelp, {passive:true});
new ResizeObserver(syncHighlightScroll).observe(editor);
function updateGutter() {
  gutter.textContent = editor.value.split('\n').map((_, i) => i + 1).join('\n');
  renderHighlight();
}
function showTab(kind) {
  lang = kind;
  editor.value = draft[kind];
  editor.scrollTop = 0;
  editor.scrollLeft = 0;
  editor.setSelectionRange(0, 0);
  editor.setAttribute('aria-label', 'Редактор ' + kind.toUpperCase());
  tabs.forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.lang === kind)));
  updateGutter();
}
function renderProgress() {
  byId('progress').textContent = completed.length + ' из 3 готово';
  document.querySelectorAll('.ticks i').forEach((tick, i) => tick.classList.toggle('done', i < completed.length));
  steps.forEach((step, i) => step.classList.toggle('complete', completed.includes(i)));
  byId('next').hidden = lesson === lessons.length - 1 || !completed.includes(lesson);
}
function showLesson(index) {
  lesson = index;
  const task = lessons[index];
  steps.forEach((step, i) => step.setAttribute('aria-pressed', String(i === index)));
  byId('chapter').textContent = (index + 1) + ' / ' + lessons.length;
  byId('task-title').textContent = task.title;
  byId('task-text').innerHTML = task.text;
  guideStep = 0;
  setGuideOpen(false);
  renderGuide();
  feedback('', '');
  renderProgress();
  showTab(task.lang);
}
function feedback(message, tone) {
  const el = byId('check-result');
  el.textContent = message;
  el.className = 'check-result ' + tone;
}
function renderGuide() {
  const sequence = guideSteps[lesson];
  const step = sequence[guideStep];
  byId('guide-step').textContent = 'Шаг ' + (guideStep + 1) + ' из ' + sequence.length;
  byId('guide-title').textContent = step.title;
  byId('hint-text').textContent = step.instruction;
  byId('guide-code').textContent = step.code;
  byId('guide-example').hidden = !step.code;
  byId('guide-prev').disabled = guideStep === 0;
  byId('guide-next').disabled = guideStep === sequence.length - 1;
  guideMotion.forEach(motion => motion.cancel());
  if (byId('guide-bubble').hidden || window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;
  guideMotion = [
    byId('coach-fox').animate?.([
      {transform:'translateY(0) rotate(0)'},
      {transform:'translateY(-7px) rotate(-3deg)'},
      {transform:'translateY(0) rotate(0)'}
    ], {duration:370, easing:'ease-out'}),
    byId('guide-bubble').animate?.([
      {opacity:0.72, transform:'translateX(-4px)'},
      {opacity:1, transform:'translateX(0)'}
    ], {duration:220, easing:'ease-out'})
  ].filter(Boolean);
}
byId('guide-prev').onclick = () => { guideStep--; renderGuide(); };
byId('guide-next').onclick = () => { guideStep++; renderGuide(); };
function setGuideOpen(open) {
  byId('guide-bubble').hidden = !open;
  if (!open) guideMotion.forEach(motion => motion.cancel());
  byId('guide-toggle').setAttribute('aria-expanded', String(open));
  byId('guide-toggle').textContent = open ? 'Скрыть подсказки' : 'Спросить КЭШа';
}
byId('guide-toggle').onclick = () => {
  setGuideOpen(byId('guide-bubble').hidden);
  if (!byId('guide-bubble').hidden) renderGuide();
};
function handleEdit() {
  draft[lang] = editor.value;
  updateGutter();
  save();
}
editor.addEventListener('input', handleEdit);
editor.addEventListener('scroll', syncHighlightScroll);
editor.addEventListener('keydown', event => {
  if (event.altKey && event.code === 'KeyI') {
    event.preventDefault();
    const position = editor.selectionStart;
    const token = highlightedTokens.find(item => item.help && item.start <= position && position < item.end);
    if (token) {
      const rect = token.element.getBoundingClientRect();
      const bounds = editor.getBoundingClientRect();
      showTokenHelp(token, Math.max(bounds.left, rect.left), Math.min(bounds.bottom, Math.max(bounds.top, rect.bottom)));
    }
    return;
  }
  hideTokenHelp();
  if (event.key === 'Tab' && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
    editor.setRangeText('  ', editor.selectionStart, editor.selectionEnd, 'end');
    handleEdit();
  }
  if (event.key === 'Escape') byId('run').focus();
});
tabs.forEach(tab => tab.onclick = () => { showTab(tab.dataset.lang); editor.focus(); });
steps.forEach((step, i) => step.onclick = () => showLesson(i));
byId('next').onclick = () => showLesson(lesson + 1);
byId('reset').onclick = () => {
  if (draft[lang] === starter[lang] || !confirm('Вернуть заготовку этой вкладки?')) return;
  draft[lang] = starter[lang];
  showTab(lang);
  save();
  run();
};
function safeJSON(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
function frameMain(payload) {
  const post = (type, value) => parent.postMessage({id: payload.id, type, value}, '*');
  function format(value) {
    if (typeof value === 'string') return value.slice(0, 1500);
    try { return (JSON.stringify(value) ?? String(value)).slice(0, 1500); }
    catch { return String(value).slice(0, 1500); }
  }
  for (const level of ['log','info','warn','error']) {
    console[level] = (...args) => post('log', (level === 'log' ? '' : level + ' · ') + args.map(format).join(' ').slice(0, 2000));
  }
  let failed = false;
  addEventListener('error', event => { failed = true; post('log', 'Ошибка · ' + event.message); });
  addEventListener('unhandledrejection', event => { failed = true; post('log', 'Ошибка · ' + format(event.reason)); });
  const css = document.createElement('style');
  css.textContent = payload.css;
  document.head.append(css);
  const parsed = new DOMParser().parseFromString(payload.html, 'text/html');
  parsed.querySelectorAll('script, base, meta[http-equiv], iframe, object, embed').forEach(node => node.remove());
  document.head.append(...parsed.head.children);
  document.body.append(...parsed.body.childNodes);
  const script = document.createElement('script');
  script.textContent = payload.js;
  document.body.append(script);
  post('ready', failed);
  if (payload.check === null) return;
  const windows = [...document.querySelectorAll('.building .window')];
  const lit = win => win.classList.contains('lit');
  let passed = windows.length > 0 && windows.every(win => win.tagName === 'BUTTON' && lit(win));
  if (payload.check === 1) {
    const snapshot = windows.map(win => win.classList.contains('lit'));
    const colors = windows.map(win => { win.classList.remove('lit'); return getComputedStyle(win).backgroundColor; });
    windows.forEach(win => win.classList.add('lit'));
    passed = passed && windows.every((win, i) => {
      const color = getComputedStyle(win).backgroundColor;
      return color !== colors[i] && color !== 'rgba(0, 0, 0, 0)';
    });
    windows.forEach((win, i) => win.classList.toggle('lit', snapshot[i]));
  }
  if (payload.check === 2 && passed) {
    passed = windows.every((win, index) => {
      win.click();
      const isolated = windows.every((other, i) => lit(other) === (i > index));
      win.click();
      return isolated && windows.every((other, i) => lit(other) === (i > index));
    });
    windows.forEach(win => win.classList.add('lit'));
  }
  post('checked', passed && (payload.check !== 2 || !failed));
}
function run(index = null, source = draft) {
  clearTimeout(runTimer);
  checkFor = index;
  if (index !== null) feedback('Проверяем…', '');
  logLines = [];
  byId('console').textContent = 'Здесь появятся сообщения и ошибки.';
  byId('run-status').textContent = 'Выполняется…';
  frame = document.createElement('iframe');
  frame.title = 'Предпросмотр сцены';
  frame.dataset.example = String(source === example);
  frame.setAttribute('sandbox', 'allow-scripts');
  const csp = "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; connect-src 'none'; base-uri 'none'; form-action 'none'";
  const payload = {...source, id: ++runId, check:index};
  frame.srcdoc = '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="' + csp + '"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>\x3cscript>(' + frameMain.toString() + ')(' + safeJSON(payload) + ');<\/script></body></html>';
  byId('frame-slot').replaceChildren(frame);
  runTimer = setTimeout(() => {
    byId('run-status').textContent = 'Нет ответа';
    if (checkFor === lesson) feedback('Проверка не завершилась. Проверь код и повтори запуск.', 'bad');
  }, 2500);
}
addEventListener('message', event => {
  const data = event.data;
  if (event.source !== frame?.contentWindow || data?.id !== runId) return;
  if (data.type === 'log' && typeof data.value === 'string') {
    if (logLines.length < 100) logLines.push(data.value);
    byId('console').textContent = logLines.join('\n');
    return;
  }
  if (data.type === 'ready') {
    if (checkFor === null) clearTimeout(runTimer);
    byId('run-status').textContent = data.value ? 'Есть ошибка' : frame.dataset.example === 'true' ? 'Готовый пример' : 'Запущено';
  }
  if (data.type === 'checked' && checkFor !== null) {
    clearTimeout(runTimer);
    const index = checkFor;
    checkFor = null;
    if (data.value && !completed.includes(index)) {
      completed.push(index);
      save();
    }
    renderProgress();
    if (index === lesson) feedback(lessons[index][data.value ? 'pass' : 'fail'], data.value ? 'good' : 'bad');
  }
});
byId('run').onclick = () => {
  feedback('', '');
  run();
};
byId('check').onclick = () => run(lesson);
byId('demo').onclick = () => {
  feedback('', '');
  run(null, example);
};
document.addEventListener('keydown', event => {
  if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    byId('run').click();
  }
});
showLesson(0);
run(null, Object.keys(starter).every(kind => draft[kind] === starter[kind]) ? example : draft);
