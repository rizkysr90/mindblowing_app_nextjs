import {DotsVerticalIcon} from '@heroicons/react/solid'
import Link from 'next/link';
export function formattedDate(strDate) {
    const month = {
        '01' : 'January',
        '02' : 'February',
        '03' : 'Maret',
        '04' : 'April',
        '05' : 'Mei',
        '06' : 'Juni',
        '07' : 'Juli',
        '08' : 'Agustus',
        '09' : 'September',
        '10' : 'Oktober',
        '11' : 'November',
        '12' : 'Desember'
    }
    const split = strDate.split('-');
    let res = '';
    res += `${split[2]} `
    res += `${month[split[1]]} `;
    res += `${split[0]}`
    return res;

}
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
export default function Card({article}) {
    // const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}`;
    const coverImage = article.cover_image?.data.attributes.url;
    const title = article.title;
    const contentPreview = article.preview_content;

    const category = article.categories?.data;
    const contributor_pp =  article.contributor?.data.attributes.profile_image?.data.attributes.url;
    const contributor_name = article.contributor?.data.attributes.name;
    const releaseArticle = article.release;
    // const coverImageAlt = 
    const slugArticle = article.slug;
    return (
        <>
            <li className="mx-4 sm:mx-0 flex flex-col ">
                <div className="flex mt-3 p-2 mx-4 rounded-t-md  bg-base-100">
                    <img className="w-10 h-10 xs:w-14 xs:h-14 object-cover rounded-full mr-3"
                        src={contributor_pp}
                    />
                    <div className="opacity-70 flex flex-col   sm:text-sm justify-center ">
                        <p className='text-base italic font-semibold'>{` ${contributor_name}`}</p>
                        <time className='text-xs'>
                            {formattedDate(releaseArticle)}
                        </time>
                    </div>
                    <div className='ml-auto'>
                        <DotsVerticalIcon className='flex items-center h-full w-5'></DotsVerticalIcon>
                    </div>
                </div>
                
                <Link href= {`/article/${slugArticle}`}>
                    <a>
                        <div className="mx-4">
                            <div className="">
                                <img className="w-full h-48 object-cover " 
                                src={coverImage} alt='cover image mindblowing artikel'/>

                            </div>
                            <h2 className="font-bold text-xl my-3 ">{title}</h2>
                            <p className="font-normal text-base">{contentPreview}</p>
                            <div className="my-3">
                                <div className="flex">
                                    {
                                        category?.map(data => {
                                            return (
                                            <div className="bg-accent py-1 px-2 text-sm mr-1 rounded-md" 
                                            key={data.id}><span className="opacity-70">
                                                {capitalizeFirstLetter(data.attributes?.name)}
                                                </span>
                                            </div>
                                            )
                                        })
                                    }
                                </div>
                            
                            </div>
                        </div>
                    </a>
                </Link>
            </li>
        </>
    )
}