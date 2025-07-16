
const HeadingDescription = ({ title, description }) => {
    return (
        <div>
            <h1 className="font-bold text-3xl text-primary">{title}</h1>
            <p className="text-lg text-gray-600 mt-2">{description}</p>
        </div>
    )
}

export default HeadingDescription