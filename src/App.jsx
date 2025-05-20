import './App.css'
import Chatbot from './components/chatbot'
function App() {

  return (
    <>
      <div className='h-[15%] w-screen fixed top-0 bg-neutral-700 flex justify-center items-center flex-row'>
        <h1 className='text-neutral-100 text-[20px]'>La pagina web oficial de "אוננות בפעולה"</h1>
      </div>
      <section className='w-screen h-screen bg-neutral-900 flex items-center justify-center'>
      <br /><br /><br /><br /><br />
        <div className='flex items-center justify-center flex-col'>
          <h1 className='text-neutral-100 text-[30px]'>PRESIDENTE ACTUAL DEL GRUPO: Jhan Pierre Zamora Galvis</h1>
          <br /><br /><br />
          <h1 className='text-neutral-100 text-[30px]'>PARTIDO POLITICO ACTUAL: Centro Demoniaco</h1>
          <br /><br /><br /><br />
          <img src="Tarjeta de presidencia.png" alt="" className='h-40 w-auto'/>
        </div>
        <div className='fixed bottom-0 left-0 flex flex-col'>
          <Chatbot/>
          <div className='h-[10%]'><p className='text-10 text-white'>Hecho por Jhan Zamora 2025°</p></div>
        </div>
      </section>  
    </>
  )
}

export default App

