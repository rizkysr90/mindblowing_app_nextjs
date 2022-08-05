import { fetcher } from "../../lib/api";
import Layout from "../../src/components/Layout";
import qs from "qs";
import { capitalizeFirstLetter, formattedDate } from "../../src/components/Card";
import {ExternalLinkIcon} from '@heroicons/react/outline'
import markdownToHtml from "../../lib/markdownToHtml";
export default function Article({article,contentArticle}) {
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
    return (
        <Layout>
            <div className="mt-16 flex flex-col mx-2 ">
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
                
                <h1 className="font-extrabold text-2xl text-center my-4 xs:text-3xl sm:text-4xl">{articleTitle}</h1>
                <img src ={coverImage} alt={altCoverImage} className='w-full h-44 xs:h-52 sm:h-72 lg:h-96 object-cover lg:object-contain rounded-t-lg'></img>
                <div className="mb-8">
                    <div className="flex flex-col items-center my-3 ">
                        <img className="w-14 h-14 object-cover rounded-full mt-4 mb-2"
                            src={contributor_pp}
                        />
                        <div className="flex flex-col items-center text-xs xs:text-sm font-semibold italic self-center">
                            <p className="text-base">{contributor_name}</p>
                            <p className="opacity-70 ">{contributor_work}</p>
                        </div>
                    </div>
                </div>
                <div className="mx-2 min-h-screen flex flex-col">
                    <article
                    className='prose max-w-full lg:prose-xl text-left  mx-auto overflow-hidden text-lg mb-10'
                    dangerouslySetInnerHTML={{__html: contentArticle}}>
                        
                    </article>
                    <div class="divider mt-auto  opacity-70 text-xs xs:text-sm font-semibold italic">End</div>
                </div>
               
            </div>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const query = qs.stringify({
        fields: ['title','release','slug','content'],
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

    const contentArticle = await markdownToHtml(articleResponse.data.attributes.content);
    return {
        props : {
            article : articleResponse?.data,
            contentArticle
        }
    };
}