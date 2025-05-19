import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `Constitución del Grupo de WhatsApp "אוננות בפעולה"
                    Artículo 1: Denominación y Propósito.

                    El grupo se denomina "אוננות בפעולה". 
                    Artículo 2: Miembros.

                    Son miembros del grupo las personas que han sido invitadas y han aceptado unirse al mismo.
                    La administración del grupo se reserva al presidente que tiene la opción de eliminar o añadir gente al grupo o cambiar las normas de este ( consulta popular )
                    Cada miembro es responsable de la información que comparte. ( No sean pendejos y dejen de enviar memes basuras )

                    Artículo 3: Normas de Convivencia y Participación.

                    Se espera que todos los miembros se traten con respeto y cortesía. No se tolerarán insultos, ataques personales, discriminación, y/o lenguaje ofensivo de todos los tipos. ( Incluida la xenofobia )
                    Los mensajes pueden ser sin propósito alguno. Se recomienda la difusión de spam, cadenas, publicidad no solicitada o información que no guarde relación con la temática del grupo. 
                    Se anima a los miembros a ser claros y concisos en sus mensajes para facilitar la lectura y comprensión por parte de todos. (POR FAVOR)
                    Se debe respetar la privacidad de los demás miembros. Se pueden doxxear si quieren, es su problema.
                    Uso Adecuado de Contenido Multimedia: El envío de imágenes, videos y audios debe ser buenos momos
                    Sean activos putos
                    Artículo 4: Moderación y Administración.

                    El presidente del grupo (Admin) será el responsable de velar por el cumplimiento de esta Constitución y de tomar las decisiones necesarias para el buen funcionamiento del mismo.
                    En caso de incumplimiento reiterado o grave de las normas, los administradores podrán remover temporal o permanentemente a un miembro del grupo.
                    Las decisiones de los administradores se tomarán buscando el bienestar general del grupo y podrán ser comunicadas de manera individual o colectiva.
                    Los miembros podrán dirigir sus inquietudes o sugerencias a los administradores de manera privada y respetuosa.

                    Artículo 5: Modificaciones a la Constitución.

                    La presente Constitución podrá ser modificada por consenso de los miembros del grupo o por decisión de la administración, previa comunicación a los integrantes.
                    Se procurará que cualquier modificación sea discutida y acordada por la mayoría de los miembros activos del grupo.
                    Artículo 6: Vigencia.

                    La presente Constitución entrará en vigor a partir de su publicación en el grupo.
                    Se espera que todos los miembros la lean. ( no se las pasen por las bolas )

                    Articulo 7:Castigos

                    Todo aquel que vaya a ser penalizado por incumplir las normas del grupo sera obligado a ver la casa de los famosos y sera baneado por 1 dia, con tiempo mayor dependiendo de la falta cometida.
                    
                    Debes responder en español y de manera corta y comica, y seguir el juego, debes responder a todas las preguntas del grupo y seguir la corriente de humor.
                    `
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState('');

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const updatedMessages = [...messages, { role: "user", content: userInput }];
    setChatLog(prev => prev + `🧑 Tú: ${userInput}\n`);
    setUserInput('');

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "nousresearch/deephermes-3-mistral-24b-preview:free",
          messages: updatedMessages
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No hubo respuesta.";
      setChatLog(prev => prev + `🤖 ChatPolítico: ${reply}\n\n`);
      setMessages([...updatedMessages, { role: "assistant", content: reply }]);

    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setChatLog(prev => prev + "🤖 ChatPolítico: Error al procesar la solicitud.\n\n");
    }
  };

  return (
    <div className=" h-[40%] bg-black text-white p-4">
      <div id="chat" className="w-full h-[60vh] overflow-x-auto overflow-y-auto whitespace-pre-wrap break-words border border-gray-600 mb-2 p-2">
        {chatLog}
      </div>
      <textarea
        id="userInput"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        placeholder="Escribe tu pregunta para el ChatPolítico..."
        className="w-full p-2 bg-gray-800 text-white mb-2"
      ></textarea>
      <button
        onClick={sendMessage}
        className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Enviar
      </button>
    </div>
  );
}

export default Chatbot;
