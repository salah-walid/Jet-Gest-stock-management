# Stock management full stack app(React/Django)

This is a Stock management app.
Can be built for web, Desktop(with electron), mobile(with ionic).
The backend is made with django

## Screenshots
![App](./screenshots/Screenshot_1.jpg)
![App](./screenshots/Screenshot_2.jpg)
![App](./screenshots/Screenshot_3.jpg)
![App](./screenshots/Screenshot_4.jpg)
![App](./screenshots/Screenshot_5.jpg)
![App](./screenshots/Screenshot_6.jpg)

## Requirements
-   [Node](https://nodejs.org/en/)
-   [Docker](https://www.docker.com/)

## Setup

Run the following commands :
```bash
yarn install
```

## Launch the app server bundle

Web version
```bash
yarn dev
```

Desktop version
```bash
yarn dev:electron
```

Android version
```bash
cd packages/app
npx cap add android
npx cap open android
```

## Launch the server only
```bash
docker compose up
```

you can access the admin page with this url [https://localhost:8000/admin](https://localhost:8000/admin)

On first server launch the server will create a super user with these credentials:
username: admin
password: admin

## License
[MIT](https://choosealicense.com/licenses/mit/)