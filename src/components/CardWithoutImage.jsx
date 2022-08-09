export default function CardWithoutImage({project})  {
    const {name,description,url_demo,url_repo,release} = project;
    return (
        <>
            <div className="card mx-4 sm:mx-0 bg-accent mx-auto sm:mx-0 shadow-md">
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                    <div className="card-actions justify-end">
                        <a className="btn" href={url_repo} target={"_blank"}>Repository</a>
                        <a className="btn" href={url_demo} target={"_blank"}>Demo</a>
                    </div>
                </div>
            </div>
            
        </>
    )
}


