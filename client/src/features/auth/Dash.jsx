import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PART } from '../../config/constant.'

const Dash = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(PART.Task)
    }, [navigate])
    return <></>

    // return (
    //     <section className="mx-auto my-8 flex flex-col items-center justify-center p-4 px-5 text-center">
    //         <h2 className="mb-8 text-6xl font-bold dark:text-gray-600">
    //             Dash!
    //         </h2>
    //         <p className="mt-4 mb-8 dark:text-gray-400">
    //             Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    //             Cupiditate eveniet eligendi fugiat iusto! Quos, temporibus enim?
    //             Eum corrupti alias, doloremque mollitia sint quasi tempora vero
    //             facere error totam deleniti doloribus?
    //         </p>
    //     </section>
    // )
}

export default Dash
