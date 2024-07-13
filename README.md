# Microservicios de Emax Peluqueria ✂️

Este proyecto es una extensión del turnero que realicé para el M2 del Bootcamp de Henry. Es mi primera aplicación que realizo siguiendo la arquitectura de microservicios. Pueden haber fallos y cosas que no sean correctas, pero esto recién es el comienzo. ¡Espero que sea de su agrado!

## Descripción

El proyecto está completamente bajo el entorno de Node.js. Se usaron los frameworks de NestJs y Express.js. Emax Peluquería es una aplicación en la cual se puede reservar un turno en un negocio con infinita disponibilidad, siempre y cuando sea en el horario laboral que indica el negocio. También, en su página se pueden comprar artículos específicos del negocio. Todo esto es observable en un dashboard de usuario donde se encuentra tu historial de pagos, inclusive.

### Microservicios

1. **[API Gateway](https://github.com/emacuello/emax-peluqueria-gateway)**: Punto de entrada al backend, recibe las solicitudes del cliente y se encarga de repartir las tareas a los diferentes microservicios. A su vez, cuando se trata del pago, de usuarios de Google, y para la subida de imágenes de perfil de usuario, es este servidor el encargado de hacerlo.
2. **[Microservicio de Auth, Users y Appointments](https://github.com/emacuello/emaxpeluqueria)**: Se encarga de registrar a los nuevos usuarios en la base de datos encriptando sus contraseñas con Bcrypt, verificar sus credenciales y emitir sus respectivos JWT, crear, modificar y eliminar turnos para los usuarios.
3. **[Microservicio de Products](https://github.com/emacuello/shop-emaxpeluqueria)**: El microservicio de productos es el encargado de crear, eliminar y modificar los productos para el Ecommerce de la aplicación.
4. **[Microservicio de Emails](https://github.com/emacuello/mailms)**: El microservicio de correos electrónicos es el encargado de enviar emails cuando un usuario se registra, crea un turno, cancela un turno y realiza una compra exitosa.
5. **[Microservicio de AccessTokens](https://github.com/emacuello/apioauthtoken)**: Este microservicio se encarga de la creación del AccessToken necesario para que el microservicio de correos electrónicos funcione correctamente.

## Diagrama

![Diagrama de microservicios](https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/ypf5twyrewahtu3frvbf)

# Microservicio de Emails

## Config

Para probar el Microservicio de Emails es necesario crear un `.env` en la raíz del proyecto que tengan estos valores:

- HOST_REDIS = host
- PORT_REDIS = 1234
- PASSWORD_REDIS = password
- CLIENT_ID = clientid
- CLIENT_SECRET = secret
- REFRESH_TOKEN = refreshtoken
- REDIRECT_URL = redirect_url
- USER_MAIL = usermail
- LOGO = logo.png
- MYEMAIL = me@mail.com
- API_OAUTH = api_de_accestokens

## Descripción

El microservicio está creado en NestJs con TypeScript. Se encarga del envio de emails con sus respectivos templates. El ms recibe eventos emitidos por redis para poder enviar los correos, para el envio de emails se usa Nodemailer y para los templates se usa Handlebars. Para el autenticación de NodeMailer se usa Oauth2, y para obtención del AccesToken se usa una peticion HTTP a otro microservicio. El microservicio se aloja en una instancia de AWS EC2, con el AMI de Amazon Linux 2.
