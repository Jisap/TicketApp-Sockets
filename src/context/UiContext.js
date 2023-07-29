
import React, { createContext, useState } from 'react'

export const UiContext = createContext();                                       // Creamos un context




export const UiProvider = ({ children }) => {              // Cada objeto context viene con un componente provider que permite que otros componentes se subscriban
                                                           // a los cambios del context. Children es el componente que colocaremos dentro del provider

    const [ocultarMenu, setocultarMenu] = useState( true );     // Estado de ocultarMenu            

    const showMenu = () => {
        setocultarMenu( false );                                // Función para mostrar menu
    }

    const hideMenu = () => {
        setocultarMenu( true );                                 // Función para ocultar menu
    }

    return (
        <UiContext.Provider value={{                            // Aquí ponemos lo que queremos compartir con otros componentes ( childrens )
            ocultarMenu,
            showMenu,
            hideMenu
        }}>
            { children }
        </UiContext.Provider>
            
        
    )
}
