import React, { useState } from 'react'
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography

const layout = {
  labelCol: { span: 8 },    // Nº de columna donde empiezan los inputs
  wrapperCol: { span: 14 }, // Nº de columnas que ocupan los inputs
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 14 }, //Donde comienza el boton, lo que ocupa
};


export const Ingresar = () => {

    const history = useHistory();

    const [ usuario ] = useState( getUsuarioStorage() );    // Definimos usuario según localStorage

    useHideMenu( false );                                   // Aquí si se muestra el menú
                          //values names
    const onFinish = ({ agente, escritorio }) => {          // Si los inputs del form son válidos (required:true y texto o número 1-99)
        console.log('Success:', agente, escritorio);        // mensaje de consola ok
        localStorage.setItem( 'agente', agente );           // grabamos en localStorage el valor de esos inputs
        localStorage.setItem( 'escritorio', escritorio);
        history.push('/escritorio');                        // redirección a /escritorio
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if( usuario.agente && usuario.escritorio ){             // Si existen los valores de agente y escritorio redirigimos a /escritorio
        return <Redirect to="/escritorio" />
    }                                                       // Sino sigue la ejecución de esta pantalla abajo

    return (
        <>
        <Title level={2}>Ingresar</Title>
        <Text>Ingrese su nombre y su número de escritorio</Text>
        <Divider></Divider>

        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

            <Form.Item
                label="Nombre del agente"
                name="agente"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese su nombre',
                    },
                ]}>

                <Input />
            </Form.Item>

            <Form.Item
                label="Escritorio"
                name="escritorio"
                rules={[
                    {
                        required: true,
                        message: 'Ingrese el número del escritorio',
                    },
                ]}
            >
                <InputNumber min={ 1 } max={ 99 }/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" 
                        htmlType="submit"
                        shape="round">
                    <SaveOutlined />    
                    Ingresar
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}