/*
                                                                                                                 
                                                                            ⢀⣠⣰⣼⠾⢿⣔                              
                             ⣠⡾⠟⢽⣴⡀                                     ⢀⣠⣸⡿⠟⠇⠁   ⠫⣔                             
                           ⢠⣾⠇   ⠋⢿⣴⡀                                 ⣠⣼⠟⠇         ⠫⣔                            
                          ⢠⡿⠅      ⠋⢿⣴⡀            ⢀⣐⣐⣀             ⣠⡾⠗⠁            ⠫⡔                           
                         ⣨⡿⠁         ⠃⢿⣴⡀         ⣨⡟⠁ ⠃⠏⠽⢴⣐       ⢀⣺⠟                ⢯⡐                          
                        ⢠⡿⠁            ⠋⢿⣔       ⢨⠗       ⠃⠯⣴⡀    ⣺⠗                 ⠂⣵                          
                        ⣿⠕               ⠯⣽⡀    ⢀⡟          ⠂⠋⢴⡀ ⢨⡗                   ⢫⡔                         
                       ⢪⡟                 ⠊⢿⣔   ⠊⡕             ⢯⣐⣿⡕                   ⠂⣵                         
                       ⣾⠕                   ⠋⢽⡐  ⢯⡐            ⠊⣿⡿⠁                    ⣿                         
                       ⣿                     ⠂⠯⣴⣀⣸⠟             ⠂                      ⣿                         
                      ⢨⣿                     ⢀⣸⠟⠇                                      ⣿                         
                      ⢪⣿                    ⢨⣿⣵⣰⣰⣼⣼⣰⣰                                 ⢠⡕                         
                      ⠪⣿                                                              ⣪⡕                         
                       ⣿                                                              ⣿                          
                       ⢪⡔                 ⢀⣠⣸⡼⠼⣼⣰⣀                                   ⣪⠗                          
                       ⠪⣽               ⣀⣸⠟⠇    ⠂⠯⣽⡀          ⢀⣠⣰⢼⣼⣴⣰⡀              ⣨⡟                           
                        ⢿⡐            ⢀⣼⠟⠁        ⠋⣽⡀       ⣠⠞⠇⠁    ⠃⠏⢽⣰⡀          ⣨⡟                            
                        ⠊⣵           ⢠⣿⠅         ⣠⣐⠋⠅     ⢠⠟⠁⢀⣀⡀       ⠃⢯⣴⡀       ⣸⡿                             
                         ⢫⣔         ⢠⣿⠅        ⢀⣾⣿⣿⣵        ⢨⣿⣿⣿⣴        ⠋⣽⡀    ⢀⣺⡟⠁                             
                          ⢯⡐        ⣺⡕        ⢀⣾⣿⣿⣿⣿⡕       ⢪⣿⣿⣿⣿⣵        ⠪⣽   ⢠⣿⣷⣀⣀⣀                            
                          ⠂⢯⡐       ⣿⠅        ⣪⣿⣿⣿⣿⣿⣿       ⢪⣿⣿⣿⣿⣿         ⣿⡕  ⠂⠃⠃⠃⠃⣿⠅                           
                      ⣰⠰⠸⠼⠼⠾⠿       ⢿⡔        ⣿⣿⣿⣿⣿⣿⡟       ⢪⣿⣿⣿⣿⣿         ⣺⡕      ⢨⡗                            
                      ⠫⣔            ⠊⣽⡀       ⢯⣿⣿⣿⣿⡿⠁       ⠂⣿⣿⣿⣿⡟        ⢀⣿⠕     ⢠⡿                             
                       ⠊⢵⡐           ⠂⠭⣐       ⠋⠯⠟⠇          ⠂⠏⠏⠇         ⠾⠗      ⣾⠁                             
                         ⠋⢴⡀       ⠈⢅⣀⠼⠃             ⠈⠿⠏               ⠄         ⢪⡕                              
                           ⡽        ⠃⠁                                           ⠪⡕                              
                          ⢨⠅                     ⣰         ⢽⡐                     ⣿                              
                          ⡿                      ⢽⣐⣠⣸⠼⢴⣐⣀⣀⣀⣺⠕                ⣠⣸⣴⣰⣰⣾⡔                             
                          ⡕  ⢀⣠⡰⠼⠼⣴⣐               ⠁    ⠃⠃⠃               ⢀⣠⡾⠟⠁  ⠂⠃                              
                          ⠽⠜⠏⠃    ⠂⠋⠿⢼⣴⣐⣀⣀                         ⢀⣠⣰⣰⣸⠼⠞⠇⠁                                     
                                       ⠃⢏⣿⣿⣿⣽⣼⣼⣼⠐                  ⠂⢯⣗⠁                                          
                                        ⢿⡿⠏⠏⠏⠃⠁                      ⢯⣔                                          
                                        ⠊⣿⡐                           ⢯⡔                                         
                                         ⠊⣽⡀          ⣀   ⣀           ⠂⢿⡐         ⢀⣰⣐       ⣠⣰⣰⡀                 
                                          ⠊⣿⡔         ⣿⡕ ⢀⣿            ⠊⣿⡀        ⣺⡟⠯⣽⡐   ⣠⣾⠟⠁⠃⢿⣔                
                                         ⢀⣺⡿⠁         ⢯⣵ ⢪⡿             ⢫⣽      ⣠⣾⠟  ⠂⠯⣼⡼⠿⠏⠁   ⠂⣿⡐               
                                        ⢀⣾⠗ ⣀⡀        ⢪⣿ ⣿⡕              ⣿⣴⣀⣀⣠⣸⡾⠟⠁              ⢪⣽               
                                        ⣾⣿⣾⣿⠿⠅        ⠂⣿⣴⣿⠅              ⢪⣿⡟⠏⠃⠁                 ⢪⣿               
                                        ⠃⠃⢫⡿           ⢿⣿⣿           ⣨⡐  ⠂⣿⣵                    ⣺⡕               
                                          ⣪⠕           ⢪⣿⡗          ⢠⣿    ⢫⣿⡐                  ⣨⣿                
                                        ⢀⣸⡿            ⠊⣿⡕          ⣺⡕    ⠂⣿⣵                ⢀⣸⡿⠁                
                                     ⣀⣸⡾⠏⠁   ⡀          ⣿⡕         ⣨⡟      ⢯⣿⡀            ⢀⣠⣸⡿⠇                  
                                  ⣀⣸⣾⣿⣿⣽⣰⡀  ⠊⣿⣔         ⣿⡕        ⣨⡿⠅      ⠂⢿⣽⣴⡀         ⠨⣿⣿⠁                    
                              ⢀⣠⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣴  ⠊⣿⣐        ⣿⡕       ⣨⣿⠅     ⣀⣰⣸⣼⣿⣿⣿⣴⡀        ⠂⠏⠯⠼⣼⡐                 
                      ⢀⣸⣾⣼⣰⣰⣸⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣵  ⠊⢿⣵⡀     ⢠⣿⣕     ⣀⣾⡿⠅   ⢀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣴          ⣠⡿⠅                 
                     ⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡕  ⣠⣿⠿⣽⣴⣰⣰⣸⡿⠿⢿⣴⣰⣰⣼⣾⣿⣿    ⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣐      ⣠⣾⠟⠁                  
                    ⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣠⣺⠟⠁    ⠃⠁   ⠂⠃⠃  ⠂⠯⣽⡐ ⣺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣼⣰⣰⣼⠿⠇                     
                   ⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁                  ⠋⢿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁                       
                   ⣺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠇                       ⠫⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡐                      
                   ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠇                          ⠂⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿                      
                   ⢯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠇                              ⠋⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡔                     
                   ⠊⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁                                  ⠫⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠅                     
                    ⠂⠯⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠏⠃                                      ⠂⠯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇                      
                       ⠂⠃⠋⠏⠏⠏⠏⠃⠁                                           ⠂⠋⠿⢿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠇                        
                                                                                ⠃⠃⠃⠃⠃                            
                                                                                                                 

*/