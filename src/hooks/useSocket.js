import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client'; //npm i socket.io-client

export const useSockets = ( serverPath ) => {

    const socket = useMemo( () => io.connect(serverPath, { transports:['websocket'] }), // Memorizamos la conexión al socket-cliente al backend
        [ serverPath ]);

    const [online, setOnline] = useState( false );          // Definimos el state para online

    useEffect(() => {                                       // Cuando el socket cambia por primera vez
        setOnline( socket.connected )                       // usamos el método setOnline y establecemos la conexión (online=true)
    }, [ socket ])

    useEffect(() => {                                       // En los futuros cambios este useEffect será el que determine la reconexión
        socket.on('connect', () => {                        // 'connect' es uno de los eventos de los sockets y estaremos pendientes de el
            setOnline( true )                               // para reestableces el estado de la conexión.
        })
    }, [ socket ])

    useEffect(() => {                                       // Lo mismo pero para la desconexion
        socket.on('disconnect', () => {
            setOnline( false )
        })
    }, [ socket ])

    return {
        socket,
        online
    }

}

