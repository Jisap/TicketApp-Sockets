import { useContext, useEffect } from 'react'
import { UiContext } from '../context/UiContext'



export const useHideMenu = ( ocultar ) => {                     // Este hook establece el estado de ocultarMenu según un argumento (ocultar)

    const { showMenu, hideMenu } = useContext( UiContext );     // Extraemos del context las funciones que permiten cambiar el estado

    useEffect(() => {
        if( ocultar ){  // si ocultar es true
            hideMenu(); // ocultarMenu será true
        }else{          // sino
            showMenu(); // ocultarMenu será false
        }
        
    }, [ ocultar, hideMenu, showMenu ])

    
}
