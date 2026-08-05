(()=>{
'use strict';
if(window.__circulosFaqV1)return;
window.__circulosFaqV1=true;

const FAQS=[
{category:'Comenzar',question:'¿Por dónde empiezo para entender teoría musical en la guitarra?',answer:`Empieza relacionando tres cosas: una tonalidad, sus acordes y una escala. Elige DO mayor, toca DO, FA y SOL, y después recorre la escala de DO sobre una zona pequeña del mástil. No intentes aprender toda la teoría de una vez. Cada concepto debe terminar en sonido: toca, escucha y nombra lo que ocurre. Cuando comprendas esa relación en una tonalidad, transpórtala a SOL o RE.`},
{category:'Comenzar',question:'¿Necesito saber leer partituras para tocar y comprender armonía?',answer:`No es obligatorio para comenzar. Para guitarra moderna suele ser más útil reconocer cifrados como C, Am o G7, entender grados y leer tablatura. La partitura aporta ritmo, melodía y precisión, por lo que aprenderla gradualmente sí es valioso. Puedes avanzar en armonía sin dominarla: toca una progresión, identifica su tonalidad y localiza las notas de cada acorde. Así la teoría se convierte inmediatamente en música.`},
{category:'Comenzar',question:'¿Qué es una tonalidad y cómo puedo reconocerla?',answer:`La tonalidad es el centro musical al que una canción parece regresar. Su acorde principal suele producir sensación de descanso y se llama tónica. Para reconocerla, escucha dónde la progresión podría terminar de forma natural y revisa qué escala contiene la mayoría de sus acordes. En DO mayor, por ejemplo, DO suele sentirse como casa. Toca varios acordes y detente en DO para comparar esa sensación.`},
{category:'Comenzar',question:'¿Qué debería practicar cada día para avanzar sin perderme?',answer:`Divide la práctica en bloques breves: cinco minutos para notas del diapasón, cinco para acordes o tríadas, cinco para una escala y cinco para improvisar sobre una progresión. Mantén una sola tonalidad durante varios días. Grábate y escucha si respetas el ritmo y los cambios de acorde. Practicar poco contenido con atención produce más avance que recorrer muchas escalas y formas sin relacionarlas.`},
{category:'Comenzar',question:'¿Es mejor aprender de oído o estudiar teoría?',answer:`Ambas habilidades se complementan. El oído te permite reconocer tensión, descanso y movimientos melódicos; la teoría te ayuda a nombrarlos y repetirlos en otras tonalidades. Toca una progresión sencilla, intenta cantar su nota final y luego comprueba qué grado es. Después crea una frase corta y transpórtala. La teoría sin oído puede volverse mecánica, y el oído sin organización puede hacer más lento el aprendizaje.`},

{category:'Escalas',question:'¿Qué es una escala mayor y para qué sirve?',answer:`Una escala mayor es una colección ordenada de siete notas que define una tonalidad y sus acordes principales. No es solo un dibujo para subir y bajar por el mástil. Sirve para crear melodías, comprender progresiones y localizar notas seguras para improvisar. En DO mayor las notas son DO, RE, MI, FA, SOL, LA y SI. Tócalas sobre una progresión DO–FA–SOL y escucha cómo cambia su efecto.`},
{category:'Escalas',question:'¿Cuál es la diferencia entre una escala mayor y una menor natural?',answer:`La diferencia principal está en los grados III, VI y VII. En la escala menor natural aparecen un semitono más bajos que en la mayor con la misma tónica. Por eso DO mayor suena más abierto, mientras DO menor suele sentirse más oscuro o introspectivo. Toca DO–MI–SOL y luego DO–MI♭–SOL: solo cambia una nota, pero cambia el carácter completo del acorde y de la escala.`},
{category:'Escalas',question:'¿Qué significa el patrón tono–tono–semitono de una escala?',answer:`Describe la distancia entre notas consecutivas. La escala mayor sigue: tono, tono, semitono, tono, tono, tono y semitono. En la guitarra, un semitono equivale a un traste y un tono a dos trastes. Comprender el patrón permite construir cualquier escala desde cualquier nota. Elige SOL, avanza 2–2–1–2–2–2–1 trastes y comprobarás las notas de SOL mayor.`},
{category:'Escalas',question:'¿Tengo que memorizar todas las posiciones de todas las escalas?',answer:`No al comienzo. Aprende primero una posición útil, reconoce dentro de ella la tónica y conecta esa forma con los acordes de la tonalidad. Después amplía hacia una posición vecina. Memorizar cinco dibujos sin saber dónde están las notas importantes suele producir solos mecánicos. Una posición bien comprendida, tocada en varias tonalidades y conectada con tríadas, vale más que muchas formas repetidas de memoria.`},
{category:'Escalas',question:'¿Cuándo conviene usar la escala pentatónica y cuándo la escala completa?',answer:`La pentatónica tiene cinco notas y evita algunos choques, por eso facilita frases claras de rock, blues y pop. La escala mayor o menor completa añade dos notas que aportan más color y conexión melódica. Empieza con la pentatónica y agrega gradualmente los grados que faltan. Sobre DO mayor, usa LA menor pentatónica y añade RE y FA para obtener todas las notas de DO mayor.`},
{category:'Escalas',question:'¿Qué hago si aparece un acorde que no pertenece a la escala principal?',answer:`No necesitas abandonar inmediatamente la escala. Primero identifica qué nota del nuevo acorde queda fuera de la tonalidad y destácala brevemente cuando ese acorde suene. Las demás notas pueden seguir funcionando. Por ejemplo, si en DO mayor aparece MI7, su nota SOL♯ define el cambio. Puedes mantener varias notas de DO mayor y sustituir SOL por SOL♯ durante MI7. Así sigues el acorde sin cambiar todo tu mapa.`},

{category:'Acordes',question:'¿Qué es una tríada y por qué es tan importante?',answer:`Una tríada es un acorde formado por tres notas esenciales: tónica, tercera y quinta. La tercera indica si el acorde es mayor o menor; la quinta le da estabilidad. Las tríadas permiten ver la armonía con claridad en grupos de tres cuerdas y en distintas zonas del mástil. Practica DO–MI–SOL, FA–LA–DO y SOL–SI–RE. Después intenta enlazarlas usando el movimiento más corto entre una forma y otra.`},
{category:'Acordes',question:'¿Cómo se forma un acorde mayor y uno menor?',answer:`Ambos contienen tónica, tercera y quinta. En el acorde mayor, la tercera está a cuatro semitonos de la tónica; en el menor, a tres. La quinta se mantiene a siete semitonos. Compara DO mayor: DO–MI–SOL, con DO menor: DO–MI♭–SOL. En la guitarra, localiza la tercera dentro de una forma conocida y bájala un traste para escuchar cómo cambia de mayor a menor.`},
{category:'Acordes',question:'¿Qué significa el número 7 en un acorde como SOL7?',answer:`SOL7 es un acorde de séptima dominante. Contiene SOL, SI, RE y FA. La nota FA crea tensión y suele impulsar el movimiento hacia DO. Cuando un acorde aparece solo con el número 7, este nombre es el más utilizado: séptima dominante. Toca SOL7 y luego DO para escuchar la resolución. Al improvisar, destaca SI o FA sobre SOL7 y resuelve esas notas hacia DO o MI.`},
{category:'Acordes',question:'¿Qué es un acorde maj7 y en qué se diferencia de un acorde 7?',answer:`Maj7 significa séptima mayor. DOmaj7 contiene DO, MI, SOL y SI. En cambio, DO7 contiene DO, MI, SOL y SI♭. La diferencia es una sola nota, pero el efecto cambia: maj7 suele sonar amplio y suave; el acorde 7 genera más tensión. Toca ambos lentamente y localiza la séptima en la forma. Escuchar esa nota aislada ayuda a reconocer cada calidad sin memorizar solo el nombre.`},
{category:'Acordes',question:'¿Qué es una inversión de acorde y cuándo conviene usarla?',answer:`Una inversión mantiene las mismas notas del acorde, pero coloca otra nota en la parte más grave. DO mayor puede ordenarse DO–MI–SOL, MI–SOL–DO o SOL–DO–MI. Las inversiones permiten conectar acordes con menos desplazamiento y crear acompañamientos más fluidos. Elige una progresión DO–FA–SOL y busca formas cercanas en las tres primeras cuerdas. Prioriza siempre el movimiento más corto entre las voces.`},
{category:'Acordes',question:'¿Por qué un mismo acorde tiene tantas posiciones en la guitarra?',answer:`Porque una misma nota aparece varias veces en el diapasón y las notas del acorde pueden ordenarse o duplicarse de distintas maneras. Todas las posiciones pueden llamarse igual, pero cambian el registro, el timbre y la facilidad para enlazar con otros acordes. No memorices formas aisladas: identifica la tónica, la tercera y la quinta de cada posición. Así podrás elegir la que mejor encaje con la progresión.`},
{category:'Acordes',question:'¿Qué notas debo destacar cuando suena un acorde?',answer:`Empieza por las notas que definen su calidad. En un acorde mayor o menor, la tercera es especialmente importante porque distingue ambos sonidos. En acordes 7 o maj7, destaca también la séptima. La tónica es segura, pero usarla siempre puede sonar predecible. Sobre LAm toca DO; sobre FA toca LA; sobre SOL7 prueba SI o FA. Esas notas hacen que la frase siga realmente la armonía.`},

{category:'Círculos y grados',question:'¿Qué es un círculo armónico?',answer:`Es una organización de los acordes que pertenecen a una tonalidad. Muestra sus grados y facilita crear progresiones sin elegir acordes al azar. En DO mayor aparecen DO, REm, MIm, FA, SOL, LAm y SI disminuido. Toca I–V–vi–IV: DO–SOL–LAm–FA. Después usa el mismo orden en SOL mayor. El círculo te permite conservar la función aunque cambien los nombres de los acordes.`},
{category:'Círculos y grados',question:'¿Qué significan los números romanos I, II, III, IV, V, VI y VII?',answer:`Representan la posición de cada acorde dentro de una tonalidad. El I nace de la primera nota de la escala, el II de la segunda y así sucesivamente. Los números permiten reconocer una progresión en cualquier tono. I–vi–IV–V en DO es DO–LAm–FA–SOL; en SOL es SOL–MIm–DO–RE. Aprende primero el sonido de la relación y después los nombres concretos.`},
{category:'Círculos y grados',question:'¿Cómo sé qué acordes pertenecen a una escala mayor?',answer:`Construye una tríada sobre cada nota usando una nota sí y otra no dentro de la escala. En una tonalidad mayor, el patrón de calidades es: mayor, menor, menor, mayor, mayor, menor y disminuido. Por eso en DO mayor aparecen DO, REm, MIm, FA, SOL, LAm y SI°. Practica este patrón en SOL y RE. La secuencia siempre se conserva aunque cambien las notas.`},
{category:'Círculos y grados',question:'¿Por qué los grados I, IV y V son tan importantes?',answer:`Cumplen funciones muy claras. El I es la tónica y produce descanso; el IV abre el movimiento; el V crea tensión y conduce de regreso al I. Con esos tres grados se acompañan muchas canciones. En DO mayor toca DO–FA–SOL–DO y escucha el recorrido completo. Después improvisa usando las notas de cada tríada cuando su acorde aparece. Así percibirás la función, no solo la fórmula.`},
{category:'Círculos y grados',question:'¿Cómo puedo crear una progresión de acordes que suene coherente?',answer:`Elige una tonalidad y combina acordes con funciones distintas. Comienza en I, muévete hacia IV o vi, crea tensión con V y regresa a I. Una opción es I–vi–IV–V. No existe una única fórmula correcta: el ritmo y la duración también influyen. Toca cada acorde durante cuatro pulsos, luego cambia el orden y compara. Conserva la versión que produzca el carácter que buscas.`},
{category:'Círculos y grados',question:'¿Cómo se transporta una progresión a otra tonalidad?',answer:`Conserva los grados y cambia los acordes. Si una canción usa I–V–vi–IV en DO, sus acordes son DO–SOL–LAm–FA. Para llevarla a RE, busca los mismos grados: RE–LA–SIm–SOL. Este método es más seguro que mover nombres al azar. Practica escribiendo primero los números romanos y luego sustituyéndolos con el círculo armónico de la nueva tonalidad.`},
{category:'Círculos y grados',question:'¿Cómo puedo reconocer la tonalidad de una progresión?',answer:`Busca el acorde que parece reposo y revisa si los demás encajan en su círculo armónico. También observa el acorde dominante: suele estar a una quinta de la tónica y conduce hacia ella. En LAm–FA–DO–SOL, DO puede sentirse como centro mayor y LA como centro menor relativo. Escucha dónde termina la melodía y prueba ambos acordes finales; el contexto decidirá cuál funciona como casa.`},
{category:'Círculos y grados',question:'¿Qué es una cadencia y cómo puedo escucharla?',answer:`Una cadencia es una combinación de acordes que produce cierre o pausa. La más clara es V–I, como SOL–DO en DO mayor. IV–I suena más suave y suele llamarse cadencia plagal. Para reconocerlas, toca cada pareja varias veces y canta la nota final antes de resolver. Después busca esos movimientos en canciones. Identificar cadencias facilita anticipar cambios durante el acompañamiento y la improvisación.`},

{category:'Improvisación',question:'¿Cómo empiezo a improvisar sobre una progresión de acordes?',answer:`Usa primero pocas notas. Toca una progresión sencilla y crea frases con tres notas de la escala. Mantén el ritmo, repite una idea y deja silencios. Después añade una nota de cada acorde cuando cambie la armonía. Sobre DO–FA–SOL puedes comenzar con DO, RE y MI; al llegar a FA destaca FA o LA, y sobre SOL destaca SOL o SI. La claridad importa más que la velocidad.`},
{category:'Improvisación',question:'¿Qué notas debo elegir durante un solo?',answer:`Combina notas de la tonalidad con notas del acorde que está sonando. Las notas de la escala conectan la frase; las notas del acorde le dan dirección. Una estrategia práctica es comenzar o terminar cada frase en la tercera del acorde. Sobre DO usa MI, sobre LAm usa DO y sobre FA usa LA. No necesitas tocar todas las notas disponibles: elige pocas y dales ritmo e intención.`},
{category:'Improvisación',question:'¿Cómo puedo seguir los cambios de acordes mientras improviso?',answer:`Conoce al menos una tríada cercana para cada acorde y escucha claramente el pulso del cambio. Antes de improvisar, toca solo una nota por compás: la tónica o la tercera de cada acorde. Luego conecta esas notas con fragmentos de escala. Si la progresión es DO–LAm–FA–SOL, practica MI–DO–LA–SI. Cuando puedas anticiparlas sin detenerte, añade frases alrededor de esas notas objetivo.`},
{category:'Improvisación',question:'¿Debo cambiar de escala cada vez que cambia el acorde?',answer:`No siempre. Si todos los acordes pertenecen a la misma tonalidad, una escala puede cubrir toda la progresión. Lo importante es cambiar el énfasis: destaca las notas del acorde actual. Cambia de escala cuando aparece una alteración importante, una modulación o un acorde que exige otro color. Primero intenta resolver el cambio con una sola nota característica; suele ser más musical que cambiar de patrón completo.`},
{category:'Improvisación',question:'¿Qué son las notas objetivo?',answer:`Son notas elegidas para llegar a ellas en un momento concreto, normalmente cuando cambia el acorde. Suelen ser la tónica, tercera, quinta o séptima del acorde. Dan sensación de intención, porque la frase aterriza en una nota relacionada con la armonía. Elige la tercera de cada acorde y toca cualquier recorrido corto que termine allí en el primer pulso. Practica lentamente hasta escuchar el destino antes de tocarlo.`},
{category:'Improvisación',question:'¿Cómo conecto una frase cuando cambia el acorde?',answer:`Busca notas cercanas entre ambos acordes. Puedes mantener una nota común o moverte medio tono o un tono hacia una nota del nuevo acorde. De DO mayor a LAm, DO y MI pertenecen a ambos; mantener una de ellas produce continuidad. De FA a SOL, LA puede subir a SI y DO puede bajar a SI. Practica conexiones de dos notas antes de crear frases más largas.`},
{category:'Improvisación',question:'¿Por qué los silencios mejoran un solo?',answer:`El silencio separa ideas, permite respirar y hace que una frase tenga respuesta. Tocar continuamente reduce el contraste y dificulta reconocer motivos. Improvisa durante dos compases y guarda silencio durante uno; escucha cómo la progresión continúa sin ti. Después responde con una variación de la frase anterior. Esta práctica mejora el ritmo y evita llenar cada espacio por nervios o costumbre.`},
{category:'Improvisación',question:'¿Qué hago cuando toco una nota que suena mal?',answer:`No te detengas. Mueve la nota un traste arriba o abajo y escucha cuál resuelve mejor. Muchas notas tensas funcionan si se dirigen rápidamente hacia una nota del acorde. Después identifica qué ocurrió: quizá tocaste la cuarta sobre un acorde mayor o una nota ajena a la tonalidad. Practicar la resolución convierte los errores en recursos y desarrolla una reacción musical inmediata.`},
{category:'Improvisación',question:'¿Cómo evito que mi improvisación suene como una escala practicada?',answer:`Cambia el ritmo antes de buscar más notas. Repite motivos, salta notas, usa silencios, bends o deslizamientos y evita comenzar siempre desde la primera nota del patrón. Limita la improvisación a cuatro notas y crea varias frases distintas. También termina cada frase en una nota del acorde. Cuando la atención pasa del dibujo a la intención rítmica y armónica, el solo deja de sonar como ejercicio.`},
{category:'Improvisación',question:'¿Cuáles son los errores más comunes al improvisar?',answer:`Los más frecuentes son tocar sin escuchar la progresión, correr demasiado, comenzar siempre en la tónica, ignorar el ritmo y usar una posición sin conocer sus notas. Corrige uno por vez. Improvisa lentamente, canta una frase antes de tocarla y apunta a la tercera de cada acorde. Grábate durante un minuto: si no se distinguen frases y silencios, reduce notas y trabaja primero la respiración musical.`},

{category:'Diapasón y práctica',question:'¿Cómo puedo aprender las notas del diapasón sin memorizarlo de golpe?',answer:`Aprende por zonas y con objetivos. Comienza con las notas naturales de la sexta y quinta cuerda, porque allí se ubican muchas tónicas de acordes. Cada día elige una nota y encuéntrala en todas las cuerdas sin tocar otras. Después usa esa nota como raíz de una tríada o escala. La memoria mejora cuando la nota está asociada con sonido, forma y función, no solo con un traste.`},
{category:'Diapasón y práctica',question:'¿Cómo ayudan las octavas a orientarme en el mástil?',answer:`Las formas de octava permiten localizar rápidamente la misma nota en otra cuerda. Desde la sexta cuerda, una octava común está dos cuerdas abajo y dos trastes adelante; desde la quinta cuerda, también aparece dos cuerdas abajo y dos trastes adelante. Usa estas formas para encontrar todas las tónicas de un acorde. Luego conecta cada tónica con una tríada cercana y tendrás puntos de referencia en todo el diapasón.`},
{category:'Diapasón y práctica',question:'¿Tengo que memorizar también sostenidos y bemoles?',answer:`Sí, pero no como una lista separada. Cuando conozcas las notas naturales, recuerda que cada traste intermedio puede nombrarse de dos maneras según el contexto: DO♯ también puede ser RE♭. El nombre correcto depende de la tonalidad y del movimiento musical. Practica diciendo ambos nombres, pero usa el que aparece en la escala que estás estudiando. En RE mayor, por ejemplo, se escribe FA♯ y no SOL♭.`},
{category:'Diapasón y práctica',question:'¿Cómo relaciono una escala con los acordes que hay dentro de ella?',answer:`Localiza las notas de cada tríada dentro de la posición de escala. En DO mayor, marca DO–MI–SOL, después FA–LA–DO y SOL–SI–RE. Toca la escala, pero detente en las notas del acorde que está sonando. Esta práctica transforma un patrón lineal en un mapa armónico. Usa colores mentales o pequeños diagramas: tónica de un color y las demás notas del acorde de otro.`},
{category:'Diapasón y práctica',question:'¿Cómo practico tríadas por todo el diapasón?',answer:`Elige un grupo de tres cuerdas y aprende las tres inversiones de un acorde mayor. Después cambia solo la tercera para obtener el menor. Repite el proceso en otra zona y conecta las formas sin saltos grandes. Practica una progresión como I–vi–IV–V usando siempre la inversión más cercana. Esto mejora acompañamiento, visualización de acordes e improvisación porque muestra exactamente dónde están las notas objetivo.`},
{category:'Diapasón y práctica',question:'¿Qué rutina de 15 minutos puedo usar para unir teoría y guitarra?',answer:`Dedica tres minutos a encontrar una nota en todo el mástil, tres a tocar las tríadas de una tonalidad, tres a recorrer su escala nombrando grados, tres a enlazar una progresión y tres a improvisar apuntando a las terceras. Usa la misma tonalidad durante una semana. Al final, graba un minuto y escucha ritmo, silencios y cambios de acorde. La constancia hará visible el progreso.`}
];

const style=document.createElement('style');
style.id='circulosFaqStyles';
style.textContent=`
#faqView{padding-bottom:108px}
#faqView .faq-hero{align-items:stretch}
#faqView .faq-overview{min-width:220px}
#faqView .faq-controls-panel{overflow:visible}
#faqView .faq-controls{padding:20px 24px 24px;display:grid;gap:16px}
#faqView .faq-search-wrap{position:relative}
#faqView .faq-search-icon{position:absolute;left:16px;top:50%;width:18px;height:18px;transform:translateY(-50%);color:var(--muted);pointer-events:none}
#faqView .faq-search{width:100%;min-height:52px;padding:0 46px;border:1px solid var(--line);border-radius:16px;background:var(--surface2);color:var(--text);font:inherit;font-size:14px;outline:none;transition:border-color .2s ease,box-shadow .2s ease,background .2s ease}
#faqView .faq-search::placeholder{color:var(--muted)}
#faqView .faq-search:focus{border-color:var(--accent);background:var(--surface);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 14%,transparent)}
#faqView .faq-clear{position:absolute;right:9px;top:50%;width:34px;height:34px;transform:translateY(-50%);border:0;border-radius:50%;background:transparent;color:var(--muted);font-size:20px;line-height:1;cursor:pointer}
#faqView .faq-clear:hover{background:var(--surface);color:var(--text)}
#faqView .faq-categories{display:flex;gap:8px;overflow-x:auto;padding:1px 0 4px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
#faqView .faq-categories::-webkit-scrollbar{display:none}
#faqView .faq-category{flex:0 0 auto;min-height:38px;padding:0 15px;border:1px solid var(--line);border-radius:999px;background:var(--surface);color:var(--muted);font:inherit;font-size:12px;font-weight:720;cursor:pointer;white-space:nowrap;transition:transform .18s ease,border-color .18s ease,background .18s ease,color .18s ease}
#faqView .faq-category:hover{transform:translateY(-1px);border-color:var(--accent);color:var(--text)}
#faqView .faq-category.active{border-color:var(--accent);background:var(--accent);color:var(--contrast)}
#faqView .faq-results-meta{display:flex;align-items:center;justify-content:space-between;gap:16px;color:var(--muted);font-size:12px;font-weight:650}
#faqView .faq-list{display:grid;gap:12px;padding:18px 24px 26px}
#faqView .faq-item{border:1px solid var(--line);border-radius:20px;background:var(--surface);overflow:hidden;transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease}
#faqView .faq-item:hover{border-color:color-mix(in srgb,var(--accent) 44%,var(--line));transform:translateY(-1px)}
#faqView .faq-item[open]{border-color:color-mix(in srgb,var(--accent) 55%,var(--line));box-shadow:0 12px 34px rgba(0,0,0,.07)}
#faqView .faq-question{list-style:none;display:grid;grid-template-columns:1fr 34px;align-items:center;gap:16px;min-height:72px;padding:17px 18px 17px 22px;cursor:pointer;color:var(--text);font-size:15px;font-weight:780;line-height:1.35;letter-spacing:-.015em}
#faqView .faq-question::-webkit-details-marker{display:none}
#faqView .faq-chevron{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--surface2);color:var(--muted);transition:transform .24s ease,background .2s ease,color .2s ease}
#faqView .faq-chevron svg{width:16px;height:16px}
#faqView .faq-item[open] .faq-chevron{transform:rotate(45deg);background:var(--accent);color:var(--contrast)}
#faqView .faq-answer{max-width:850px;margin:0;padding:0 64px 22px 22px;color:var(--muted);font-size:14px;line-height:1.68}
#faqView .faq-answer::before{content:'';display:block;width:38px;height:2px;margin-bottom:14px;border-radius:999px;background:var(--accent)}
#faqView .faq-empty{padding:46px 24px 52px;text-align:center;color:var(--muted)}
#faqView .faq-empty strong{display:block;margin-bottom:6px;color:var(--text);font-size:17px}
@media(max-width:760px){#faqView .faq-overview{min-width:0}#faqView .faq-question{font-size:14px}}
@media(max-width:560px){#faqView{padding-bottom:84px}#faqView .faq-controls{padding:16px 18px 20px}#faqView .faq-list{padding:14px 18px 22px;gap:10px}#faqView .faq-question{grid-template-columns:1fr 32px;min-height:68px;padding:15px 14px 15px 17px}#faqView .faq-answer{padding:0 17px 19px;font-size:13.5px}#faqView .faq-results-meta{align-items:flex-start;flex-direction:column;gap:4px}}
`;
document.head.appendChild(style);

function closeMenu(){
  const menu=document.getElementById('sideMenu'),backdrop=document.getElementById('menuBackdrop'),menuBtn=document.getElementById('menuBtn');
  document.body.classList.remove('menu-open');
  menu?.classList.remove('open');backdrop?.classList.remove('open');
  menu?.setAttribute('aria-hidden','true');backdrop?.setAttribute('aria-hidden','true');menuBtn?.setAttribute('aria-expanded','false');
}

function setView(name,scroll=true){
  const valid=['circles','chords','faq'].includes(name)?name:'circles';
  document.getElementById('circlesView')?.classList.toggle('view-hidden',valid!=='circles');
  document.getElementById('chordsView')?.classList.toggle('view-hidden',valid!=='chords');
  document.getElementById('faqView')?.classList.toggle('view-hidden',valid!=='faq');
  document.getElementById('bottomNav')?.classList.toggle('view-hidden',valid!=='circles');
  document.querySelectorAll('[data-app-view]').forEach(button=>{
    const active=button.dataset.appView===valid;
    button.classList.toggle('active',active);
    const badge=button.querySelector('.app-choice-badge');if(badge)badge.textContent=active?'Activo':'Abrir';
    button.setAttribute('aria-current',active?'page':'false');
  });
  localStorage.setItem('circulos-active-view',valid);
  closeMenu();
  if(scroll)window.scrollTo({top:0,behavior:'smooth'});
}

function buildFaq(){
  const picker=document.querySelector('.app-picker');
  if(!picker||document.getElementById('faqView'))return;

  const menuButton=document.createElement('button');
  menuButton.className='app-choice';menuButton.type='button';menuButton.dataset.appView='faq';
  menuButton.innerHTML='<span class="app-choice-badge">Abrir</span><strong>Preguntas y respuestas</strong><small>Teoría aplicada, improvisación y dudas frecuentes.</small>';
  picker.appendChild(menuButton);

  const view=document.createElement('main');
  view.className='container app-view view-hidden';view.id='faqView';
  view.innerHTML=`
    <section class="hero faq-hero">
      <div><p class="eyebrow">Aprende y aplica</p><h1>Preguntas y respuestas</h1><p class="hero-copy">Respuestas claras para comprender acordes, escalas, círculos armónicos, improvisación y el diapasón mientras los aplicas directamente en la guitarra.</p></div>
      <aside class="hero-status faq-overview"><div class="status-row"><span class="status-label">Respuestas</span><strong class="status-value">${FAQS.length}</strong></div><div class="status-row"><span class="status-label">Temas</span><strong class="status-value">6 categorías</strong></div><div class="status-row"><span class="status-label">Enfoque</span><strong class="status-value">Tocar y comprender</strong></div></aside>
    </section>
    <section class="panel faq-controls-panel">
      <div class="panel-head"><div><h3 class="panel-title">Encuentra tu duda</h3><p class="panel-subtitle">Busca una palabra o elige un tema.</p></div></div>
      <div class="faq-controls">
        <div class="faq-search-wrap"><svg class="faq-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.7-3.7"/></svg><input class="faq-search" id="faqSearch" type="search" placeholder="Ejemplo: improvisar, maj7, diapasón…" autocomplete="off" aria-label="Buscar preguntas"><button class="faq-clear" id="faqClear" type="button" aria-label="Limpiar búsqueda" hidden>×</button></div>
        <div class="faq-categories" id="faqCategories" role="group" aria-label="Filtrar por tema"></div>
        <div class="faq-results-meta"><span id="faqCount" aria-live="polite"></span><span>Abre una pregunta para leer la respuesta.</span></div>
      </div>
    </section>
    <section class="panel">
      <div class="panel-head"><div><h3 class="panel-title">Guía práctica</h3><p class="panel-subtitle">Conceptos explicados para aplicarlos en el instrumento.</p></div></div>
      <div class="faq-list" id="faqList"></div>
      <div class="faq-empty" id="faqEmpty" hidden><strong>No encontré esa pregunta</strong><span>Prueba con otra palabra o selecciona “Todas”.</span></div>
    </section>`;
  document.getElementById('chordsView')?.insertAdjacentElement('afterend',view);

  const categories=['Todas',...new Set(FAQS.map(item=>item.category))];
  const categoryHost=document.getElementById('faqCategories'),list=document.getElementById('faqList'),search=document.getElementById('faqSearch'),clear=document.getElementById('faqClear'),count=document.getElementById('faqCount'),empty=document.getElementById('faqEmpty');
  let activeCategory='Todas';
  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  categories.forEach(category=>{
    const button=document.createElement('button');button.type='button';button.className='faq-category';button.textContent=category;button.dataset.faqCategory=category;
    button.classList.toggle('active',category==='Todas');button.setAttribute('aria-pressed',String(category==='Todas'));
    categoryHost.appendChild(button);
  });

  function render(){
    const term=normalize(search.value.trim());
    const filtered=FAQS.filter(item=>(activeCategory==='Todas'||item.category===activeCategory)&&(!term||normalize(`${item.question} ${item.answer} ${item.category}`).includes(term)));
    list.replaceChildren();
    filtered.forEach(item=>{
      const details=document.createElement('details');details.className='faq-item';details.dataset.category=item.category;
      const summary=document.createElement('summary');summary.className='faq-question';
      const title=document.createElement('span');title.textContent=item.question;
      const icon=document.createElement('span');icon.className='faq-chevron';icon.setAttribute('aria-hidden','true');icon.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
      const answer=document.createElement('p');answer.className='faq-answer';answer.textContent=item.answer;
      summary.append(title,icon);details.append(summary,answer);
      details.addEventListener('toggle',()=>{if(details.open)list.querySelectorAll('details[open]').forEach(other=>{if(other!==details)other.open=false;});});
      list.appendChild(details);
    });
    count.textContent=`${filtered.length} ${filtered.length===1?'respuesta':'respuestas'}`;
    empty.hidden=filtered.length!==0;list.hidden=filtered.length===0;
    clear.hidden=!search.value;
  }

  categoryHost.addEventListener('click',event=>{
    const button=event.target.closest('[data-faq-category]');if(!button)return;
    activeCategory=button.dataset.faqCategory;
    categoryHost.querySelectorAll('button').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
    render();
  });
  search.addEventListener('input',render);
  clear.addEventListener('click',()=>{search.value='';search.focus();render();});
  render();

  picker.addEventListener('click',event=>{
    const button=event.target.closest('[data-app-view]');if(!button)return;
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();setView(button.dataset.appView);
  },true);

  setView(localStorage.getItem('circulos-active-view')||'circles',false);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',buildFaq,{once:true});else buildFaq();
})();