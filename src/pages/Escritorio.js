import React, { useContext, useState } from 'react'
import { useHideMenu } from '../hooks/useHideMenu'
import { SockectContext } from '../context/SocketContext'

import { Button, Col, Divider, Row, Typography } from 'antd'
import { CaretRightOutlined, CloseCircleOutlined } from '@ant-design/icons'

import { getUsuarioStorage } from '../helpers/getUsuarioStorage'
import { Redirect, useHistory } from 'react-router'

const { Title, Text } = Typography

export const Escritorio = () => {

    useHideMenu( false );                                       // Aquí si se muestra el menu
    const [ usuario ] = useState( getUsuarioStorage() );        // Estado de usuario según localStorage
    const history = useHistory();
    const { socket } = useContext( SockectContext );             // Extraemos el socket del context
    const [ticket, setTicket] = useState( null );


    const salir = () => {
        localStorage.clear();                                   // Limpia el localStorage
        history.replace('/ingresar');                           // nos devuelve a /ingresar
    }

    const siguienteTicket = () => {
        socket.emit( 'siguiente-ticket-trabajar', usuario, ( ticket ) => {
            setTicket( ticket )
        } )
    }

    if( !usuario.agente || !usuario.escritorio ){       // Si no existen los valores de agente y escritorio redirigimos a /ingresar
        return <Redirect to="/ingresar" />
    } 

    return (
        <>
            <Row>
                <Col span={ 20 }>
                    <Title level={ 2 }>{ usuario.agente }</Title>
                    <Text>Usted está trabajando en el escritorio: </Text>
                    <Text type="success">{ usuario.escritorio }</Text>
                </Col>
                <Col span={ 4 } align="right">
                    <Button
                        shape="round"
                        type="danger"
                        onClick={ salir }>
                            <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>
            </Row>

            <Divider />

            {
                ticket && (
                    <Row>
                        <Col>
                            <Text>Esta atendiendo el ticket numero: </Text>
                            <Text 
                                style={{ fontSize: 30 }}
                                type="danger">
                                { ticket.numero }
                            </Text>
                        </Col>
                    </Row>

                )
            }


            <Row>
                <Col offset={ 18 } span={ 6 } align="rigth">
                    <Button
                        shape="round"
                        type="primary"
                        onClick={ siguienteTicket }>
                            <CaretRightOutlined />
                            Siguiente
                    </Button>
                </Col>
            </Row>
        </>
    )
}
