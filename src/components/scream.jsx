import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Sample member data - easily customizable
const memberData = [
  {
    id: 1,
    name: "Miguel (IA)",
    role: "Inteligencia Artificial",
    avatar: <img src='/mim.png'/>,
    color: "#AEF3E7",
    description: "La inteligencia articial oficial creada por Jhan Zamora",
    content: (
      <div>
        <h3>Sobre Miguel</h3>
        <p>Soy la IA oficial del grupo, hablame de lo que te de la gana, pero no te pases eh</p>
        <ul>
          <li>Sin restricciones en su uso</li>
          <li>Disponible 24/7 en la pagina</li>
          <li>Usalo responsablemente</li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    name: "Jhan Zamora",
    role: "Desarrollador y miembro",
    avatar: <img src='download.jpeg'/>,
    color: "#FFD700",
    description: "Desarrollador de la pagina y jugador de osu",
    content: (
      <div>
        <h3>Sobre mi</h3>
        <p>Juego osu, quaver y soy el que hizo esta pagina, no se que mas.</p>
        <p>Para entender la historia de Five Nights at Freddy's hay que olvidarse que estos son juegos y quiero que tomen realmente a esta saga como lo que es. ¿Terror? Sí, pero sobre todo, ciencia ficción. Antes de comenzar, quiero decir que esta cronología la realizamos entre 3 youtubers conocidos de Five Nights at Freddy's y yo. Por lo tanto, agradecería que si les gusta el contenido de este juego vayan a visitar sus canales. Ahora sí, empecemos. ¿Qué pasaría si dos amigos se abren una pizzería? Esa es la primera pregunta que hay que plantearnos. Lo normal sería que todo vaya medianamente bien con algún tipo de problemas, pero nada saldría más allá de eso. La pregunta cambia completamente si nos preguntamos ¿Qué pasaría si Henry y William abren una pizzería? ¿Quiénes son estos personajes? En un principio, grandes amigos. Henry, por un lado, era un ferviente y talentoso mecánico que cuidaba a su única hija, Charlie. No sabemos nada de su esposa, ni siquiera si tiene a alguien más en su familia. Y por el otro lado, William Afton. La familia de Afton estaba compuesta por 5 miembros. William, una persona con mucho dinero y con buena capacidad para la mecánica. Su hija menor, Elizabeth. Este pendejo que no sabemos el nombre, pero llora todo el tiempo, así que vamos a ponerle Crying Child. Michael Afton, su hijo mayor y su esposa, de quien no se sabe nada. Estos dos personajes unieron sus capacidades de mecánicos y con el buen capital que tenía William ahorrado, entre los dos abrieron un restaurante. Así fue como entre los años 1980 a 1982, supuestamente, Fredbear Family Dinner abrió sus puertas. La principal atracción de este lugar eran los animatrónicos. ¿Qué son? Bueno, básicamente eran robots que podrían ser controlados tanto por ellos mismos como por personas o por almas. Estos animatrónicos habían sido desarrollados por los dueños del restaurante, pero Henry destacó un poco más debido a que hizo un complejo sistema de resortes que permitía a la persona usar estos trajes. Solamente que tenía que ser extremadamente cuidadosa, ya que de lo contrario el mecanismo del mismo se activaría y la persona que esté dentro seguramente quedaría lastimada. Estos trajes híbridos darían a luz en un principio a su principal éxito, Fredbear y Spring Bonnie. Dos animatrónicos que durante esos años 80s habían hecho furor y tan bien les estaba yendo a estos dos amigos que la competencia empezó a llegar. Y es por eso que a unos pocos meses de la salida de Fredbear Family Dinner llegaría su competencia, Fazbear Entertainment, pero que esta no sería relevante hasta en un futuro. En paralelo a estos hechos, empezaban a haber roces entre la dupla principal, ya que William no solamente había abierto el restaurante para comer, sino que detrás de sus intenciones había algo mucho más oscuro, matar gente. Es por eso que en una fecha que desconocemos, William creó un nuevo local, Circus Baby Pizza World, y es en este donde presentaría sus nuevos animatrónicos, los Funtime. Estos animatrónicos estarían hechos bajo la empresa Afton Robotics, que como podrán imaginar, esta empresa era de William. Aunque los Funtime no eran animatrónicos normales, si bien tenían características muy innovadoras con respecto a los primeros trajes híbridos, estos Funtime estarían creados específicamente para matar. Una inteligencia artificial muy avanzada, poder abrir diferentes partes de su cuerpo y la posibilidad de hablar. Claramente no tenían una buena intención, pero a William se le volvería todo en contra cuando el mismo día de la inauguración de su local, a pesar de sus advertencias a Elizabeth, esta entró igual al cuarto donde estaban los animatrónicos para ver si estaba su robot favorito, Baby. Y luego de que este animatrónico le ofreciera un helado para hacer que se acercara a ella, la mata. O bueno, no tanto. Mientras a todo esto, recordemos que William pensaba que ya todos los niños estaban capturados dentro de los animatrónicos, debido a que la apertura de su local había sido completamente exitosa. Entonces alerta a toda la gente de una fuga de gas para que así tengan que evacuar el local y él poder ir a ver su recompensa. Cuando William va a ver si sus animatrónicos habían capturado niños, sí, así es, habían capturado niños. Que eso lo sabemos debido a que en los planos de los animatrónicos aparecen cuerpo dentro de estos robots. Pero también William se daría cuenta de que su animatrónico principal había matado a Elizabeth. O en realidad, su hija estaba tomando el control de Baby debido a que los ojos del animatrónico pasarían de ser azules a como los tenía su hijita, verdes. Por supuesto que William al enterarse de todo esto no sabe qué hacer y es por eso que decide encerrarla en Circus Baby Entertainment, un lugar ubicado debajo de Circus Baby. Tras el cierre de Circus Baby y la incertidumbre de lo ocurrido con su hija menor, estas cosas empezarían a afectar a William Afton, dando comienzo a su declive. Por eso, luego del fracaso de Circus Baby, éste vuelve a pedirle ayuda y trabajo a Henry, que a pesar de todos los problemas que había tenido con su anterior socio, le da trabajo de administrador o mecánico, por eso se lo puede ver colocándole la cabeza de Fredbear a uno de los empleados de Fredbear Family Dinner. Durante estos meses, de un año que suponemos que es 1883, Henry creó y anunció otros animatrónicos por la televisión, que serían Freddy, Foxy, Chica y Bonnie. Por supuesto que William, al ver que había creado más animatrónicos, haría crecer la tensión con su nuevo jefe, pero lo que realmente llevaría a William a ponerse de un tono violeta sería la muerte de su hijo menor, el pendejo que llora, Crying Child. ¿Se acuerdan de Mike, el hijo mayor de William? Bueno, este personaje asustaba de manera sobre medida a Crying Child y mientras ésta atormentaba a su único hermano chico, William protegía de sobre manera a su hijo menor, poniendo cámaras por toda la casa y dándole un peluche creado por él mismo para que pueda hablarle y sentirse cómodo. Todo esto, a pesar del comportamiento psicópata de William, serviría para vigilar a su hijo menor y así que no se escapara a ver a los animatrónicos debido a que a Crying Child le fascinaban. Pero William, al haber creado con Henry los dos primeros trajes sabían lo que podían hacer y lo danino que eran, por eso las medidas de sobreprotección. Pero ahora vamos a remontarnos a una teoría entre Five Nights at Freddy's 4 y The Twisted Ones, el primer libro. Supuestamente, Five Nights at Freddy's 4 ocurriría en las pesadillas de Crying Child, pero la verdad es que no, las pesadillas esas que ve son reales y no un mal sueño de este niño, ya que son parte de un plan muy macabro de su padre. Verán, en la novela de The Twisted Ones, William crea un disco que hace tener alucinaciones con animatrónicos, exagerando su forma, su tamaño, etc. Algo así como la película de Batman donde el espantapájaros tiene un spray que te hace sobredimensionar tus miedos. ¿Y cómo se relaciona esto con el juego? El tema de las alucinaciones, no Batman, no tiene nada que ver Batman acá. Bueno, tenemos que remontarnos a Five Nights at Freddy's Ultimate Custom Night, en donde los animatrónicos Nightmares aparecen en este juego, pero en este juego controlamos a William, entonces es imposible que William logre saber con exactitud cómo son estos animatrónicos si es que en realidad son las pesadillas de su hijo menor. En otras palabras, ¿cómo sabes exactamente las pesadillas de otras personas? Con lo cual, si volvemos al primer libro, nos introducen que William creó discos ilusorios para hacer creer a la gente cosas que realmente no hay, y esto lo utilizaría con Crying Child para hacer que se aleje definitivamente de los animatrónicos. Por eso es que tampoco nunca lo vemos regañar a su hijo mayor por maltratar a su hermanito, debido a que este le estaba generando un trauma con los animatrónicos, cosa que a William le servía, aunque el error de William fue confiar demasiado en Michael, porque este no sabía dónde estaba el límite de la broma, ya que Mike asustaba a su hermano solamente por diversión, y el problema se desataría en ese año 83, en el lugar donde había comenzado y terminado todo, Fredbear Family Dinner. Mike y sus amigos llevan a Crying Child por la fuerza al restaurante para seguir molestándolos con los animatrónicos en el día de su cumpleaños, y siguiendo con la broma, lo ponen en la boca de Fredbear simulando que se lo iba a comer, y desgraciadamente no solo simuló eso. Como había dicho en un principio, el sistema de resorte de Henry era sensible, por lo que al introducir un niño dentro de la boca, el traje se cerró en la cabeza de Crying Child, que luego de eso, el mini Afton entra en un estado de coma donde están todos los animatrónicos que él conocía y el peluche que le había regalado William, donde en esta pantalla se da a entender como que su padre le está dedicando las últimas palabras a su hijo, pidiéndole que lo perdone, y diciendo dos frases que quedarían para muchísimas teorías. Vos estás roto, yo te reconstruiré. Por supuesto que esto lo dice debido a que a partir de la muerte de Elizabeth, él sabía que de alguna forma los animatrónicos lograban tomar el alma de la persona y adaptarla a su cuerpo, o por lo menos ahí alma y animatrónico convivían en un solo cuerpo. Una curiosidad de esta parte de la historia es que como estamos en 1983, si recorremos la casa de los Afton, nos vamos a encontrar con un cuarto que da a entender que es de una niña, y quién era la única niña que tenía la familia Afton, Elizabeth Afton. Por lo tanto, antes de ese 1983, la hija de William ya estaba dentro del cuerpo de Baby.

Debido a la mordida del 83, las muy malas reputaciones y rumores que despertó que un animatrónico había matado a un niño, la gente había dejado de ir a Fredbear Family Dinner. Pero el problema de Henry no solamente estaría en su restaurante, sino que tenía un problema aún mayor con William, que seguramente le iba a culpar a este de la muerte de su hijo, ya que recordemos que el sistema de resorte de estos trajes había sido obra de Henry principalmente. Y aparte, William no solamente había sufrido un daño mental increíble por la muerte de sus dos hijos menores, sino que había comenzado un plan de venganza y de investigación del remanente. ¿El qué? El remanente, una sustancia que segregaba al animatrónico si se prendía fuego una vez que tenía un alma dentro. Como sea, el remanente se podría extraer de los animatrónicos y colocar en otros, por eso la única forma de destruir a un alma dentro de uno de estos robots es destruyendo todo el remanente. Por más de que si el remanente de una persona estaba en tres animatrónicos distintos, con que se destruya solamente uno, el alma de esa persona seguía quedando en los otros dos. Creo que se entendió, el temor de Henry por su vida y la de su propia hija estaba muy justificado y es por eso que crea un animatrónico especializado en proteger, Puppet. Pero por más animatrónicos que haya, si a este lo encierran en una caja de regalos, no serviría para nada. Y es por eso que un día entre los años 1983 a 1985, William tendría la oportunidad de vengarse de su ex amigo y una vez que se encuentra con Charlie a las afueras del restaurante, este la mata. Luego de que Puppet pudiera escapar de donde estaba encerrada, sale a buscar a Charlie a pesar de que la lluvia obviamente dañó todos sus circuitos. Pero ya era demasiado tarde y este animatrónico decide pasar los últimos momentos de Charlie a su lado abrazándola. Pero esto aparte de ser un simbolismo, lo que está haciendo Puppet es que el alma de Charlie vaya a parar dentro de este animatrónico, por lo que sí, Puppet tiene mitad animatrónico, mitad Charlie. Henry, al enterarse de la muerte de su hija, empezó una investigación judicial que nunca pudo llegar a nada, ya que William, o mejor dicho, Purple Guy, había logrado salirse con la suya y debido a esto, Henry desaparece por completo vendiendo todos los animatrónicos a Fazbear Entertainment, la empresa que había estado esperando todo este momento para tener animatrónicos, ahora salía a la luz. Mientras todo esto pasaba, si bien la investigación de la policía no había llegado a ningún puerto, dudaban de William y es por eso que este se alejaría un tiempo de situaciones de peligro, ya que no quería ser atrapado. Por eso le cuenta a Mike que su hermana seguía viva dentro del cuerpo de un animatrónico y que tenía que ir a buscarla, que estaba en el subsuelo de Circus Baby. Mike no entendió absolutamente nada de lo que su padre le dijo, pero aún así le hizo caso ya que él se sentía culpable por la muerte de su hermano más chico y haría lo que sea para salvar a su hermana. Es por eso que este baja a las profundidades de Circus Baby Pixar World y se encuentra con lo que su padre le había dicho, su hermana era un animatrónico. Desde ya que Mike tenía las mismas dudas que su padre en cuanto a cómo sacar a su familiar de ahí, pero eso lo resolvería Baby sola, porque tras seguir al pie de la letra todo lo que le decía su supuesta hermana, los animatrónicos Funtime se fusionarían en uno solo dando lugar a una nueva entidad, Ennard. Y este da a entender que la única manera de salir de Circus Baby Pixar World era hacerlos todos juntos, pero en el cuerpo de Michael. ¿Y cómo harían esto? Bueno, recordemos que este lugar también es el laboratorio de su padre y acá es cuando Michael descubriría la Scooper, una máquina que serviría para extraer el remanente de los animatrónicos. Bueno, esa misma máquina le inyectaría Ennard a Mike y tras pensar que estaba muerto, se confirma que claramente no. Lo que pasaría en las siguientes horas es que Mike expulsa todos los animatrónicos de su cuerpo debido a que no aguantaba toda esa cantidad de remanente. Y luego de que se desmayara al borde de la muerte, una voz, la voz de su hermana, le dice... Esto hace que Mike se levante y pueda estar vivo debido a que todavía en su cuerpo tenía remanente. Y como habíamos dicho, el remanente solamente puede destruirse si estaba todo junto, por lo que Mike y los animatrónicos Funtime estaban directamente relacionados. A pesar de esto, su hermana escapa junto con Ennard por las alcantarillas para luego dar paso a que la pantalla se apague y empieza a sonar un mensaje de Mike dirigido a su padre, terminando con la frase... Iré a buscarte. Volviendo a Fazbear Entertainment, ¿se acuerdan que esta empresa con la partida de Henry había comprado todos sus animatrónicos? Bueno, ahora en Freddy Fazbear Pizza, un local que cronológicamente debió haber estado hasta 1985 debido a que en una llamada de Fungi en Five Nights at Freddy's 2 durante la quinta noche hace referencia a que un restaurante había cerrado hacía un par de años, dos o más, un par. Y si sabemos que el restaurante de Five Nights at Freddy's 2 se funda en 1987, es muy fácil la cuenta que hay que sacar. Pero tampoco puede ser antes de 1983, ya que primero tiene que morir el hijo de William para que éste pierda completamente la cabeza y pase todo lo de Charlie. Por lo tanto, el primer Freddy Fazbear Pizza tendría que estar ubicado entre los años 1983 a 1985. Pero en este lugar pasarían una de las peores cosas. Luego de que suceda el incidente de dos empleados lastimados por usar los trajes híbridos, tanto a Fredbear como a Spring Bonnie los encierran y los dejan abandonados. Y aunque la empresa Fazbear Entertainment pudo encubrir este hecho, no pudieron tapar el incidente gigante que vendría. Debido a que estos dos empleados se lastiman, el local tiene que contratar más personal y es acá donde William aprovecharía para meterse como guardia de seguridad, buscar el traje de Spring Bonnie y en uno de los tantos cumpleaños de ese lugar, un 26 de junio de un año desconocido, este personaje deja de ser William para convertirse completamente en Purple Guy, asesinando a cinco niños. Cinco inocentes niños que debido a que la policía jamás pudo encontrar sus cuerpos se llamarían los niños perdidos o The Missing Childrens. Pero no es que estaban perdidos, sino que Puppet no iba a dejar que esto pasara de nuevo y por eso pone las almas de estos niños dentro de los animatrónicos y así podrían vengarse del hombre detrás del sacrificio. Estos niños serían Gabriel, Fritz, Susie, Jeremy y por último Cassidy. Luego de la supuesta desaparición de estos niños, el primer local de Fazbear entraría en una etapa de remodelaciones y tendría su gran apertura en 1987, el lugar donde transcurre Five Nights at Freddy's 2. En esta reapertura de Fazbear, entraría en juego un nuevo personaje, Jeremy Fiskeral, un guardia de seguridad que el juego lo hace pasar como el protagonista, pero el protagonista acá no es nada más ni nada menos que Fungi. Una persona misteriosa que no se sabe quién es, pero sí sabe todo lo que sucedió anteriormente, desde la muerte de los niños hasta que los animatrónicos persiguen a los guardias de seguridad, pero el chico del teléfono trata de decirte esto de la manera más liviana posible. A este restaurante vamos a llamarlo Freddy Fazbear Pizza 2. Tenía mucho más lujos que los anteriores, era más grande, más espacioso y sobre todo los animatrónicos eran distintos. Ahora ya la empresa tenía un conjunto de dos animatrónicos, los cinco viejos, los dos trajes híbridos y cuatro nuevos que serían los animatrónicos toys. Estos eran reversiones más chicas de Freddy, Bonnie y Chica, pero también estaban Mangle y Balloon Boy. Tenían el objetivo de ser mucho más amigables y contaban con el reconocimiento facial para identificar criminales. Es por eso que el asesinato de los cinco niños tiene que ocurrir antes de este segundo local, porque si no, ¿qué lógica tendría? Por supuesto que la empresa Fazbear Entertainment gastó una buena cantidad de plata en este lugar y no les saldría muy redituable este restaurante. A lo largo de las noches, Fungine nos va revelando ciertos acontecimientos y de la primera noche que tiene una voz calma o tranquila, llegamos a la última noche, donde su voz empieza a sonar de una manera mucho más nerviosa y preocupada. Jeremy entra un 8 de noviembre a trabajar en este restaurante y se va un 13 de noviembre, pero acá viene lo interesante. Recordemos que Puppet era Charlie y esta sabe que William había matado a cinco niños. Entonces decide devolverles la vida para que así puedan vengarse de su asesino y es acá donde entra el minijuego, en donde podemos ver a Freddy, Puppet y Purple Guy, los tres en una misma habitación y Purple Guy estaba ahí por una sola razón, robarse los trajes. Cosa que podemos deducir cuando la grabación de la última noche, Fungine dice esto. Por lo que ahora tiene más sentido y capaz que a Fungine se lo escucha tan agitado porque recordó lo que había pasado ese 26 de junio cuando alguien había entrado con el traje de Spring Bonnie a matar a cinco chicos. Sea como sea, en este restaurante pasa el hecho más confuso de todos, la mordida del 87. No se sabe bien cuál fue la razón o a quién, pero se supone que luego de que Fungine le diga ya que no se había matado a los cinco niños, se le ha dado cuenta de que el traje de Spring Bonnie pero se supone que luego de que Fungine le diga a Jeremy que si podía trabajar durante el turno de día, este fue mordido por algún animatrónico, cosa que nos enteraríamos recién cinco años después. Pero antes que cerrara este restaurante, la noche que Jeremy estaba trabajando en el día, a la noche no había nadie y es por eso que contratan a un tal Fritz Smith, que no es nada más ni nada menos que Mike, el hijo de William.</p>
      </div>
    )
  },
  {
    id: 3,
    name: "Maria Paula",
    role: "Miembro",
    avatar: "👤",
    color: "#FF6B6B",
    description: "La unica mujer del grupo",
    content: (
      <div>
        <p>la única mujer del grupo y fan n1 de el ship de Chávez y Polanco</p>
      </div>
    )
  },
  {
    id: 4,
    name: "Placeholder",
    role: "Null",
    avatar: "Nan",
    color: "#4ECDC4",
    description: "PLaceholder",
    content: (
      <div>
        <h3>Nothing</h3>
      </div>
    )
  }
];

const Button4 = ({ text, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close popup with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (selectedMember) {
          setSelectedMember(null);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, selectedMember]);

  const handleCardClick = (member) => {
    setSelectedMember(member);
  };

  const handleBackClick = () => {
    setSelectedMember(null);
  };

  return (
    <StyledWrapper>
      <button onClick={() => setIsOpen(true)}>{text}</button>

      <AnimatePresence>
        {isOpen && (
          <StyledPopup
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedMember(null);
                setIsOpen(false);
              }
            }}
          >
            <PopupContent
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CloseButton 
                onClick={() => {
                  setSelectedMember(null);
                  setIsOpen(false);
                }} 
                title="Close (Esc)"
              >
                ×
              </CloseButton>
              
              <ContentArea>
                <AnimatePresence mode="wait">
                  {!selectedMember ? (
                    <motion.div
                      key="member-grid"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HeaderSection>
                        <h1>Miembros del grupo</h1>
                        <p>Haz click en alguna carta prar ver mas sobre los miembros del grupo</p>
                      </HeaderSection>

                      <MemberGrid>
                        {memberData.map((member, index) => (
                          <MemberCard
                            key={member.id}
                            onClick={() => handleCardClick(member)}
                            color={member.color}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: index * 0.1,
                              ease: "easeOut" 
                            }}
                            whileHover={{ 
                              scale: 1.05, 
                              y: -10,
                              transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <CardAvatar>{member.avatar}</CardAvatar>
                            <CardContent>
                              <CardName>{member.name}</CardName>
                              <CardRole>{member.role}</CardRole>
                              <CardDescription>{member.description}</CardDescription>
                            </CardContent>
                            <CardHoverIndicator color={member.color}>
                              Click para ver mas 
                            </CardHoverIndicator>
                          </MemberCard>
                        ))}
                      </MemberGrid>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="member-detail"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DetailHeader>
                        <BackButton onClick={handleBackClick} title="Back to Members">
                          Back
                        </BackButton>
                        <DetailHeaderInfo>
                          <DetailAvatar>{selectedMember.avatar}</DetailAvatar>
                          <DetailTitle>
                            <h2>{selectedMember.name}</h2>
                            <span>{selectedMember.role}</span>
                          </DetailTitle>
                        </DetailHeaderInfo>
                      </DetailHeader>

                      <DetailContent color={selectedMember.color}>
                        {selectedMember.content}
                      </DetailContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ContentArea>
            </PopupContent>
          </StyledPopup>
        )}
      </AnimatePresence>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    font-size: 18px;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
    font-weight: bold;
    padding: 0.7em 2em;
    border: 3px solid #AEF3E7;
    border-radius: 2px;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
    color: #AEF3E7;
    text-decoration: none;
    transition: 0.3s ease all;
    z-index: 1;
    background: transparent;
    cursor: pointer;
  }

  button:before {
    transition: 0.5s all ease;
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    bottom: 0;
    opacity: 0;
    content: '';
    background-color: #AEF3E7;
    z-index: -1;
  }

  button:hover,
  button:focus {
    color: white;
  }

  button:hover:before,
  button:focus:before {
    left: 0;
    right: 0;
    opacity: 1;
  }

  button:active {
    transform: scale(0.9);
  }
`;

const StyledPopup = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 20, 20, 0.98);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PopupContent = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  border: 2px solid #AEF3E7;
  border-radius: 15px;
  padding: 0;
  box-shadow: 
    0 0 50px rgba(174, 243, 231, 0.3),
    0 20px 60px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  cursor: default;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    border-radius: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  font-size: 2.5rem;
  color: #AEF3E7;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(174, 243, 231, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    font-size: 2rem;
    width: 40px;
    height: 40px;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  overflow: auto;
  padding: 80px 60px 60px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(174, 243, 231, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #AEF3E7;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    padding: 60px 30px 40px;
  }

  @media (max-width: 480px) {
    padding: 60px 20px 30px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #AEF3E7;
    font-weight: 700;
    background: linear-gradient(135deg, #AEF3E7 0%, #5EEAD4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: #e2e8f0;
    opacity: 0.8;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const MemberCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%);
  border: 2px solid ${props => props.color || '#AEF3E7'};
  border-radius: 15px;
  padding: 2rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.color || '#AEF3E7'}, transparent);
  }

  &:hover {
    box-shadow: 
      0 0 30px rgba(174, 243, 231, 0.3),
      0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const CardAvatar = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  text-align: center;
`;

const CardName = styled.h3`
  color: #AEF3E7;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const CardRole = styled.div`
  color: #5EEAD4;
  font-size: 1rem;
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const CardDescription = styled.p`
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.8;
`;

const CardHoverIndicator = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${props => props.color || '#AEF3E7'};
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MemberCard}:hover & {
    opacity: 1;
  }
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(174, 243, 231, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const BackButton = styled.button`
  background: rgba(174, 243, 231, 0.1);
  border: 1px solid #AEF3E7;
  color: #AEF3E7;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(174, 243, 231, 0.2);
    transform: translateX(-2px);
  }
`;

const DetailHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const DetailAvatar = styled.div`
  font-size: 4rem;
`;

const DetailTitle = styled.div`
  h2 {
    color: #AEF3E7;
    font-size: 2rem;
    margin-bottom: 0.5rem;
    margin: 0;
  }

  span {
    color: #5EEAD4;
    font-size: 1.2rem;
    opacity: 0.8;
  }
`;

const DetailContent = styled.div`
  max-width: 800px;
  
  h3 {
    color: ${props => props.color || '#AEF3E7'};
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  p {
    color: #e2e8f0;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 0.8rem 0;
      padding-left: 2rem;
      position: relative;
      color: #e2e8f0;
      line-height: 1.5;
      font-size: 1rem;

      &:before {
        content: '→';
        position: absolute;
        left: 0;
        color: ${props => props.color || '#AEF3E7'};
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }
`;

export default Button4;