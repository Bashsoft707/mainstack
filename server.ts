import { App } from "./config/app";

const { app } = new App()

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`))

process.on("unhandledRejection", (err: Error) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1))
})

