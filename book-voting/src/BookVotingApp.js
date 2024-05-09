import HomePage from "./pages/HomePage"
import { SocketProvider } from "./context/SocketContext"

export const BookNamesApp = () => {
    return (
        <SocketProvider>
            <HomePage/>
        </SocketProvider>
    )
}