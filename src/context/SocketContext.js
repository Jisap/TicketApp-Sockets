import React, { createContext } from "react";
import { useSockets } from "../hooks/useSocket";

export const SockectContext = createContext();    // Creamos el context

export const SocketProvider = ( {children} ) => { // Cada objeto context viene con un componente provider que permite que otros componentes se subscriban
                                                  // a los cambios del context. Children es el componente que colocaremos dentro del provider
    const { socket, online } = useSockets('http://localhost:8080');
    
    return (

        <SockectContext.Provider value = {{ socket, online }}>
            { children }
        </SockectContext.Provider>
    )
}