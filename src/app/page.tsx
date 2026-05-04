import Link from "next/link"

const Home = () => {
    return (
        <main>
            <h1>Taskly</h1>
            <p>Your tasks organizer!</p>
            <Link href="/login">Entrar</Link>
            <Link href="/register">Criar conta</Link>
        </main>
    )
}

export default Home