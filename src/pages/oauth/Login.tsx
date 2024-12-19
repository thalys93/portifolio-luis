import { CaretLeft, GithubLogo } from '@phosphor-icons/react'
import { useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { GithubAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    function handleLogin() {
        setIsLoading(true)
        const provider = new GithubAuthProvider();
        signInWithPopup(getAuth(), provider).then((res) => {
            const credential = GithubAuthProvider.credentialFromResult(res);
            const token = credential?.accessToken;
            const user = res.user;
            console.log(token, user)

            if (user.email === import.meta.env.VITE_GITHUB_USER) {
                console.log("usuário correto");
                console.log("esse usuário é o :", user.email);

                localStorage.setItem("githubUser", JSON.stringify(user))
                localStorage.setItem("token", JSON.stringify(token))

                navigate("/admin/dashboard")
            } else {
                console.log("usuário incorreto");
                console.log("NÃO Autorizado");
            }

        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <section className='flex-1 bg-login-image bg-opacity-5 w-screen h-screen'>
            <Container>
                <section className='flex flex-col justify-center items-center'>
                    <article className='bg-slate-800 w-[30rem] h-[30rem] mt-[6rem] shadow-md shadow-slate-700 rounded-lg flex flex-col justify-between '>
                        <div className='justify-start items-center flex flex-col mt-3'>
                            <h1 className='text-2xl font-monts text-stone-50'>Login</h1>
                            <span className='text-stone-400 font-monts'>Sistema de Cadastro de novos projetos</span>
                        </div>

                        <div className='flex flex-col justify-center items-center mb-3 gap-5'>
                            <button onClick={handleLogin}
                                className='flex justify-center w-[15rem] h-[3rem] items-center gap-3 bg-sky-700 hover:bg-sky-800 transition-all rounded p-2'>
                                {isLoading ? <Spinner animation="border" size="sm" variant="light" /> : (
                                    <>
                                        <GithubLogo size={40} className='p-2 bg-stone-900 rounded-full text-stone-50' weight='fill' />
                                        <span className='font-monts text-stone-50'>Login com Github</span>
                                    </>
                                )}
                            </button>

                            <button onClick={() => window.history.back()}
                                className='flex justify-center w-[15rem] h-[3rem] items-center border-[1px] border-sky-700 hover:border-sky-800 transition-all rounded '>
                                <CaretLeft size={30} className='text-sky-500' weight='fill' />
                                <span className='font-monts text-sky-500'>Voltar</span>
                            </button>
                        </div>

                        <div className='justify-end items-center flex flex-col mb-3'>
                            <span className='font-monts text-stone-500 w-[20rem] text-center'>Somente o dono do portifólio tem acesso ao sistema</span>
                        </div>
                    </article>
                </section>
            </Container>
        </section>
    )
}

export default Login