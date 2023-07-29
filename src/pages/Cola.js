import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Typography, List, Card, Tag, Divider } from 'antd';
import { useHideMenu } from '../hooks/useHideMenu';
import { SockectContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';



const { Title, Text } = Typography;




export const Cola = () => {

    useHideMenu( true ); // Aquí si se oculta el menú

    const { socket } = useContext( SockectContext );        // Extraemos el socket del context
    const [tickets, setTickets] = useState([]);             // Establecemos los tickets que están siendo asignados

    useEffect(() => { 
        socket.on('ticket-asignado', ( asignados ) => {     // Recibimos los últimos 13 tickets
            setTickets( asignados );                        // Los asignados se igualan a tickets que serán renderizados 
        })

        return () => {
            socket.off('ticket-asignado')
        }
    }, [ socket ])

    useEffect(() => {
        getUltimos()
            .then( tickets => setTickets( tickets ) ) 
    }, []) // Dependencia vacia para que solo se ejecute una vez

    return (
        <>
            <Title level={ 1 }>Atendiendo al cliente</Title>
            <Row>
                <Col span={ 12 }>
                    <List 
                        dataSource={ tickets.slice(0,3) }
                        renderItem={ item => (
                            <List.Item>
                                <Card
                                    style={{ width:300, marginTop:16 }}
                                    actions={[
                                        <Tag color="volcano"> { item.agente } </Tag>,
                                        <Tag color="magenta"> Escritorio: { item.escritorio } </Tag>,
                                    ]}>
                                    <Title> Nº. { item.numero }</Title>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>

                <Col span={ 12 }>
                    <Divider> Historial </Divider>
                    <List
                        dataSource={ tickets.slice(3) }
                        renderItem={ item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`Ticket nº. ${item.numero}`}
                                    description={
                                        <>
                                            <Text type="secondary">En el escritorio </Text>
                                            <Tag color="magenta"> { item.numero }</Tag>
                                            <Text type="secondary"> Agente  </Text>
                                            <Tag color="volcano"> { item.agente }</Tag>
                                        </>
                                    }
                                />           
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </>
    )
}
