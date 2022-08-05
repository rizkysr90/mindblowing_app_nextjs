import { fetcher } from "../lib/api";
import Card from "../src/components/Card";
import Hero from "../src/components/Hero";
import Layout from "../src/components/Layout";
import qs from "qs";


export default function Home({articles}) {
    return (
        <>
            <Layout>
                {/* Recent post */}
                <Hero/> 
                <ul className="grid gap-10 min-h-screen grid-cols-new4 sm:px-20"> 
                {
                    articles?.map((data) => {
                        return <Card key={data.id} article={data.attributes} />
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

    return {
        props : {
            articles : articleResponse?.data
        }
    }
}