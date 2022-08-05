import { fetcher } from "../../lib/api";
import Layout from "../../src/components/Layout";
import qs from "qs";
import { capitalizeFirstLetter, formattedDate } from "../../src/components/Card";
import {ExternalLinkIcon} from '@heroicons/react/outline'

export default function Article({article}) {
    const data = article.attributes;
    const articleCategory = data.categories?.data
    const articleTitle = data.title;
    const coverImage = data.cover_image?.data.attributes.url;
    const altCoverImage = data.cover_image?.data.attributes.alternativeText;
    const contributor_pp = data.contributor?.data.attributes.profile_image.data.attributes.url;
    const altContributor_pp = data.contributor?.data.attributes.profile_image.data.attributes.alternativeText;
    const contributor_name = data.contributor?.data.attributes.name;
    const contributor_work = data.contributor?.data.attributes.work;
    const contributor_instagram = data.contributor?.data.attributes.instagram;
    const contributor_linkedin = data.contributor?.data.attributes.linkedin;

    const releaseArticle = data.release;
    console.log(data);
    return (
        <Layout>
            <div className="mt-16 flex flex-col mx-2">
                <div className="flex justify-center">
                    {
                        articleCategory?.map(data => {
                            return (
                            <div className="bg-accent py-1 px-2 mx-2 text-sm rounded-md" 
                                key={data.id}>
                                <span className="opacity-70">
                                {capitalizeFirstLetter(data.attributes?.name)}
                                </span>
                            </div>
                            )
                        })
                    }
                </div>
                <div className="flex justify-center mt-2 ">
                    <time className='border-b-2 border-warning px-2 py-1 opacity-70'>
                                        {formattedDate(releaseArticle)}
                    </time>
                </div>
                
                <h1 className="font-extrabold text-2xl text-center my-4">{articleTitle}</h1>
                <img src ={coverImage} alt={altCoverImage} className='w-full h-44 object-cover rounded-t-lg'></img>
                <div className="relative min-h-screen">
                    <div className="flex flex-col items-center my-3 absolute w-full -top-10 bg-white ">
                        <img className="w-14 h-14 object-cover rounded-full mt-4 mb-2"
                            src={contributor_pp}
                        />
                        <div className="opacity-70 flex items-center text-xs xs:text-sm font-semibold italic self-center">
                            <p>{` ${contributor_name}`}</p>
                        </div>
                        <div className="opacity-70 text-xs xs:text-sm font-semibold italic self-center">{contributor_work}</div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const query = qs.stringify({
        fields: ['title','release','slug'],
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
    const {slug} = params;
    const articleResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/slugify/slugs/article/${slug}?${query}`);
    
    return {
        props : {
            article : articleResponse.data
        }
    };
}