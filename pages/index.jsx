import { fetcher } from "../lib/api";
import Card from "../src/components/Card";
import Hero from "../src/components/Hero";
import Layout from "../src/components/Layout";

export default function Home({articles}) {
    return (
        <>
            <Layout>
                {/* Recent post */}
                <Hero/> 
                <ul className="grid gap-10 min-h-screen grid-cols-new4 sm:px-20"> 
                {
                    articles.map((data) => {
                        return <Card key={data.id} article={data.attributes}/>
                    })
                }
                </ul>
                
            </Layout>  
        </>
    )
}

export async function getStaticProps() {
    const articleResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`)
    return {
        props : {
            articles : articleResponse.data
        }
    }
}