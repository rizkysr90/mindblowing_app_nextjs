import {CalendarIcon} from '@heroicons/react/solid'
function formattedDate(strDate) {
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
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
export default function Card({article}) {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}`;
    const coverImage = url+article.cover_image?.data.attributes.url;
    const title = article.title;
    const contentPreview = article.preview_content;
    const category = article.categories?.data;
    const contributor_pp =  url+'/uploads/bf81e9aca497a381a7523958e152eaf7_528bac81cd.jpg';
    const contributor_name = article.contributor?.data.attributes.name;
    const releaseArticle = article.release;
    // const coverImageAlt = 
    return (
        <>
            <li className="mx-4 sm:mx-0 flex flex-col ">
                <div className="">
                    <img className="w-full h-48 object-cover rounded-t-md" 
                    src={coverImage} alt='cover image mindblowing artikel'/>

                </div>
                <div className="mx-4">
                        <div className="flex my-3">
                            <img className="w-14 h-14 object-cover rounded-full mr-4"
                                src={contributor_pp}
                            />
                            <div className="opacity-70 flex items-center text-sm font-semibold italic self-center">
                                <p>By {` ${contributor_name}`}</p>
                                <div className="mx-4">|</div>
                                <time className='flex items-center'>
                                    <CalendarIcon className='w-6 h-6 mr-2 opacity-70'></CalendarIcon>
                                    {formattedDate(releaseArticle)}</time>
                            </div>
                       </div>
                    <h2 className="font-bold text-xl my-3">{title}</h2>
                    <p className="font-normal text-base">{contentPreview}</p>
                    <div className="my-3">
                        <div className="flex">
                            {
                                category.map(data => {
                                    return (
                                    <div className="bg-accent py-1 px-2 text-sm rounded-md" 
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
            </li>
        </>
    )
}