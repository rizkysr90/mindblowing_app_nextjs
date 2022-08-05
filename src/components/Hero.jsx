export default function Hero() {
    return (
        <div className="w-full flex min-h-[350px] xs:min-h-[400px] sm:min-h-[600px] xs:px-10 px-4 sm:px-20 overflow-hidden">
           <div className="w-full sm:basis-2/4  flex flex-col items-center  sm:items-start justify-center">
                <div className="font-bold text-3xl sm:text-7xl">Stay awesome</div>
                <div className="font-medium text-sm xs:text-base text-center sm:text-left sm:text-2xl">
                    Discover stories, thinking, and experience
                </div>
                <button className="btn w-3/5  lg:w-2/5 mt-8 normal-case text-lg">Let's reading</button>
           </div>
           <div className="basis-2/4 hidden  sm:flex items-center">
             <img className="block" 
             src="/svg/undraw_font_re_efri.svg" alt="undraw_font_re_efri.svg"/>
           </div>
        </div>
    )
}