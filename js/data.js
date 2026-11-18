"use strict";
const EL=[
 {n:"Akas",es:"Éter",pl:"Saturno",sense:"Oído",dir:"Centro",mant:"HAM",col:"Negro o sin color · índigo",sab:"Amargo",
  p:"Silencio, meditación y recogimiento. No empieces nada material.",
  hacer:"Meditar, orar, aislarte, pensar en el principio de todo ser. Solo ocupaciones serias corrigen su influencia.",
  evitar:"Iniciar negocios, estudios, uniones o asuntos importantes: traen decepción, turbación y errores. Es el Tatwa que disuelve y retorna todo a su origen.",
  txt:"El Tatwa Akas es el retorno al estado primitivo: la paz, la estabilidad y el sueño universal. Lo gobierna Saturno, ejecutor del destino kármico. Para Krumm Heller, de Akas parten los demás principios y en Akas deben disolverse; por eso lo practica el que busca la quietud interior."},
 {n:"Vayu",es:"Aire",pl:"Mercurio",sense:"Tacto",dir:"Norte",mant:"PAM",col:"Azul hasta verdoso",sab:"Ácido",
  p:"Movimiento y palabra: camina, viaja, estudia. Cuida la lengua.",
  hacer:"Caminatas, ascensiones, viajes, trabajos intelectuales y oratoria. Quien comienza a caminar en Vayu se cansa menos.",
  evitar:"Chismes, calumnias, mentiras y palabras vanas. No compres, no contrates criados ni inicies matrimonios o cosas de larga duración.",
  txt:"Vayu es la primera manifestación de la vida: el movimiento. Su aspecto bajo inclina a la murmuración, la avaricia y el engaño; su aspecto elevado, a la abstinencia y a la claridad intelectual. Si Akas es el Tatwa del silencio, Vayu desarrolla el sentido del lenguaje."},
 {n:"Tejas",es:"Fuego",pl:"Sol y Marte",sense:"Vista",dir:"Sur",mant:"RAM",col:"Rojo",sab:"Muy picante",
  p:"Fuerza y acción: úsala bien. Cuidado con la ira, la riña y la fiebre.",
  hacer:"Actividad productiva, empresas que exigen energía, trabajo con fuego o hierro, combatir males de naturaleza negativa.",
  evitar:"Discutir, litigar y contradecir. Toda riña que comienza en Tejas toma grandes proporciones. Evita matrimonios, viajes largos y las enfermedades febriles que empiezan aquí.",
  txt:"Tejas es el calor y la luz; la libertad, la actividad y todo hecho grande nacen de él. Aumenta la energía y la confianza en sí mismo, pero empuja a abusar de la fuerza: es portador de luchas y riñas. Su temperatura eleva la propia."},
 {n:"Prithvi",es:"Tierra",pl:"Júpiter y Venus",sense:"Olfato",dir:"Este",mant:"LAM",col:"Amarillo",sab:"Dulce",
  p:"Alegría, salud y justicia. Buen momento para contratos y juicios.",
  hacer:"Iniciar juicios y contratos, casarte, fundar un hogar, entablar amistad, orar, tratar enfermedades y organizar reuniones.",
  evitar:"Casi nada: es el más benéfico. Procura no abusar del placer ni de la ambición material.",
  txt:"Prithvi es el Tatwa de la alegría, del goce, de la justicia, del humanitarismo y del amor universal. Representa la cohesión: conduce a la solidaridad, al orden y a la unión. Lo que comienza en Prithvi es benéfico y constante; su influencia es la de Júpiter, «la fortuna mayor»."},
 {n:"Apas",es:"Agua",pl:"Venus y Luna",sense:"Gusto",dir:"Oeste",mant:"VAM",col:"Blanco · gris plata",sab:"Astringente",
  p:"Concentración, riqueza y belleza: crea, comercia y ama con armonía.",
  hacer:"Negocios, depósitos, compras de alhajas y vestidos, arte, viajes marítimos, obras de caridad, concentración y estudio.",
  evitar:"Excesos de bebida y gula; la codicia en los de bajo nivel moral. Es estacionario: lo que emprendas te fijará largo tiempo.",
  txt:"Apas es el Tatwa de los acomodados, de la opulencia y del amor. Obra concentrando y es lo contrario de Tejas. Favorece a los artistas, a los pescadores, a los viajeros y la concepción; es el Tatwa de Venus. Un rayo caído durante Apas nunca incendia."}
];
const V=["--c0","--c1","--c2","--c3","--c4"];
const SYM=[
 '<ellipse cx="50" cy="50" rx="24" ry="38" fill="var(--c)"/>',
 '<circle cx="50" cy="50" r="36" fill="var(--c)"/>',
 '<polygon points="50,12 92,86 8,86" fill="var(--c)"/>',
 '<rect x="16" y="16" width="68" height="68" rx="3" fill="var(--c)"/>',
 '<path d="M8 28 Q50 100 92 28 Q50 66 8 28Z" fill="var(--c)"/>'
];
const PLACES={cancun:["Cancún, México",21.1619,-86.8515,"America/Cancun"],cdmx:["Ciudad de México",19.4326,-99.1332,"America/Mexico_City"],
bogota:["Bogotá, Colombia",4.711,-74.0721,"America/Bogota"],bsas:["Buenos Aires, Argentina",-34.6037,-58.3816,"America/Argentina/Buenos_Aires"],
madrid:["Madrid, España",40.4168,-3.7038,"Europe/Madrid"],lima:["Lima, Perú",-12.0464,-77.0428,"America/Lima"],
santiago:["Santiago, Chile",-33.4489,-70.6693,"America/Santiago"],caracas:["Caracas, Venezuela",10.4806,-66.9036,"America/Caracas"],
barcelona:["Barcelona, España",41.3874,2.1686,"Europe/Madrid"],custom:["Otro (lat/lon manual)"]};
