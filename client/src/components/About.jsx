import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTitle from '../hooks/useTitle'

const About = () => {
    useTitle('About')

    return (
        <section className="my-8 flex flex-col items-center justify-center p-4 text-center">
            <a href="https://github.com/HoNamDuong">
                <FontAwesomeIcon className="mr-3" icon={faGithub} />
                HoNamDuong
            </a>
            <a href="https://github.com/HoNamDuong/PageTask">
                <FontAwesomeIcon className="mr-3" icon={faCode} />
                Source
            </a>
        </section>
    )
}

export default About
