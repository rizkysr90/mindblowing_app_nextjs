import { fetcher } from "../lib/api";
import Card from "../src/components/Card";
import Hero from "../src/components/Hero";
import Layout from "../src/components/Layout";
import qs from "qs";
import CardWithoutImage from "../src/components/CardWithoutImage";


export default function Home({articles,projects}) {
    return (
        <>
            <Layout>
                {/* Recent post */}
                <Hero/> 
                <div className="flex justify-center mb-10">
                    <h2 className="text-2xl border-b-2 inline-block opacity-70 sm:px-20 text-center pb-2">Articles</h2>

                </div>
                <ul className="grid gap-10 min-h-screen grid-cols-new4 sm:px-20"> 
                {
                    articles?.map((data) => {
                        return <Card key={data.id} article={data.attributes} />
                    })
                }
                </ul>
                <div className="flex justify-center my-10">
                    <h2 className="text-2xl border-b-2 inline-block opacity-70 sm:px-20 text-center pb-2">Projects</h2>
                </div>
                <ul className="grid gap-10 grid-cols-new4 sm:px-20">
                    {
                        projects.map((data) => {
                            return <CardWithoutImage key={data.id} project={data.attributes}/>
                        })
                    }
                </ul>
            </Layout>  
        </>
    )
}

export async function getStaticProps() {
    const query = qs.stringify({
        sort : ['release:desc'],
        pagination: {
            page: 1,
            pageSize: 6,
        },
        fields: ['title','release','preview_content','slug'],
        populate: {
            cover_image : {
                populate : ''
            },
            categories : {
                populate : ''
            },
            contributor: {
                populate :  'profile_image'
            }
        }
       
    }, {
        encodeValuesOnly: true
    })
    const articleResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?${query}`)
    const projectResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects`);
    return {
        props : {
            articles : articleResponse?.data,
            projects : projectResponse?.data,
        }
    }
}